import React, { useState } from 'react';
import SpeedUpVsCoreCnt from './SpeedUpVsCoreCnt';
import EfficiencyVsCoreCnt from './EfficiencyVsCoreCnt';
import EffSpeedUpTradeOff from './EffSpeedUpTradeOff';
import UtilizationRatioVsCoreCnt from './UtilizationRatiofromCoreCnt';
import DropDown from '../../DropDown';

const chartlist = ['SpeedUp Vs Core Count', 'Efficiency Vs Core Count', 'Efficiency-SpeedUp TradeOff', 'Utilization Ratio Vs Core Count'];

function Graphs({ mode }) {
    const [coreCount, setCoreCount] = useState(20);
    const [seqIns, setSeqIns] = useState(100);
    const [parIns, setParIns] = useState(100);
    const [cpi, setCPI] = useState(1);
    const [clkRate, setClkRate] = useState(4);
    const [overhead, setOverhead] = useState(0);
    const [chart, setChart] = useState('SpeedUp Vs Core Count');

    let ThisChart;
    switch (chart) {
        case 'SpeedUp Vs Core Count':
            ThisChart = <SpeedUpVsCoreCnt mode={mode} n={coreCount} seqIns={seqIns} parIns={parIns} cpi={cpi} clkRate={clkRate} overhead={overhead} />;
            break;
        case 'Efficiency Vs Core Count':
            ThisChart = <EfficiencyVsCoreCnt mode={mode} n={coreCount} seqIns={seqIns} parIns={parIns} cpi={cpi} clkRate={clkRate} overhead={overhead} />;
            break;
        case 'Efficiency-SpeedUp TradeOff':
            ThisChart = <EffSpeedUpTradeOff mode={mode} n={coreCount} seqIns={seqIns} parIns={parIns} cpi={cpi} clkRate={clkRate} overhead={overhead} />;
            break;
        case 'Utilization Ratio Vs Core Count':
            ThisChart = <UtilizationRatioVsCoreCnt mode={mode} n={coreCount} seqIns={seqIns} parIns={parIns} cpi={cpi} clkRate={clkRate} overhead={overhead} />;
            break;
        default:
            ThisChart = <SpeedUpVsCoreCnt mode={mode} n={coreCount} seqIns={seqIns} parIns={parIns} cpi={cpi} clkRate={clkRate} overhead={overhead} />;
    }

    return (
        <>
            <div className='container text-center my-3'>
                <h1>Graphs</h1>
                <DropDown mode={mode} value={chart} setValue={setChart} options={chartlist} />
            </div>
            <div className="graph container" style={{ alignItems: 'center' }}>
                <div className="container" style={{ width: '300px' }}>
                    <label htmlFor="coreCount">Core Count: {coreCount}</label>
                    <input id={'coreCount'} type="range" value={coreCount} onChange={(e) => { setCoreCount(e.target.value) }} step={1} min={1} max={20} style={{ width: '100%', accentColor: '#6c757d' }} />
                    <label htmlFor="seqIns">Seq. Inst.: {seqIns}</label>
                    <input id={'seqIns'} type="range" value={seqIns} onChange={(e) => { setSeqIns(e.target.value) }} step={10} min={0} max={1000} style={{ width: '100%', accentColor: '#6c757d' }} />
                    <label htmlFor="parIns">Par. Inst.: {parIns}</label>
                    <input id={'parIns'} type="range" value={parIns} onChange={(e) => { setParIns(e.target.value) }} step={10} min={0} max={1000} style={{ width: '100%', accentColor: '#6c757d' }} />
                    <label htmlFor="cpi">CPI: {cpi}</label>
                    <input id={'cpi'} type="range" value={cpi} onChange={(e) => { setCPI(e.target.value) }} step={0.005} min={0.005} max={10} style={{ width: '100%', accentColor: '#6c757d' }} />
                    <label htmlFor="clkRate">Clock Rate: {clkRate} (GHz)</label>
                    <input id={'clkRate'} type="range" value={clkRate} onChange={(e) => { setClkRate(e.target.value) }} step={0.005} min={0.005} max={10} style={{ width: '100%', accentColor: '#6c757d' }} />
                    <label htmlFor="overhead">Overhead Time: {overhead} (ns)</label>
                    <input id={'overhead'} type="range" value={overhead} onChange={(e) => { setOverhead(e.target.value) }} step={10} min={0} max={1000} style={{ width: '100%', accentColor: '#6c757d' }} />
                </div>
                <div className={`container`} style={{ height: '400px', width: '800px', backgroundColor: mode === 'light' ? 'whitesmoke' : 'rgb(43 46 60)', borderRadius: '10px', border: '1px solid #6c757d' }}>
                    {ThisChart}
                </div>
            </div>
        </>
    );
}

export default Graphs;
