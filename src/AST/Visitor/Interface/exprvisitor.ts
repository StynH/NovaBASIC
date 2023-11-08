import {BinaryExpr} from "../../Expressions/binaryexpr";
import {TernaryExpr} from "../../Expressions/ternaryExpr";
import {VariableExpr} from "../../Expressions/variableexpr";
import {VariableDeclarationExpr} from "../../Expressions/variabledeclarationexpr";
import {ConstantExpr} from "../../Expressions/constantexpr";
import {VariableValueChangeExpr} from "../../Expressions/variablevaluechangeexpr";
import {ArithmeticExpr} from "../../Expressions/STL/arithmeticexpr";
import {PrintExpr} from "../../Expressions/STL/printexpr";

export interface IExprVisitor{
    visitNullExpr(): void;
    visitBinaryExpr(expr: BinaryExpr): void;
    visitTernaryExpr(expr: TernaryExpr): void;
    visitVariableExpr(expr: VariableExpr): void;
    visitVariableDeclarationExpr(expr: VariableDeclarationExpr): void;
    visitVariableValueChangeExpr(expr: VariableValueChangeExpr): void;

    visitPrintExp(expr: PrintExpr): void;
    visitArithmeticExpr(expr: ArithmeticExpr): void;

    visitConstantExpr<T>(expr: ConstantExpr<T>): void;
}
