import {Expr} from "./expr";
import {IExprVisitor} from "../Visitor/Interface/exprvisitor";

export class VariableValueChangeExpr extends Expr{

    public constructor(
        public variable: string,
        public operator: string,
        public assignment: Expr
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitVariableValueChangeExpr(this);
    }
}
