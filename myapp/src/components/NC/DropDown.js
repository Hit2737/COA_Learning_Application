// import React, {useState} from 'react'
import { isValidInput } from './DisplaySteps';
const DropDown = ({ id, setBase, base , setValidInput, number , setDecimalValue, setShowSteps,setResult}) => {
    const val = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const names = [
        "2 (Binary)", "3 (Ternary)", "4 (Quaternary)", "5 (Quinary)", 
        "6", "7", "8 (Octal)", "9", "10 (Decimal)", 
        "11", "12", "13", "14", "15", "16 (Hexadecimal)"
    ];
    const handleChange = (e) => {
        setBase(Number(e.target.value));
        setShowSteps(false);
        setResult("");
        if(e.target.value==="10" && id==="convertFrom"){
            setDecimalValue(number);
        }
        if(id==="convertFrom"){
            setValidInput(isValidInput(number,e.target.value));
        }

    };

    return (
        <select
            id={id}
            className="form-select"
            aria-label="Default select example"
            value={base}
            onChange={handleChange}
        >
            {val.map((value, index) => (
                <option key={value} value={value}>
                    {names[index]}
                </option>
            ))}
        </select>
    );
};

export default DropDown;
