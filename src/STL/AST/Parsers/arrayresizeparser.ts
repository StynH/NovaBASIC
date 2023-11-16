import {ExpressionParser, Parser} from "../../../AST/Parsers/expressionparser";
import {CodeParser} from "../../../AST/codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../../AST/Expressions/expr";
import {Tokens} from "../../../AST/Tokens/tokens";
import {ArrayResizeExpr} from "../Expressions/arrayresizeexpr";

@Parser(Tokens.ARRAY_RESIZE_STL)
export class ArrayResizeParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        if(!_token.endsWith(Tokens.OPENING_PARENTHESIS)){
            throw new Error(`Malformed ${Tokens.ARRAY_RESIZE_STL}, missing (.`);
        }

        const variable = this.context.parseExpression();
        this.tokens.pop();
        const size = this.context.parseExpression();

        if(this.tokens.peek() == Tokens.CLOSING_PARENTHESIS){
            this.tokens.pop();
        }
        else{
            throw new Error(`Malformed ${Tokens.ARRAY_RESIZE_STL}, missing (.`);
        }

        return new ArrayResizeExpr(variable, size);
    }

}
