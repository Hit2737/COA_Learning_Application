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
    const [placeholder, setPlaceholder] = useState("Enter a number");

    const toggleExpand=()=> setShowSteps(!showSteps);

    function handleClick(e) {
        setFpType(e.target.id);
        if(number === "" && placeholder === "Enter a number"){
            setSteps({});
        }
        else if(number === "0"){
            setSteps(DToSingle(0));
        }
        else if(placeholder ==="Enter a number"){
            if(e.target.id==="FP32"){
                setSteps(DToSingle(parseFloat(number)));
            }
            else{
                setSteps(DToDouble(parseFloat(number)));
            }
        }
        else {
            if(e.target.id==="FP32"){
                if(placeholder==="Infinity"){
                    setSteps(DToSingle(Infinity));
                }else if(placeholder==="-Infinity"){
                    setSteps(DToSingle(-Infinity));
                }else{
                    setSteps(DToSingle(NaN));
                }
            }
            else{
                if(placeholder==="Infinity"){
                    setSteps(DToDouble(Infinity));
                }else if(placeholder==="-Infinity"){
                    setSteps(DToDouble(-Infinity));
                }else{
                    setSteps(DToDouble(NaN));
                }
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
                placeholder={placeholder}
                setPlaceholder={setPlaceholder}
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