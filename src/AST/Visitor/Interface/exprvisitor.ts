import {BinaryExpr} from "../../Expressions/binaryexpr";
import {TernaryExpr} from "../../Expressions/ternaryExpr";
import {VariableExpr} from "../../Expressions/variableexpr";
import {VariableDeclarationExpr} from "../../Expressions/variabledeclarationexpr";
import {ConstantExpr} from "../../Expressions/constantexpr";
import {VariableValueChangeExpr} from "../../Expressions/variablevaluechangeexpr";
import {ArithmeticExpr} from "../../../STL/AST/Expressions/arithmeticexpr";
import {PrintExpr} from "../../../STL/AST/Expressions/printexpr";
import {ConditionalExpr} from "../../Expressions/Conditional/conditionalexpr";
import {FunctionExpr} from "../../Expressions/Functions/functionexpr";
import {FunctionDeclarationExpr} from "../../Expressions/Functions/functiondeclarationexpr";
import {ReturnExpr} from "../../Expressions/Functions/returnexpr";

export interface IExprVisitor{
    visitNullExpr(): void;
    visitBinaryExpr(expr: BinaryExpr): void;
    visitTernaryExpr(expr: TernaryExpr): void;
    visitVariableExpr(expr: VariableExpr): void;
    visitVariableDeclarationExpr(expr: VariableDeclarationExpr): void;
    visitVariableValueChangeExpr(expr: VariableValueChangeExpr): void;

    visitConditionalExpr(expr: ConditionalExpr): void;

    visitFunctionExpr(expr: FunctionExpr): void;
    visitFunctionDeclarationExpr(expr: FunctionDeclarationExpr): void;
    visitReturnExpr(expr: ReturnExpr): void;

    visitPrintExp(expr: PrintExpr): void;
    visitArithmeticExpr(expr: ArithmeticExpr): void;

    visitConstantExpr<T>(expr: ConstantExpr<T>): void;
}
