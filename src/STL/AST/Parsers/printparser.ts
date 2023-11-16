import {ExpressionParser, Parser} from "../../../AST/Parsers/expressionparser";
import {CodeParser} from "../../../AST/codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../../AST/Expressions/expr";
import {Tokens} from "../../../AST/Tokens/tokens";
import {PrintExpr} from "../Expressions/printexpr";

@Parser(Tokens.PRINT_STL)
export class PrintParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        const value = this.context.parseExpression();
        const interpolation = [];

        while(this.tokens.length() > 0){
            if(this.tokens.peek() == Tokens.COMMA){
                this.tokens.pop();
                interpolation.push(this.context.parseExpression());
            }
            else{
                break;
            }
        }

        return new PrintExpr(value, interpolation);
    }

}
