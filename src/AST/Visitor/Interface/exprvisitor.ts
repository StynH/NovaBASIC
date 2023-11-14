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
import {ForLoopExpr} from "../../Expressions/Loops/forloopexpr";
import {GuardExpr} from "../../Expressions/Conditional/guardexpr";
import {ArrayOperationExpr} from "../../Expressions/Collections/arrayoperationexpr";
import {ArrayDeclarationExpr} from "../../Expressions/Collections/arraydeclarationexpr";
import {ArrayAssignmentExpr} from "../../Expressions/Collections/arrayassignmentexpr";
import {ArraySizeExpr} from "../../../STL/AST/Expressions/arraysizeexpr";

export interface IExprVisitor{
    visitNullExpr(): void;
    visitBinaryExpr(expr: BinaryExpr): void;
    visitTernaryExpr(expr: TernaryExpr): void;
    visitVariableExpr(expr: VariableExpr): void;
    visitVariableDeclarationExpr(expr: VariableDeclarationExpr): void;
    visitVariableValueChangeExpr(expr: VariableValueChangeExpr): void;

    visitConditionalExpr(expr: ConditionalExpr): void;
    visitGuardCondition(expr: GuardExpr): void;

    visitArrayOperationExpr(expr: ArrayOperationExpr): void;
    visitArrayDeclarationExpr(expr: ArrayDeclarationExpr): void;
    visitArrayAssignmentExpr(expr: ArrayAssignmentExpr): void;

    visitFunctionExpr(expr: FunctionExpr): void;
    visitFunctionDeclarationExpr(expr: FunctionDeclarationExpr): void;
    visitReturnExpr(expr: ReturnExpr): void;
    visitForLoopExpr(expr: ForLoopExpr): void;

    visitPrintExp(expr: PrintExpr): void;
    visitArithmeticExpr(expr: ArithmeticExpr): void;
    visitArraySizeExpr(expr: ArraySizeExpr): void;

    visitConstantExpr<T>(expr: ConstantExpr<T>): void;
}
