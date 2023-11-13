import {ExpressionParser} from "../expressionparser";
import {CodeParser} from "../../codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../Expressions/expr";
import {Tokens} from "../../Tokens/tokens";
import {ForLoopExpr} from "../../Expressions/Loops/forloopexpr";
import {ConstantExpr} from "../../Expressions/constantexpr";

export class ForLoopParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        const initializer = this.context.parseExpression();
        if(this.tokens.peek() != Tokens.TO){
            throw new Error("Malformed FOR loop, missing TO.");
        }
        this.tokens.pop();

        const to = this.context.parseExpression();
        let step: Expr = new ConstantExpr<number>(1);
        if(this.tokens.peek() == Tokens.STEP){
            this.tokens.pop();
            step = this.context.parseExpression();
        }

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
            throw new Error("Malformed FOR loop, missing NEXT.");
        }
        this.tokens.pop();

        return new ForLoopExpr(initializer, to, exprTree, step);
    }

}
