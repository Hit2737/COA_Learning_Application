const DToSingle = (number) => {
    const steps = {};
    // Handle special cases
    if (number === 0) {
        steps.ieeeBinary = "0".repeat(32); // IEEE representation of zero
        steps.note = "The IEEE 754 representation for zero has all bits set to zero.";
        steps.exponentBinary="00000000";
        steps.mantissaBinary="00000000000000000000000";
        steps.sign=0;
        return steps;
    }
    if (isNaN(number)) {
        steps.ieeeBinary = "01111111110000000000000000000000";
        steps.exponentBinary="11111111";
        steps.sign=0;
        steps.mantissaBinary="10000000000000000000000";
        steps.note = "The IEEE 754 representation for NaN (Not a Number) has an exponent of 255 and a non-zero mantissa.";
        return steps;
    }

    if (!isFinite(number)) {
        steps.ieeeBinary = number > 0 ? "01111111100000000000000000000000" : "11111111100000000000000000000000";
        steps.note = number > 0
            ? "The IEEE 754 representation for positive infinity has the sign bit as 0, exponent as 255, and all mantissa bits as zero."
            : "The IEEE 754 representation for negative infinity has the sign bit as 1, exponent as 255, and all mantissa bits as zero.";
        steps.sign = number > 0 ? 0 : 1;
        steps.exponentBinary="11111111";
        steps.mantissaBinary="00000000000000000000000";
        return steps;
    }


    const sign = number < 0 ? 1 : 0;
    steps.sign = sign;

    if (number < 0) number = -number;

    // Step-by-step normalization
    let tempPower = number;
    let exponent = 0;
    steps.normalizationSteps = [];

    // Normalize: bring number down to between 1 and 2
    while (tempPower >= 2) {
        steps.normalizationSteps.push(`Divide by 2: ${tempPower} ➔ ${tempPower / 2}`);
        tempPower /= 2;
        exponent++;
    }

    // Normalize: bring number up to between 1 and 2
    while (tempPower < 1) {
        steps.normalizationSteps.push(`Multiply by 2: ${tempPower} ➔ ${tempPower * 2}`);
        tempPower *= 2;
        exponent--;
    }

    // Round the normalized number to prevent floating-point errors
    steps.normalizedNumber = tempPower;
    steps.unbiasedExponent = exponent;

    // Calculate biased exponent
    const biasedExponent = exponent + 127;
    steps.biasedExponent = biasedExponent;
    steps.exponentBinary = biasedExponent.toString(2).padStart(8, "0");

    // Calculate mantissa, rounded to avoid floating-point issues
    const mantissa = parseFloat("0"+(steps.normalizedNumber).toString().slice(1));
    steps.mantissa = mantissa;
    // Convert mantissa to binary representation
    let mantissaBinary = steps.mantissa.toString(2).split(".")[1] || "";
    mantissaBinary = mantissaBinary.padEnd(23, "0").slice(0, 23);
    steps.mantissaBinary = mantissaBinary;

    // Combine for final IEEE 754 binary representation
    steps.ieeeBinary = `${sign}${steps.exponentBinary}${mantissaBinary}`;
    return steps;
};


export default DToSingle;