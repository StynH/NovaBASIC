import {BaseInterpreter} from "../../Interpeter/Abstract/baseinterpreter";
import {PrintExpr} from "../AST/Expressions/printexpr";
import {IPrinter} from "../Functionality/printer";
import {TerminalPrinter} from "../Functionality/terminalprinter";
import {ArrayResizeExpr} from "../AST/Expressions/arrayresizeexpr";
import {Tokens} from "../../AST/Tokens/tokens";
import {Interpreter} from "../../Interpeter/interpreter";
import {LengthExpr} from "../AST/Expressions/lengthexpr";

export class StandardLibraryInterpreter extends BaseInterpreter{
    private readonly context: Interpreter;
    private printer: IPrinter;

    constructor(
        context: Interpreter
    ) {
        super();

        this.context = context;
        this.printer = new TerminalPrinter(this.context, "terminalOutput");
    }

    public visitPrintExp(expr: PrintExpr): void {
        this.printer.print(expr);
    }

    public visitArrayResizeExpr(expr: ArrayResizeExpr): void {
        const variable = this.context.getVariableValueScopedOrGlobally(expr.variable);
        const size = this.context.executeExpr(expr.size);

        if(!Array.isArray(variable)){
            throw new Error(`${expr.variable} is not an array, and cannot use ${Tokens.ARRAY_RESIZE_STL}.`)
        }

        const array = variable as any[];
        while(array.length < size){
            array.push(null);
        }
    }

    public visitLengthExpr(expr: LengthExpr): void {
        const variable = this.context.getVariableValueScopedOrGlobally(expr.variable);
        if(variable != null && typeof variable.length === 'number'){
            this.context.result = variable.length;
        }
        else{
            throw new Error(`Variable with name '${expr.variable}' does not have a length attribute.`);
        }
    }
}
