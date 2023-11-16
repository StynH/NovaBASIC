import {Interpreter} from "../../Interpeter/interpreter";
import {PrintExpr} from "../AST/Expressions/printexpr";

export interface IPrinter{
    print(expr: PrintExpr): void;
}

export class ConsolePrinter implements IPrinter{

    private context: Interpreter

    constructor(context: Interpreter) {
        this.context = context;
    }

    public print(expr: PrintExpr): void {
        const interpolation = [];
        for (const intExpr of expr.interpolation) {
            interpolation.push(this.context.executeExpr(intExpr));
        }

        console.log(this.replacePlaceholders(this.context.executeExpr(expr.value), interpolation));
    }

    private replacePlaceholders(template: string, values: string[]): string {
        return template.replace(/#\{(\d+)}/g, (match, index) => {
            const value = values[parseInt(index)];
            return value !== undefined ? value : match;
        });
    }
}
