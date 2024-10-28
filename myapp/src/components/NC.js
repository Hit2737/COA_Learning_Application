import React from 'react'
import SelectItem from './NC/select'
export default function NumberConvertor() {
    return (
        <div>
            <div className="row">
                <div className='col'>
                    <SelectItem text="Convert from" id="converFrom"/>
                </div>
                <div className='col'>
                    <SelectItem text="Convert to" id="converTo"/>
                </div>
            </div>
        </div>
    )
}
