import {ExpressionParser, Parser} from "../expressionparser";
import {CodeParser} from "../../codeparser";
import {Queue} from "../../../Data/queue";
import {Expr, ExprList} from "../../Expressions/expr";
import {Tokens} from "../../Tokens/tokens";
import {ArrayOperationExpr} from "../../Expressions/Collections/arrayoperationexpr";
import {ArrayDeclarationExpr} from "../../Expressions/Collections/arraydeclarationexpr";
import {ConstantExpr} from "../../Expressions/constantexpr";
import {ArrayAssignmentExpr} from "../../Expressions/Collections/arrayassignmentexpr";

@Parser(Tokens.OPENING_BRACKET)
export class ArrayParser extends ExpressionParser{

    public constructor(
        context: CodeParser,
        tokens: Queue<string>
    ) {
        super(context, tokens);
    }

    public parse(_token: string): Expr {
        let indexer: Expr | ExprList;
        if(_token != Tokens.OPENING_BRACKET
            && this.tokens.peek() == Tokens.OPENING_BRACKET){
            const variable = _token;
            this.tokens.pop();

            indexer = this.context.parseExpression();
            if(this.tokens.peek() == Tokens.COMMA){
                indexer = [indexer];
                while(this.tokens.peek() == Tokens.COMMA){
                    this.tokens.pop();
                    indexer.push(this.context.parseExpression());
                }
            }

            if(this.tokens.peek() == Tokens.CLOSING_BRACKET){
                this.tokens.pop();
            }
            else{
                throw new Error("Malformed array, missing ].")
            }

            if(this.tokens.peek() == Tokens.SET){
                this.tokens.pop();
                const value = this.context.parseExpression();
                return new ArrayAssignmentExpr(variable, indexer, value);
            }

            return new ArrayOperationExpr(new ConstantExpr(variable), indexer);
        }

        const exprTree: ExprList = [];
        let arrayCorrectlyTerminated = false;

        while(!this.tokens.empty()){
            if(this.tokens.peek() == Tokens.CLOSING_BRACKET){
                this.tokens.pop();
                arrayCorrectlyTerminated = true;
                break;
            }

            exprTree.push(this.context.parseExpression());
            if(this.tokens.peek() == Tokens.COMMA){
                this.tokens.pop();
            }
            else if(this.tokens.peek() != Tokens.CLOSING_BRACKET){
                throw new Error("Malformed array, missing ].")
            }
        }

        if(!arrayCorrectlyTerminated){
            throw new Error("Malformed array, missing ].")
        }

        return new ArrayDeclarationExpr(exprTree);
    }

}
