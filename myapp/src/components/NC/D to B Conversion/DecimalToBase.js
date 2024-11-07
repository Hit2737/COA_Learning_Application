import DIntToBase from './DIntToBase'
import DFracToBase from './DFracToBase'

//Converts the decimal part of the number to the given base
//toBase-->base to convert to(int)
//decimalValue-->decimal value of the number(string)
//number-->string of the number(string)
//fromBase-->base of the number(int)
export default function DecimalToBase({toBase, decimalValue, setOutputIntVal,setOutputFracVal,mode}) {
    // We divide the fraction and integer part of the decimal.
    return (<div className="nc-container p-3 mb-5" style={{borderRadius: '8px',textAlign:"center", background:(mode==="dark")?"rgb(55 61 83)":"#F5F5F5"}}>
                <h4 className="text-center">Decimal to Base-{toBase} conversion</h4>
                <p className="text-center p-2" style={{fontSize:"15px"}}>We convert the integer part and fraction part of the decimal seperately.</p>
                <div className="row">
                    <div className="col-6">
                        <DIntToBase mode={mode} decimalValue={decimalValue} base={toBase} setOutputIntVal={setOutputIntVal}/>
                    </div>
                    <div className="col-6">
                        <DFracToBase mode={mode} base={toBase} decimalValue={decimalValue} setOutputFracVal={setOutputFracVal}/>
                    </div>
                </div>
            </div>)
}