import {Expr} from "../expr";
import {IExprVisitor} from "../../Visitor/Interface/exprvisitor";

export class FunctionDeclarationExpr extends Expr{

    public constructor(
        public name: string,
        public exprTree: Expr[],
        public parameters: string[]
    ) {
        super();
    }

    public accept(visitor: IExprVisitor): void {
        visitor.visitFunctionDeclarationExpr(this);
    }

}
