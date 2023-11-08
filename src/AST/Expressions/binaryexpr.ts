import {Expr} from "./expr";
import {IExprVisitor} from "../Visitor/Interface/exprvisitor";

export class BinaryExpr extends Expr{

    public constructor(
        public leftExpr: Expr,
        public condition: string,
        public rightExpr: Expr
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitBinaryExpr(this);
    }

}
