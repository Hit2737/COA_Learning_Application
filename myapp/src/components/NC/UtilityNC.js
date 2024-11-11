//number-->string of the number(string)
//base-->base of the number(int)
//return-->decimal value of the number(int/float)
export function convertBaseToDecimal(number, base) {
    const strVal = number.toString().toUpperCase();
    let [integerPart, fractionPart = ""] = strVal.split('.');
    integerPart = integerPart.split('').reverse();
    fractionPart = fractionPart.split('');
    let decimalValue = 0;

    // Helper function to get numeric value for each character
    const getValue = (char) => {
        if (/[0-9]/.test(char)) {
            return parseInt(char); // For digits 0-9
        } else if (/[A-Z]/.test(char)) {
            return char.charCodeAt(0) - 'A'.charCodeAt(0) + 10; // For letters A-Z
        } else {
            throw new Error("Invalid character in number");
        }
    };
    for (let i = 0; i < integerPart.length; i++) {
        decimalValue += getValue(integerPart[i]) * Math.pow(base, i);
    }
    for (let i = 0; i < fractionPart.length; i++) {
        decimalValue += getValue(fractionPart[i]) * Math.pow(base, -(i + 1));
    }
    return decimalValue;
}


/*
decimalValue->string
toBase->int
return->string
converts the decimal value to the given base
*/
export function convertDecimalToBase(decimalValue, toBase) {
    // decimalValue = decimalValue.toString();
    console.log(decimalValue);
    if (toBase < 2 || toBase > 16) {
        return "Invalid base. Please use a base between 2 and 16.";
    }
    // Split the input into integer and fractional parts
    let [integerPart, fractionalPart] = decimalValue.split('.');

    // Convert integer part
    let decimalInteger = parseInt(integerPart, 10);
    const digits = "0123456789ABCDEF";
    let integerResult = "";

    while (decimalInteger > 0) {
        const remainder = decimalInteger % toBase;
        integerResult = digits[remainder] + integerResult;
        decimalInteger = Math.floor(decimalInteger / toBase);
    }

    integerResult = integerResult || "0"; // If no integer part, set to "0"

    // Convert fractional part if it exists
    let fractionalResult = "";
    if (fractionalPart) {
        let decimalFraction = parseFloat("0." + fractionalPart);
        let count = 0;

        while (decimalFraction > 0 && count < 10) { // Limit to 10 digits for precision
            decimalFraction *= toBase;
            const fractionDigit = Math.floor(decimalFraction);
            fractionalResult += digits[fractionDigit];
            decimalFraction -= fractionDigit;
            count++;
        }
    }

    // Combine integer and fractional parts
    return fractionalResult ? `${integerResult}.${fractionalResult}` : integerResult;
}

/*
Checks the validity of the input given by the user
*/
export function isValidInput(input, base) {
    const validChars = "0123456789ABCDEF".slice(0, base);
    const regex = new RegExp(`^[${validChars}]+(\\.[${validChars}]+)?$`, "i");
    return regex.test(input);
}