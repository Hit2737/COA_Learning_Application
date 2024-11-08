import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

// Register the annotation plugin
Chart.register(annotationPlugin);

export default function SpeedUpVsCoreCnt({ mode, n, seqIns, parIns, cpi, clkRate, overhead }) {

    const SpeedUpfromCoreCnt = useCallback((coreCnt) => {
        let tIns = Number(seqIns) + Number(parIns);
        return (tIns * cpi / clkRate) / (seqIns * cpi / clkRate + ((Number(coreCnt) < Number(parIns)) ? parIns * cpi / clkRate / coreCnt : cpi / clkRate) + Number(overhead));
    }, [seqIns, parIns, cpi, clkRate, overhead]);

    const EfficiencyfromCoreCnt = useCallback((coreCnt) => {
        return SpeedUpfromCoreCnt(coreCnt) / coreCnt;
    }, [SpeedUpfromCoreCnt]);

    const data = useMemo(() => {
        const data = [];
        for (let i = 1; i <= n; i++) {
            data.push({
                coreCnt: i,
                Efficiency: EfficiencyfromCoreCnt(i),
                SpeedUp: SpeedUpfromCoreCnt(i)
            });
        }
        return data;
    }, [n, EfficiencyfromCoreCnt, SpeedUpfromCoreCnt]);

    const bestCoreCount = useMemo(() => {
        const minEfficiencyThreshold = 0.5;
        const minSpeedupGainThreshold = 0.05;

        let bestCore = 1;
        let previousSpeedup = SpeedUpfromCoreCnt(1);

        for (let i = 2; i <= n; i++) {
            const currentEfficiency = EfficiencyfromCoreCnt(i);
            const currentSpeedup = SpeedUpfromCoreCnt(i);
            const speedupGain = currentSpeedup - previousSpeedup;

            if (currentEfficiency >= minEfficiencyThreshold && speedupGain >= minSpeedupGainThreshold) {
                bestCore = i;
                previousSpeedup = currentSpeedup;
            } else {
                break;
            }
        }
        return bestCore;
    }, [n, EfficiencyfromCoreCnt, SpeedUpfromCoreCnt]);


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
            type: 'line',
            data: {
                labels: data.map(row => row.coreCnt),
                datasets: [
                    {
                        label: 'Efficiency vs Core Count',
                        data: data.map(row => row.Efficiency),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: true,
                        tension: 0.4,
                    },
                    {
                        label: 'Speedup vs Core Count',
                        data: data.map(row => row.SpeedUp),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: true,
                        tension: 0.4,
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    annotation: {
                        annotations: {
                            line1: {
                                type: 'line',
                                xMin: bestCoreCount - 1,
                                xMax: bestCoreCount - 1,
                                borderColor: mode === 'dark' ? 'rgba(0, 0, 255, 0.5)' : 'rgba(0, 0, 255, 0.5)',
                                borderWidth: 2,
                                label: {
                                    content: `Best Core Count: ${bestCoreCount}`,
                                    enabled: true,
                                    position: 'top',
                                    backgroundColor: mode === 'dark' ? 'rgba(0,0,255,0.3)' : 'rgba(0,0,255,0.3)',
                                    color: mode === 'dark' ? 'white' : 'black'
                                }
                            }
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: mode === 'dark' ? 'white' : 'black',
                            font: {
                                size: 14
                            }
                        }
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Core Count',
                            color: mode === 'dark' ? 'white' : 'black'
                        },
                        grid: {
                            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(200, 200, 200, 0.2)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Efficiency/Speedup',
                            color: mode === 'dark' ? 'white' : 'black'
                        },
                        grid: {
                            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(200, 200, 200, 0.2)'
                        }
                    }
                }
            }
        });
    }, [data, mode, bestCoreCount]);

    return (
        <canvas ref={canvasRef} id="acquisitions" className="chart"></canvas>

    );
}
