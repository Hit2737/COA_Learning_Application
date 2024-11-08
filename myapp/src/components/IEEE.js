import React, { useState } from 'react';
import StepsDisplay from './IEEE/StepsDisplay';
import ResultDisplay from './IEEE/ResultDisplay';
import DToSingle from './IEEE/DToSingle';
import DToDouble from './IEEE/DToDouble';

export default function IEEE({ mode, showAlert }) {
    const [fpType, setFpType] = useState('FP32');
    const [number, setNumber] = useState("");
    const [steps, setSteps] = useState({});
    const [showSteps, setShowSteps] = useState(false);

    const toggleExpand=()=> setShowSteps(!showSteps);
    console.log("Rendering")
    console.log("FFFFFP",fpType);

    function handleClick(e) {
        setFpType(e.target.id);
        if(number === ""){
            setSteps({});
        }
        else{
            if(e.target.id==="FP32"){
                setSteps(DToSingle(parseFloat(number)));
            }
            else{
                setSteps(DToDouble(parseFloat(number)));
            }
        }
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
                fpType={fpType}
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
                    <div className="container">
                        <h3>Step-by-Step Conversion</h3>
                        <StepsDisplay 
                            fpType={fpType}
                            steps={steps}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}