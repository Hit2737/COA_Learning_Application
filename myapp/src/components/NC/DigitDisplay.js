import React from 'react';


const CircleDigitsDisplay = ({ number,decimalVal, backcolor,color, toBase }) => {
    const renderDigits = () => {
        return number.split('').map((digit, index) => (
            <span key={index} className="remainder-circle mx-1" style={{backgroundColor:backcolor ,color:color}}>
                {digit}
            </span>
        ));
    };

    return (
        <div className="result-box">
            <h4 className="mt-1">Base-10({decimalVal}) ➔ </h4>
            <h4 className="mt-1">Base-{toBase}( </h4>{renderDigits()}<h4 className="mt-1">)</h4>
        </div>
    );
};

// Custom styles for the circles
const styles = `
.result-box{
display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    border: 2px solid #4CAF50;
    border-radius: 8px;
    background-color: #fff;
    color: #333;
    font-weight: bold;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
}
.remainder-circle:hover {
    transform: scale(1.1);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}
`;

// Adding the CSS to document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default CircleDigitsDisplay;
