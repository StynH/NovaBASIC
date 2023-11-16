import {ExpressionParser, Parser} from "../expressionparser";
import {CodeParser} from "../../codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../Expressions/expr";
import {ReturnExpr} from "../../Expressions/Functions/returnexpr";
import {Tokens} from "../../Tokens/tokens";

@Parser(Tokens.RETURN)
export class ReturnParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        return new ReturnExpr(this.context.parseExpression());
    }

}
