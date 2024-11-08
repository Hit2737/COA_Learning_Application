import React, { useEffect, useRef, useMemo } from 'react'
import Chart from 'chart.js/auto'

export default function EfficiencyVsCoreCnt({ n, seqIns, parIns, cpi, clkRate, overhead }) {
    const EfficiencyfromCoreCnt = (coreCnt) => {
        let tIns = Number(seqIns) + Number(parIns);
        let sExeTime = seqIns * cpi / clkRate;
        let pExeTime = (Number(coreCnt) < Number(parIns)) ? parIns * cpi / clkRate / coreCnt : cpi / clkRate;
        let tSeqExeTime = tIns * cpi / clkRate;
        let tExeTime = sExeTime + pExeTime + Number(overhead);
        let speedup = tSeqExeTime / tExeTime;
        return speedup / coreCnt;
    }


    const data = useMemo(() => {
        const data = [];
        for (let i = 1; i <= n; i++) {
            data.push({
                coreCnt: i,
                Efficiency: EfficiencyfromCoreCnt(i)
            });
        }
        return data;
    }, [n, seqIns, parIns, cpi, clkRate, overhead]);

    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        // Destroy the previous chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Create a new chart instance
        const ctx = canvasRef.current.getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(row => row.coreCnt),
                datasets: [
                    {
                        label: 'Efficiency vs Core Count',
                        data: data.map(row => row.Efficiency),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Core Count'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Efficiency'
                        }
                    }
                }
            },
            animation: false,
        });
    }, [data]);
    return (
        <div className='container' style={{ width: '800px' }}>
            <canvas ref={canvasRef} id="acquisitions" className="chart"></canvas>
        </div>
    )
}
