import {Queue} from "../../Data/queue";
import {CodeParser} from "../codeparser";
import {Expr} from "../Expressions/expr";
import {ParserFactory} from "./Factory/parserfactory";

export function Parser(tokenType: any): any {
    return (target: any) =>{
        const parserName = `Parser_${tokenType}`;
        (new ParserFactory()).registerFactory(parserName, target);
    }
}

export abstract class ExpressionParser{

    protected constructor(
        protected context: CodeParser,
        protected tokens: Queue<string>
    ) {
    }

    public abstract parse(_token: string): Expr;
}
