import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>COA Visualizer</h1>
      </header>

      <div className="card-container">
        <Link to="/performance-metrics" className="card">
          <h3>Performance Metrics Analyzer</h3>
          <img src="/performance-metrics.jpg" alt="Performance Metrics" className="card-image" />
        </Link>

        <Link to="/cache-visualizer" className="card">
          <h3>Cache Replacement Visualizer</h3>
          <img src="/cache-visualizer.jpg" alt="Cache Visualizer" className="card-image" />
        </Link>

        <Link to="/number-conversion" className="card">
          <h3>Number Conversion Simulator</h3>
          <img src="/number-conversion.jpg" alt="Number Conversion" className="card-image" />
        </Link>
      </div>

      <footer className="footer">
        <p>© 2024 COA Visualizer</p>
      </footer>
    </div>
  );
};

export default Home;
