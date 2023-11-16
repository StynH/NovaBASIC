import {Queue} from "../../Data/queue";
import {CodeParser} from "../../AST/codeparser";
import {Expr} from "../../AST/Expressions/expr";
import {Tokens} from "../../AST/Tokens/tokens"
import {ParserFactory} from "../../AST/Parsers/Factory/parserfactory";

export class StandardLibraryCodeParser{

    private parserFactory: ParserFactory;

    constructor(
        private context: CodeParser,
        private tokens: Queue<string>
    ) {
        this.parserFactory = new ParserFactory();
    }

    public parseTerm(token: string): Expr | null
    {
        if(token === Tokens.PRINT_STL){
            return this.parserFactory
                .getExpressionParser(token, this.context, this.tokens)
                .parse(token);
        }

        if(token.startsWith(Tokens.ARRAY_RESIZE_STL)){
            return this.parserFactory
                .getExpressionParser(Tokens.ARRAY_RESIZE_STL, this.context, this.tokens)
                .parse(token);
        }

        if(token.startsWith(Tokens.LENGTH_STL)){
            return this.parserFactory
                .getExpressionParser(Tokens.LENGTH_STL, this.context, this.tokens)
                .parse(token);
        }

        if(token.startsWith(Tokens.RANDOM_STL)){
            return this.parserFactory
                .getExpressionParser(Tokens.RANDOM_STL, this.context, this.tokens)
                .parse(token);
        }

        return null;
    }
}
