import {Queue} from "../../../Data/queue";
import {ExpressionParser} from "../expressionparser";
import {CodeParser} from "../../codeparser";
import {VariableDeclarationParser} from "../variabledeclarationparser";
import {ArithmeticParser} from "../../../STL/AST/Parsers/arithmeticparser";
import {VariableParser} from "../variableparser";
import {PrintParser} from "../../../STL/AST/Parsers/printparser";
import {ConditionalParser} from "../Conditional/conditionalparser";
import {FunctionDeclarationParser} from "../Functions/functiondeclarationparser";
import {FunctionParser} from "../Functions/functionparser";
import {ReturnParser} from "../Functions/returnparser";
import {ForLoopParser} from "../Loops/forloopparser";
import {GuardParser} from "../Conditional/guardparser";

type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

export enum ParsingType{
    ARITHMETIC,
    PRINT,
    VARIABLE,
    VARIABLE_DECLARATION,
    CONDITIONAL,
    FUNCTION,
    FUNCTION_DECLARATION,
    RETURN,
    FOR_LOOP,
    GUARD
}

export class ParserFactory{

    private readonly parsers: EnumDictionary<ParsingType, ExpressionParser>

    constructor(
        private context: CodeParser,
        private tokens: Queue<string>
    ) {
        this.parsers = {} as EnumDictionary<ParsingType, ExpressionParser>;
    }

    public getExpressionParser(parsingType: ParsingType): ExpressionParser{
        if(!this.parsers[parsingType]){
            switch (parsingType){
                case ParsingType.ARITHMETIC:
                    this.parsers[parsingType] = new ArithmeticParser(this.context, this.tokens);
                    break;
                case ParsingType.PRINT:
                    this.parsers[parsingType] = new PrintParser(this.context, this.tokens);
                    break
                case ParsingType.VARIABLE:
                    this.parsers[parsingType] = new VariableParser(this.context, this.tokens);
                    break;
                case ParsingType.VARIABLE_DECLARATION:
                    this.parsers[parsingType] = new VariableDeclarationParser(this.context, this.tokens);
                    break;
                case ParsingType.CONDITIONAL:
                    this.parsers[parsingType] = new ConditionalParser(this.context, this.tokens);
                    break;
                case ParsingType.FUNCTION_DECLARATION:
                    this.parsers[parsingType] = new FunctionDeclarationParser(this.context, this.tokens);
                    break;
                case ParsingType.FUNCTION:
                    this.parsers[parsingType] = new FunctionParser(this.context, this.tokens);
                    break;
                case ParsingType.RETURN:
                    this.parsers[parsingType] = new ReturnParser(this.context, this.tokens);
                    break;
                case ParsingType.FOR_LOOP:
                    this.parsers[parsingType] = new ForLoopParser(this.context, this.tokens);
                    break;
                case ParsingType.GUARD:
                    this.parsers[parsingType] = new GuardParser(this.context, this.tokens);
                    break;
            }
        }
        return this.parsers[parsingType];
    }

}
