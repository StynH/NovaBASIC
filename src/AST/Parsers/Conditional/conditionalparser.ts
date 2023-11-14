import {ExpressionParser} from "../expressionparser";
import {CodeParser} from "../../codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../Expressions/expr";
import {Tokens} from "../../Tokens/tokens";
import {ConditionalExpr} from "../../Expressions/Conditional/conditionalexpr";
import {ConstantExpr} from "../../Expressions/constantexpr";

export class ConditionalParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        return this.parseConditional(_token);
    }

    private parseConditional(_token: string): ConditionalExpr{
        const condition= _token != Tokens.ELSE ? this.context.parseExpression() : new ConstantExpr(true);

        if(this.tokens.peek() == Tokens.THEN){
            this.tokens.pop();
        }
        else{
            throw new Error("Malformed IF statement, missing THEN.");
        }

        let elseExpr = null;
        let ifStatementCorrectlyTerminated = false;
        const expressionTree = [];
        while(!this.tokens.empty()){
            if(this.tokens.peek() === Tokens.ELSEIF || this.tokens.peek() === Tokens.ELSE){
                elseExpr = this.parseConditional(this.tokens.pop()!);
            }

            if(this.tokens.peek() === Tokens.ENDIF ){
                if(_token != Tokens.ELSEIF && _token != Tokens.ELSE){
                    this.tokens.pop();
                    ifStatementCorrectlyTerminated = true;
                }else{
                    return new ConditionalExpr(condition, expressionTree, elseExpr);
                }
                break;
            }

            expressionTree.push(this.context.parseExpression());
        }

        if(!ifStatementCorrectlyTerminated){
            throw new Error("Malformed IF statement, missing ENDIF.");
        }

        return new ConditionalExpr(condition, expressionTree, elseExpr);
    }
}
