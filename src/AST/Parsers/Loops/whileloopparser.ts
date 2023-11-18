import {ExpressionParser, Parser} from "../expressionparser";
import {CodeParser} from "../../codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../Expressions/expr";
import {Tokens} from "../../Tokens/tokens";
import {WhileLoopExpr} from "../../Expressions/Loops/whileloopexpr";

@Parser(Tokens.WHILE)
export class WhileLoopParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        const condition = this.context.parseExpression();
        const exprTree = [];
        let subBodyCorrectlyTerminated = false;
        while(this.tokens.length() > 0){
            if(this.tokens.peek() == Tokens.NEXT){
                subBodyCorrectlyTerminated = true;
                break;
            }
            exprTree.push(this.context.parseExpression());
        }

        if(!subBodyCorrectlyTerminated){
            throw new Error("Malformed WHILE loop, missing NEXT.");
        }
        this.tokens.pop();

        return new WhileLoopExpr(condition, exprTree);
    }

}
