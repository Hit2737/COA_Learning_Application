import React from 'react'
import SelectItem from './NC/select'
// import { convertBase } from './NC/conversions'
// import {DisplayResult} from './NC/displayResult'
import { useState } from 'react'


export default function NumberConvertor({ mode }) {
    const [number, setNumber] = useState("Enter valid number to convert");
    const [fromBase, setFromBase] = useState(10);
    const [toBase, setToBase] = useState(2);
    function handleNumber(e) {
        setNumber(e.target.value)
    }
    function evaluate() {

        convertBase(number, fromBase, toBase)
    }

    console.log(number, fromBase, toBase)
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className='col'>
                        <SelectItem id="converFrom" setBase={setFromBase} base={fromBase} />
                    </div>
                    <div className='col'>
                        <input type="text" id="from" className="form-control" aria-label="Text input with dropdown button" placeholder="Enter valid number to convert to" onChange={handleNumber}></input>
                    </div>
                    <div className='col'>
                        <SelectItem id="converTo" setBase={setToBase} base={toBase} />
                    </div>
                    <div className='col'>
                        <input type="text" id="to" className="form-control" aria-label="Text input with dropdown button" placeholder='Result'></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col-2">
                        <button type="button" className="btn btn-primary" onClick={evaluate} >Convert</button>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <h2>Conversion Steps</h2>
                <div className="form-group">
                    <label htmlFor="conversionSteps">Steps of Conversion:</label>
                    {/* <DisplayResult number /> */}
                </div>
            </div>
        </>)
}
