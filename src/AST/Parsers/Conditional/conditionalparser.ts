import {ExpressionParser} from "../expressionparser";
import {CodeParser} from "../../codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../Expressions/expr";
import {Tokens} from "../../Tokens/tokens";
import {ConditionalExpr} from "../../Expressions/Conditional/conditionalexpr";

export class ConditionalParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        const condition= this.context.parseExpression();

        if(this.tokens.peek() == Tokens.THEN){
            this.tokens.pop();
        }
        else{
            throw new Error("Malformed IF statement, missing THEN.");
        }

        let ifStatementCorrectlyTerminated = false;
        const expressionTree = [];
        while(!this.tokens.empty()){
            if(this.tokens.peek() === Tokens.ENDIF){
                this.tokens.pop();
                ifStatementCorrectlyTerminated = true;
                break;
            }

            expressionTree.push(this.context.parseExpression());
        }

        if(!ifStatementCorrectlyTerminated){
            throw new Error("Malformed IF statement, missing ENDIF.");
        }

        return new ConditionalExpr(condition, expressionTree);
    }

}
