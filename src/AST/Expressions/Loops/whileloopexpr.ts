import {Expr, ExprList} from "../expr";
import {IExprVisitor} from "../../Visitor/Interface/exprvisitor";

export class WhileLoopExpr extends Expr{

    public constructor(
        public condition: Expr,
        public exprTree: ExprList,
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitWhileLoopExpr(this);
    }

}
