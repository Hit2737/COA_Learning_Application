import DropDown from './NC/DropDown'
import {DisplaySteps,isValidInput} from './NC/DisplaySteps'
import { useState } from 'react'
import IeeeSinglePrecision from './NC/DecimalToIeeeSingle'


export default function NumberConvertor() {
    const [number, setNumber] = useState("");
    const [fromBase, setFromBase] = useState(2);
    const [toBase, setToBase] = useState(16);
    const [result, setResult] = useState("");
    const [validInput, setValidInput] = useState(false);
    const [decimalValue, setDecimalValue] = useState("");
    const [outputIntVal, setOutputIntVal] = useState("");
    const [outputFracVal, setOutputFracVal] = useState("");

    function handleNumberChange(e){
        setNumber(e.target.value)
        if(fromBase===10){
            setDecimalValue(e.target.value);
        }
        checkValidInput(e.target.value,fromBase);
    }
    function checkValidInput(number,fromBase){
        isValidInput(number,fromBase)?setValidInput(true):setValidInput(false);
    }
    function wrongInput(){
        return <div className="alert alert-danger">Invalid Input</div>
    }

    function noConversion(){
        return (
            <div className="alert alert-info my-2">No conversion needed</div>
        );
    }
    function handleConversion(){
        if(!validInput){
            setResult("");
        }
        else if(fromBase===toBase){
            setResult(number);
        }
        else if(toBase===10){
            setResult(decimalValue);
        }
        else{
            if(outputFracVal===""){
                setResult(`${outputIntVal}`);
            }else{
                setResult(`${outputIntVal}.${outputFracVal}`);
            }
        }
    }
    
    return (
        <>
            <h1 className="text-center my-3">Number System Converter</h1>
            <div className="container-fluid">
                <div className="row">
                    <div className='col'>
                        <DropDown id="convertFrom" setBase={setFromBase} base={fromBase} setValidInput={setValidInput} number={number} setDecimalValue={setDecimalValue}/>
                    </div>
                    <div className='col'>
                        <input type="text" id="from" className="form-control" aria-label="Text input with dropdown button" placeholder="Enter valid number to convert to"  onChange={handleNumberChange}></input>
                    </div>
                    <div className='col'>
                        <DropDown id="convertTo" setBase={setToBase} base={toBase} setValidInput={setValidInput} number={number}/>
                    </div>
                    <div className='col'>
                    <input type="text" id="to" className="form-control" aria-label="Text input with dropdown button" placeholder="Result" value={result} readOnly/>

                    </div>
                </div>

                <div className="row">
                    <div className="my-3">
                        <button className="btn btn-secondary" onClick={handleConversion}>Convert </button>
                    </div>   
                </div>
            </div>

            <div className="container mt-5">
                <h2>Conversion Steps</h2>
                {(!validInput)? wrongInput():
                    (<>{(fromBase===toBase)? noConversion():
                        (<div className="form-group">
                            <label htmlFor="conversionSteps">Steps of Conversion:</label>
                            <DisplaySteps 
                                number={number.toUpperCase()} 
                                fromBase={fromBase} 
                                toBase={toBase} 
                                setResult={setResult} 
                                decimalValue={decimalValue} 
                                setDecimalValue={setDecimalValue}
                                setOutputFracVal={setOutputFracVal}
                                setOutputIntVal={setOutputIntVal}
                                outputFracVal={outputFracVal}
                                outputIntVal={outputIntVal}/>
                        </div>)
                    }</>)
                }

            </div>
            {/* <IeeeSinglePrecision /> */}
        </>)
}
