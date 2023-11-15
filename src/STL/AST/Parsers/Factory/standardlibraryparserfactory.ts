import {EnumDictionary} from "../../../../Data/Types/enumdictionarytype";
import {ExpressionParser} from "../../../../AST/Parsers/expressionparser";
import {CodeParser} from "../../../../AST/codeparser";
import {Queue} from "../../../../Data/queue";
import {PrintParser} from "../printparser";
import {ArrayResizeParser} from "../arrayresizeparser";
import {LengthParser} from "../lengthparser";

export enum StlParsingType{
    PRINT,
    ARRAY_RESIZE,
    LENGTH
}

export class StandardLibraryParserFactory{

    private readonly parsers: EnumDictionary<StlParsingType, ExpressionParser>

    constructor(
        private context: CodeParser,
        private tokens: Queue<string>
    ) {
        this.parsers = {} as EnumDictionary<StlParsingType, ExpressionParser>;
    }

    public getExpressionParser(parsingType: StlParsingType): ExpressionParser{
        if(!this.parsers[parsingType]){
            switch (parsingType){
                case StlParsingType.PRINT:
                    this.parsers[parsingType] = new PrintParser(this.context, this.tokens);
                    break
                case StlParsingType.ARRAY_RESIZE:
                    this.parsers[parsingType] = new ArrayResizeParser(this.context, this.tokens);
                    break;
                case StlParsingType.LENGTH:
                    this.parsers[parsingType] = new LengthParser(this.context, this.tokens);
                    break;
            }
        }
        return this.parsers[parsingType];
    }

}
