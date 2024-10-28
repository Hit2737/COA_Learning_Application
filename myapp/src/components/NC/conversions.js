// Function to validate input based on the source base (supports fractional part)
function isValidInput(input, base) {
    const validChars = "0123456789ABCDEF".slice(0, base);
    const regex = new RegExp(`^[${validChars}]+(\\.[${validChars}]+)?$`, "i");
    return regex.test(input);
}

// Function to convert integer part from any base to decimal
function baseToDecimalInteger(integerPart, base) {
    let decimal = 0;
    const steps = [];
    for (let i = 0; i < integerPart.length; i++) {
        const digit = parseInt(integerPart[i], base);
        const power = integerPart.length - 1 - i;
        decimal += digit * Math.pow(base, power);
        steps.push(`(${digit} × ${base}^${power})`);
    }
    return { decimal, steps: steps.join(" + ") };
}

// Function to convert fractional part from any base to decimal
function baseToDecimalFraction(fractionPart, base) {
    let decimal = 0;
    const steps = [];
    for (let i = 0; i < fractionPart.length; i++) {
        const digit = parseInt(fractionPart[i], base);
        const power = -(i + 1);
        decimal += digit * Math.pow(base, power);
        steps.push(`(${digit} × ${base}^${power})`);
    }
    return { decimal, steps: steps.join(" + ") };
}

// Function to convert decimal integer part to any base
function decimalToBaseInteger(decimal, base) {
    let quotient = Math.floor(decimal);
    const steps = [];
    const remainders = [];
    let digitPosition = 0;

    while (quotient > 0) {
        const remainder = quotient % base;
        remainders.unshift(remainder.toString(base).toUpperCase());
        steps.push(`${quotient} / ${base} = ${Math.floor(quotient / base)}, Remainder = ${remainder} (Digit #${digitPosition})`);
        quotient = Math.floor(quotient / base);
        digitPosition++;
    }

    return { converted: remainders.join(""), steps };
}

// Function to convert decimal fractional part to any base
function decimalToBaseFraction(decimal, base, precision = 5) {
    let fraction = decimal - Math.floor(decimal);
    const steps = [];
    const digits = [];
    for (let i = 0; i < precision; i++) {
        fraction *= base;
        const digit = Math.floor(fraction);
        digits.push(digit.toString(base).toUpperCase());
        steps.push(`${fraction.toFixed(5)} * ${base} = ${Math.floor(fraction)}, Digit #${i}`);
        fraction -= digit;
        if (fraction === 0) break; // Stop if the fraction part becomes zero
    }

    return { converted: digits.join(""), steps };
}

// Main function to handle conversion between any two bases with fractional parts
function convertBase(input, fromBase, toBase) {
    // Validate input
    if (!isValidInput(input, fromBase)) {
        return `Invalid input for base ${fromBase}`;
    }

    // Split into integer and fractional parts
    const [integerPart, fractionPart] = input.split('.');

    // Convert integer part from `fromBase` to decimal
    const { decimal: integerDecimal, steps: toDecimalIntSteps } = baseToDecimalInteger(integerPart, fromBase);
    
    // Convert fractional part from `fromBase` to decimal if exists
    let fractionalDecimal = 0;
    let toDecimalFracSteps = "";
    if (fractionPart) {
        const result = baseToDecimalFraction(fractionPart, fromBase);
        fractionalDecimal = result.decimal;
        toDecimalFracSteps = result.steps;
    }

    const decimalValue = integerDecimal + fractionalDecimal;

    // Convert integer decimal to `toBase`
    const { converted: integerConverted, steps: fromDecimalIntSteps } = decimalToBaseInteger(integerDecimal, toBase);
    
    // Convert fractional decimal to `toBase` if needed
    let fractionalConverted = "";
    let fromDecimalFracSteps = [];
    if (fractionalDecimal) {
        const result = decimalToBaseFraction(decimalValue, toBase);
        fractionalConverted = result.converted;
        fromDecimalFracSteps = result.steps;
    }

    // Display steps
    console.log(`Base ${fromBase} to Decimal calculation for Integer Part:`);
    console.log(toDecimalIntSteps);
    if (fractionPart) {
        console.log(`Base ${fromBase} to Decimal calculation for Fractional Part:`);
        console.log(toDecimalFracSteps);
    }
    console.log(`= (${decimalValue})_10`);

    console.log(`\nDecimal to Base ${toBase} calculation for Integer Part:`);
    fromDecimalIntSteps.forEach(step => console.log(step));

    if (fractionalConverted) {
        console.log(`\nDecimal to Base ${toBase} calculation for Fractional Part:`);
        fromDecimalFracSteps.forEach(step => console.log(step));
    }

    const finalResult = `${integerConverted}.${fractionalConverted}`;
    console.log(`= (${finalResult})_${toBase}`);

    // Return the final converted value and steps as an object
    return {
        original: input,
        fromBase,
        toBase,
        result: finalResult,
        steps: {
            toDecimalIntSteps,
            toDecimalFracSteps,
            fromDecimalIntSteps,
            fromDecimalFracSteps
        }
    };
}

// Example usage:
const input = "111.101111";  // Example binary number with a fractional part
const fromBase = 2;
const toBase = 16;

const result = convertBase(input, fromBase, toBase);
console.log(result);
