// src/components/IeeeSinglePrecision.js
import React, { useState } from "react";
import "./DecimalToIeeeSingle.css";

function IeeeSinglePrecision() {
    const [number, setNumber] = useState(50.1);
    const [conversionSteps, setConversionSteps] = useState({});

    const handleChange = (e) => {
        const value = e.target.value === "" ? "" : parseFloat(e.target.value);
        if (value === "" || !isNaN(value)) {
            setNumber(value);
            setConversionSteps(value !== "" ? convertToIEEE754(value) : {});
        }
    };

    const roundTo = (value, decimals) => {
        return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    };

    const convertToIEEE754 = (number) => {
        const steps = {};
        
        // Handle special cases
        if (number === 0) {
            steps.ieeeBinary = "0".repeat(32); // IEEE representation of zero
            steps.note = "The IEEE 754 representation for zero has all bits set to zero.";
            return steps;
        }

        if (!isFinite(number)) {
            steps.ieeeBinary = number > 0 ? "01111111100000000000000000000000" : "11111111100000000000000000000000";
            steps.note = number > 0
                ? "The IEEE 754 representation for positive infinity has the sign bit as 0, exponent as 255, and all mantissa bits as zero."
                : "The IEEE 754 representation for negative infinity has the sign bit as 1, exponent as 255, and all mantissa bits as zero.";
            return steps;
        }

        if (isNaN(number)) {
            steps.ieeeBinary = "01111111110000000000000000000000";
            steps.note = "The IEEE 754 representation for NaN (Not a Number) has an exponent of 255 and a non-zero mantissa.";
            return steps;
        }

        const sign = number < 0 ? 1 : 0;
        steps.sign = sign;

        if (number < 0) number = -number;

        // Step-by-step normalization
        let tempPower = number;
        let exponent = 0;
        steps.normalizationSteps = [];

        // Normalize: bring number down to between 1 and 2
        while (tempPower >= 2) {
            steps.normalizationSteps.push(`Divide by 2: ${tempPower} ➔ ${tempPower / 2}`);
            tempPower /= 2;
            exponent++;
        }

        // Normalize: bring number up to between 1 and 2
        while (tempPower < 1) {
            steps.normalizationSteps.push(`Multiply by 2: ${tempPower} ➔ ${tempPower * 2}`);
            tempPower *= 2;
            exponent--;
        }

        // Round the normalized number to prevent floating-point errors
        steps.normalizedNumber = roundTo(tempPower, 6);
        steps.unbiasedExponent = exponent;

        // Calculate biased exponent
        const biasedExponent = exponent + 127;
        steps.biasedExponent = biasedExponent;
        steps.exponentBinary = biasedExponent.toString(2).padStart(8, "0");

        // Calculate mantissa, rounded to avoid floating-point issues
        const mantissa = steps.normalizedNumber - 1;
        steps.mantissa = roundTo(mantissa, 6);

        // Convert mantissa to binary representation
        let mantissaBinary = steps.mantissa.toString(2).split(".")[1] || "";
        mantissaBinary = mantissaBinary.padEnd(23, "0").slice(0, 23);
        steps.mantissaBinary = mantissaBinary;

        // Combine for final IEEE 754 binary representation
        steps.ieeeBinary = `${sign}${steps.exponentBinary}${mantissaBinary}`;

        return steps;
    };

    return (
        <div className="ieee-container">
            <h1>IEEE 754 Single Precision Converter</h1>
            <div>
                <label>Enter a number: </label>
                <input
                    type="number"
                    value={number}
                    onChange={handleChange}
                    step="any"
                    className="number-input"
                    placeholder="Enter a decimal number"
                />
                <p className="range-note">
                    Note: IEEE 754 single-precision can represent numbers approximately in the range ±3.4 × 10^38.
                </p>
            </div>

            {conversionSteps.note && (
                <div className="special-case-note">
                    <h2>Special Case:</h2>
                    <p>{conversionSteps.note}</p>
                    <p><strong>Binary:</strong> <span className="highlight final">{conversionSteps.ieeeBinary}</span></p>
                </div>
            )}

            {!conversionSteps.note && (
                <>
                    <div className="conversion-step">
                        <h2>Step 1: Sign Bit ➔</h2>
                        <p>The sign bit is determined by the sign of the number:</p>
                        <p><strong>Sign Bit:</strong> <span className="highlight">{conversionSteps.sign}</span></p>
                    </div>

                    <div className="arrow">↓</div>

                    <div className="conversion-step">
                        <h2>Step 2: Normalization ➔</h2>
                        <p>Transform the number to fall between 1 and 2:</p>
                        <ul>
                            {conversionSteps.normalizationSteps && conversionSteps.normalizationSteps.map((step, index) => (
                                <li key={index} className="normalization-step">{step}</li>
                            ))}
                        </ul>
                        <p><strong>Normalized Number:</strong> <span className="highlight">{conversionSteps.normalizedNumber}</span></p>
                        <p>Unbiased Exponent: <strong>{conversionSteps.unbiasedExponent}</strong></p>
                    </div>

                    <div className="arrow">↓</div>

                    <div className="conversion-step">
                        <h2>Step 3: Exponent ➔</h2>
                        <p>Bias the exponent by adding 127 to fit into the IEEE 754 format.</p>
                        <p><strong>Biased Exponent:</strong> <span className="highlight">{conversionSteps.biasedExponent}</span></p>
                        <p><strong>Exponent Bits:</strong> <span className="highlight">{conversionSteps.exponentBinary}</span></p>
                    </div>

                    <div className="arrow">↓</div>

                    <div className="conversion-step">
                        <h2>Step 4: Mantissa ➔</h2>
                        <p>Fractional part after normalization (rounded to avoid floating-point errors):</p>
                        <p><strong>Mantissa (Decimal):</strong> <span className="highlight">{conversionSteps.mantissa}</span></p>
                        <p><strong>Mantissa Bits:</strong> <span className="highlight">{conversionSteps.mantissaBinary}</span></p>
                    </div>

                    <div className="arrow">↓</div>

                    <div className="conversion-result">
                        <h2>Final IEEE 754 Representation</h2>
                        <p>The final IEEE 754 representation combines the sign bit, exponent bits, and mantissa bits:</p>
                        <p><strong>Binary:</strong> <span className="highlight final">{conversionSteps.ieeeBinary}</span></p>
                    </div>
                </>
            )}
        </div>
    );
}

export default IeeeSinglePrecision;
