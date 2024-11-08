import React, { useCallback, useMemo, useState, useEffect } from 'react';
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import DLLNode, { NullNode, AnnotationNode } from './DLLNode';
import { DoublyLinkedList, CacheMem, ClearCache } from './DLLClass'


const nodeTypes = {
    dllnode: DLLNode,
    NULLnode: NullNode,
    annotation: AnnotationNode,
};

const dll = new DoublyLinkedList();

const rows = 7;
const columns = 4;

const memoryData = Array.from({ length: rows * columns }, (_, i) => ({
    address: `0x${(i * 4).toString(16).padStart(4, '0').toUpperCase()}`,
    data: Math.floor(Math.random() * 256)
}));

const memoryRows = [];
for (let i = 0; i < memoryData.length; i += columns) {
    memoryRows.push(memoryData.slice(i, i + columns));
}


export default function DLL({ mode, showAlert, algo }) {
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
    const [queryAdd, setQueryAdd] = useState("");

    const defaultEdgeOptions = useMemo(() => ({
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: mode === 'light' ? 'gray' : '#fff',
        },
        style: { stroke: mode === 'light' ? 'gray' : '#fff', strokeWidth: 1.1 },
    }), [mode]);

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
                freq: CacheMem[node.addr] ? CacheMem[node.addr].freq : 1,
                prev: node.prev ? node.prev.addr.toString() : 'NULL',
                next: node.next ? node.next.addr.toString() : 'NULL',
                algo: algo
            }
        }));

        setNodes([...initialNodes, ...newNodes]);

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
    }, [setNodes, setEdges, initialNodes, algo, defaultEdgeOptions]);


    useEffect(() => {
        renderLinkedList();
    }, [mode, renderLinkedList]);

    const handleQuery = () => {
        if (queryAdd === '') {
            showAlert('Please Enter Memory Address to Query or Click on the Address in the Table below', 'danger');
            return;
        }
        if (nodeDataToAdd === '' || nodeDataToAdd === undefined) {
            showAlert('Memory Address Not Found, Try to Click on the Addresses in the Table below', 'danger');
            return;
        }
        switch (algo) {
            case 'FiFo':
                if (CacheMem[queryAdd]) {
                    showAlert('Cache Hit', 'success');
                    return;
                }
                if (dll.size === dll.maxSize) {
                    showAlert('Cache Miss! Using FiFo Replacement Policy', 'warning');
                    dll.removeHead();
                }
                dll.addNode(queryAdd, nodeDataToAdd);
                renderLinkedList();
                break;
            case 'LRU':
                if (CacheMem[queryAdd]) {
                    showAlert('Cache Hit', 'success');
                    dll.tempRemoveNode(queryAdd);
                    renderLinkedList();
                    dll.addNode(queryAdd, memoryData.find((cell) => cell.address === queryAdd)?.data);
                    renderLinkedList();
                    return;
                }
                if (dll.size === dll.maxSize) {
                    dll.removeHead()
                    showAlert('Cache Miss! Using LRU Replacement Policy', 'warning');
                }
                dll.addNode(queryAdd, nodeDataToAdd);
                renderLinkedList();
                break;
            case 'LFU':
                if (CacheMem[queryAdd] !== undefined) {
                    showAlert('Cache Hit', 'success');
                    dll.tempRemoveNode(queryAdd);
                    dll.insertbasedonfreq(queryAdd, CacheMem[queryAdd].data);
                    renderLinkedList();
                    return;
                }
                if (dll.size === dll.maxSize) {
                    dll.removeHead();
                    showAlert('Cache Miss! Using LFU Replacement Policy', 'warning');
                }
                dll.insertbasedonfreq(queryAdd, nodeDataToAdd);
                renderLinkedList();
                break;
            case 'LiFo':
                if (CacheMem[queryAdd]) {
                    showAlert('Cache Hit', 'success');
                    return;
                }
                if (dll.size === dll.maxSize) {
                    dll.removeTail();
                    showAlert('Cache Miss! Using LiFo Replacement Policy', 'warning');
                }
                dll.addNode(queryAdd, nodeDataToAdd);
                renderLinkedList();
                break;
            default:
                break;
        }

    };

    const handleClearCache = () => {
        dll.head = null;
        dll.tail = null;
        dll.size = 0;
        ClearCache();
        setQueryAdd("");
        setNodeDataToAdd("");
        setNodes(initialNodes);
        setEdges([]);
    };


    const handleCopyAddress = (e) => {
        const address = e.target.innerText;
        setQueryAdd(address);
        const valueAtAdd = memoryData.find((cell) => cell.address === address)?.data;
        setNodeDataToAdd(valueAtAdd);
        showAlert(`Memory Address Copied: ${address}`, 'success');
    };

    const setDllMaxSize = (size) => {
        if (!isFinite(size) || size < 0) {
            showAlert('Invalid Cache Size', 'danger');
            return;
        }
        if (size === '') {
            showAlert('Cache Size Cannot be Empty', 'danger');
            return;
        }
        if (parseInt(size) < dll.size) {
            showAlert('Cache Size Cannot be Less than Current Cache Size', 'danger');
            return;
        }
        if (parseInt(size) === 0) {
            showAlert('Cache Size Cannot be Zero', 'danger');
            return;
        }
        if (parseInt(size) > 10) {
            showAlert('L1 Cache Size Cannot be Greater than 10', 'danger');
            return;
        }
        dll.maxSize = parseInt(size);
        renderLinkedList();
    }

    const handleQueryChange = (e) => {
        setQueryAdd(e.target.value);
        setNodeDataToAdd(memoryData.find((cell) => cell.address === e.target.value)?.data);
    }



    return (
        <div className="container border" style={{ borderRadius: '10px', backgroundColor: mode === 'light' ? 'whitesmoke' : 'rgb(38 42 55)' }}>
            <div className="mt-4">
                <div className="container d-flex align-items-center justify-content-start">
                    <div className="container">
                        <h5>Cache Size:</h5>
                        <input
                            name='cacheSize'
                            className={`form-control my-2 mr-3 text-bg-${mode}`}
                            type="number"
                            value={dll.maxSize}
                            min={1}
                            max={10}
                            onChange={(e) => setDllMaxSize(e.target.value)}
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
                                onChange={handleQueryChange}
                                placeholder='Enter Memory Location to Access'
                                style={{ width: '300px' }}
                            />
                            <button className='btn btn-primary my-2 mx-2' onClick={handleQuery}>Query</button>
                            <button className='btn btn-danger my-2' onClick={handleClearCache}>Clear Cache</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container row">
                <div className='container my-3 col-8' style={{ height: '70vh' }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        defaultViewport={{ x: 0, y: 120, zoom: 0.75 }}
                    >
                        <Background variant='dots' size={2} />
                        <Controls />
                        <MiniMap zoomable pannable />
                    </ReactFlow>
                </div>
                <div className="container col-4">
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
