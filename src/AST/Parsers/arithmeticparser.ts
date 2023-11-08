import {ExpressionParser} from "./expressionparser";
import {CodeParser} from "../codeparser";
import {Queue} from "../../Data/queue";
import {Expr} from "../Expressions/expr";
import {Tokens} from "../Tokens/tokens";
import {ArithmeticExpr} from "../Expressions/STL/arithmeticexpr";
import {TokenConversionHelper} from "../Expressions/STL/Helpers/tokenconversionhelper";

export class ArithmeticParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        const variable = this.context.ParseTerm();
        if(this.tokens.pop() !== Tokens.BY){
            throw new Error(`Missing BY keyword for ${_token}.`)
        }

        return new ArithmeticExpr(variable, TokenConversionHelper.StlToOperator(_token), this.context.ParseExpression());
    }

}
