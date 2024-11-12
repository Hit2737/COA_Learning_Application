import React from 'react';
import './BaseToDecimal.css';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import TooltipExample from './TooltipExample';

const BaseToDecimal = ({ number, base, decimalValue, mode }) => {
    let noFracFlag = 0;
    const strVal = number.toString()
    let [integerPart, fractionPart = ""] = strVal.split('.');
    integerPart = integerPart.split('')
    fractionPart = fractionPart.split('')
    if (fractionPart.length === 0) {
        noFracFlag = 1;
    }
    return (
        <div className="nc-container p-3 mb-5" style={{ borderRadius: '8px', textAlign: "center", background: (mode === "dark") ? "rgb(55 61 83)" : "#F5F5F5" }}>
            <h4 className="text-center">Base-{base} to Decimal Conversion  <span><TooltipExample base={base} result={decimalValue} number={number} /></span></h4>
            <div className="row justify-content-center py-3">
                <div className="col-auto">
                    <div className="b2d-conversion-row d-flex align-items-center">
                        <div className="scrollable-row d-flex align-items-center">
                            {integerPart.map((digit, index) => (
                                <div key={index} className="box mx-2 my-1">
                                    <span className="digit-top" style={{width: '100px'}}>{digit}</span>
                                </div>
                            ))}
                            {noFracFlag === 1 ? null : <span className="dot mx-2">.</span>}
                            {fractionPart.map((digit, index) => (
                                <div key={index} className="box mx-2 my-1">
                                    <span className="digit-top">{digit}</span>
                                </div>
                            ))}
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
                                        <span className="digit-bottom my-3"><BlockMath math={`${base}^{${integerPart.length - index - 1}}`} /></span>
                                    </div>
                                ))}
                                {noFracFlag === 1 ? null : <span className="dot mx-2">.</span>}
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
                    <div className="result-box mx-2" style={{ backgroundColor: "white", color: "black" }}>
                        <span className="result">{decimalValue}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaseToDecimal;