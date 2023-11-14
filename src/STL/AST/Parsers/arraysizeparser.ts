import {ExpressionParser} from "../../../AST/Parsers/expressionparser";
import {CodeParser} from "../../../AST/codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../../AST/Expressions/expr";
import {Tokens} from "../../../AST/Tokens/tokens";
import {ArraySizeExpr} from "../Expressions/arraysizeexpr";
import {VariableExpr} from "../../../AST/Expressions/variableexpr";

export class ArraySizeParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        if(!_token.endsWith(Tokens.OPENING_PARENTHESIS)){
            throw new Error("Malformed ARRAY_SIZE, missing (.");
        }

        const variable = this.context.parseExpression() as VariableExpr;
        this.tokens.pop();
        const size = this.context.parseExpression();

        if(this.tokens.peek() == Tokens.CLOSING_PARENTHESIS){
            this.tokens.pop();
        }
        else{
            throw new Error("Malformed ARRAY_SIZE, missing ).");
        }

        return new ArraySizeExpr(variable.value, size);
    }

}