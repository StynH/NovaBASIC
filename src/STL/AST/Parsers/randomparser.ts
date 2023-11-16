import {ExpressionParser, Parser} from "../../../AST/Parsers/expressionparser";
import {CodeParser} from "../../../AST/codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../../AST/Expressions/expr";
import {RandomExpr} from "../Expressions/randomexpr";
import {Tokens} from "../../../AST/Tokens/tokens";

@Parser(Tokens.RANDOM_STL)
export class RandomParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        if(this.tokens.peek() == Tokens.CLOSING_PARENTHESIS){
            throw new Error("RAND requires at least a minimum and maximum.");
        }

        const min = this.context.parseExpression();
        if(this.tokens.peek() != Tokens.COMMA){
            throw new Error("RAND requires at least a minimum and maximum.");
        }
        this.tokens.pop();
        const max = this.context.parseExpression();

        let inclusive = null;
        let seed = null;

        if(this.tokens.peek() == Tokens.COMMA){
            this.tokens.pop();
            inclusive = this.context.parseExpression();
            if(this.tokens.peek() == Tokens.COMMA){
                this.tokens.pop();
                seed = this.context.parseExpression();
            }
        }

        if(this.tokens.peek() != Tokens.CLOSING_PARENTHESIS){
            throw new Error("Malformed RAND, missing ).");
        }
        this.tokens.pop();
        return new RandomExpr(min, max, inclusive, seed);
    }

}
