import React from 'react'

export default function Alert({ alert }) {
    return (
        <div style={{ height: "50px" }}>
            {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>{alert.msg}</strong>
            </div >}
        </div>
    )
}