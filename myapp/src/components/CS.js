import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropDown from './DropDown';
import DLL from './CS/DLL';

export default function CacheSimulator({ mode, showAlert }) {
    const [algo, setAlgo] = useState('LRU');
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/cache-theory'); // Redirects to the Cache Theory page
    };

    return (
        <>
            <h1 className='text-center'>Cache Simulator</h1>
            <div className="container d-flex justify-content-between align-items-center my-3">
                <button onClick={handleNavigate} className="btn btn-primary">Cache Theory</button>
                <DropDown mode={mode} value={algo} setValue={setAlgo} options={['LRU', 'LFU', 'FiFo', 'LiFo']} />
            </div>
            <div className="container my-5">
                <h4>Simulating {algo} Cache with DLL (Doubly Linked List): </h4>
                <DLL mode={mode} showAlert={showAlert} algo={algo} />
            </div>
        </>
    );
}
