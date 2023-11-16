import {IExprVisitor} from "../../AST/Visitor/Interface/exprvisitor";
import {ArithmeticExpr} from "../../STL/AST/Expressions/arithmeticexpr";
import {ArrayAssignmentExpr} from "../../AST/Expressions/Collections/arrayassignmentexpr";
import {ArrayDeclarationExpr} from "../../AST/Expressions/Collections/arraydeclarationexpr";
import {ArrayOperationExpr} from "../../AST/Expressions/Collections/arrayoperationexpr";
import {ArrayResizeExpr} from "../../STL/AST/Expressions/arrayresizeexpr";
import {BinaryExpr} from "../../AST/Expressions/binaryexpr";
import {ConditionalExpr} from "../../AST/Expressions/Conditional/conditionalexpr";
import {ConstantExpr} from "../../AST/Expressions/constantexpr";
import {ForLoopExpr} from "../../AST/Expressions/Loops/forloopexpr";
import {FunctionDeclarationExpr} from "../../AST/Expressions/Functions/functiondeclarationexpr";
import {FunctionExpr} from "../../AST/Expressions/Functions/functionexpr";
import {GuardExpr} from "../../AST/Expressions/Conditional/guardexpr";
import {PrintExpr} from "../../STL/AST/Expressions/printexpr";
import {ReturnExpr} from "../../AST/Expressions/Functions/returnexpr";
import {TernaryExpr} from "../../AST/Expressions/ternaryExpr";
import {VariableDeclarationExpr} from "../../AST/Expressions/variabledeclarationexpr";
import {VariableExpr} from "../../AST/Expressions/variableexpr";
import {VariableValueChangeExpr} from "../../AST/Expressions/variablevaluechangeexpr";
import {LengthExpr} from "../../STL/AST/Expressions/lengthexpr";
import {RandomExpr} from "../../STL/AST/Expressions/randomexpr";
import {MathOperationExpr} from "../../STL/AST/Expressions/mathoperationexpr";

export abstract class BaseInterpreter implements IExprVisitor{
    public visitArithmeticExpr(_expr: ArithmeticExpr): void {
    }

    public visitArrayAssignmentExpr(_expr: ArrayAssignmentExpr): void {
    }

    public visitArrayDeclarationExpr(_expr: ArrayDeclarationExpr): void {
    }

    public visitArrayOperationExpr(_expr: ArrayOperationExpr): void {
    }

    public visitArrayResizeExpr(_expr: ArrayResizeExpr): void {
    }

    public visitBinaryExpr(_expr: BinaryExpr): void {
    }

    public visitConditionalExpr(_expr: ConditionalExpr): void {
    }

    public visitConstantExpr<T>(_expr: ConstantExpr<T>): void {
    }

    public visitForLoopExpr(_expr: ForLoopExpr): void {
    }

    public visitFunctionDeclarationExpr(_expr: FunctionDeclarationExpr): void {
    }

    public visitFunctionExpr(_expr: FunctionExpr): void {
    }

    public visitGuardCondition(_expr: GuardExpr): void {
    }

    public visitNullExpr(): void {
    }

    public visitPrintExp(_expr: PrintExpr): void {
    }

    public visitReturnExpr(_expr: ReturnExpr): void {
    }

    public visitTernaryExpr(_expr: TernaryExpr): void {
    }

    public visitVariableDeclarationExpr(_expr: VariableDeclarationExpr): void {
    }

    public visitVariableExpr(_expr: VariableExpr): void {
    }

    public visitVariableValueChangeExpr(_expr: VariableValueChangeExpr): void {
    }

    public visitLengthExpr(_expr: LengthExpr): void {
    }

    public visitRandomExpr(_expr: RandomExpr): void {
    }

    public visitMathOperationExpr(_expr: MathOperationExpr): void {
    }
}
