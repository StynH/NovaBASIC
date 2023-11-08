import {Expr} from "../expr";
import {IExprVisitor} from "../../Visitor/Interface/exprvisitor";

export class PrintExpr extends Expr{

    public constructor(
        public value: string,
        public interpolationExpr: Expr | null = null
    ) {
        super();
    }

    public accept(visitor: IExprVisitor) {
        visitor.visitPrintExp(this);
    }
}
