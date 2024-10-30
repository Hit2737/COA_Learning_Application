import React from "react";
import { useState } from "react";
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function CalVisualizer({ coreCount, seqIns, parIns, cpi, clkRate, overhead }) {

    let seqExeTime = seqIns * cpi / clkRate;
    let parExeTime = parIns * cpi / (clkRate * coreCount);
    let totalExeTime = seqExeTime + parExeTime + Number(overhead);
    let tSeqExeTime = (Number(seqIns) + Number(parIns)) * cpi / clkRate;
    let speedup = tSeqExeTime / totalExeTime;
    let tIns = Number(seqIns) + Number(parIns);

    const metrics = {
        seqExeTime: {
            heading: "Sequential Execution Time",
            def: "The time taken to execute the sequential instructions.",
            formula: `
                \\begin{align*}
                \\text{Seq. Exe. Time} = \\frac{\\text{Seq. Ins.} \\times \\text{CPI}}{\\text{Clock Rate}} \\, \\text{s}
                \\end{align*}
                \\\\[2em]
                \\begin{align*}
                = \\frac{I_{c}^{s} \\times CPI}{f} \\, \\text{s}
                \\end{align*}
            `,
            cal: `
                \\begin{align*}
                \\text{Seq. Exe. Time} = \\frac{${seqIns} \\times ${cpi}}{${clkRate}} 
                \\\\[1em]
                = ${Number(seqIns * cpi / clkRate).toFixed(2)} \\text{ ns}
                \\end{align*}
            `
        },
        parExeTime: {
            heading: "Parallel Execution Time",
            def: "The time taken to execute the parallelizable instructions across all cores.",
            formula: `
            \\begin{align*}
            \\text{Par. Exe. Time} = \\frac{\\text{Par. Ins.} \\times \\text{CPI}}{\\text{Clock Rate} \\times \\text{Core Count}} \\, \\text{s}
            \\end{align*}
                \\\\[2em]
                \\begin{align*}
            = \\frac{I_{c}^{p} \\times CPI}{f \\times \\text{Core Count}} \\, \\text{s}
            \\end{align*}
            `,
            cal: `
            \\begin{align*}
            \\text{Parallel Exe. Time} = \\frac{${parIns} \\times ${cpi}}{${clkRate} \\times ${coreCount}} 
            \\\\[1em]
            = ${(parIns * cpi / (clkRate * coreCount)).toFixed(2)} \\text{ ns}
            \\end{align*}
            `
        },
        tSeqExeTime: {
            heading: "Total Seq. Exe. Time",
            def: "The time taken to execute all instructions (parallelizable and non-parallelizable) sequentially.",
            formula: `\\begin{align*}
                \\text{Total Seq. Exe. Time} = \\frac{\\text{Total Ins.} \\times \\text{CPI}}{\\text{Clock Rate}} \\, \\text{s}
                \\end{align*}
                \\\\[2em]
                \\begin{align*}
                = \\frac{I_{c}^{t} \\times CPI}{f} \\, \\text{s}
                \\end{align*}
            `,
            cal: `\\begin{align*}
                    \\text{Total Seq. Exe. Time} = \\frac{${tIns} \\times ${cpi}}{${clkRate}} 
                    \\\\[1em]
                    = ${Number(tIns * cpi / clkRate).toFixed(2)} \\text{ ns}
                \\end{align*}`

        },
        totalExeTime: {
            heading: "Total Execution Time",
            def: "The total time required to complete all instructions (both sequential and parallelizable).",
            formula: `
                \\begin{align*}
                \\text{Total Exe. Time} = \\text{Seq. Exe. Time} + \\text{Par. Exe. Time} + \\text{Overhead Time} \\, \\text{s} 
                \\end{align*}
                \\\\[2em]
                \\begin{align*}
                = T_{exe}^{s} + T_{exe}^{p} + T_{overhead}
                \\end{align*}
            `,
            cal: `
                \\begin{align*}
                \\text{Total Exe. Time} = ${seqExeTime.toFixed(2)} + ${parExeTime.toFixed(2)} + ${overhead} 
                \\\\[1em]
                \\approx ${Number(seqExeTime + parExeTime + overhead).toFixed(2)} \\text{ ns}
                \\end{align*}
            `
        },
        speedup: {
            heading: "SpeedUp",
            def: "The factor by which the execution time is reduced due to parallelization.",
            formula: `
                \\begin{align*}
                \\text{Speedup} = \\frac{\\text{Total Seq. Exe. Time}}{\\text{Total Exe. Time}} 
                \\end{align*}
                \\\\[2em]
                \\begin{align*}
                =\\frac{T_{exe}^{t}}{T_{exe}^{s} + T_{exe}^{p} + T_{overhead}}
                \\end{align*}
            `,
            cal: `
                \\begin{align*}
                \\text{Speedup} = \\frac{${tSeqExeTime.toFixed(2)}}{${totalExeTime.toFixed(2)}} 
                \\\\[1em]
                = ${Number(tSeqExeTime / totalExeTime).toFixed(2)}
                \\end{align*}
            `
        },
        eff: {
            heading: "Efficiency",
            def: "The Efficiency shows the Performance/SpeedUp of the processor per core.",
            formula: `
                \\begin{align*}
                \\text{Efficiency} = \\frac{\\text{Speedup}}{\\text{Core Count}}
                \\end{align*}
            `,
            cal: `
                \\begin{align*}
                \\text{Efficiency} = \\frac{${Number(speedup).toFixed(2)}}{${coreCount}} 
                \\\\[1em]
                = ${(speedup / coreCount).toFixed(2)}
                \\end{align*}
            `
        },
        tput: {
            heading: "Throughput",
            def: "The rate of processing instructions, often measured as instructions per second.",
            formula: `
                \\begin{align*}
                \\text{Throughput} = \\frac{\\text{Total Instructions}}{\\text{Total Exe. Time}} \\, \\text{ins/sec}
                \\end{align*}
                \\\\[2em]
                \\begin{align*}
                = \\frac{I_{c}^{t}}{T_{exe}^{t}} \\, \\text{ins/sec}
                \\end{align*}
            `,
            cal: `
                \\begin{align*}
                \\text{Throughput} = \\frac{${Number(tIns).toFixed(2)}}{${Number(totalExeTime).toFixed(2)}} 
                \\\\[1em]
                = ${(tIns / totalExeTime).toFixed(2)} \\text{ ins/nsec}
                \\end{align*}
            `
        },
        totalIns: {
            heading: "Total Instructions",
            def: "The sum of all instructions, both sequential and parallelizable, to be executed.",
            formula: `
                \\begin{align*}
                \\text{Total Instructions} = \\text{Sequential Instructions} + \\text{Parallelizable Instructions}
                \\end{align*}
            `,
            cal: `
                \\begin{align*}
                \\text{Total Instructions} = ${seqIns} + ${parIns} 
                \\\\[1em]
                = ${(Number(seqIns) + Number(parIns))}
                \\end{align*}
            `
        }
    };




    const [param, setParam] = useState('speedup');
    const [mode, setMode] = useState('summary');

    return (
        <div className="container my-4 mx-2" style={{ overflow: 'auto' }} >
            <div className="my-3">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {metrics[param]["heading"]}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {Object.keys(metrics).map((key) => (
                        <li key={key}><p className="dropdown-item" style={{ cursor: 'pointer' }} onClick={() => { setParam(key) }}>{metrics[key]["heading"]}</p></li>
                    ))}
                </ul>
            </div>
            <div className="my-3">
                <button className="btn btn-secondary" onClick={() => { mode === 'summary' ? setMode('detailed') : setMode('summary') }}>{mode === 'summary' ? 'View Calculation' : 'View Summary'}</button>
            </div>
            {
                mode === 'summary' ? (
                    <>
                        <div className="container my-3">
                            <h5 className="my-4">Definition:</h5>
                            <p>{metrics[param]["def"]}</p>
                        </div>
                        <div className="container">
                            <h5 className="mb-3 mt-5">Formula:</h5>
                            <BlockMath math={metrics[param]["formula"]} />
                        </div >
                    </>
                ) : (
                    <div className="container">
                        <h5 className="my-4">Formula:</h5>
                        <BlockMath math={metrics[param]["formula"]} />
                        <h5 style={{ textAlign: 'left', margin: '0 0' }} className="mb-3 mt-5">Calculation:</h5>
                        <BlockMath math={metrics[param]["cal"]} />
                    </div >
                )
            }
        </div >
    );
};
