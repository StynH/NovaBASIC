import {Expr} from "../expr";
import {IExprVisitor} from "../../Visitor/Interface/exprvisitor";

export class FunctionExpr extends Expr{

    public constructor(
        public value: string,
        public parameters: Expr[]
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitFunctionExpr(this);
    }

}
