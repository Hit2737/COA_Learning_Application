import React from 'react'
import { useState } from 'react'

export default function InputValue({ title = 'title', type = 'text', defaultValue = 0, placeholder = '', min = 0, max = 1000000000000000 }) {
    const [value, setValue] = useState({ defaultValue })
    return (
        <div className="col-md-4 my-4">
            <p>{title}</p>
            <input type={type} className="form-control" value={value} onChange={(e) => { setValue(e.target.value) }} placeholder={placeholder} min={min} max={max} />
        </div>
    )
}
