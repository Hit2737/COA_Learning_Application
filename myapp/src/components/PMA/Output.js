import { useState } from 'react';
import OutputLine from './OutputLine';

export default function Output({ mode, coreCount, seqIns, parIns, cpi, clkRate, overhead, showAlert }) {
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

    const wrongInputs = () => {
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
    }

    const calcOutput = () => {
        if (wrongInputs()) {
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
        let tExeTime = sExeTime + pExeTime + Number(overhead);
        let tput = tIns / tExeTime;
        let speedup = tSeqExeTime / tExeTime;
        let efficiency = speedup / coreCount;


        setOutput({
            totalExeTime: tExeTime.toExponential(2),
            tput: tput.toExponential(2),
            speedup: speedup.toExponential(2),
            efficiency: efficiency.toExponential(2),
            totalIns: tIns.toExponential(2),
            seqExeTime: sExeTime.toExponential(2),
            parExeTime: pExeTime.toExponential(2),
            totalSeqExeTime: tSeqExeTime.toExponential(2)
        })
    };

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
            <div className="container">
                <button className={`btn btn-${mode} btn-outline-${mode === 'light' ? 'dark' : 'light'} mt-3`} onClick={calcOutput}>Calculate</button>
            </div>
        </>
    )
}
