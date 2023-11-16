import {Expr} from "../../../AST/Expressions/expr";
import {IExprVisitor} from "../../../AST/Visitor/Interface/exprvisitor";

export class MathOperationExpr extends Expr {

    public constructor(
        public operation: string,
        public variable: Expr
    )
    {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitMathOperationExpr(this);
    }
}
