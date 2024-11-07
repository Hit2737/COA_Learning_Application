const DToDouble = (number) => {
    const steps = {};
    // Handle special cases
    if (number === 0) {
        steps.ieeeBinary = "0".repeat(64); // IEEE representation of zero for double precision
        steps.note = "The IEEE 754 double precision representation for zero has all bits set to zero.";
        return steps;
    }

    if (!isFinite(number)) {
        steps.ieeeBinary = number > 0 ? "0111111111110000000000000000000000000000000000000000000000000000" : "1111111111110000000000000000000000000000000000000000000000000000";
        steps.note = number > 0
            ? "The IEEE 754 representation for positive infinity has the sign bit as 0, exponent as 2047, and all mantissa bits as zero."
            : "The IEEE 754 representation for negative infinity has the sign bit as 1, exponent as 2047, and all mantissa bits as zero.";
        return steps;
    }

    if (isNaN(number)) {
        steps.ieeeBinary = "0111111111111000000000000000000000000000000000000000000000000000";
        steps.note = "The IEEE 754 representation for NaN (Not a Number) has an exponent of 2047 and a non-zero mantissa.";
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
    steps.normalizedNumber = roundTo(tempPower, 10);
    steps.unbiasedExponent = exponent;

    // Calculate biased exponent for double precision
    const biasedExponent = exponent + 1023;
    steps.biasedExponent = biasedExponent;
    steps.exponentBinary = biasedExponent.toString(2).padStart(11, "0");

    // Calculate mantissa, rounded to avoid floating-point issues
    const mantissa = steps.normalizedNumber - 1;
    steps.mantissa = roundTo(mantissa, 10);

    // Convert mantissa to binary representation
    let mantissaBinary = steps.mantissa.toString(2).split(".")[1] || "";
    mantissaBinary = mantissaBinary.padEnd(52, "0").slice(0, 52);
    steps.mantissaBinary = mantissaBinary;

    // Combine for final IEEE 754 binary representation
    steps.ieeeBinary = `${sign}${steps.exponentBinary}${mantissaBinary}`;
    console.log("Steps", steps);
    return steps;
};

const roundTo = (value, decimals) => {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export default DToDouble;
