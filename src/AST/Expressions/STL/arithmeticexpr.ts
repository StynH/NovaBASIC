import {Expr} from "../expr";
import {IExprVisitor} from "../../Visitor/Interface/exprvisitor";

export class ArithmeticExpr extends Expr{

    public constructor(
        public variable: Expr,
        public operator: string,
        public mutation: Expr
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitArithmeticExpr(this);
    }

}
