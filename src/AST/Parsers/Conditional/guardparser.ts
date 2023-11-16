import {ExpressionParser, Parser} from "../expressionparser";
import {CodeParser} from "../../codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../Expressions/expr";
import {Tokens} from "../../Tokens/tokens";
import {GuardExpr} from "../../Expressions/Conditional/guardexpr";
import {ReturnExpr} from "../../Expressions/Functions/returnexpr";

@Parser(Tokens.GUARD)
export class GuardParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        const condition= this.context.parseExpression();

        if(this.tokens.peek() == Tokens.ELSE){
            this.tokens.pop();
        }
        else{
            throw new Error("Malformed GUARD statement, missing ELSE.");
        }

        let ifStatementCorrectlyTerminated = false;
        const expressionTree = [];
        while(!this.tokens.empty()){
            if(this.tokens.peek() === Tokens.END_GUARD){
                this.tokens.pop();
                ifStatementCorrectlyTerminated = true;
                break;
            }

            expressionTree.push(this.context.parseExpression());
        }

        if(!ifStatementCorrectlyTerminated){
            throw new Error("Malformed GUARD statement, missing ENDGUARD.");
        }

        if(!expressionTree.some(e => e instanceof ReturnExpr)){
            throw new Error("GUARD statement must contain RETURN statement.");
        }

        return new GuardExpr(condition, expressionTree);
    }

}
