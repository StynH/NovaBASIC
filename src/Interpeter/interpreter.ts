import {BinaryExpr} from "../AST/Expressions/binaryexpr";
import {TernaryExpr} from "../AST/Expressions/ternaryExpr";
import {VariableExpr} from "../AST/Expressions/variableexpr";
import {VariableDeclarationExpr} from "../AST/Expressions/variabledeclarationexpr";
import {ConstantExpr} from "../AST/Expressions/constantexpr";
import {MemoryTable} from "./Memory/memorytable";
import {Expr} from "../AST/Expressions/expr";
import {Tokens} from "../AST/Tokens/tokens";
import {VariableValueChangeExpr} from "../AST/Expressions/variablevaluechangeexpr"
import {ArithmeticExpr} from "../STL/AST/Expressions/arithmeticexpr";
import {ConditionalExpr} from "../AST/Expressions/Conditional/conditionalexpr";
import {FunctionTable, StoredFunction} from "./Memory/functiontable";
import {FunctionDeclarationExpr} from "../AST/Expressions/Functions/functiondeclarationexpr";
import {FunctionExpr} from "../AST/Expressions/Functions/functionexpr";
import {GarbageCollector} from "./Memory/garbagecollector";
import {ReturnExpr} from "../AST/Expressions/Functions/returnexpr";
import {ForLoopExpr} from "../AST/Expressions/Loops/forloopexpr";
import {ScopeManager} from "./Memory/scopemanager";
import {GuardExpr} from "../AST/Expressions/Conditional/guardexpr";
import {RegexTester} from "../STL/Functionality/regextester";
import {ArrayOperationExpr} from "../AST/Expressions/Collections/arrayoperationexpr";
import {ArrayAssignmentExpr} from "../AST/Expressions/Collections/arrayassignmentexpr";
import {ArrayDeclarationExpr} from "../AST/Expressions/Collections/arraydeclarationexpr";
import {BaseInterpreter} from "./Abstract/baseinterpreter";
import {StandardLibraryInterpreter} from "../STL/Interpreter/standardlibraryinterpreter";
import {PrintExpr} from "../STL/AST/Expressions/printexpr";
import {ArrayResizeExpr} from "../STL/AST/Expressions/arrayresizeexpr";
import {LengthExpr} from "../STL/AST/Expressions/lengthexpr";

export class Interpreter extends BaseInterpreter {

    public static readonly GLOBAL_SCOPE = "GLOBAL";

    private readonly stlInterpreter: StandardLibraryInterpreter;

    private readonly memoryTable: MemoryTable;
    private readonly functionTable: FunctionTable;
    private gc: GarbageCollector;
    private scopeManager: ScopeManager;

    private regexTester: RegexTester;

    public result: any | null;

    private returnCalled: boolean;
    private breakCalled: boolean;

    public constructor() {
        super();
        this.stlInterpreter = new StandardLibraryInterpreter(this);

        this.memoryTable = new MemoryTable();
        this.functionTable = new FunctionTable();
        this.gc = new GarbageCollector(this.memoryTable, this.functionTable, true);
        this.scopeManager = new ScopeManager();

        this.regexTester = new RegexTester();

        this.result = null;

        this.returnCalled = false;
        this.breakCalled = false;
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
            case Tokens.MODULO:
                this.result = lhs % rhs;
                break;
            case Tokens.EQUALS:
                this.result = lhs === rhs;
                break;
            case Tokens.NOT_EQUALS:
                this.result = lhs !== rhs;
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
            case Tokens.MATCHES_STL:
                this.result = this.regexTester.testRegex(rhs, lhs);
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
        const scopedName = this.scopeManager.toScopedName(expr.variable);
        this.memoryTable.setVariable(scopedName, this.executeExpr(expr.assignment));
        this.result = scopedName;
    }

    public visitVariableValueChangeExpr(expr: VariableValueChangeExpr): void{
        this.setVariableValueScopedOrGlobally(expr.variable, this.executeExpr(expr.assignment));
    }

    public visitVariableExpr(expr: VariableExpr): void {
        this.result = this.getVariableValueScopedOrGlobally(expr.value);
    }

