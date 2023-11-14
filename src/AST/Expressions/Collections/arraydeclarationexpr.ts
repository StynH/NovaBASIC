import {Expr, ExprList} from "../expr";
import {IExprVisitor} from "../../Visitor/Interface/exprvisitor";

export class ArrayDeclarationExpr extends Expr{

    public constructor(
        public initializerList: ExprList
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitArrayDeclarationExpr(this);
    }

}
