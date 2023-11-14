import {Expr, ExprList} from "../expr";
import {IExprVisitor} from "../../Visitor/Interface/exprvisitor";

export class ConditionalExpr extends Expr{

    public constructor(
        public condition: Expr,
        public trueExprTree: ExprList,
        public elseExpr: Expr | null
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitConditionalExpr(this);
    }

}
