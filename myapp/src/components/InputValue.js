import React from 'react'
import { useEffect } from 'react'

export default function InputValue({ mode = 'dark', id = 'id', title = 'title', content = 'content', type = 'number', setValue, value = 0, placeholder = '', min = 0, max = 100, step = 1 }) {
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(tooltipTriggerEl => {
            new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
    }, []);

    return (
        <div className="col-md-4 my-3">
            <span className="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="bottom" title={content}>
                <p>{title}: {value}</p>
            </span>
            <input id={id} className={`text-bg-${mode} border`} type={type} value={value} onChange={(e) => { setValue(e.target.value) }} placeholder={placeholder} min={min} max={max} style={{ width: '100%', borderRadius: '5px' }} />
            <input id={id} type="range" value={value} onChange={(e) => { setValue(e.target.value) }} placeholder={placeholder} step={step} min={min} max={max} style={{ width: '100%' }} />
        </div>
    )
}
