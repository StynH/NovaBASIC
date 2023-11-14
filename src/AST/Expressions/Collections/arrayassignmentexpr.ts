import {Expr, ExprList} from "../expr";
import {IExprVisitor} from "../../Visitor/Interface/exprvisitor";

export class ArrayAssignmentExpr extends Expr{

    public constructor(
        public variable: string,
        public indexer: Expr | ExprList,
        public value: Expr
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitArrayAssignmentExpr(this);
    }

}
