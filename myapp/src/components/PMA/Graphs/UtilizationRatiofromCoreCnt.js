import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function UtilizationRatioVsCoreCnt({ n, parIns, cpi, clkRate, overhead }) {

    const UtilizationRatiofromCoreCnt = useCallback((coreCnt) => {
        return (Number(parIns) * Number(cpi)) / (coreCnt * Number(clkRate) + Number(overhead));
    }, [parIns, cpi, clkRate, overhead]);

    const data = useMemo(() => {
        const data = [];
        for (let i = 1; i <= n; i++) {
            data.push({
                coreCnt: i,
                UtilizationRatio: UtilizationRatiofromCoreCnt(i)
            });
        }
        return data;
    }, [n, UtilizationRatiofromCoreCnt]);

    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');

        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(row => row.coreCnt),
                datasets: [
                    {
                        label: 'Utilization Ratio vs Core Count',
                        data: data.map(row => row.UtilizationRatio),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
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
                            text: 'Utilization Ratio'
                        },
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        });
    }, [data]);

    return (
        <canvas ref={canvasRef} id="utilizationRatioChart" className="chart"></canvas>
    );
}
