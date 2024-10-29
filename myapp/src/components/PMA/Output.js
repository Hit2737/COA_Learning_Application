import { useEffect, useState } from 'react';
import OutputLine from './OutputLine';

export default function Output({ coreCount, seqIns, parIns, cpi, clkRate, overhead, showAlert }) {
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

    useEffect(() => {
        if ((() => {
            if (!parseInt(coreCount) || (!parseInt(seqIns) && parseInt(seqIns) !== 0) || (!parseInt(parIns) && parseInt(parIns) !== 0) || !parseFloat(cpi) || !parseFloat(clkRate) || (!parseFloat(overhead) && parseFloat(overhead) !== 0)) {
                return true;
            }
            if (parseInt(seqIns) === 0 && parseInt(parIns) === 0) {
                return true;
            }
            if (!Number.isInteger(parseFloat(coreCount)) || !Number.isInteger(parseFloat(seqIns)) || !Number.isInteger(parseFloat(parIns))) {
                return true;
            }
            if (coreCount < 1 || seqIns < 0 || parIns < 0 || cpi < 0 || clkRate < 0) {
                return true;
            }
            return false;
        })()) {
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
            showAlert('Please enter valid values', 'warning');
            return;
        }

        let tIns = Number(seqIns) + Number(parIns);
        let sExeTime = seqIns * cpi / clkRate;
        let pExeTime = (Number(coreCount) < Number(parIns)) ? parIns * cpi / clkRate / coreCount : cpi / clkRate;
        let tSeqExeTime = tIns * cpi / clkRate;
        let tExeTime = sExeTime + pExeTime + Number(overhead);
        let tput = tIns / tExeTime;
        let speedup = tSeqExeTime / tExeTime;
        let efficiency = speedup / coreCount;


        setOutput({
            totalExeTime: (tExeTime > 100000 || (tExeTime < 0.001 && tExeTime !== 0)) ? tExeTime.toExponential(2) : tExeTime.toFixed(2),
            tput: (tput > 100000 || (tput < 0.001 && tput !== 0)) ? tput.toExponential(2) : tput.toFixed(2),
            speedup: (speedup > 100000 || (speedup < 0.001 && speedup !== 0)) ? speedup.toExponential(2) : speedup.toFixed(2),
            efficiency: (efficiency > 100000 || (efficiency < 0.001 && efficiency !== 0)) ? efficiency.toExponential(2) : efficiency.toFixed(2),
            totalIns: (tIns > 100000 || (tIns < 0.001 && tIns !== 0)) ? tIns.toExponential(2) : Number(tIns),
            seqExeTime: (sExeTime > 100000 || (sExeTime < 0.001 && sExeTime !== 0)) ? sExeTime.toExponential(2) : sExeTime.toFixed(2),
            parExeTime: (pExeTime > 100000 || (pExeTime < 0.001 && pExeTime !== 0)) ? pExeTime.toExponential(2) : pExeTime.toFixed(2),
            totalSeqExeTime: (tSeqExeTime > 100000 || (tSeqExeTime < 0.001 && tSeqExeTime !== 0)) ? tSeqExeTime.toExponential(2) : tSeqExeTime.toFixed(2)
        })
    }, [coreCount, seqIns, parIns, cpi, clkRate, overhead, showAlert]);

    return (
        <>
            <h4 className='text-center'>Output</h4>
            <div className="row g-2">
                <OutputLine title='Total Instructions' value={output.totalIns} />
                <OutputLine title='Sequential Execution Time (ns)' value={output.seqExeTime} />
                <OutputLine title='Parallel Execution Time (ns)' value={output.parExeTime} />
                <OutputLine title='Total Execution Time (ns)' value={output.totalExeTime} />
                <OutputLine title='Speedup' value={output.speedup} />
                <OutputLine title='Throughput' value={output.tput} />
                <OutputLine title='Efficiency' value={output.efficiency} />
            </div>
        </>
    )
}
