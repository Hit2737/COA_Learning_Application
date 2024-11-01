import React from 'react'
import { convertBase,isValidInput } from './conversions'
import BaseToDecimal from './BaseToDecimal'
import DecimalToBaseConverter from './DecimalToBaseConverter'
import FractionToBase from './FractionalToBase'
import ConversionFlowChart from './ConversionFlowChart'
import CircleDigitsDisplay from './DigitDisplay'
import { useState } from 'react'

export function DisplayResult({ number, fromBase, toBase }) {
    const [decimalValue, setDecimalValue] = useState(0);
    const [outputIntVal, setOutputIntVal] = useState("");
    const [outputFracVal, setOutputFracVal] = useState("");
    console.log("DisplayResult",number.toString(), fromBase, toBase)

    if(!isValidInput(number,fromBase)){
        return <div className="alert alert-danger">Invalid Input</div>
    }
    if(fromBase===10){
        setDecimalValue(number)
    }
    const result = convertBase(number.toString(), fromBase, toBase);
    console.log("Result aa gaya guys",result)
    return (
        <div className="border p-2 mb-5" style={{ minHeight: '500px',  overfowX:"auto" ,borderRadius:"12px", width:"90%", margin:"auto"}}>
            <h2 className="text-center">Conversion Steps</h2>
            <ConversionFlowChart fromBase={2} toBase={16} number="101.101" />
            Hello Guysasrgargrgagteha 
            {fromBase===10?null:<BaseToDecimal 
                base={fromBase}
                number={number}
                setDecimalValue={setDecimalValue}
            />}
            <div className="container mt-5 mb-3 py-5" style={{border: '2px solid #4CAF50' ,borderRadius: '8px',textAlign:"center"}}>
                <h3 className="text-center mt-2 mb-2">Base-10(Decimal) to Base-{toBase} conversion</h3>
                <p className="text-center">We convert the integer part and fraction part of the decimal seperately</p>
                <div className="row mb-3">
                    <div className="col-6">
                        <DecimalToBaseConverter decimalValue={decimalValue} base={toBase} setOutputIntVal={setOutputIntVal}/>
                    </div>
                    <div className="col-6">
                        <FractionToBase base={toBase} decimalValue={decimalValue} setOutputFracVal={setOutputFracVal}/>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-6">
                        <CircleDigitsDisplay text="Base to Integer" number={outputIntVal} decimalVal={Math.floor(decimalValue)} toBase={toBase}/>
                    </div>
                    <div className="col-6">
                        <CircleDigitsDisplay text="ddd" number={outputFracVal} backcolor="#ffd966" color="black" decimalVal={decimalValue-Math.floor(decimalValue)} toBase={toBase}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
