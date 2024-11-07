import "./DIntToBase.css";

function DFracToBase({mode, decimalValue, base ,setOutputFracVal}) {
    let decimalFraction = decimalValue - Math.floor(decimalValue);
    let frac="";
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
        setOutputFracVal(frac);         // If no fractional part then set to "" o/w 0.325 is stored as 325
        return steps;
    };

    const conversionSteps = getConversionSteps();

    return (
        <div className="container nc-container align-items-center">
           <p className="text-center" style={{ fontSize: "0.8em" }}>
            {(decimalFraction === 0) ? "There is no fractional value" 
                : `The fractional value is ${(decimalValue - Math.floor(decimalValue)).toFixed(5)}`}
            </p>

            <div className="d-flex justify-content-center">
                <table className="d2b-conversion-table">
                    <thead style={{backgroundColor:mode==="dark"?"#4c5473":"silver"}}>
                        <tr>
                            <th>Step</th>
                            <th>Multiplication</th>
                            <th></th>
                            <th><span style={{whiteSpace:"nowrap"}}>Integer Part</span></th>
                            <th><span style={{whiteSpace:"nowrap"}}>Fraction Remaining</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {decimalFraction ===0 && (<tr><td colSpan="5">
                                <h5>No Fractional Part</h5>
                                </td>
                            </tr>)}
                        {conversionSteps.map((step, index) => (
                            <tr key={index}>
                                <td>{step.step}</td>
                                <td><span style={{whiteSpace:"nowrap"}}>{`${step.fraction} × ${base} = ${step.multiplied}`}</span></td>
                                <td>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
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

export default DFracToBase;
