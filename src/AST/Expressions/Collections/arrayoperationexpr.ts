import {Expr, ExprList} from "../expr";
import {IExprVisitor} from "../../Visitor/Interface/exprvisitor";

export class ArrayOperationExpr extends Expr{

    public constructor(
        public variable: Expr,
        public indexer: Expr | ExprList
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitArrayOperationExpr(this);
    }

}
