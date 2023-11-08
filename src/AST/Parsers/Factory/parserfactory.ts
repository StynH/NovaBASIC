import {Queue} from "../../../Data/queue";
import {ExpressionParser} from "../expressionparser";
import {CodeParser} from "../../codeparser";
import {VariableDeclarationParser} from "../variabledeclarationparser";
import {ArithmeticParser} from "../arithmeticparser";
import {VariableParser} from "../variableparser";

type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

export enum ParsingType{
    ARITHMETIC,
    VARIABLE,
    VARIABLE_DECLARATION
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
                    break
                case ParsingType.VARIABLE:
                    this.parsers[parsingType] = new VariableParser(this.context, this.tokens);
                    break;
                case ParsingType.VARIABLE_DECLARATION:
                    this.parsers[parsingType] = new VariableDeclarationParser(this.context, this.tokens);
                    break;
            }
        }
        return this.parsers[parsingType];
    }

}
