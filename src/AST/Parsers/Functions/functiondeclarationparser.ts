import {ExpressionParser} from "../expressionparser";
import {CodeParser} from "../../codeparser";
import {Queue} from "../../../Data/queue";
import {Expr} from "../../Expressions/expr";
import {Tokens} from "../../Tokens/tokens";
import {FunctionDeclarationExpr} from "../../Expressions/Functions/functiondeclarationexpr";
import {FunctionExpr} from "../../Expressions/Functions/functionexpr";
import {ConstantExpr} from "../../Expressions/constantexpr";

export class FunctionDeclarationParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        const expr = this.context.parseTerm() as FunctionExpr;
        const name = expr.value;

        let subBodyCorrectlyTerminated = false;
        const expressionTree = [];
        while(!this.tokens.empty()){
            if(this.tokens.peek() === Tokens.END_SUB){
                this.tokens.pop();
                subBodyCorrectlyTerminated = true;
                break;
            }

            expressionTree.push(this.context.parseExpression());
        }

        if(!subBodyCorrectlyTerminated){
            throw new Error("Malformed SUB statement, missing ENDSUB.");
        }

        const parameters = expr.parameters != null ? expr.parameters.map(param => (param as ConstantExpr<string>).value) : [];
        return new FunctionDeclarationExpr(name, expressionTree, parameters);
    }
}
