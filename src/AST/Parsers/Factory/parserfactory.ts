import {ExpressionParser} from "../expressionparser";
import {Singleton} from "../../../Data/singleton";
import {CodeParser} from "../../codeparser";
import {Queue} from "../../../Data/queue";

@Singleton
export class ParserFactory{
    private readonly parsers: { [key: string]: new(context: CodeParser, tokens: Queue<string>) => ExpressionParser }

    constructor() {
        this.parsers = {} as { [key: string]: new(context: CodeParser, tokens: Queue<string>) => ExpressionParser };
    }

    public getExpressionParser(token: string, context: CodeParser, tokens: Queue<string>): ExpressionParser{
        if(this.parsers[`Parser_${token}`] !== undefined){
            return new this.parsers[`Parser_${token}`](context, tokens);
        }
        throw new Error(`No parser registered for token '${token}'!`);
    }

    public registerFactory(token: string, target: new(context: CodeParser, tokens: Queue<string>) => ExpressionParser) {
        this.parsers[token] = target;
    }
}
