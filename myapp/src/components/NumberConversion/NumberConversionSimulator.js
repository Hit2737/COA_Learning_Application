import React, { useState } from 'react';
import SelectFrom from './SelectForm';
const NumberConversionSimulator = () => {
  const [number, setNumber] = useState('');
  const [base, setBase] = useState(10);
  const [conversionResult, setConversionResult] = useState('');

  const convertNumber = () => {
    let result = '';
    switch (base) {
      case 2:
        result = parseInt(number, 10).toString(2);
        break;
      case 8:
        result = parseInt(number, 10).toString(8);
        break;
      case 16:
        result = parseInt(number, 10).toString(16);
        break;
      default:
        result = number;
    }
    setConversionResult(result);
  };

  return (
    <div>
      <h3>Number Conversion Simulator</h3>
      <label>
        Number:
        <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
      </label>
      <label>
        Convert to Base:
          <SelectFrom setBase={setBase}/>
      </label>
      <button onClick={convertNumber}>Convert</button>
      {conversionResult && <p>Converted Number: {conversionResult}</p>}
    </div>
  );
};

export default NumberConversionSimulator;
