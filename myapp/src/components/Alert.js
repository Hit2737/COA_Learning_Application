import React from 'react'

export default function Alert({ alert }) {
    return (
        <div style={{ position: 'absolute', top: '60px', right: '0' }}>
            {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>{alert.msg}</strong>
            </div >}
        </div>
    )
}