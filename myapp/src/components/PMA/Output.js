import React, { useEffect } from 'react'
import { useState } from 'react';
import OutputLine from './OutputLine';

export default function Output({ mode, coreCount, seqIns, parIns, cpi, clkRate, showAlert }) {
    const [output, setOutput] = useState({
        totalExeTime: 0,
        tput: 0,
        speedup: 0,
        efficiency: 0,
        totalIns: 0,
        seqExeTime: 0,
        parExeTime: 0,
        totalSeqExeTime: 0
    });

    const calcOutput = () => {
        if (!cpi || !clkRate || cpi === 0 || clkRate === 0) {
            setOutput({
                totalExeTime: 0,
                tput: 0,
                speedup: 0,
                efficiency: 0,
                totalIns: 0,
                seqExeTime: 0,
                parExeTime: 0,
                totalSeqExeTime: 0
            });
            showAlert('Please enter valid values', 'danger');
            return;
        }

        let tIns = Number(seqIns) + Number(parIns);
        let sExeTime = seqIns * cpi * clkRate;
        let pExeTime = parIns * cpi * clkRate / coreCount;
        let tSeqExeTime = tIns * cpi * clkRate;
        let tExeTime = sExeTime + pExeTime;
        let tput = tIns / tExeTime;
        let speedup = tSeqExeTime / tExeTime;
        let efficiency = speedup / coreCount;


        setOutput({
            totalExeTime: tExeTime.toFixed(2),
            tput: tput.toFixed(2),
            speedup: speedup.toFixed(2),
            efficiency: efficiency.toFixed(2),
            totalIns: tIns.toFixed(2),
            seqExeTime: sExeTime.toFixed(2),
            parExeTime: pExeTime.toFixed(2),
            totalSeqExeTime: tSeqExeTime.toFixed(2)
        })
    };

    return (
        <>
            <h4 className='text-center'>Output</h4>
            <div className="row g-2">
                <OutputLine title='Total Instructions' value={output.totalIns} />
                <OutputLine title='Sequential Execution Time' value={output.seqExeTime} />
                <OutputLine title='Parallel Execution Time' value={output.parExeTime} />
                <OutputLine title='Total Execution Time' value={output.totalExeTime} />
                <OutputLine title='Speedup' value={output.speedup} />
                <OutputLine title='Throughput' value={output.tput} />
                <OutputLine title='Efficiency' value={output.efficiency} />
            </div>
            <div className="container">
                <button className={`btn btn-${mode} btn-outline-${mode === 'light' ? 'dark' : 'light'} mt-3`} onClick={calcOutput}>Calculate</button>
            </div>
        </>
    )
}
