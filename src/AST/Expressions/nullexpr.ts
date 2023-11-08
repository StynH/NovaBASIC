import {Expr} from "./expr";
import {IExprVisitor} from "../Visitor/Interface/exprvisitor";

export class NullExpr extends Expr{

    public constructor() {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitNullExpr();
    }

}
