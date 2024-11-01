import React from 'react';
import './BaseToDecimal.css';

function findDecimalValue(number, base) {
    const strVal = number.toString();
    let [integerPart, fractionPart = ""] = strVal.split('.');
    integerPart = integerPart.split('').reverse();
    fractionPart = fractionPart.split('');
    let decimalValue = 0;
    for (let i = 0; i < integerPart.length; i++) {
        decimalValue += parseInt(integerPart[i]) * Math.pow(base, i);
    }
    for (let i = 0; i < fractionPart.length; i++) {
        decimalValue += parseInt(fractionPart[i]) * Math.pow(base, -(i + 1));
    }
    return decimalValue;

}

const BaseToDecimal = ({ number, base, setDecimalValue }) => {
    const decimalValue = findDecimalValue(number, base);
    let noFracFlag=0;
    setDecimalValue(decimalValue);
    const strVal=number.toString()
    let [integerPart, fractionPart=""] = strVal.split('.');
    integerPart=integerPart.split('')
    fractionPart=fractionPart.split('')
    if(fractionPart.length===0){
        noFracFlag=1;
    }
    console.log("Hii",integerPart,fractionPart,base, decimalValue)
    return (
        <div className="container mt-4">
            <h3 className="text-center mb-5">Base-{base} to Base-10(Decimal) Conversion</h3>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <div className="conversion-container mb-2">
                        <div className="conversion-row d-flex align-items-center">
                            <div className="scrollable-row d-flex align-items-center mx-2">
                                {integerPart.map((digit, index) => (
                                    <div key={index} className="box mx-1">
                                        <span className="digit-top">{digit}</span>
                                    </div>
                                ))}
                                {noFracFlag===1?null:<span className="dot mx-2">.</span>}
                                {fractionPart.map((digit, index) => (
                                    <div key={index} className="box mx-1">
                                        <span className="digit-top">{digit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Multiplication Symbol */}
                    <div className="symbol text-center mx-auto mb-2">×</div>

                    {/* Bottom Row: Powers of Base */}
                    <div className="conversion-container">
                        <div className="conversion-row d-flex align-items-center">
                            <div className="scrollable-row d-flex align-items-center mx-2">
                                {integerPart.map((_, index) => (
                                    <div key={index} className="box mx-1">
                                        <span className="digit-bottom">{`${base}^${integerPart.length - index - 1}`}</span>
                                    </div>
                                ))}
                                {noFracFlag===1?null:<span className="dot mx-2">.</span>}
                                {fractionPart.map((_, index) => (
                                    <div key={index} className="box mx-1">
                                        <span className="digit-bottom">{`${base}^-${index + 1}`}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-auto d-flex align-items-center'>
                    <div className="symbol mx-2">=</div>
                    <div className="result-box mx-2">
                        <span className="result">{decimalValue}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaseToDecimal;


