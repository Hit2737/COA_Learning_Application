import React from 'react';
import './FractionalToBase.css';

function FractionalToBaseConverter({ decimalValue, base ,setOutputFracVal}) {
    let decimalFraction = decimalValue - Math.floor(decimalValue);
    console.log("FractionalToBaseConverter",decimalFraction,base);
    let frac="0.";
    const getConversionSteps = () => {
        let fraction = decimalFraction;
        const steps = [];
        let step = 1;

        while (step <= 5 && fraction > 0) {
            let multiplied = fraction * base;
            let integralPart = Math.floor(multiplied);
            steps.push({
                step,
                multiplied: multiplied.toFixed(5),
                integralPart,
                fraction: fraction.toFixed(5)
            });
            frac+=integralPart.toString(base).toUpperCase();
            fraction = multiplied - integralPart;
            step++;
        }
        setOutputFracVal(frac);
        return steps;
    };

    const conversionSteps = getConversionSteps();

    return (
        <div className="container">
            <p className="text-center">We evaluate the fractional part step-by-step</p>
            <div className="conversion-container d-flex justify-content-center">
                <table className="conversion-table">
                    <thead>
                        <tr>
                            <th>Step</th>
                            <th>Multiplication</th>
                            <th></th>
                            <th>Integral Part</th>
                            <th>Fraction Remaining</th>
                        </tr>
                    </thead>
                    <tbody>
                        {conversionSteps.map((step, index) => (
                            <tr key={index}>
                                <td>{step.step}</td>
                                <td>{`${step.fraction} × ${base} = ${step.multiplied}`}</td>
                                <td>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="bi bi-arrow-right"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                                        />
                                    </svg>
                                </td>
                                <td className="integral-column">
                                    <span>{step.integralPart} ➔ </span>
                                    <span className="remainder-circle" style={{ color:"black", backgroundColor:"#ffd966"}}>
                                        {step.integralPart.toString(base).toUpperCase()}
                                    </span>
                                </td>
                                <td>{(step.multiplied - Math.floor(step.multiplied)).toFixed(5)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FractionalToBaseConverter;
