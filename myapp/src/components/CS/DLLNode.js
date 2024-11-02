import React from 'react'
import { Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

export function NullNode() {
    return (
        <>
            <Handle type="target" id='in' position={Position.Top} style={{ background: '#fff' }} />
            <div className='text-center' style={{ background: '#fff', padding: 5, borderRadius: 5, width: 70 }}>
                <div className='container my-3'>
                    <p>NULL</p>
                </div>
            </div>
        </>
    )
}

export function AnnotationNode({ data }) {
    return (
        <>
            <div style={{ padding: 10, display: 'flex' }}>
                <div style={{ marginRight: 4 }}>{data.level}.</div>
                <div>{data.label}</div>
            </div>
            {data.arrowStyle && (
                <div className="arrow" style={data.arrowStyle}>
                    ⤹
                </div>
            )}
        </>
    );
}

const DLLNode = ({ data = { val: '0x00', addr: '0x00', prev: '0x00', next: '0x00' } }) => {
    // const onChange = useCallback((e) => {
    //     console.log(e.target.value)
    // }, [])
    return (
        <>
            <div className='text-center' style={{ background: '#fff', padding: 10, borderRadius: 5, width: 150 }}>
                <Handle type="target" id='prev-in' position={Position.Right} style={{ top: '110px', background: '#fff' }} />
                <Handle type="source" id='prev-out' position={Position.Left} style={{ top: '110px', background: '#fff' }} />
                <div className='border-bottom my-2'>Addr: {data.addr}</div>
                <div className='container my-3'>
                    <p>Data: {data.val}</p>
                    <p>Prev: {data.prev}</p>
                    <p>Next: {data.next}</p>
                </div>
                <Handle type="source" id='next-out' position={Position.Right} style={{ bottom: '30px', top: 'auto', background: '#fff' }} />
                <Handle type="target" id='next-in' position={Position.Left} style={{ bottom: '30px', top: 'auto', background: '#fff' }} />
            </div>
        </>
    )
}

export default DLLNode;
