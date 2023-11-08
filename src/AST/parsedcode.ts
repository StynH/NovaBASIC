import { Expr } from "./Expressions/expr";
import {IExprVisitor} from "./Visitor/Interface/exprvisitor";

export class ParsedCode {

    public constructor(
        public expressions: Expr[] = []
    ) {
    }

    public execute(visitor: IExprVisitor){
        this.expressions.forEach(expr =>
            expr.accept(visitor)
        );
    }
}
