// src/components/IeeeSinglePrecision.js
import React, { useState } from "react";
import "./DecimalToIeeeSingle.css";

function DecimalToIeeeSingle({number, steps}) {
    
    return (
        <div className="ieee-container">

            {steps.note && (
                <div className="special-case-note">
                    <h2>Special Case:</h2>
                    <p>{steps.note}</p>
                    <p><strong>Binary:</strong> <span className="highlight final">{steps.ieeeBinary}</span></p>
                </div>
            )}

            {!steps.note && (
                <>
                    <div className="conversion-step">
                        <h2>Step 1: Sign Bit ➔</h2>
                        <p>The sign bit is determined by the sign of the number:</p>
                        <p><strong>Sign Bit:</strong> <span className="highlight">{steps.sign}</span></p>
                    </div>

                    <div className="arrow">↓</div>

                    <div className="conversion-step">
                        <h2>Step 2: Normalization ➔</h2>
                        <p>Transform the number to fall between 1 and 2:</p>
                        <ul>
                            {steps.normalizationSteps && steps.normalizationSteps.map((step, index) => (
                                <li key={index} className="normalization-step">{step}</li>
                            ))}
                        </ul>
                        <p><strong>Normalized Number:</strong> <span className="highlight">{steps.normalizedNumber}</span></p>
                        <p>Unbiased Exponent: <strong>{steps.unbiasedExponent}</strong></p>
                    </div>

                    <div className="arrow">↓</div>

                    <div className="conversion-step">
                        <h2>Step 3: Exponent ➔</h2>
                        <p>Bias the exponent by adding 127 to fit into the IEEE 754 format.</p>
                        <p><strong>Biased Exponent:</strong> <span className="highlight">{steps.biasedExponent}</span></p>
                        <p><strong>Exponent Bits:</strong> <span className="highlight">{steps.exponentBinary}</span></p>
                    </div>

                    <div className="arrow">↓</div>

                    <div className="conversion-step">
                        <h2>Step 4: Mantissa ➔</h2>
                        <p>Fractional part after normalization (rounded to avoid floating-point errors):</p>
                        <p><strong>Mantissa (Decimal):</strong> <span className="highlight">{steps.mantissa}</span></p>
                        <p><strong>Mantissa Bits:</strong> <span className="highlight">{steps.mantissaBinary}</span></p>
                    </div>

                    <div className="arrow">↓</div>

                    <div className="conversion-result">
                        <h2>Final IEEE 754 Representation</h2>
                        <p>The final IEEE 754 representation combines the sign bit, exponent bits, and mantissa bits:</p>
                        <p><strong>Binary:</strong> <span className="highlight final">{steps.ieeeBinary}</span></p>
                    </div>
                </>
            )}
        </div>
    );
}

export default DecimalToIeeeSingle;
