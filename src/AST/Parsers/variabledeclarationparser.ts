import {ExpressionParser} from "./expressionparser";
import {Queue} from "../../Data/queue";
import {Tokens} from "../Tokens/tokens";
import {VariableDeclarationExpr} from "../Expressions/variabledeclarationexpr";
import {CodeParser} from "../codeparser";
import {Expr} from "../Expressions/expr";

export class VariableDeclarationParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        const variable = this.tokens.pop();
        const operator = this.tokens.pop();

        if(operator === Tokens.SET){
            const assignment = this.context.ParseExpression();
            return new VariableDeclarationExpr(variable as string, operator, assignment);
        }
        else{
            throw new Error("Variable declaration malformed.")
        }
    }

}
