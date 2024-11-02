import React from "react";


function IeeeSinglePrecision({ number }) {
    const sign = number < 0 ? 1 : 0;
    const strVal = number.toString();
    let [integerPart, fractionPart = ""] = strVal.split(".");
    integerPart = integerPart.split("");
    fractionPart = fractionPart.split("");

    let temp_power = 0;

    for (let i = 0; i < integerPart.length; i++) {
        temp_power += parseInt(integerPart[i]) * Math.pow(2, i);
    }

    for (let i = 0; i < fractionPart.length; i++) {
        temp_power += parseInt(fractionPart[i]) * Math.pow(2, -(i + 1));
    }

    const exponent = Math.floor(Math.log2(temp_power));
    const mantissa = temp_power / Math.pow(2, exponent);
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

    const ieeeSinglePrecision = sign + exponentBinary + mantissaBinary;

    return (
        <div className="container mt-4">
        <h3 className="text-center mb-5">IEEE-754 Single Precision</h3>
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
                    {fractionPart.length === 0 ? null : (
                    <span className="dot mx-2">.</span>
                    )}
                    {fractionPart.map((digit, index) => (
                    <div key={index} className="box mx-1">
                        <span className="digit-top">{digit}</span>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            <div className="symbol text-center mx-auto mb-2">×</div>
            <div className="conversion-container">
                <div className="conversion-row d-flex align-items-center">
                <div className="scrollable-row d-flex align-items-center mx-2">
                    <div className="box mx-1">
                    <span className="digit-top">{sign}</span>
                    </div>
                    {exponentBinary.split("").map((digit, index) => (
                    <div key={index} className="box mx-1">
                        <span className="digit-top">{digit}</span>
                    </div>
                    ))}
                    {mantissaBinary.split("").map((digit, index) => (
                    <div key={index} className="box mx-1">
                        <span className="digit-top">{digit}</span>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default IeeeSinglePrecision;
