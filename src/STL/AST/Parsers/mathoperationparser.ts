import {ExpressionParser, Parser} from "../../../AST/Parsers/expressionparser";
import {CodeParser} from "../../../AST/codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../../AST/Expressions/expr";
import {MathOperationExpr} from "../Expressions/mathoperationexpr";
import {Tokens} from "../../../AST/Tokens/tokens";

@Parser("MATH")
export class MathOperationParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        const operation = _token.slice(0, -1);
        const variable = this.context.parseExpression();

        if(this.tokens.peek() != Tokens.CLOSING_PARENTHESIS){
            throw new Error(`Malformed '${operation}', missing ).`)
        }
        this.tokens.pop();

        return new MathOperationExpr(operation, variable);
    }

}
