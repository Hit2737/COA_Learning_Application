import React from 'react'
import { useEffect } from 'react'

export default function InputValue({ mode = 'light', id = 'id', title = 'title', content = 'content', type = 'text', setValue, value = 0, placeholder = '', min = 0, max = 1000000000000000 }) {
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(tooltipTriggerEl => {
            new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
    }, []);

    return (
        <div className="col-md-4 my-3">
            <span className="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="bottom" title={content}>
                <p>{title}</p>
            </span>
            <input id={id} type={type} className={`form-control text-bg-${mode}`} value={value} onChange={(e) => { setValue(e.target.value) }} placeholder={placeholder} min={min} max={max} />
        </div>
    )
}
