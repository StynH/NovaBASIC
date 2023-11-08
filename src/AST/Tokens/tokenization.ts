export class Tokenization{

    private static escapeRegExp(text: string): string {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    public static buildRegexPattern(): RegExp {
        const pattern = tokenRegistry.map(token => {
            if (token.isPattern) {
                return token.value;
            } else {
                const escapedValue = this.escapeRegExp(token.value);
                return /\w/.test(escapedValue) ? `\\b${escapedValue}\\b` : escapedValue;
            }
        }).join('|');
        return new RegExp(pattern, 'g');
    }

}

export const tokenRegistry: Array<{value: string, isPattern: boolean}> = [];
