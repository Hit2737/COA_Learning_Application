import React from 'react'
import { Link } from 'react-router-dom'
export default function Tool({ mode = 'light', title = "Title", content = "Content", goto = "/" }) {
    return (
        <div className='my-3'>
            <div className="card" style={{
                color: mode === 'dark' ? 'white' : 'black',
                backgroundColor: mode === 'dark' ? 'rgb(45 50 69)' : 'white'
            }} >
                <h5 className="card-title my-3 mx-2">{title}</h5>
                <p className="card-text mx-3"><small>{content}</small></p>
                <Link to={`/${goto}`} className={`btn btn-sm btn-secondary align-content-center`} style={{ height: "40px" }}>Let's GO!</Link>
            </div>
        </div>
    )
}