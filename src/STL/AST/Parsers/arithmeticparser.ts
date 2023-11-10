import {ExpressionParser} from "../../../AST/Parsers/expressionparser";
import {CodeParser} from "../../../AST/codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../../AST/Expressions/expr";
import {Tokens} from "../../../AST/Tokens/tokens";
import {ArithmeticExpr} from "../Expressions/arithmeticexpr";
import {TokenHelpers} from "../Helpers/tokenhelpers";

export class ArithmeticParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        const variable = this.context.parseTerm();
        if(this.tokens.pop() !== Tokens.BY){
            throw new Error(`Missing BY keyword for ${_token}.`)
        }

        return new ArithmeticExpr(variable, TokenHelpers.StlToOperator(_token), this.context.parseExpression());
    }

}
