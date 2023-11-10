import {Expr} from "../../../AST/Expressions/expr";
import {IExprVisitor} from "../../../AST/Visitor/Interface/exprvisitor";

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
