import {Queue} from "../../Data/queue";
import {CodeParser} from "../../AST/codeparser";
import {Expr} from "../../AST/Expressions/expr";
import {Tokens} from "../../AST/Tokens/tokens"
import {StandardLibraryParserFactory, StlParsingType} from "./Parsers/Factory/standardlibraryparserfactory";

export class StandardLibraryCodeParser{

    private readonly parserFactory: StandardLibraryParserFactory;

    constructor(
        private context: CodeParser,
        private tokens: Queue<string>
    ) {
        this.parserFactory = new StandardLibraryParserFactory(this.context, this.tokens);
    }

    public parseTerm(token: string): Expr | null
    {
        if(token === Tokens.PRINT_STL){
            return this.parserFactory
                .getExpressionParser(StlParsingType.PRINT)
                .parse(token);
        }

        if(token.startsWith(Tokens.ARRAY_RESIZE_STL)){
            return this.parserFactory
                .getExpressionParser(StlParsingType.ARRAY_RESIZE)
                .parse(token);
        }

        if(token.startsWith(Tokens.LENGTH_STL)){
            return this.parserFactory
                .getExpressionParser(StlParsingType.LENGTH)
                .parse(token);
        }

        return null;
    }
}
