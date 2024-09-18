import React, { useState } from 'react';
import * as d3 from 'd3';

const CacheReplacementVisualizer = () => {
  const [cacheSize, setCacheSize] = useState(4);
  const [blockSize, setBlockSize] = useState(64);
  const [accessPattern, setAccessPattern] = useState([]);

  const simulateCache = () => {
    let hits = 0;
    let misses = 0;
    accessPattern.forEach((access, index) => {
      if (index % 2 === 0) hits += 1;
      else misses += 1;
    });
    return { hits, misses };
  };

  const drawCacheChart = () => {
    const { hits, misses } = simulateCache();

    const svg = d3.select("#cache-chart").attr("width", 500).attr("height", 300);
    svg.selectAll("*").remove();

    svg.append("rect")
      .attr("x", 50)
      .attr("y", 100)
      .attr("width", hits * 10)
      .attr("height", 50)
      .attr("fill", "green");

    svg.append("text")
      .attr("x", 50)
      .attr("y", 90)
      .text(`Hits: ${hits}`)
      .attr("font-size", "16px");

    svg.append("rect")
      .attr("x", 50)
      .attr("y", 200)
      .attr("width", misses * 10)
      .attr("height", 50)
      .attr("fill", "red");

    svg.append("text")
      .attr("x", 50)
      .attr("y", 190)
      .text(`Misses: ${misses}`)
      .attr("font-size", "16px");
  };

  return (
    <div>
      <h3>Cache Replacement Visualizer</h3>
      <label>
        Cache Size:
        <input type="number" value={cacheSize} onChange={(e) => setCacheSize(e.target.value)} />
      </label>
      <label>
        Block Size:
        <input type="number" value={blockSize} onChange={(e) => setBlockSize(e.target.value)} />
      </label>
      <button onClick={drawCacheChart}>Simulate</button>
      <svg id="cache-chart"></svg>
    </div>
  );
};

export default CacheReplacementVisualizer;
