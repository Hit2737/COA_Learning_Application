//number-->string of the number(string)
//base-->base of the number(int)
//return-->decimal value of the number(int/float)
export function findDecimalValue(number, base) {
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