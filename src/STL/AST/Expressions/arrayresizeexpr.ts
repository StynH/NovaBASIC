import {Expr} from "../../../AST/Expressions/expr";
import {IExprVisitor} from "../../../AST/Visitor/Interface/exprvisitor";

export class ArrayResizeExpr extends Expr {

    public constructor(
        public variable: string,
        public size: Expr,
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitArrayResizeExpr(this);
    }
}
