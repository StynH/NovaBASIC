import {BaseInterpreter} from "../../Interpeter/Abstract/baseinterpreter";
import {PrintExpr} from "../AST/Expressions/printexpr";
import {IPrinter} from "../Functionality/printer";
import {TerminalPrinter} from "../Functionality/terminalprinter";
import {ArrayResizeExpr} from "../AST/Expressions/arrayresizeexpr";
import {Tokens} from "../../AST/Tokens/tokens";
import {Interpreter} from "../../Interpeter/interpreter";
import {LengthExpr} from "../AST/Expressions/lengthexpr";
import {RandomExpr} from "../AST/Expressions/randomexpr";
import {IRandomizer, LinearCongruentialRandomizer} from "../Functionality/randomizer";
import {MathOperationExpr} from "../AST/Expressions/mathoperationexpr";
import {ConstantExpr} from "../../AST/Expressions/constantexpr";

export class StandardLibraryInterpreter extends BaseInterpreter{
    private readonly context: Interpreter;
    private printer: IPrinter;
    private randomizer: IRandomizer;

    constructor(
        context: Interpreter
    ) {
        super();

        this.context = context;
        this.printer = new TerminalPrinter(this.context, "terminalOutput");
        this.randomizer = new LinearCongruentialRandomizer();
    }

    public visitPrintExp(expr: PrintExpr): void {
        this.printer.print(expr);
    }

    public visitArrayResizeExpr(expr: ArrayResizeExpr): void {
        const variable = expr.variable instanceof ConstantExpr ?
            this.context.getVariableValueScopedOrGlobally(expr.variable.value) :
            this.context.executeExpr(expr.variable);
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

    public visitRandomExpr(expr: RandomExpr): void {
        const min = this.context.executeExpr(expr.min);
        const max = this.context.executeExpr(expr.max);
        const inclusive = expr.inclusive != null ? this.context.executeExpr(expr.inclusive) : false;
        const seed = expr.seed != null ? this.context.executeExpr(expr.seed) : Date.now();

        this.context.result = Math.round(this.randomizer.randomIntBetween(min, max, inclusive, seed));
    }

    public visitMathOperationExpr(expr: MathOperationExpr): void {
        const value = this.context.executeExpr(expr.variable);

        if(expr.operation === Tokens.FLOOR_STL){
            this.context.result = Math.floor(value);
        }
        else if(expr.operation === Tokens.CEIL_STL){
            this.context.result = Math.ceil(value);
        }
        else if(expr.operation === Tokens.SIN_STL){
            this.context.result = Math.sin(value);
        }
        else if(expr.operation === Tokens.COS_STL){
            this.context.result = Math.cos(value);
        }
        else if(expr.operation === Tokens.TAN_STL){
            this.context.result = Math.tan(value);
        }
        else{
            throw new Error(`Unknown math operator '${expr.operation}'.`)
        }
    }
}
