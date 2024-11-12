import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import DToSingle from './DToSingle';
import DToDouble from './DToDouble';
function binaryToDecimal(binaryStr) {
    let [integerPart, fractionalPart] = binaryStr.split('.');
    let decimalInteger = parseInt(integerPart, 2);
    let decimalFraction = 0;
    if (fractionalPart) {
        for (let i = 0; i < fractionalPart.length; i++) {
            decimalFraction += parseInt(fractionalPart[i]) * Math.pow(2, -(i + 1));
        }
    }

    let decimalResult = decimalInteger + decimalFraction;
    return decimalResult;
}
export default function ResultDisplay({number,setNumber,setSteps,steps,fpType,placeholder,setPlaceholder}) {
    const signBit = (steps.sign===0)? 1:-1;
    const exponent = 2**parseInt(steps.unbiasedExponent);
    const normalisedNumber = 1+binaryToDecimal("0."+steps.mantissaBinary);
    const actualValueStored=signBit*exponent*normalisedNumber;
    // round of the error to 10 decimal places
    const error=actualValueStored-parseFloat(number);
    const isSpecial = (placeholder==="Enter a number") || (number===0) ? 0 : 1;

    function handleNumberChange(e){
        setNumber(e.target.value);
        if(e.target.value==="0"){
            setPlaceholder("Zero number")
        }else{
            setPlaceholder("Enter a number");
        }
        
        if(e.target.value === ""){
            setSteps({ieeeBinary:""});
        }
        else{
            if(fpType==="FP32"){
                setSteps(DToSingle(parseFloat(e.target.value)));
            }
            else{
                setSteps(DToDouble(parseFloat(e.target.value)));
            }
        }
    }
    function handleClick(e){
        setNumber("");
        if(fpType==="FP32"){
            if(e.target.id==="inf"){
                setPlaceholder("Infinity");
                setSteps(DToSingle(Infinity));
            }
            else if(e.target.id==="-inf"){
                setPlaceholder("-Infinity");
                setSteps(DToSingle(-Infinity));
            }
            else{
                setPlaceholder("NaN");
                setSteps(DToSingle(NaN));
            }
        }
        else{
            if(e.target.id==="inf"){
                setPlaceholder("Infinity");
                setSteps(DToDouble(Infinity));
            }
            else if(e.target.id==="-inf"){
                setPlaceholder("-Infinity");
                setSteps(DToDouble(-Infinity));
            }
            else{
                setPlaceholder("NaN");
                setSteps(DToDouble(NaN));
            }
        }
        return;
    }
    const style={
        width:"20%",
        backgroundColor:"silver"
    }
    return (
    <div className="container p-2" style={{fontSize:"0.6em"}}>
        <h5>Floating Point Representation</h5>
        <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" style={style}>Decimal Input</span>
            <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={handleNumberChange} value={number} placeholder={placeholder}/>
            <button className="btn btn-light" id="inf" onClick={handleClick} style={{backgroundColor:"silver",width:"10%"}}>+Infinity</button>
            <button className="btn btn-light" id="-inf" onClick={handleClick} style={{backgroundColor:"silver",width:"10%"}}>-Infinity</button>
            <button className="btn btn-light" id="NaN" onClick={handleClick} style={{backgroundColor:"silver",width:"10%"}}>NaN</button>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" style={style}>Decimal Stored</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={!isSpecial && (number!=="") ? actualValueStored:""} disabled/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" style={style}>Error due to Conversion</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={!isSpecial && (number!=="")? error:""} disabled/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" style={style}>Binary Representation</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value={steps.ieeeBinary} disabled/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm" style={style}>Hex Representation</span>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"  value={isNaN("0x"+parseInt(steps.ieeeBinary,2).toString(16))?"":"0x"+parseInt(steps.ieeeBinary,2).toString(16)} disabled/>
        </div>
        <div className="container p-3" style={{fontSize:"0.7em"}}>
            <div className="row align-items-center text-center" style={{margin:"auto"}}>
                <div className="col-2">
                    <h5> </h5>
                </div>
                <div className="col-2">
                    <h5>Sign</h5>
                </div>
                <div className="col-3">
                    <h5>Exponent</h5>
                </div>
                <div className="col-5">
                    <h5>Mantissa</h5>
                </div>
            </div>
            <div className="row align-items-center text-center" style={{margin:"auto"}}>
                <div className="col-2">
                    <h5>Value:</h5>
                </div>
                <div className="col-2">
                    <h5>{(number==="" || number==="0")?"-":steps.sign===0? "+1":"-1"}</h5>
                </div>
                <div className="col-3">
                    <h5>{(number==="" || number==="0")?"-":<BlockMath math={`2^{${steps.unbiasedExponent}}`}/>}</h5>
                </div>
                <div className="col-5">
                    <h5>{(number==="" || number==="0")?"-":"1 + " +steps.mantissa}</h5>
                </div>
            </div>
            <div className="row align-items-center text-center" style={{margin:"auto"}}>
                <div className="col-2">
                    <h5>Encoded as:</h5>
                </div>
                <div className="col-2">
                    <h5>{(number==="" || number==="0")?"-":steps.sign===0? "0":"1"}</h5>
                </div>
                <div className="col-3">
                    <h5>{(number==="" || number==="0")?"-":steps.biasedExponent}</h5>
                </div>
                <div className="col-5">
                    <h5>{(number==="" || number==="0")?"-":parseInt(steps.mantissaBinary,2)}</h5>
                </div>
            </div>
            <div className="row align-items-center text-center" style={{margin:"auto"}}>
                <div className="col-2 text-left">
                    <h5>Binary:</h5>
                </div>
                <div className="col-2">
                    <h5>{number==="" && !isSpecial?"-":steps.sign}</h5>
                </div>
                <div className="col-3">
                    <h5>{number==="" && !isSpecial?"-":steps.exponentBinary}</h5>
                </div>
                <div className="col-5">
                    <h5>{number==="" && !isSpecial?"-":steps.mantissaBinary}</h5>
                </div>
            </div>
        </div>

    </div>
  );
};
