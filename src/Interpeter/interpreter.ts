import {IExprVisitor} from "../AST/Visitor/Interface/exprvisitor";
import {BinaryExpr} from "../AST/Expressions/binaryexpr";
import {TernaryExpr} from "../AST/Expressions/ternaryExpr";
import {VariableExpr} from "../AST/Expressions/variableexpr";
import {VariableDeclarationExpr} from "../AST/Expressions/variabledeclarationexpr";
import {ConstantExpr} from "../AST/Expressions/constantexpr";
import {ConsolePrinter, IPrinter} from "../STL/Functionality/printer";
import {MemoryTable} from "./Memory/memorytable";
import {Expr} from "../AST/Expressions/expr";
import {Tokens} from "../AST/Tokens/tokens";
import {VariableValueChangeExpr} from "../AST/Expressions/variablevaluechangeexpr";
import {PrintExpr} from "../STL/AST/Expressions/printexpr";
import {ArithmeticExpr} from "../STL/AST/Expressions/arithmeticexpr";
import {ConditionalExpr} from "../AST/Expressions/Conditional/conditionalexpr";
import {FunctionTable, StoredFunction} from "./Memory/functiontable";
import {FunctionDeclarationExpr} from "../AST/Expressions/Functions/functiondeclarationexpr";
import {FunctionExpr} from "../AST/Expressions/Functions/functionexpr";
import {Stack} from "../Data/stack";

export class Interpreter implements IExprVisitor {

    private readonly GLOBAL_SCOPE = "GLOBAL";

    private memoryTable: MemoryTable;
    private functionTable: FunctionTable;
    private printer: IPrinter;

    private scope: Stack<string>

    private result: any | null;

    public constructor() {
        this.memoryTable = new MemoryTable();
        this.functionTable = new FunctionTable();
        this.printer = new ConsolePrinter();

        this.scope = new Stack<string>();

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
            case Tokens.EQUALS:
                this.result = lhs === rhs;
                break;
            case Tokens.GTE:
                this.result = lhs >= rhs;
                break;
            case Tokens.LTE:
                this.result = lhs <= rhs;
                break;
            case Tokens.LT:
                this.result = lhs < rhs;
                break;
            case Tokens.GT:
                this.result = lhs > rhs;
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
        const scopedName = this.toScopedName(expr.variable);
        this.memoryTable.setVariable(scopedName, this.executeExpr(expr.assignment));
    }

    public visitVariableValueChangeExpr(expr: VariableValueChangeExpr): void{
        this.setVariableValueScopedOrGlobally(expr.variable, this.executeExpr(expr.assignment));
    }

    public visitVariableExpr(expr: VariableExpr): void {
        this.result = this.getVariableValueScopedOrGlobally(expr.value);
    }

    public visitPrintExp(expr: PrintExpr): void {
        const interpolation = expr.interpolationExpr != null ? this.executeExpr(expr.interpolationExpr) : null;
        this.printer.print(expr.value, interpolation);
    }

    public visitArithmeticExpr(expr: ArithmeticExpr): void {
        const variableExpr = expr.variable as VariableExpr;
        const scopedName = this.toScopedName(variableExpr.value);
        const variable = this.memoryTable.getVariable(scopedName)!;
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

    public visitConditionalExpr(expr: ConditionalExpr): void {
        const result = this.executeExpr(expr.condition);
        if(result == true){
            for (const subExpr of expr.trueExprTree) {
                this.executeExpr(subExpr);
            }
        }
    }

    public visitFunctionDeclarationExpr(expr: FunctionDeclarationExpr): void {
        this.functionTable.setFunction(expr, this.getScope());
    }

    public visitFunctionExpr(expr: FunctionExpr): void {
        const func = this.getFunctionScopedOrGlobally(expr.value);
        if(func != null){
            this.scope.push(expr.value);
            for (let i = 0; i < func.value.parameters.length; ++i) {
                const parameter = func.value.parameters[i];
                if(expr.parameters.length <= i){
                    throw new Error(`Missing required parameter '${parameter}' for function '${expr.value}'.`)
                }

                const scopedName = this.toScopedName(parameter);
                this.memoryTable.setVariable(scopedName, this.executeExpr(expr.parameters[i]));
            }

            for (const expr of func.value.exprTree) {
                this.executeExpr(expr);
            }
            this.scope.pop();
            return;
        }
        throw new Error(`Unknown subroutine call: ${expr.value}.`);
    }

    public debug(): void{
        console.log("--Dumping memory table--")
        this.memoryTable.debug();
        console.log("--------------------------")
        console.log("--Dumping function table--")
        this.functionTable.debug();
    }

    private executeExpr(expr: Expr): any{
        expr.accept(this);
        return this.result;
    }

    private setVariableValueScopedOrGlobally(name: string, value: any): void{
        const scopedName = this.toScopedName(name);
        try{
            this.memoryTable.setVariableValue(scopedName, value);
        }
        catch (e){
            try{
                this.memoryTable.setVariableValue(`_${this.GLOBAL_SCOPE}_${name}`, value);
            }
            catch (e){
                throw Error(`Variable with name '${name}' not found.`);
            }
        }
    }

    private setVariableValueScoped(name: string, value: any): void{
        const scopedName = this.toScopedName(name);
        try{
            this.memoryTable.setVariableValue(scopedName, value);
        }
        catch (e){
            throw Error(`Variable with name '${name}' not found.`);
        }
    }

    private getVariableValueScopedOrGlobally(name: string): any{
        const scopedName = this.toScopedName(name);
        const variable = this.memoryTable.getVariable(scopedName)!;
        if(variable != null){
            return variable.value;
        }

        const globalVariable = this.memoryTable.getVariable(`_${this.GLOBAL_SCOPE}_${name}`);
        if(globalVariable != null){
            return globalVariable.value;
        }

        throw Error(`Variable with name '${name}' not found.`);
    }

    private getFunctionScopedOrGlobally(name: string): StoredFunction | null{
        const scopedName = this.toScopedName(name);
        const func = this.functionTable.getFunction(scopedName, this.getScope())!;
        if(func != null){
            return func;
        }

        const globalFunc = this.functionTable.getFunction(name, `_${this.GLOBAL_SCOPE}`);
        if(globalFunc != null){
            return globalFunc;
        }

        return null;
    }

    private toScopedName(name: string): string{
        return `${this.getScope()}_${name}`;
    }

    private getScope(): string{
        if(this.scope.empty()){
            return `_${this.GLOBAL_SCOPE}`;
        }
        return `_${this.scope.getAll()?.join("_")!}`;
    }
}
