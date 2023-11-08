export function intTryParse(value: string): [boolean, number] {
    const num = parseInt(value);
    const success = !isNaN(num);
    return [success, success ? num : 0];
}

export function decimalTryParse(value: string): [boolean, number] {
    const num = parseFloat(value);
    const success = !isNaN(num);
    return [success, success ? num : 0.0];
}

export function boolTryParse(value: string): [boolean, boolean] {
    if (value.toLowerCase() === "true") {
        return [true, true];
    } else if (value.toLowerCase() === "false") {
        return [true, false];
    } else {
        return [false, false];
    }
}

export function stringTryParse(value: string): [boolean, string] {
    const startsWithDoubleQuote = value.startsWith("\"");
    const endsWithDoubleQuote = value.endsWith("\"");

    if (startsWithDoubleQuote && endsWithDoubleQuote) {
        return [true, value.substring(1, value.length - 1)];
    } else {
        return [false, ''];
    }
}

export function variableTryParse(value: string): [boolean, string] {
    const validVariableRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;

    const isValid = validVariableRegex.test(value);
    return [isValid, isValid ? value : ''];
}
