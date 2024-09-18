import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PerformanceMetricsAnalyzer from './components/PerformanceMetricsAnalyzer';
import CacheReplacementVisualizer from './components/CacheReplacementVisualizer';
import NumberConversionSimulator from './components/NumberConversionSimulator';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/performance-metrics" element={<PerformanceMetricsAnalyzer />} />
          <Route path="/cache-visualizer" element={<CacheReplacementVisualizer />} />
          <Route path="/number-conversion" element={<NumberConversionSimulator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
