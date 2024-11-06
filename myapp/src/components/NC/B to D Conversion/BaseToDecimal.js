import React from 'react';
import './BaseToDecimal.css';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
//number-->string of the number(string)
//base-->base of the number(int)
//return-->decimal value of the number(int/float)
function findDecimalValue(number, base) {
    const strVal = number.toString().toUpperCase();
    let [integerPart, fractionPart = ""] = strVal.split('.');
    integerPart = integerPart.split('').reverse();
    fractionPart = fractionPart.split('');
    let decimalValue = 0;

    // Helper function to get numeric value for each character
    const getValue = (char) => {
        if (/[0-9]/.test(char)) {
            return parseInt(char); // For digits 0-9
        } else if (/[A-Z]/.test(char)) {
            return char.charCodeAt(0) - 'A'.charCodeAt(0) + 10; // For letters A-Z
        } else {
            throw new Error("Invalid character in number");
        }
    };
    for (let i = 0; i < integerPart.length; i++) {
        decimalValue += getValue(integerPart[i]) * Math.pow(base, i);
    }
    for (let i = 0; i < fractionPart.length; i++) {
        decimalValue += getValue(fractionPart[i]) * Math.pow(base, -(i + 1));
    }
    return decimalValue;
}


const BaseToDecimal = ({ number, base, setDecimalValue, mode }) => {
    const decimalValue = findDecimalValue(number, base);
    let noFracFlag=0;
    setDecimalValue(decimalValue.toString());
    const strVal=number.toString()
    let [integerPart, fractionPart=""] = strVal.split('.');
    integerPart=integerPart.split('')
    fractionPart=fractionPart.split('')
    if(fractionPart.length===0){
        noFracFlag=1;
    }
    return (
        <div className="nc-container p-3 mb-5" style={{border: '2px solid' ,borderRadius: '8px',textAlign:"center",background:(mode==="dark")?"#4a4e69":"#F5F5F5"}}>
            <h4 className="text-center">Base-{base} to Decimal Conversion</h4>
            <div className="row justify-content-center py-3">
                <div className="col-auto">
                    <div className="b2d-conversion-container">
                        <div className="b2d-conversion-row d-flex align-items-center">
                            <div className="scrollable-row d-flex align-items-center">
                                {integerPart.map((digit, index) => (
                                    <div key={index} className="box mx-2 my-1">
                                        <span className="digit-top">{digit}</span>
                                    </div>
                                ))}
                                {noFracFlag===1?null:<span className="dot mx-2">.</span>}
                                {fractionPart.map((digit, index) => (
                                    <div key={index} className="box mx-2 my-1">
                                        <span className="digit-top">{digit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Multiplication Symbol */}
                    <div className="symbol text-center ">×</div>

                    {/* Bottom Row: Powers of Base */}
                    <div className="b2d-conversion-container">
                        <div className="b2d-conversion-row d-flex align-items-center" >
                            <div className="scrollable-row d-flex align-items-center" >
                                {integerPart.map((_, index) => (
                                    <div key={index} className="box mx-2 my-1">
                                        <span className="digit-bottom my-3"><BlockMath math={`${base}^{${integerPart.length - index - 1}}`}/></span>
                                    </div>
                                ))}
                                {noFracFlag===1?null:<span className="dot mx-2">.</span>}
                                {fractionPart.map((_, index) => (
                                    <div key={index} className="box mx-2 my-1">
                                        <span className="digit-bottom my-3"><BlockMath math={`${base}^{-${index + 1}}`} /> </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-auto d-flex align-items-center'>
                    <div className="symbol mx-2">=</div>
                    <div className="result-box mx-2" style={{backgroundColor:"white" ,color:"black"}}>
                        <span className="result">{decimalValue}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaseToDecimal;