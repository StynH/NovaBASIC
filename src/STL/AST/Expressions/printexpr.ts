import {Expr, ExprList} from "../../../AST/Expressions/expr";
import {IExprVisitor} from "../../../AST/Visitor/Interface/exprvisitor";

export class PrintExpr extends Expr{

    public constructor(
        public value: Expr,
        public interpolation: ExprList
    ) {
        super();
    }

    public accept(visitor: IExprVisitor) {
        visitor.visitPrintExp(this);
    }
}
