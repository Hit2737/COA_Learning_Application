// src/components/DecimalToIeeeDouble.js
import React, { useState } from "react";
import "./ConverterStyles.css";

function DecimalToIeeeDouble() {
    const [number, setNumber] = useState("");
    const [conversionSteps, setConversionSteps] = useState({});

    const handleChange = (e) => {
        const value = e.target.value === "" ? "" : parseFloat(e.target.value);
        if (value === "" || !isNaN(value)) {
            setNumber(value);
            setConversionSteps(value !== "" ? convertToIEEE754Double(value) : {});
        }
    };

    const convertToIEEE754Double = (num) => {
        // Conversion logic for double precision
    };

    return (
        <div className="ieee-container">
            <h1>Decimal to IEEE 754 Double Precision</h1>
            {/* Display steps */}
        </div>
    );
}

export default DecimalToIeeeDouble;
