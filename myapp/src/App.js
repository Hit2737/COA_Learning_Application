import Navbar from './components/Navbar';
import ToolBox from './components/ToolBox';
import About from './components/About';
import PerformanceMetricAnalyser from './components/PMA';
import NumberConvertor from './components/NC';
import CacheSimulator from './components/CS';
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Alert from './components/Alert';

function App() {
  const [mode, setMode] = useState('light')

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark')
      document.body.style.backgroundColor = "#343a40"
      document.body.style.color = "white"
    } else {
      setMode('light')
      document.body.style.backgroundColor = "#fff"
      document.body.style.color = "#000"
    }
  }
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null);
    }, 500);
  }



  return (
    <>
      <Router>
        <Navbar title='COA-GUITool' mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route exact path='/' element={<ToolBox mode={mode} />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/performacemetricanalyser' element={<PerformanceMetricAnalyser mode={mode} showAlert={showAlert} />} />
            <Route exact path='/numberconvertor' element={<NumberConvertor mode={mode} />} />
            <Route exact path='/cachesimulator' element={<CacheSimulator mode={mode} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
