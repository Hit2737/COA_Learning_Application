import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const CloudTooltip = styled.div`
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 16px;
  border-radius: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  width: 350px;
  text-align: center;
  z-index: 10;
  word-wrap: break-word;
  overflow-wrap: break-word;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
  }
`;

const BaseConversionTooltip = ({ number, base, result }) => {
  const getConversionSteps = (num, base) => {
    const integerPart = num.split('.')[0];
    const fractionalPart = num.split('.')[1] || '';
    let steps = [];

    integerPart.split('').reverse().forEach((digit, index) => {
      steps.push(`(${digit} × ${base}^${index})`);
    });
    steps.reverse();
    if (fractionalPart) {
      fractionalPart.split('').forEach((digit, index) => {
        steps.push(`(${digit} × ${base}^${-(index + 1)})`);
      });
    }

    return steps;
  };

  const steps = getConversionSteps(number, base);
  return (
    <div style={{ fontSize: "0.6em", color: "black" }}>
      {steps.map((step, index) => (
        <span key={index}>
          {step} {index < steps.length - 1 && '+ '}
        </span>
      ))}
      <div style={{ marginTop: '10px', fontWeight: 'bold', whiteSpace: 'pre-wrap' }}>
        Result: {result}
      </div>
    </div>
  );
};

const TooltipExample = ({ number, base, result }) => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef(null);

  const toggleTooltip = () => setVisible(!visible);

  // Collapse tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <TooltipContainer ref={tooltipRef}>
      <button
        className="btn btn-light"
        onClick={toggleTooltip}
        style={{ backgroundColor: '#c0c0c0', fontSize: '0.6em' }}
      >
        Raw Steps
      </button>
      <CloudTooltip visible={visible}>
        <BaseConversionTooltip number={number} base={base} result={result} />
      </CloudTooltip>
    </TooltipContainer>
  );
};

export default TooltipExample;
