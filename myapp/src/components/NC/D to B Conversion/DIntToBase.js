import "./DIntToBase.css";


//decimalValue-->decimal value of the number(string)
//base-->base to convert to(int)
function DIntToBase({mode, decimalValue, base ,setOutputIntVal}) {
    const formatRemainder = (remainder) => {
        const baseDigit = remainder >= 10 ? String.fromCharCode(55 + remainder) : remainder; // A=10, B=11, etc.
        return `${baseDigit}`;
    };
    let rem="";
    const getConversionSteps = () => {
        let number = Math.floor(parseFloat(decimalValue));
        const steps = [];
        let bit = 0;

        while (number > 0) {
            const quotient = Math.floor(number / base);
            const remainder = number % base;
            steps.push({
                division: `(${number})÷${base}`,
                quotient: quotient,
                remainder: remainder,
                actualRem: formatRemainder(remainder),
                bit: bit
            });
            rem+=formatRemainder(remainder);
            number = quotient;
            bit++;
        }
        if(number===0 && steps.length===0){
            setOutputIntVal("0");
            steps.push({
                division: `(0)÷${base}`,
                quotient: 0,
                remainder: 0,
                actualRem: 0,
                bit: 0
            })
            setOutputIntVal("0");
        }else{
            setOutputIntVal(rem.split('').reverse().join(''));
        }
        return steps;
    };

    const conversionSteps = getConversionSteps();

    return (
        <div className='container nc-container align-items-center'>
            <p className="text-center" style={{fontSize:"0.8em"}}>The Integer value is {Math.floor(decimalValue)}</p>
            <p className="text-center" style={{fontSize:"0.8em"}}>Divide the integer value by {base} untill Quotient becomes 0.</p>
            <div className="d-flex dTob">
                <table className="d2b-conversion-table">
                    <thead style={{backgroundColor:mode==="dark"?"#4c5473":"silver"}}>
                        <tr>
                            <th>Division by {base}</th>
                            <th>Quotient</th>
                            <th></th>
                            <th>Remainder (Digit)</th>
                            <th>Bit #</th>
                        </tr>
                    </thead>
                    <tbody>
                        {conversionSteps.map((step, index) => (
                            <tr key={index}>
                                <td>{step.division}</td>
                                <td>{step.quotient}</td>
                                <td>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                    </svg>
                                </td>
                                <td className="remainder">
                                    <span>{step.remainder} ➔ <span className="remainder-circle">{step.actualRem}</span></span>
                                </td>
                                <td>
                                    {step.bit}
                                    {step.bit === 0 ? (step.quotient === 0 ? null : "(LSB)") : step.quotient === 0 ? "(MSB)" : null}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        
        </div>
    );
}

export default DIntToBase;
