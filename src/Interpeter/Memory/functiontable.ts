import {FunctionDeclarationExpr} from "../../AST/Expressions/Functions/functiondeclarationexpr";

export type StoredFunction = {name: string, value: FunctionDeclarationExpr};

export class FunctionTable{

    private readonly functions: Array<StoredFunction>;

    public constructor() {
        this.functions = [];
    }

    public setFunction(func: FunctionDeclarationExpr, className: string): void{
        if(this.getFunction(func.name, className)){
            throw new Error(`Function ${func.name} is already defined!`);
        }
        const internalName = this.generateInternalFunctionName(func.name, className);
        this.functions.push({ name: internalName, value: func });
    }

    public getFunction(name: string, className: string): StoredFunction | null {
        const internalName = this.generateInternalFunctionName(name, className);
        return this.functions.find(func => func.name === internalName) as StoredFunction | null;
    }

    private generateInternalFunctionName(funcName: string, className: string): string{
        return `_${className}_${funcName}`;
    }

    public debug(): void{
        const headers = ["Name", "Parameter Count"];
        const rows = this.functions.map(v => [v.name, v.value.parameters.length.toString()]);

        const columnWidths = headers.map((header, columnIndex) => {
            return Math.max(
                header.length,
                ...rows.map(row => row[columnIndex].toString().length)
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
