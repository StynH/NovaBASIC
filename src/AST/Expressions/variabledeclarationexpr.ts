import {Expr} from "./expr";
import {IExprVisitor} from "../Visitor/Interface/exprvisitor";

export class VariableDeclarationExpr extends Expr{

    public constructor(
        public variable: string,
        public operator: string,
        public assignment: Expr
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitVariableDeclarationExpr(this);
    }
}
