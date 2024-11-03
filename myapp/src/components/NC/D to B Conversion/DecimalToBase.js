import DIntToBase from './DIntToBase'
import DFracToBase from './DFracToBase'

//Converts the decimal part of the number to the given base
//toBase-->base to convert to(int)
//decimalValue-->decimal value of the number(string)
//number-->string of the number(string)
//fromBase-->base of the number(int)
export default function DecimalToBase({toBase, decimalValue, setOutputIntVal,setOutputFracVal}) {
    // We divide the fraction and integer part of the decimal.
    return (<div className="container mt-5 mb-3 py-5" style={{border: '2px solid #4CAF50' ,borderRadius: '8px',textAlign:"center"}}>
        <h3 className="text-center mt-2 mb-2">Base-10(Decimal) to Base-{toBase} conversion</h3>
        <p className="text-center">We convert the integer part and fraction part of the decimal seperately</p>
        <div className="row mb-3">
            <div className="col-6">
                <DIntToBase decimalValue={decimalValue} base={toBase} setOutputIntVal={setOutputIntVal}/>
            </div>
            <div className="col-6">
                <DFracToBase base={toBase} decimalValue={decimalValue} setOutputFracVal={setOutputFracVal}/>
            </div>
        </div>
    </div>)
}