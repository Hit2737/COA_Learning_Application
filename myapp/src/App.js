import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PerformanceMetricsAnalyzer from './components/PerformanceComponents/PerformanceMetricsAnalyzer';
import CacheReplacementVisualizer from './components/CacheComponents/CacheReplacementVisualizer';
import NumberConversionSimulator from './components/NumberConversion/NumberConversionSimulator';
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
