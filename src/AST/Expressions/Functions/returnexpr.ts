import {Expr} from "../expr";
import {IExprVisitor} from "../../Visitor/Interface/exprvisitor";

export class ReturnExpr extends Expr{

    public constructor(
        public expr: Expr
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitReturnExpr(this);
    }

}
