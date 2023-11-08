import {Queue} from "../../Data/queue";
import {CodeParser} from "../codeparser";
import {Expr} from "../Expressions/expr";

export abstract class ExpressionParser{

    protected constructor(
        protected context: CodeParser,
        protected tokens: Queue<string>
    ) {
    }

    public abstract parse(_token: string): Expr;
}
