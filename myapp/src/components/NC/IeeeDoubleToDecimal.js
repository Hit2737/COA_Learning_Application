// src/components/IeeeDoubleToDecimal.js
import React, { useState } from "react";
import "./ConverterStyles.css";

function IeeeDoubleToDecimal() {
    const [ieeeBinary, setIeeeBinary] = useState("");
    const [decimalValue, setDecimalValue] = useState(null);

    const handleInputChange = (e) => {
        setIeeeBinary(e.target.value);
    };

    const convertToDecimal = () => {
        if (ieeeBinary.length !== 64) {
            alert("Please enter a 64-bit binary number.");
            return;
        }
        // Conversion logic here
    };

    return (
        <div className="ieee-container">
            <h1>IEEE 754 Double Precision to Decimal</h1>
            {/* UI for displaying steps */}
        </div>
    );
}

export default IeeeDoubleToDecimal;
