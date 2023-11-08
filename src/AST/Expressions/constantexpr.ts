import {Expr} from "./expr";
import {IExprVisitor} from "../Visitor/Interface/exprvisitor";

export class ConstantExpr<T> extends Expr{

    public constructor(
        public value: T
    )
    {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitConstantExpr(this);
    }

}
