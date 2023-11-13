import {Expr} from "../expr";
import {IExprVisitor} from "../../Visitor/Interface/exprvisitor";

export class ForLoopExpr extends Expr{

    public constructor(
        public init: Expr,
        public to: Expr,
        public exprTree: Expr[],
        public step: Expr,
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitForLoopExpr(this);
    }

}
