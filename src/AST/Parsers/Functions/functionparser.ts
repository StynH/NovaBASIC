import {ExpressionParser} from "../expressionparser";
import {CodeParser} from "../../codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../Expressions/expr";
import {functionTryParse} from "../../../Data/Helpers/tryparse";
import {FunctionExpr} from "../../Expressions/Functions/functionexpr";
import {Tokens} from "../../Tokens/tokens";

export class FunctionParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        const variableParse = functionTryParse(_token);

        const parameters = [];
        while(this.tokens.peek() != Tokens.CLOSING_PARENTHESIS){
            parameters.push(this.context.parseExpression());
            if(this.tokens.peek() == Tokens.COMMA){
                this.tokens.pop();
            }
        }
        this.tokens.pop();

        return new FunctionExpr(variableParse[1], parameters);
    }

}
