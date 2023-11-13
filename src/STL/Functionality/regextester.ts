export class RegexTester {
    public testRegex(pattern: string, testString: string): boolean {
        try {
            const regex = new RegExp(pattern);
            return regex.test(testString);
        } catch (e) {
            throw new Error(`${pattern} is not valid Regex.`)
        }
    }
}
