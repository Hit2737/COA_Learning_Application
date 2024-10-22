import React, { useState } from 'react';
import * as d3 from 'd3';

const PerformanceMetricsAnalyzer = () => {
  const [cpi, setCpi] = useState(0);
  const [instructionCount, setInstructionCount] = useState(0);
  const [clockCycle, setClockCycle] = useState(0);

  const calculateMetrics = () => {
    const latency = instructionCount * cpi * clockCycle;
    const throughput = 1 / latency;
    return { latency, throughput };
  };

  const drawChart = () => {
    const { latency, throughput } = calculateMetrics();

    const svg = d3.select("#metric-chart").attr("width", 500).attr("height", 300);
    svg.selectAll("*").remove(); // Clear previous visualizations

    svg.append("rect")
      .attr("x", 50)
      .attr("y", 100)
      .attr("width", latency)
      .attr("height", 50)
      .attr("fill", "steelblue");

    svg.append("text")
      .attr("x", 50)
      .attr("y", 90)
      .text(`Latency: ${latency.toFixed(2)}`)
      .attr("font-size", "16px");

    svg.append("rect")
      .attr("x", 50)
      .attr("y", 200)
      .attr("width", throughput * 1000)
      .attr("height", 50)
      .attr("fill", "orange");

    svg.append("text")
      .attr("x", 50)
      .attr("y", 190)
      .text(`Throughput: ${throughput.toFixed(5)}`)
      .attr("font-size", "16px");
  };

  return (
    <div>
      <h3>Performance Metrics Analyzer</h3>
      <label>
        CPI:
        <input type="number" value={cpi} onChange={(e) => setCpi(e.target.value)} />
      </label>
      <label>
        Instruction Count:
        <input type="number" value={instructionCount} onChange={(e) => setInstructionCount(e.target.value)} />
      </label>
      <label>
        Clock Cycle (ns):
        <input type="number" value={clockCycle} onChange={(e) => setClockCycle(e.target.value)} />
      </label>
      <button onClick={drawChart}>Visualize</button>
      <svg id="metric-chart"></svg>
    </div>
  );
};

export default PerformanceMetricsAnalyzer;
