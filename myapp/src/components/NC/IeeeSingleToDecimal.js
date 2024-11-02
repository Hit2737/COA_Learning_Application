// src/components/IeeeSingleToDecimal.js
import React, { useState } from "react";
import "./ConverterStyles.css";

function IeeeSingleToDecimal() {
    const [ieeeBinary, setIeeeBinary] = useState("");
    const [decimalValue, setDecimalValue] = useState(null);

    const handleInputChange = (e) => {
        setIeeeBinary(e.target.value);
    };

    const convertToDecimal = () => {
        if (ieeeBinary.length !== 32) {
            alert("Please enter a 32-bit binary number.");
            return;
        }
        // Conversion logic here
    };

    return (
        <div className="ieee-container">
            <h1>IEEE 754 Single Precision to Decimal</h1>
            {/* UI for displaying steps */}
        </div>
    );
}

export default IeeeSingleToDecimal;
