import React from 'react'
import { convertBase,isValidInput } from './conversions'
import { useState } from 'react'

export function DisplayResult({ number, fromBase, toBase }) {
    
    if(!isValidInput(number,fromBase)){
        return <div className="alert alert-danger">Invalid Input</div>
    }

    return (
        <div className="border p-2" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            Hello Guys
        </div>
    );
}
