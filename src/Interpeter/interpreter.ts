import {IExprVisitor} from "../AST/Visitor/Interface/exprvisitor";
import {BinaryExpr} from "../AST/Expressions/binaryexpr";
import {TernaryExpr} from "../AST/Expressions/ternaryExpr";
import {VariableExpr} from "../AST/Expressions/variableexpr";
import {VariableDeclarationExpr} from "../AST/Expressions/variabledeclarationexpr";
import {ConstantExpr} from "../AST/Expressions/constantexpr";
import {ConsolePrinter, IPrinter} from "./STL/printer";
import {MemoryTable} from "./Memory/memorytable";
import {Expr} from "../AST/Expressions/expr";
import {Tokens} from "../AST/Tokens/tokens";
import {VariableValueChangeExpr} from "../AST/Expressions/variablevaluechangeexpr";
import {PrintExpr} from "../AST/Expressions/STL/printexpr";
import {ArithmeticExpr} from "../AST/Expressions/STL/arithmeticexpr";

export class Interpreter implements IExprVisitor {

    private memoryTable: MemoryTable;
    private printer: IPrinter;

    private result: any | null;

    public constructor() {
        this.memoryTable = new MemoryTable();
        this.printer = new ConsolePrinter();

        this.result = null;
    }

    public visitBinaryExpr(expr: BinaryExpr): void {
        const lhs = this.executeExpr(expr.leftExpr);
        const rhs = this.executeExpr(expr.rightExpr);

        switch (expr.condition){
            case Tokens.PLUS:
                this.result = lhs + rhs;
                break;
            case Tokens.MINUS:
                this.result = lhs - rhs;
                break;
            case Tokens.DIVIDE:
                this.result = lhs / rhs;
                break;
            case Tokens.MULTIPLY:
                this.result = lhs * rhs;
                break;
            default:
                throw new Error(`Unknown arithmetic ${expr.condition}.`);
        }
    }

    public visitConstantExpr<T>(expr: ConstantExpr<T>): void {
        this.result = expr.value;
    }

    public visitNullExpr(): void {
        this.result = null;
    }

    public visitTernaryExpr(expr: TernaryExpr): void {
        const result = this.executeExpr(expr);
        if(result == true){
            this.result = this.executeExpr(expr.trueExpr);
        }
        else{
            this.result = this.executeExpr(expr.falseExpr);
        }
    }

    public visitVariableDeclarationExpr(expr: VariableDeclarationExpr): void {
        this.memoryTable.setVariable(expr.variable, this.executeExpr(expr.assignment));
    }

    public visitVariableValueChangeExpr(expr: VariableValueChangeExpr): void{
        this.memoryTable.setVariableValue(expr.variable, this.executeExpr(expr.assignment));
    }

    public visitVariableExpr(expr: VariableExpr): void {
        this.result = this.memoryTable.getVariable(expr.value)?.value;
    }

    public visitPrintExp(expr: PrintExpr): void {
        const interpolation = expr.interpolationExpr != null ? this.executeExpr(expr.interpolationExpr) : null;
        this.printer.print(expr.value, interpolation);
    }

    public visitArithmeticExpr(expr: ArithmeticExpr): void {
        const variableExpr = expr.variable as VariableExpr;
        const variable = this.memoryTable.getVariable(variableExpr.value)!;
        const mutation = this.executeExpr(expr.mutation);

        let value = variable.value
        switch (expr.operator){
            case Tokens.PLUS:
                value += mutation;
                break;
            case Tokens.MINUS:
                value -= mutation;
                break;
            case Tokens.MULTIPLY:
                value *= mutation;
                break;
            case Tokens.DIVIDE:
                value /= mutation;
                break;
        }

        this.memoryTable.setVariableValue(variable.name, value);
    }

    public debug(): void{
        console.log("--Dumping memory table--")
        this.memoryTable.debug();
    }

    private executeExpr(expr: Expr): any{
        expr.accept(this);
        return this.result;
    }
}
