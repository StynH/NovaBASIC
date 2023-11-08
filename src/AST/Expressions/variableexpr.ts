import {Expr} from "./expr";
import {IExprVisitor} from "../Visitor/Interface/exprvisitor";

export class VariableExpr extends Expr{

    public constructor(
        public value: string
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitVariableExpr(this);
    }

}
