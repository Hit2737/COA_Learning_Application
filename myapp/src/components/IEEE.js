import React, { useState } from 'react';
import DToSingleSteps from './IEEE/DToSingleSteps';
import ResultDisplay from './IEEE/ResultDisplay';

export default function IEEE({ mode, showAlert }) {
    const [fpType, setFpType] = useState('FP32');
    const [number, setNumber] = useState("");
    const [steps, setSteps] = useState({});
    const [showSteps, setShowSteps] = useState(false);

    const toggleExpand=()=> setShowSteps(!showSteps);
    
    function handleClick(e) {
        setFpType(e.target.id);
    }
    return (
        <div>
            <h2 className="text-center my-3">IEEE 754-Style Floating-Point Converter</h2>
            <div className="row text-center" style={{width:"40%", margin:"auto"}}>
                <div className="col">
                    <button id="FP32" type="button" className="btn btn-secondary" onClick={handleClick}>FP32</button>
                </div>
                <div className="col">
                    <button id="FP64" type="button" className="btn btn-secondary" onClick={handleClick}>FP64</button>
                </div>
            </div>
            <div className="container">
                <div className="text-center my-3">
                    <h3>{fpType}</h3>
                </div>
            </div>
            <ResultDisplay 
                mode={mode} 
                showAlert={showAlert} 
                number={number}
                setNumber={setNumber}
                setSteps={setSteps}
                steps={steps}
            />
            <div className="container">
                {/* Button to toggle expand/collapse */}
                <button 
                    className="btn btn-primary mb-3" 
                    onClick={toggleExpand}
                    aria-expanded={showSteps}
                    aria-controls="collapseContent"
                >
                    {showSteps ? "Hide Steps" : "Show Steps"}
                </button>

                {/* Collapsible content with Bootstrap collapse class */}
                <div className={`collapse ${showSteps ? 'show' : ''}`} id="collapseContent">
                    <div className="card card-body" style={{backgroundColor:(mode==="dark")?"rgb(45,50,69)":"white"}}>
                        <h3>Step-by-Step Conversion</h3>
                        <DToSingleSteps 
                            setNumber={setNumber}
                            steps={steps}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}