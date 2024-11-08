import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function SpeedUpVsCoreCnt({ n, seqIns, parIns, cpi, clkRate, overhead }) {

    const SpeedUpfromCoreCnt = useCallback((coreCnt) => {
        console.log(Number(overhead))
        let tIns = Number(seqIns) + Number(parIns);
        return (tIns * cpi / clkRate) / (seqIns * cpi / clkRate + ((Number(coreCnt) < Number(parIns)) ? parIns * cpi / clkRate / coreCnt : cpi / clkRate) + Number(overhead));
    }, [seqIns, parIns, cpi, clkRate, overhead]);
    const data = useMemo(() => {
        const data = [];
        for (let i = 1; i <= n; i++) {
            data.push({
                coreCnt: i,
                SpeedUp: SpeedUpfromCoreCnt(i)
            });
        }
        return data;
    }, [n, SpeedUpfromCoreCnt]);

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
                        label: 'Speedup vs Core Count',
                        data: data.map(row => row.SpeedUp),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
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
                            text: 'Speedup'
                        }
                    }
                }
            },
            animation: false,
        });
    }, [data]);

    return (
        <canvas ref={canvasRef} id="acquisitions" className="chart"></canvas>
    );
}
