import {ExpressionParser} from "../../../AST/Parsers/expressionparser";
import {CodeParser} from "../../../AST/codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../../AST/Expressions/expr";
import {Tokens} from "../../../AST/Tokens/tokens";
import {VariableExpr} from "../../../AST/Expressions/variableexpr";
import {LengthExpr} from "../Expressions/lengthexpr";

export class LengthParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        if(!_token.endsWith(Tokens.OPENING_PARENTHESIS)){
            throw new Error(`Malformed ${Tokens.LENGTH_STL}, missing (.`);
        }

        const variable = this.context.parseExpression() as VariableExpr;

        if(this.tokens.peek() == Tokens.CLOSING_PARENTHESIS){
            this.tokens.pop();
        }
        else{
            throw new Error(`Malformed ${Tokens.LENGTH_STL}, missing ).`);
        }

        return new LengthExpr(variable.value);
    }

}
