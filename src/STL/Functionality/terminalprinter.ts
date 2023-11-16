import {Interpreter} from "../../Interpeter/interpreter";
import {PrintExpr} from "../AST/Expressions/printexpr";
import {IPrinter} from "./printer";

export class TerminalPrinter implements IPrinter{

    private context: Interpreter
    private terminal: HTMLTextAreaElement;

    constructor(context: Interpreter, terminalId: string) {
        this.context = context;
        this.terminal = document.querySelector(`#${terminalId}`) as HTMLTextAreaElement;
    }

    public print(expr: PrintExpr): void {
        const interpolation = [];
        for (const intExpr of expr.interpolation) {
            interpolation.push(this.context.executeExpr(intExpr));
        }

        const string = this.context.executeExpr(expr.value).toString();
        this.terminal.value += `${this.replacePlaceholders(string, interpolation)}\n`;
    }

    private replacePlaceholders(template: string, values: string[]): string {
        return this.removeQuotes(template.replace(/#\{(\d+)}/g, (match, index) => {
            const value = values[parseInt(index)];
            return value !== undefined ? value : match;
        }));
    }

    private removeQuotes(str: string): string {
        return str.replace(/^"(.+(?="$))"$/, '$1');
    }
}
