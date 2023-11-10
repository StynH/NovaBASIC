import {ExpressionParser} from "../expressionparser";
import {CodeParser} from "../../codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../Expressions/expr";
import {functionTryParse} from "../../../Data/Helpers/tryparse";
import {FunctionExpr} from "../../Expressions/Functions/functionexpr";
import {ConstantExpr} from "../../Expressions/constantexpr";

export class FunctionParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        const variableParse = functionTryParse(_token);
        return new FunctionExpr(variableParse[1], variableParse[2].map(
            variable => new ConstantExpr<string>(variable)
        ));
    }

}
