import React from "react";


function IeeeSinglePrecision({ number }) {
    if (number === undefined) {
        number = 50.1;
    }
    const sign = number < 0 ? 1 : 0;

    if (number < 0) {
        number *= -1;
    }

    let temp_power = number;
    let temp_exponent = 0;

    while (temp_power >= 2) {
        temp_power /= 2;
        temp_exponent++;
    }

    while (temp_power < 1) {
        temp_power *= 2;
        temp_exponent--;
    }

    const exponent = temp_exponent;
    const mantissa = number / Math.pow(2, exponent) - 1;
    const exponentBits = exponent + 127;
    let exponentBinary = exponentBits.toString(2);

    while (exponentBinary.length < 8) {
        exponentBinary = "0" + exponentBinary;
    }

    let mantissaBinary = mantissa.toString(2).split(".");

    mantissaBinary = mantissaBinary[1];
    while (mantissaBinary.length < 23) {
        mantissaBinary += "0";
    }

    mantissaBinary = mantissaBinary.slice(0, 23);
    exponentBinary = exponentBinary.slice(0, 8);

    const ieeeSinglePrecision = sign + exponentBinary + mantissaBinary;

    return (
        <div className="ieee-container">
            <h1>IEEE 754 Single Precision Conversion</h1>
            <div className="conversion-step">
                <h2>Step 1: Sign Bit</h2>
                <p>The sign bit is determined by the sign of the number. If the number is negative, the sign bit is 1; otherwise, it is 0.</p>
                <p><strong>Example:</strong> For the number {number}, the sign bit is {sign}.</p>
                <p><strong>Sign Bit:</strong> {sign}</p>
            </div>
            <div className="conversion-step">
                <h2>Step 2: Exponent</h2>
                <p>The exponent is calculated by adjusting the power of 2 such that the number is represented as a normalized fraction between 1 and 2.</p>
                <p><strong>Example:</strong> For the number {number}, we adjust it to {temp_power} and find the exponent to be {exponent}.</p>
                <p><strong>Exponent:</strong> {exponent} (Unbiased)</p>
                <p>The exponent is then biased by adding 127 to it to fit into the IEEE 754 format.</p>
                <p><strong>Exponent Bits:</strong> {exponentBinary} (Biased by 127)</p>
            </div>
            <div className="conversion-step">
                <h2>Step 3: Mantissa</h2>
                <p>The mantissa is the fractional part of the number after adjusting the exponent. It represents the significant digits of the number.</p>
                <p><strong>Example:</strong> For the number {number}, the mantissa is calculated as {mantissa.toFixed(23)}.</p>
                <p><strong>Mantissa:</strong> {mantissa.toFixed(23)}</p>
                <p>The mantissa is then converted to binary format.</p>
                <p><strong>Mantissa Bits:</strong> {mantissaBinary}</p>
            </div>
            <div className="conversion-result">
                <h2>IEEE 754 Single Precision Representation</h2>
                <p>The final IEEE 754 single precision representation is a combination of the sign bit, exponent bits, and mantissa bits.</p>
                <p><strong>Binary:</strong> {ieeeSinglePrecision}</p>
            </div>
        </div>
    );
}

export default IeeeSinglePrecision;