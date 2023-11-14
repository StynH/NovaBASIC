import {ExprList} from "./Expressions/expr";
import {IExprVisitor} from "./Visitor/Interface/exprvisitor";
import {moveToFront} from "../Data/Helpers/arrayhelpers";
import {FunctionDeclarationExpr} from "./Expressions/Functions/functiondeclarationexpr";

export class ParsedCode {

    public constructor(
        public expressions: ExprList = []
    ) {
    }

    public execute(visitor: IExprVisitor): void{
        this.expressions.forEach(expr =>
            expr.accept(visitor)
        );
    }

    public MoveFunctionsToTheFront(): void{
        this.expressions = moveToFront(this.expressions, expr => expr instanceof FunctionDeclarationExpr);
    }
}
