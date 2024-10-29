import React from "react";
import Tex2SVG from "react-hook-mathjax";
import { useState } from "react";

export default function CalVisualizer({ coreCount, seqIns, parIns, cpi, clkRate, overhead }) {

    let seqExeTime = seqIns * cpi / clkRate;
    let parExeTime = parIns * cpi / (clkRate * coreCount);
    let totalExeTime = seqExeTime + parExeTime + overhead;
    let speedup = seqExeTime / totalExeTime;

    const metrics = {
        seqExeTime: {
            heading: "Sequential Execution Time",
            def: "The time taken to execute the sequential instructions.",
            formula: `
                    \\begin{align*}
                    \\text{Seq. Exe. Time} 
                    \\\\ &= \\frac{Seq. Ins. \\times CPI}{Clock Rate} \\ \\text{s}
                    \\end{align*}`,
            cal: `
                \\begin{align*}
                \\text{Seq. Exe. Time} &= \\frac{${seqIns} \\times ${cpi}}{${clkRate}} \\\\
                &= ${Number(seqIns * cpi / clkRate).toFixed(2)} \\text{ ns}
                \\end{align*}
            `
        },
        parExeTime: {
            heading: "Parallel Execution Time",
            def: "The time taken to execute the parallelizable instructions across all cores.",
            formula: "Parallel Exe. Time = Parallel Ins. * CPI / (Clock Rate * Core Count)",
            cal: `
                \\begin{align*}
                \\text{Parallel Exe. Time} &= \\frac{${parIns} \\times ${cpi}}{${clkRate} \\times ${coreCount}} \\\\
                &= ${(parIns * cpi / (clkRate * coreCount)).toFixed(2)} \\text{ ns}
                \\end{align*}
            `
        },
        totalExeTime: {
            heading: "Total Execution Time",
            def: "The total time required to complete all instructions (both sequential and parallelizable).",
            formula: "Total Exe. Time = Seq. Exe. Time + Parallel Exe. Time + Overhead Time",
            cal: `
                \\begin{align*}
                \\text{Total Exe. Time} &= ${seqExeTime} + ${parExeTime} + ${overhead} \\\\
                &= ${Number(seqExeTime + parExeTime + overhead).toFixed(2)} \\text{ ns}
                \\end{align*}
            `
        },
        speedup: {
            heading: "SpeedUp",
            def: "The factor by which the execution time is reduced due to parallelization.",
            formula: "Speedup = Seq. Exe. Time / Total Exe. Time",
            cal: `
                \\begin{align*}
                \\text{Speedup} &= \\frac{${seqExeTime}}{${Number(totalExeTime).toFixed(2)}} \\\\
                &= ${Number(seqExeTime / totalExeTime).toFixed(2)}
                \\end{align*}
            `
        },
        eff: {
            heading: "Efficiency",
            def: "The efficiency of the parallel execution, measuring the ratio of speedup to the number of cores.",
            formula: "Efficiency = Speedup / Core Count",
            cal: `
                \\begin{align*}
                \\text{Efficiency} &= \\frac{${speedup}}{${coreCount}} \\\\
                &= ${(speedup / coreCount).toFixed(2)}
                \\end{align*}
            `
        },
        tput: {
            heading: "Throughput",
            def: "The rate of processing instructions, often measured as instructions per second.",
            formula: "Throughput = (Clock Rate * Core Count) / CPI",
            cal: `
                \\begin{align*}
                \\text{Throughput} &= \\frac{${clkRate} \\times ${coreCount}}{${cpi}} \\\\
                &= ${(clkRate * coreCount / cpi).toFixed(2)} \\text{ instructions/sec}
                \\end{align*}
            `
        },
        totalIns: {
            heading: "Total Instructions",
            def: "The sum of all instructions, both sequential and parallelizable, to be executed.",
            formula: "Total Instructions = Sequential Instructions + Parallelizable Instructions",
            cal: `
                \\begin{align*}
                \\text{Total Instructions} &= ${seqIns} + ${parIns} \\\\
                &= ${seqIns + parIns}
                \\end{align*}
            `
        }
    };

    const [param, setParam] = useState('speedup');
    const [mode, setMode] = useState('summary');

    return (
        <>
            <div className="container my-3 mx-2">
                <div className="my-3">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {metrics[param]["heading"]}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {Object.keys(metrics).map((key) => (
                            <li key={key}><p className="dropdown-item" onClick={() => { setParam(key) }}>{metrics[key]["heading"]}</p></li>
                        ))}
                    </ul>
                </div>
                <div className="my-3">
                    <button className="btn btn-secondary" onClick={() => { mode === 'summary' ? setMode('detailed') : setMode('summary') }}>{mode === 'summary' ? 'Detailed' : 'Summary'}</button>
                </div>
                {mode === 'summary' ? (
                    <>
                        <div className="container my-3">
                            <h5>Definition:</h5>
                            <p>{metrics[param]["def"]}</p>
                        </div>
                        <div className="container">
                            <h5>Formula:</h5>
                            <p display='inline'>{metrics[param]["formula"]}</p>
                            <br />
                        </div >
                    </>
                ) : (
                    <>
                        <div className="container">
                            <h5>Formula:</h5>
                            <Tex2SVG className="latex-font" display="inline" latex={metrics[param]["formula"]} />
                            <br />
                            <h5>Calculation:</h5>
                            <Tex2SVG className="latex-font" display="inline" latex={metrics[param]["cal"]} />
                        </div >
                    </>
                )}
            </div >
        </>
    );
};
