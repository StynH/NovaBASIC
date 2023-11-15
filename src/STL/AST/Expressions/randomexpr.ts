import {Expr} from "../../../AST/Expressions/expr";
import {IExprVisitor} from "../../../AST/Visitor/Interface/exprvisitor";

export class RandomExpr extends Expr{

    public constructor(
        public min: Expr,
        public max: Expr,
        public inclusive: Expr | null,
        public seed: Expr | null
    ) {
        super();
    }

    public accept(visitor: IExprVisitor) {
        visitor.visitRandomExpr(this);
    }
}
