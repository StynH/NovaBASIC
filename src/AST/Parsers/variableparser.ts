import {ExpressionParser} from "./expressionparser";
import {CodeParser} from "../codeparser";
import {Queue} from "../../Data/queue";
import {Expr} from "../Expressions/expr";
import {Tokens} from "../Tokens/tokens";
import {VariableValueChangeExpr} from "../Expressions/variablevaluechangeexpr";
import {VariableExpr} from "../Expressions/variableexpr";
import {variableTryParse} from "../../Data/Helpers/tryparse";

export class VariableParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        const variableParse = variableTryParse(_token);
        if(this.tokens.peek() === Tokens.SET){
            const operator = this.tokens.pop() as string;
            return new VariableValueChangeExpr(_token, operator, this.context.parseExpression());
        }
        return new VariableExpr(variableParse[1]);
    }

}
