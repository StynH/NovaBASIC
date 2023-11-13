import {Expr} from "../../../AST/Expressions/expr";
import {IExprVisitor} from "../../../AST/Visitor/Interface/exprvisitor";

export class PrintExpr extends Expr{

    public constructor(
        public value: string,
        public interpolation: Expr[]
    ) {
        super();
    }

    public accept(visitor: IExprVisitor) {
        visitor.visitPrintExp(this);
    }
}
