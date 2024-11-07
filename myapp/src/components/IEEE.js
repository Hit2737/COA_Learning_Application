import React, { useState } from 'react';
import DecimalToIeeeSingle from './IEEE/DecimalToIeeeSingle';
import ResultDisplay from './IEEE/ResultDisplay';

export default function IEEE({ mode, showAlert }) {
    const [fpType, setFpType] = useState('FP32');
    const [number, setNumber] = useState();             //string
    const [steps, setSteps] = useState({});
    console.log("Inside the IEEE component");
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
            />
            <DecimalToIeeeSingle 
                mode={mode} 
                showAlert={showAlert} 
                number={number} 
                setNumber={setNumber}
                steps={steps}
                setSteps={setSteps}
            />
        </div>
    )
}