    public visitArithmeticExpr(expr: ArithmeticExpr): void {
        const variableExpr = expr.variable as VariableExpr;
        const scopedName = this.scopeManager.toScopedName(variableExpr.value);
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
        this.scopeManager.addScope("IF");

        let currentExpr: ConditionalExpr | null = expr;
        let result = false;
        while(!result && currentExpr != null){
            result = this.executeExpr(currentExpr.condition);
            if(!result){
                currentExpr = currentExpr.elseExpr as ConditionalExpr;
            }
        }

        if(result && currentExpr != null){
            for (const subExpr of currentExpr.trueExprTree) {
                this.executeExpr(subExpr);
            }
        }

        this.gc.destroyScope(this.scopeManager.getScope());
        this.scopeManager.popScope();
    }

    public visitFunctionDeclarationExpr(expr: FunctionDeclarationExpr): void {
        this.functionTable.setFunction(expr, this.scopeManager.getScope());
    }

    public visitFunctionExpr(expr: FunctionExpr): void {
        const func = this.getFunctionScopedOrGlobally(expr.value);
        if(func != null){
            this.scopeManager.addScope(expr.value);
            for (let i = 0; i < func.value.parameters.length; ++i) {
                this.scopeManager.popScope();
                const parameter = func.value.parameters[i];
                if(expr.parameters.length <= i){
                    throw new Error(`Missing required parameter '${parameter}' for function '${expr.value}'.`)
                }

                const value = this.executeExpr(expr.parameters[i]);
                this.scopeManager.addScope(expr.value);
                this.memoryTable.setVariable(this.scopeManager.toScopedName(parameter), value);
            }

            for (const expr of func.value.exprTree) {
                this.executeExpr(expr);
                if(this.returnCalled){
                    break;
                }
            }

            if(this.returnCalled){
                this.returnCalled = false;
            }
            else{
                this.result = null;
            }

            this.gc.destroyScope(this.scopeManager.getScope());
            this.scopeManager.popScope();
            return;
        }
        throw new Error(`Unknown subroutine call: ${expr.value}.`);
    }

    public visitReturnExpr(expr: ReturnExpr): void {
        this.result = this.executeExpr(expr.expr);
        this.returnCalled = true;
    }

    public visitForLoopExpr(expr: ForLoopExpr): void {
        this.scopeManager.addScope("FOR_LOOP");

        const variable = expr.init instanceof VariableExpr ? expr.init.value : this.executeExpr(expr.init);
        const condition = this.executeExpr(expr.to);

        let loopValue = this.getVariableValueScopedOrGlobally(variable);
        while(loopValue < condition && !this.breakCalled){
            this.scopeManager.addScope("INNER");
            for(const innerExpr of expr.exprTree){
                const result = this.executeExpr(innerExpr);
                if(this.returnCalled){
                    this.result = result;
                    break;
                }
            }

            if(this.returnCalled){
                this.gc.destroyScope(this.scopeManager.getScope());
                this.scopeManager.popScope();
                break;
            }

            const step = this.executeExpr(expr.step);
            const value = this.getVariableValueScopedOrGlobally(variable) + step;
            this.setVariableValueScopedOrGlobally(variable, value);
            loopValue = this.getVariableValueScopedOrGlobally(variable);

            this.gc.destroyScope(this.scopeManager.getScope());
            this.scopeManager.popScope();
        }

        this.gc.destroyScope(this.scopeManager.getScope());
        this.scopeManager.popScope();
    }

    public visitGuardCondition(expr: GuardExpr): void {
        this.scopeManager.addScope("GUARD");

        const result = this.executeExpr(expr.condition);
        if(result == false){
            for (const subExpr of expr.failExprTree) {
                this.executeExpr(subExpr);
            }
        }

        this.scopeManager.popScope();
    }

    public visitArrayAssignmentExpr(expr: ArrayAssignmentExpr): void {
        const variable = this.getVariableValueScopedOrGlobally(expr.variable);
        const value = this.executeExpr(expr.value);

        if(!Array.isArray(variable)){
            throw new Error(`${expr.variable} is not an array yet indexed like one.`)
        }

        let indexer;
        if(Array.isArray(expr.indexer)){
            indexer = [];
            for(const indexExpr of expr.indexer){
                indexer.push(this.executeExpr(indexExpr));
            }

            let subResult = variable;
            for(let i = 0; i < indexer.length - 1; ++i){
                if((subResult as any[]).length > indexer[i]){
                    subResult = subResult[indexer[i]];
                }
                else{
                    throw new Error(`Unknown index ${indexer} for array ${subResult}.`);
                }
            }
            subResult[indexer[indexer.length - 1]] = value;
        }
        else{
            indexer = this.executeExpr(expr.indexer);
            if((variable as any[]).length > indexer){
                variable[indexer] = value;
            }
            else{
                throw new Error(`Unknown index ${indexer} for array ${variable}.`);
            }
        }
    }

