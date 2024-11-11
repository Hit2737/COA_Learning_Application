import BaseToDecimal from './B to D Conversion/BaseToDecimal'
import DecimalToBase from './D to B Conversion/DecimalToBase'
import ShowResult from './ShowResult'
import { isValidInput } from './UtilityNC';

// number-->string of the number(string)
// fromBase-->base of the number(int)
// toBase-->base to convert to(int)
export function DisplaySteps({mode, number, fromBase, toBase,decimalValue, setDecimalValue, outputIntVal, setOutputIntVal, outputFracVal, setOutputFracVal}) {

    if(!isValidInput(number,fromBase)){
        return <div className="alert alert-danger">Invalid Input</div>
    }
    const style={ minHeight: '500px',  overflowX:"auto" ,borderRadius:"12px", margin:"auto", border: '4px solid black',color: mode === 'dark' ? 'white' : 'black',
        backgroundColor: mode === 'dark' ? 'rgb(45, 50, 69)' : 'white'}
    return (
        <div className="border p-4" style={style}>
            {(fromBase===10)?null:(<BaseToDecimal 
                base={fromBase}
                number={number}
                setDecimalValue={setDecimalValue}
                decimalValue={decimalValue}
                mode={mode}
            />)}
            {(toBase===10)?null:(<DecimalToBase 
                decimalValue={(fromBase===10)?number:decimalValue} 
                toBase={toBase} 
                setOutputIntVal={setOutputIntVal}
                setOutputFracVal={setOutputFracVal}
                mode={mode}
            />)}
            <ShowResult number={number} fromBase={fromBase} toBase={toBase} decimalValue={decimalValue} outputInt={outputIntVal} outputFrac={outputFracVal} mode={mode}/>
            
        </div>
    );
}

