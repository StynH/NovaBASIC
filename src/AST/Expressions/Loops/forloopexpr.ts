import {Expr, ExprList} from "../expr";
import {IExprVisitor} from "../../Visitor/Interface/exprvisitor";

export class ForLoopExpr extends Expr{

    public constructor(
        public init: Expr,
        public to: Expr,
        public exprTree: ExprList,
        public step: Expr,
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitForLoopExpr(this);
    }

}
