import {Expr} from "../expr";
import {IExprVisitor} from "../../Visitor/Interface/exprvisitor";

export class GuardExpr extends Expr{

    public constructor(
        public condition: Expr,
        public failExprTree: Expr[]
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitGuardCondition(this);
    }

}
