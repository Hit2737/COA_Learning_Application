import React, { useMemo, useCallback, useState } from 'react';
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState, addEdge, MarkerType, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';

import DLLNode, { NullNode, AnnotationNode } from './DLLNode';

export default function DLL() {
    const nodeTypes = useMemo(() => ({
        dllnode: DLLNode,
        nullnode: NullNode,
        annotation: AnnotationNode,
    }), []);

    const initialNodes = [
        {
            id: '1',
            type: 'dllnode',
            position: { x: 0, y: 50 },
            data: { addr: '1', label: 'Node 1', val: 'A', prev: 'NULL', next: '2' }
        },
        {
            id: '2',
            type: 'dllnode',
            position: { x: 200, y: 50 },
            data: { addr: '2', label: 'Node 2', val: 'B', prev: '1', next: 'NULL' }
        },
        {
            id: 'null',
            type: 'nullnode',
            position: { x: 450, y: 0 },
            data: { addr: '5000', label: 'NULL' }
        },
        {
            id: 'annotation',
            type: 'annotation',
            draggable: false,
            position: { x: 0, y: 0 },
            data: { label: 'Head', level: 0, arrowStyle: { top: 5, left: 0 } }
        }
    ];

    const initialEdges = [
        { id: 'en1-2', source: '1', sourceHandle: 'next-out', target: '2', targetHandle: 'next-in' },
        { id: 'ep2-1', source: '2', sourceHandle: 'prev-out', target: '1', targetHandle: 'prev-in' },
        { id: 'en2-null', source: '2', sourceHandle: 'next-out', target: 'null' }
    ];

    const defaultEdgeOptions = {
        type: 'smoothstep',
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 15,
            height: 15,
            color: 'gray'
        },
        style: { stroke: 'gray', strokeWidth: 1.1 },
    };

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodeCounter, setNodeCounter] = useState(2);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const addNode = ({ value = 0 }) => {
        const newNodeId = (nodeCounter + 1).toString();
        const newNodePosition = { x: 200 * nodeCounter, y: 50 };
        const newNode = {
            id: newNodeId,
            type: 'dllnode',
            position: newNodePosition,
            data: { label: `Node ${newNodeId}`, addr: `${newNodeId}`, val: String(value), prev: nodeCounter.toString(), next: 'NULL' }
        };

        const lastNodeId = nodeCounter.toString();

        setNodes((nds) => nds.map((node) =>
            node.id === lastNodeId
                ? { ...node, data: { ...node.data, next: newNodeId } }
                : node
        ));

        setEdges((eds) => {
            const filteredEdges = eds.filter((edge) => edge.source !== lastNodeId || edge.target !== 'null');
            return [
                ...filteredEdges,
                { id: `en${lastNodeId}-${newNodeId}`, source: lastNodeId, sourceHandle: 'next-out', target: newNodeId, targetHandle: 'next-in' },
                { id: `ep${newNodeId}-${lastNodeId}`, source: newNodeId, sourceHandle: 'prev-out', target: lastNodeId, targetHandle: 'prev-in' },
                { id: `en${newNodeId}-null`, source: newNodeId, sourceHandle: 'next-out', target: 'null' }
            ];
        });

        setNodes((nds) => [...nds, newNode]);
        setNodeCounter((prev) => prev + 1);
    };


    return (
        <ReactFlowProvider>
            <div style={{ height: '80vh', width: '100%' }}>
                <ReactFlow
                    style={{ background: '#f0f0f0' }}
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    defaultEdgeOptions={defaultEdgeOptions}
                    fitView
                >
                    <Background color="#aaa" gap={20} />
                    <Controls />
                    <MiniMap zoomable pannable />
                </ReactFlow>
                <div style={{ marginTop: '10px' }}>
                    <button onClick={addNode}>Add Node</button>
                </div>
            </div>
        </ReactFlowProvider>
    );
}
