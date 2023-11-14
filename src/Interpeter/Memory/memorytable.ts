
export type StoredVariable = {name: string, value: any | any[]};

export class MemoryTable{

    private readonly variables: Array<StoredVariable>;

    public constructor() {
        this.variables = [];
    }

    public setVariable<T>(variable: string, value: T | null): void{
        if(this.getVariable(variable)){
            throw new Error(`Variable ${variable} is already defined!`);
        }
        this.variables.push({ name: variable, value: value });
    }

    public getVariable(name: string): StoredVariable | null {
        return this.variables.find(variable => variable.name === name) as StoredVariable | null;
    }

    public setVariableValue(variable: string, value: any): void {
        if(this.getVariable(variable) == null){
            throw new Error(`Variable ${variable} is not defined!`);
        }
        this.getVariable(variable)!.value = value;
    }

    public removeVariablesByScope(scope: string): StoredVariable[]{
        const removedItems = [];
        let i = 0;

        while (i < this.variables.length) {
            if (this.variables[i].name.startsWith(scope)) {
                removedItems.push(...this.variables.splice(i, 1));
            } else {
                i++;
            }
        }

        return removedItems;
    }

    public debug(): void{
        const headers = ["Name", "Value"];
        const rows = this.variables.map(v => [v.name, JSON.stringify(v.value)]);

        const columnWidths = headers.map((header, columnIndex) => {
            return Math.max(
                header.length,
                ...rows.map(row => row[columnIndex].length)
            );
        });

        const formatRow = (row: string[], widths: number[]) => {
            return '| ' + row.map((cell, i) => cell.padEnd(widths[i])).join(' | ') + ' |';
        };

        console.log(formatRow(headers, columnWidths));
        console.log('+-' + columnWidths.map(width => '-'.repeat(width)).join('-+-') + '-+');
        rows.forEach(row => console.log(formatRow(row, columnWidths)));
    }
}
