import React from 'react'

export default function DropDown({ mode, value, setValue, options }) {
    return (
        <select id={value} className={`form-select text-bg-${mode}`} value={value} onChange={(e) => setValue(e.target.value)} >
            {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
    )
}
