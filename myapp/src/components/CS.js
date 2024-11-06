import React from 'react'
import DropDown from './CS/DropDown'
import { useState } from 'react'
import DLL from './CS/DLL'

export default function CacheSimulator({ mode, showAlert }) {
    const [algo, setAlgo] = useState('LRU')
    return (
        <>
            <h1 className='text-center'>Cache Simulator</h1>
            <div className="container">
                <DropDown mode={mode} value={algo} setValue={setAlgo} options={['LRU', 'LFU', 'FiFo', 'LiFo']} />
            </div>
            <div className="container my-5">
                <h4>Simulating {algo} Cache with DLL (Doubly Linked List): </h4>
            </div>
            <DLL mode={mode} showAlert={showAlert}  algo={algo}/>
        </>
    )
}
