import {Expr} from "./expr";
import { IExprVisitor } from "../Visitor/Interface/exprvisitor";

export class TernaryExpr extends Expr {

    constructor(
        public condition: Expr,
        public falseExpr: Expr,
        public trueExpr: Expr
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitTernaryExpr(this);
    }

}
