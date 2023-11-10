import {ExpressionParser} from "../../../AST/Parsers/expressionparser";
import {CodeParser} from "../../../AST/codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../../AST/Expressions/expr";
import {Tokens} from "../../../AST/Tokens/tokens";
import {PrintExpr} from "../Expressions/printexpr";

export class PrintParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        const value = this.tokens.pop() as string;
        if(this.tokens.peek() == Tokens.COMMA){
            this.tokens.pop();
            return new PrintExpr(value, this.context.parseExpression())
        }

        return new PrintExpr(value);
    }

}
