import React from "react";
import "./StepsDisplay.css"; // Custom styles

export default function StepsDisplay({ steps,fpType }) {
    return (
        <div className="ieee-container p-4 mt-4">
            {steps.note ? (
                <div className="card shadow-lg special-case-note mb-4 p-4 border-0">
                    <div className="card-body">
                        <h2 className="text-warning mb-3">Special Case:</h2>
                        <p className="text-secondary">{steps.note}</p>
                        <p className="fs-5">
                            <strong>Binary:</strong>
                            <span className="highlight final ms-2">{steps.ieeeBinary}</span>
                        </p>
                    </div>
                </div>
            ) : (
                <div className="steps-container">
                    <StepCard
                        stepNumber="1"
                        title="Sign Bit(1 Bit) ➔"
                        description="The sign bit is determined by the sign of the number:"
                        resultLabel="Sign Bit:"
                        result={steps.sign}
                    />

                    <Arrow />

                    <StepCard
                        stepNumber="2"
                        title="Normalization ➔"
                        description="Transform the number to fall between 1 and 2:"
                        listItems={steps.normalizationSteps}
                        additionalContent={
                            <>
                                <p>
                                    <strong>Normalized Number:</strong>
                                    <span className="highlight ms-2">{steps.normalizedNumber}</span>
                                </p>
                                <p>
                                    Unbiased Exponent:
                                    <strong className="ms-2">{steps.unbiasedExponent}</strong>
                                </p>
                            </>
                        }
                    />

                    <Arrow />

                    <StepCard
                        stepNumber="3"
                        title={`Exponent(${fpType==="FP32"?"8":"11"} Bits) ➔`}
                        description={`Bias the exponent by adding ${fpType==="FP32"?"127":"1023"} to fit into the IEEE 754 format.`}
                        resultLabel="Biased Exponent:"
                        result={steps.biasedExponent}
                        secondaryResultLabel="Exponent Bits:"
                        secondaryResult={steps.exponentBinary}
                    />

                    <Arrow />

                    <Step4Card
                        stepNumber="4"
                        title={`Mantissa(${fpType==="FP32"?"23":"52"} Bits) ➔`}
                        description="Fractional part after normalization (rounded to avoid floating-point errors):"
                        resultLabel="Mantissa (Decimal):"
                        result={steps.mantissa}
                        secondaryResultLabel="Mantissa Bits:"
                        secondaryResult={steps.mantissaBinary}
                        steps={steps}
                        fpType={fpType}
                    />

                    <Arrow />

                    <div className="card shadow-lg final-step mt-4 p-4 border-0">
                        <div className="card-body">
                            <h3 className="text-primary">Final IEEE 754 Representation</h3>
                            <p>The final IEEE 754 representation combines the sign bit, exponent bits, and mantissa bits:</p>
                            <p className="fs-5">
                                <strong>Binary:</strong>
                                <span className="highlight final ms-2">{steps.ieeeBinary}</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StepCard({ stepNumber, title, description, resultLabel, result, listItems, additionalContent, secondaryResultLabel, secondaryResult }) {
    return (
        <div className="card shadow-sm mb-4 p-3 border-0">
            <div className="card-body">
                <h4 className="text-dark">Step {stepNumber}: {title}</h4>
                <p>{description}</p>
                {listItems && (
                    <ul className="ms-3">
                        {listItems.map((item, index) => (
                            <li key={index} className="text-secondary">{item}</li>
                        ))}
                    </ul>
                )}
                <p>
                    <strong>{resultLabel}</strong>
                    <span className="highlight ms-2">{result}</span>
                </p>
                {secondaryResultLabel && (
                    <p>
                        <strong>{secondaryResultLabel}</strong>
                        <span className="highlight ms-2">{secondaryResult}</span>
                    </p>
                )}
                {additionalContent}
            </div>
        </div>
    );
}

function Step4Card({ stepNumber, title, description, resultLabel, result, listItems, additionalContent, secondaryResultLabel, secondaryResult,steps,fpType }) {
    return (
        <div className="card shadow-sm mb-4 p-3 border-0">
            <div className="card-body">
                <h4 className="text-dark">Step {stepNumber}: {title}</h4>
                <p>{description}</p>
                <span>Normalized number = {steps.normalizedNumber} = 1.Mantissa</span>
                <p>Convert the normalized number to binary:(Truncate or pad with zeros to the binary number upto {fpType==="FP64"? 52:23} decimal places)</p>
                <strong>Normalized number(Binary):</strong><span> 1.{steps.mantissaBinary}</span>
                {listItems && (
                    <ul className="ms-3">
                        {listItems.map((item, index) => (
                            <li key={index} className="text-secondary">{item}</li>
                        ))}
                    </ul>
                )}
                {/* <p>
                    <strong>{resultLabel}</strong>
                    <span className="highlight ms-2">{result}</span>
                </p> */}
                {secondaryResultLabel && (
                    <p>
                        <strong>{secondaryResultLabel}</strong>
                        <span className="highlight ms-2">{secondaryResult}</span>
                    </p>
                )}
                {additionalContent}
            </div>
        </div>
    );
}

function Arrow() {
    return <div className="text-center mb-4"><span className="arrow">↓</span></div>;
}
