import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import convertToIEEE754 from './DToSingle';

const ResultDisplay = ({number,setNumber,setSteps}) => {
    console.log("Inside the ResultDisplay component");
  const [sign, setSign] = useState('+1');
  const [exponent, setExponent] = useState('2^32');
  const [mantissa, setMantissa] = useState('1 + 0.25501739978790283');
  const [binaryRepresentation, setBinaryRepresentation] = useState('01000001001000010100000101001001');
  const [hexRepresentation, setHexRepresentation] = useState('4120a469');
  const [error, setError] = useState('0.00000019830322265625');
  const [actualValue, setActualValue] = useState('10.0401399830322265625');

  // Function to handle input and perform conversions
  const handleConvert = () => {
    // Here, you would perform conversions to binary, hex, exponent, and mantissa
    // For demonstration, placeholder values are set

    // Example placeholder values:
    setSign(number >= 0 ? '+1' : '-1');
    setExponent('2^3');
    setMantissa('1 + 0.25501739978790283');
    setBinaryRepresentation('01000001001000010100000101001001');
    setHexRepresentation('4120a469');
    setActualValue('10.0401399830322265625');
    setError('0.00000019830322265625');
  };
    function handleChange(e){
        setNumber(e.target.value);
        if(e.target.value < 0 ){
            setSign('-1');
            console.log("Negative");
        }
        if(e.target.value === ""){
            console.log("Undefined Guys");
            setSteps({});
        }
        else{
            console.log("Defined Guys",e.target.value);
            setSteps(convertToIEEE754(parseFloat(e.target.value)));
        }
    }
    return (
    <div className="container p-4" style={{fontSize:"0.6em"}}>
        <h5>Floating Point Representation</h5>
        <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" style={{width:"20%"}}>Decimal Input</span>
            <input type="number" className="form-control" ariaLabel="Sizing example input" ariaDescribedby="inputGroup-sizing-sm" onChange={handleChange} value={number}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" style={{width:"20%"}}>Decimal Stored</span>
            <input type="text" className="form-control" ariaLabel="Sizing example input" ariaDescribedby="inputGroup-sizing-sm" disabled/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" style={{width:"20%"}}>Error due to Conversion</span>
            <input type="text" className="form-control" ariaLabel="Sizing example input" ariaDescribedby="inputGroup-sizing-sm" disabled/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" style={{width:"20%"}}>Binary Representation</span>
            <input type="text" className="form-control" ariaLabel="Sizing example input" ariaDescribedby="inputGroup-sizing-sm" value={binaryRepresentation} disabled/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" style={{width:"20%"}}>Hex Representation</span>
            <input type="text" className="form-control" ariaLabel="Sizing example input" ariaDescribedby="inputGroup-sizing-sm" disabled/>
        </div>
        <div className="container p-3" style={{fontSize:"0.7em"}}>
            <div className="row align-items-center text-center" style={{margin:"auto"}}>
                <div className="col-2">
                    <h5></h5>
                </div>
                <div className="col-2">
                    <h5>Sign</h5>
                </div>
                <div className="col-3">
                    <h5>Exponent</h5>
                </div>
                <div className="col-5">
                    <h5>Mantissa</h5>
                </div>
            </div>
            <div className="row align-items-center text-center" style={{margin:"auto"}}>
                <div className="col-2">
                    <h5>Value:</h5>
                </div>
                <div className="col-2">
                    <h5>{sign}</h5>
                </div>
                <div className="col-3">
                    <h5><BlockMath math={exponent}/></h5>
                </div>
                <div className="col-5">
                    <h5>{mantissa}</h5>
                </div>
            </div>
            <div className="row align-items-center text-center" style={{margin:"auto"}}>
                <div className="col-2">
                    <h5>Encoded as:</h5>
                </div>
                <div className="col-2">
                    <h5>{sign}</h5>
                </div>
                <div className="col-3">
                    <h5>{127+Number(exponent.slice(2))}</h5>
                </div>
                <div className="col-5">
                    <h5>{mantissa}</h5>
                </div>
            </div>
            <div className="row align-items-center text-center" style={{margin:"auto"}}>
                <div className="col-2 text-left">
                    <h5>Binary:</h5>
                </div>
                <div className="col-2">
                    <h5>{sign}</h5>
                </div>
                <div className="col-3">
                    <h5><BlockMath math={exponent}/></h5>
                </div>
                <div className="col-5">
                    <h5>{mantissa}</h5>
                </div>
            </div>
        </div>

    </div>
  );
};

export default ResultDisplay;