    public visitArrayDeclarationExpr(expr: ArrayDeclarationExpr): void {
        const newArray = [];
        for(const initExpr of expr.initializerList){
            newArray.push(this.executeExpr(initExpr));
        }
        this.result = newArray;
    }

    public visitArrayOperationExpr(expr: ArrayOperationExpr): void {
        const variable = this.getVariableValueScopedOrGlobally(this.executeExpr(expr.variable));
        let indexer;
        if(Array.isArray(expr.indexer)){
            indexer = [];
            for(const indexExpr of expr.indexer){
                indexer.push(this.executeExpr(indexExpr));
            }

            let subResult = variable;
            for(let i = 0; i < indexer.length; ++i){
                if((subResult as any[]).length > indexer[i]){
                    subResult = subResult[indexer[i]];
                }
                else{
                    throw new Error(`Unknown index ${indexer} for array ${subResult}.`);
                }
            }
            this.result = subResult;
        }
        else{
            indexer = this.executeExpr(expr.indexer);
            if((variable as any[]).length > indexer){
                this.result = variable[indexer];
            }
            else{
                throw new Error(`Unknown index ${indexer} for array ${variable.name}.`);
            }
        }
    }

    //STL
    public visitPrintExp(expr: PrintExpr): void {
        this.stlInterpreter.visitPrintExp(expr);
    }

    public visitArrayResizeExpr(expr: ArrayResizeExpr): void {
        this.stlInterpreter.visitArrayResizeExpr(expr);
    }

    public visitLengthExpr(expr: LengthExpr): void {
        this.stlInterpreter.visitLengthExpr(expr);
    }

    public debug(): void{
        console.log("--Dumping memory table--")
        this.memoryTable.debug();
        console.log("--------------------------")
        console.log("--Dumping function table--")
        this.functionTable.debug();
    }

    public executeExpr(expr: Expr): any{
        expr.accept(this);
        return this.result;
    }

    public setVariableValueScopedOrGlobally(name: string, value: any): void{
        const variable = this.getVariableScopedOrGlobally(name);
        this.memoryTable.setVariableValue(variable.name, value);
    }

    public getVariableScopedOrGlobally(name: string): any{
        const variable = this.memoryTable.getVariable(name);
        if(variable != null){
            return variable;
        }

        let scopeAmount = this.scopeManager.amountOfScopes();
        while(scopeAmount > 0){
            const scopedName = this.scopeManager.toScopedName(name, scopeAmount);
            const variable = this.memoryTable.getVariable(scopedName);
            if(variable != null){
                return variable;
            }

            --scopeAmount;
        }

        const globalVariable = this.memoryTable.getVariable(`_${Interpreter.GLOBAL_SCOPE}_${name}`);
        if(globalVariable != null){
            return globalVariable;
        }

        throw Error(`Variable with name '${name}' not found.`);
    }

    public getVariableValueScopedOrGlobally(name: string): any{
        const variable = this.memoryTable.getVariable(name);
        if(variable != null){
            return variable.value;
        }

        let scopeAmount = this.scopeManager.amountOfScopes();
        while(scopeAmount > 0){
            const scopedName = this.scopeManager.toScopedName(name, scopeAmount);
            const variable = this.memoryTable.getVariable(scopedName)!;
            if(variable != null){
                return variable.value;
            }

            --scopeAmount;
        }

        const globalVariable = this.memoryTable.getVariable(`_${Interpreter.GLOBAL_SCOPE}_${name}`);
        if(globalVariable != null){
            return globalVariable.value;
        }

        throw Error(`Variable with name '${name}' not found.`);
    }

    public getFunctionScopedOrGlobally(name: string): StoredFunction | null{
        const scopedName = this.scopeManager.toScopedName(name);
        const func = this.functionTable.getFunction(scopedName, this.scopeManager.getScope())!;
        if(func != null){
            return func;
        }

        const globalFunc = this.functionTable.getFunction(name, `_${Interpreter.GLOBAL_SCOPE}`);
        if(globalFunc != null){
            return globalFunc;
        }

        return null;
    }
}
