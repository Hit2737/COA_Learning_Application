import React, { useCallback, useMemo, useState, useEffect } from 'react';
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import DLLNode, { NullNode, AnnotationNode } from './DLLNode';

const addressMap = new WeakMap();
let addressCounter = 1000;

class DoublyLinkedListNode {
    constructor(addr, data) {
        this.data = data;
        this.prev = null;
        this.next = null;
        this.addr = addr;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    addNode(addr, data) {
        const newNode = new DoublyLinkedListNode(addr, data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }

    insertAfter(addr, data, address, showAlert) {
        let current = this.head;
        while (current && current.addr !== address) {
            current = current.next;
        }
        if (!current) {
            showAlert(`Node with Address ${address} Not Found`, 'danger');
            return;
        }
        if (data === '') showAlert('Node Initialized with Empty Data', 'warning');
        const newNode = new DoublyLinkedListNode(addr, data);
        newNode.next = current.next;
        newNode.prev = current;
        if (current.next) current.next.prev = newNode;
        current.next = newNode;
        if (current === this.tail) this.tail = newNode;
        this.size++;
    }

    insertBefore(addr, data, address, showAlert) {
        let current = this.head;
        while (current && current.addr !== address) {
            current = current.next;
        }
        if (!current) {
            showAlert(`Node with Address ${address} Not Found`, 'danger');
            return;
        }
        if (data === '') showAlert('Node Initialized with Empty Data', 'warning');
        const newNode = new DoublyLinkedListNode(addr, data);
        newNode.prev = current.prev;
        newNode.next = current;
        if (current.prev) current.prev.next = newNode;
        current.prev = newNode;
        if (current === this.head) this.head = newNode;
        this.size++;
    }

    deleteNode(addr, showAlert) {
        let current = this.head;
        while (current && current.addr !== addr) {
            current = current.next;
        }
        if (!current) {
            showAlert(`Node with Address ${addr} Not Found`, 'danger');
            return;
        }
        if (current.prev) current.prev.next = current.next;
        if (current.next) current.next.prev = current.prev;
        if (current === this.head) this.head = current.next;
        if (current === this.tail) this.tail = current.prev;
        this.size--;
    }

    toNodeArray() {
        const nodes = [];
        let current = this.head;
        while (current) {
            nodes.push(current);
            current = current.next;
        }
        return nodes;
    }
}

const nodeTypes = {
    dllnode: DLLNode,
    NULLnode: NullNode,
    annotation: AnnotationNode,
};

const dll = new DoublyLinkedList();


const rows = 7;
const columns = 7;

// Generate memory addresses and dummy data for the grid
const memoryData = Array.from({ length: rows * columns }, (_, i) => ({
    address: `0x${(i * 4).toString(16).padStart(4, '0').toUpperCase()}`, // Example address
    data: Math.floor(Math.random() * 256) // Random data (0-255)
}));

// Split data into rows for the 7x7 grid
const memoryRows = [];
for (let i = 0; i < memoryData.length; i += columns) {
    memoryRows.push(memoryData.slice(i, i + columns));
}

export default function DLL({ mode, showAlert }) {
    const initialNodes = useMemo(() => ([
        {
            id: 'NULL',
            type: 'NULLnode',
            mode: mode,
            position: { x: 50, y: 400 },
            data: { addr: 'NULL', label: 'NULL' }
        },
        {
            id: 'annotate',
            type: 'annotation',
            mode: mode,
            draggable: false,
            position: { x: 30, y: 0 },
            data: { label: 'Head', arrowStyle: { top: 5, left: 0 } }
        }
    ]), [mode]);

    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState([]);
    const [nodeDataToAdd, setNodeDataToAdd] = useState("");
    const [nodeAddressToDelete, setNodeAddressToDelete] = useState("");
    const [insertAddress, setInsertAddress] = useState("");
    const [insertData, setInsertData] = useState("");
    const [maxSize, setMaxSize] = useState(5);
    const [queryAdd, setQueryAdd] = useState("");

    const renderLinkedList = useCallback(() => {
        const dllNodes = dll.toNodeArray();

        const newNodes = dllNodes.map((node, index) => ({
            id: node.addr.toString(),
            type: 'dllnode',
            position: { x: 200 * index + 50, y: 100 },
            data: {
                label: `Node ${index + 1}`,
                addr: node.addr.toString(),
                val: node.data,
                prev: node.prev ? node.prev.addr.toString() : 'NULL',
                next: node.next ? node.next.addr.toString() : 'NULL',
            }
        }));

        setNodes([...initialNodes, ...newNodes]);

        const defaultEdgeOptions = {
            type: 'smoothstep',
            markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: mode === 'light' ? 'gray' : '#fff',
            },
            style: { stroke: mode === 'light' ? 'gray' : '#fff', strokeWidth: 1.1 },
        };

        const newEdges = dllNodes.flatMap((node) => [
            node.next && {
                id: `en${node.addr}-${node.next.addr}`,
                source: node.addr.toString(),
                sourceHandle: 'next-out',
                target: node.next.addr.toString(),
                targetHandle: 'next-in',
                ...defaultEdgeOptions,
            },
            !node.next && {
                id: `next-null-${node.addr}`,
                source: node.addr.toString(),
                sourceHandle: 'next-out',
                target: 'NULL',
                targetHandle: 'null-in',
                ...defaultEdgeOptions,
            },
            node.prev && {
                id: `ep${node.addr}-${node.prev.addr}`,
                source: node.addr.toString(),
                sourceHandle: 'prev-out',
                target: node.prev.addr.toString(),
                targetHandle: 'prev-in',
                ...defaultEdgeOptions,
            },
            !node.prev && {
                id: `prev-null-${node.addr}`,
                source: node.addr.toString(),
                sourceHandle: 'prev-out',
                target: 'NULL',
                targetHandle: 'null-in',
                ...defaultEdgeOptions,
            }
        ].filter(Boolean));

        setEdges(newEdges);
    }, [setNodes, setEdges, mode, initialNodes]);

    useEffect(() => {
        renderLinkedList();
    }, [mode, renderLinkedList]);

    const handleAddNode = () => {
        if (dll.size >= maxSize) {
            showAlert('Cache Full', 'danger');
            return;
        }
        if (nodeDataToAdd === '') showAlert('Node Initialized with Empty Data', 'warning');
        dll.addNode(nodeDataToAdd);
        setNodeDataToAdd("");
        renderLinkedList();
    };

    const handleDeleteNode = () => {
        if (nodeAddressToDelete === '') {
            showAlert('Please Enter Node Address to Delete', 'danger');
            return;
        }
        dll.deleteNode(parseInt(nodeAddressToDelete), showAlert);
        setNodeAddressToDelete("");
        renderLinkedList();
    };

    const handleClearCache = () => {
        dll.head = null;
        dll.tail = null;
        dll.size = 0;
        setNodes(initialNodes);
        setEdges([]);
    };

    const handleInsertAfter = () => {
        if (insertAddress === "") {
            showAlert('Please Enter Insert Position Address', 'danger');
            return;
        }
        dll.insertAfter(parseInt(insertAddress), insertData, showAlert);
        setInsertAddress("");
        setInsertData("");
        renderLinkedList();
    };

    const handleInsertBefore = () => {
        if (insertAddress === "") {
            showAlert('Please Enter Insert Position Address', 'danger');
            return;
        }
        dll.insertBefore(parseInt(insertAddress), insertData, showAlert);
        setInsertAddress("");
        setInsertData("");
        renderLinkedList();
    };

    const handleCopyAddress = (e) => {
        const address = e.target.innerText;
        setQueryAdd(address);
        const valueAtAdd = memoryData.find((cell) => cell.address === address)?.data;
        setNodeDataToAdd(valueAtAdd);
    };



    return (
        <div className="container border" style={{ borderRadius: '10px' }}>
            <div className="mt-4">
                <div className="container d-flex align-items-center justify-content-start">
                    <div className="container">
                        <h5>Cache Size:</h5>
                        <input
                            name='cacheSize'
                            className={`form-control my-2 mr-3 text-bg-${mode}`}
                            type="number"
                            value={maxSize}
                            onChange={(e) => setMaxSize(e.target.value)}
                            placeholder='Enter Cache Size'
                            style={{ width: '300px' }}
                        />
                    </div>
                    <div className="container">
                        <h5>Query Memory Address:</h5>
                        <div className="container d-flex p-0">
                            <input
                                name='nodeDataToAdd'
                                className={`form-control my-2 text-bg-${mode}`}
                                type="text"
                                value={queryAdd}
                                onChange={(e) => setNodeDataToAdd(e.target.value)}
                                placeholder='Enter Memory Location to Access'
                                style={{ width: '300px' }}
                            />
                            <button className='btn btn-primary my-2 mx-2' onClick={handleAddNode}>Query</button>
                            <button className='btn btn-danger my-2' onClick={handleClearCache}>Clear Cache</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="mt-4">
                <div className="container d-flex align-items-center justify-content-start">
                    <input
                        name='insertAddress'
                        className={`form-control my-2 mx-2 text-bg-${mode}`}
                        type="text"
                        value={insertAddress}
                        onChange={(e) => setInsertAddress(e.target.value)}
                        placeholder="Enter Insert Position Address"
                        style={{ width: '300px' }}
                    />
                    <input
                        name='insertData'
                        className={`form-control my-2 mx-2 text-bg-${mode}`}
                        type="text"
                        value={insertData}
                        onChange={(e) => setInsertData(e.target.value)}
                        placeholder="Enter Data for Insert"
                        style={{ width: '300px' }}
                    />
                </div>
                <div className="container d-flex align-items-center justify-content-start">
                    <button className='btn btn-primary my-2 mx-2' onClick={handleInsertAfter}>Insert After</button>
                    <button className='btn btn-primary my-2 mx-2' onClick={handleInsertBefore}>Insert Before</button>
                </div>
            </div> */}
            <div className="container">
                <div className='container my-3' style={{ height: '70vh' }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        fitView='always'
                    >
                        <Background variant='dots' size={2} />
                        <Controls />
                        <MiniMap zoomable pannable />
                    </ReactFlow>
                </div>
                <div className="container">
                    <h3 className="text-center my-3">Memory</h3>
                    <table className="table table-bordered text-center">
                        <tbody>
                            {memoryRows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, colIndex) => (
                                        <td key={colIndex} style={{ backgroundColor: mode === 'light' ? 'whitesmoke' : 'rgb(45 50 69)', color: mode === 'light' ? 'black' : 'white' }}>
                                            <div className='border-bottom' onClick={handleCopyAddress} style={{ cursor: 'pointer' }}>{cell.address}</div>
                                            <div className='my-1'><strong>{cell.data}</strong></div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
