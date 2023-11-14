import {Expr, ExprList} from "../expr";
import {IExprVisitor} from "../../Visitor/Interface/exprvisitor";

export class FunctionDeclarationExpr extends Expr{

    public constructor(
        public name: string,
        public exprTree: ExprList,
        public parameters: string[]
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitFunctionDeclarationExpr(this);
    }

}
