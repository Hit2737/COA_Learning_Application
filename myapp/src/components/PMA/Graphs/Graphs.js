import React from 'react';
import Comparator from './Comparator';

function Graphs({ coreCount, seqIns, parIns, cpi, clkRate, overhead, setCoreCount }) {
    let tIns = Number(seqIns) + Number(parIns);
    let sExeTime = seqIns * cpi / clkRate;
    let pExeTime = (Number(coreCount) < Number(parIns)) ? parIns * cpi / clkRate / coreCount : cpi / clkRate;
    let tSeqExeTime = tIns * cpi / clkRate;
    let tExeTime = sExeTime + pExeTime + Number(overhead);
    // let tput = tIns / tExeTime;
    let speedup = tSeqExeTime / tExeTime;
    let efficiency = speedup / coreCount;
    return (
        <>
            <div className='container text-center my-3'>
                <h1>Graphs</h1>
            </div>
            <Comparator title='SpeedUp Vs Efficiency with Core Count' xLabel='Efficiency' yLabel='SpeedUp' sliderValue={coreCount} setSliderValue={setCoreCount} xData={[efficiency]} yData={[speedup]} />
        </>
    );
}

export default Graphs;
