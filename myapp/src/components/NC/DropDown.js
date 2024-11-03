// import React, {useState} from 'react'
import { isValidInput } from './DisplaySteps';
const DropDown = ({ id, setBase, base , setValidInput, number , setDecimalValue}) => {
    const val = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const names = [
        "2 (Binary)", "3 (Ternary)", "4 (Quaternary)", "5 (Quinary)", 
        "6", "7", "8 (Octal)", "9", "10 (Decimal)", 
        "11", "12", "13", "14", "15", "16 (Hexadecimal)"
    ];
    const handleChange = (e) => {
        setBase(Number(e.target.value));
        if(e.target.value==="10" && id==="convertFrom"){
            setDecimalValue(number);
        }
        if(isValidInput(number,e.target.value)){
            setValidInput(true);
        }
        else{
            setValidInput(false);
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
