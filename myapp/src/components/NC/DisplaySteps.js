import BaseToDecimal from './B to D Conversion/BaseToDecimal'
import DecimalToBase from './D to B Conversion/DecimalToBase'
import ShowResult from './ShowResult'


export function isValidInput(input, base) {
    const validChars = "0123456789ABCDEF".slice(0, base);
    const regex = new RegExp(`^[${validChars}]+(\\.[${validChars}]+)?$`, "i");
    return regex.test(input);
}

// number-->string of the number(string)
// fromBase-->base of the number(int)
// toBase-->base to convert to(int)
export function DisplaySteps({ number, fromBase, toBase,decimalValue, setDecimalValue, outputIntVal, setOutputIntVal, outputFracVal, setOutputFracVal}) {

    if(!isValidInput(number,fromBase)){
        return <div className="alert alert-danger">Invalid Input</div>
    }
    
    return (
        <div className="border p-2 mb-5" style={{ minHeight: '500px',  overfowX:"auto" ,borderRadius:"12px", width:"90%", margin:"auto"}}>
            {(fromBase===10)?null:(<BaseToDecimal 
                base={fromBase}
                number={number}
                setDecimalValue={setDecimalValue}
            />)}
            {(toBase===10)?null:(<DecimalToBase 
                decimalValue={(fromBase===10)?number:decimalValue} 
                toBase={toBase} 
                setOutputIntVal={setOutputIntVal}
                setOutputFracVal={setOutputFracVal}
            />)}
            <div className="container text-center">
                <ShowResult number={number} fromBase={fromBase} toBase={toBase} decimalValue={decimalValue} outputInt={outputIntVal} outputFrac={outputFracVal} />
            </div>
        </div>
    );
}
