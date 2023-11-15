import {Expr} from "../../../AST/Expressions/expr";
import {IExprVisitor} from "../../../AST/Visitor/Interface/exprvisitor";

export class LengthExpr extends Expr {

    public constructor(
        public variable: string
    )
    {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitLengthExpr(this);
    }
}
