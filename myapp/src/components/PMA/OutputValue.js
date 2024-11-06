import React from 'react'

export default function OutputLine({ title, value }) {
  return (
    <div className='col-md-6 my-2'>
      <div className="container p-2 border h-100 text-center d-flex" style={{ borderRadius: '10px' }}>
        <div className="col align-content-center h-100">
          <p className='m-0'>{title}</p>
        </div>
        <div className="col align-content-center h-100">
          <p className='m-0'>{value}</p>
        </div>
      </div>
    </div>
  )
}
