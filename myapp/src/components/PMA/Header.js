import React from 'react'

export default function Header() {
    return (
        <>
            <h1 className="text-center my-3">Performance Metric Analyser</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 my-2 d-flex">
                        <div style={{ width: '20px', height: '20px', backgroundColor: 'red', borderRadius: '5px' }}></div><p className='px-2'>Sequential Operations</p>
                    </div>
                    <div className="col-md-6 my-2 d-flex">
                        <div style={{ width: '20px', height: '20px', backgroundColor: 'blue', borderRadius: '5px' }}></div><p className='px-2'>Parallelizable Operations</p>
                    </div>
                </div>
            </div>
        </>
    )
}
