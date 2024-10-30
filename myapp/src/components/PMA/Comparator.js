import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Comparator = () => {
    // State to manage CPI value and corresponding execution time
    const [cpi, setCPI] = useState(1); // Initial CPI value
    const [executionTime, setExecutionTime] = useState([]);

    // Reference to the SVG element
    const svgRef = useRef();

    // Example CPU parameters for calculation
    const clockRate = 2; // GHz
    const instructions = 1000000; // Total instructions (adjust as needed)

    // Update Execution Time array when CPI changes
    useEffect(() => {
        const newExecutionTime = Array.from({ length: 10 }, (_, i) => {
            const coreCount = i + 1;
            // Calculation: Execution Time = (CPI * Instructions) / (Clock Rate * Core Count)
            return {
                coreCount,
                time: (cpi * instructions) / (clockRate * coreCount * 1e9), // Time in seconds
            };
        });
        setExecutionTime(newExecutionTime);
    }, [cpi, clockRate, instructions]);

    // D3 code for rendering/updating the line chart
    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = 400;
        const height = 300;

        // Set up scales and axes
        const xScale = d3.scaleLinear().domain([1, 10]).range([50, width - 50]);
        const yScale = d3.scaleLinear().domain([0, d3.max(executionTime, d => d.time)]).range([height - 50, 50]);

        svg.selectAll("*").remove(); // Clear the chart before updating

        // X-axis
        svg.append("g")
            .attr("transform", `translate(0, ${height - 50})`)
            .call(d3.axisBottom(xScale).ticks(10));

        // Y-axis
        svg.append("g")
            .attr("transform", `translate(50, 0)`)
            .call(d3.axisLeft(yScale));

        // Line generator
        const line = d3.line()
            .x(d => xScale(d.coreCount))
            .y(d => yScale(d.time));

        // Draw line
        svg.append("path")
            .datum(executionTime)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

        // Add circles at data points
        svg.selectAll(".dot")
            .data(executionTime)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", d => xScale(d.coreCount))
            .attr("cy", d => yScale(d.time))
            .attr("r", 4)
            .attr("fill", "steelblue");

        // Add labels for each data point
        // svg.selectAll(".label")
        //     .data(executionTime)
        //     .enter()
        //     .append("text")
        //     .attr("x", d => xScale(d.coreCount) + 5)
        //     .attr("y", d => yScale(d.time) - 5)
        //     .text(d => `${d.time.toFixed(4)} s`)
        //     .attr("font-size", "10px")
        //     .attr("fill", "gray");

    }, [executionTime]);

    // Handle CPI slider change
    const handleCPIChange = (e) => {
        setCPI(Number(e.target.value));
    };

    return (
        <div className='row align-items-center' style={{ textAlign: 'center' }}>
            <h3>Impact of CPI on Execution Time</h3>
            <label className='col'>
                CPI: {cpi}
                <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.1"
                    value={cpi}
                    onChange={handleCPIChange}
                    style={{ width: '200px', margin: '0 10px' }}
                />
            </label>
            <svg className='col' ref={svgRef} width="400" height="300"></svg>
        </div>
    );
};

export default Comparator;
