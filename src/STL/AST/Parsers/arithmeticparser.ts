import {ExpressionParser, Parser} from "../../../AST/Parsers/expressionparser";
import {CodeParser} from "../../../AST/codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../../AST/Expressions/expr";
import {Tokens} from "../../../AST/Tokens/tokens";
import {ArithmeticExpr} from "../Expressions/arithmeticexpr";
import {TokenHelpers} from "../Helpers/tokenhelpers";

@Parser("ARITHMETIC")
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

        const expr = this.context.parseExpression();
        if(expr instanceof ArithmeticExpr){
            new ArithmeticExpr(expr, TokenHelpers.StlToOperator(_token), variable)
        }
        return new ArithmeticExpr(variable, TokenHelpers.StlToOperator(_token), expr);
    }

}
