import {Queue} from "../Data/queue";
import {Tokenization} from "./Tokens/tokenization";
import {Expr} from "./Expressions/expr";
import {BinaryExpr} from "./Expressions/binaryexpr";
import {
    boolTryParse,
    decimalTryParse,
    functionTryParse,
    intTryParse,
    stringTryParse,
    variableTryParse
} from "../Data/Helpers/tryparse";
import {ConstantExpr} from "./Expressions/constantexpr";
import {ParsedCode} from "./parsedcode";
import {ParserFactory} from "./Parsers/Factory/parserfactory";
import {TokenHelpers} from "../STL/AST/Helpers/tokenhelpers";
import {Tokens} from "./Tokens/tokens";
import {balanceExpr} from "../Data/Helpers/arithmetichelpers";
import {StandardLibraryCodeParser} from "../STL/AST/standardlibrarycodeparser";

export class CodeParser{

    private readonly tokens: Queue<string>;
    private readonly parserFactory: ParserFactory;
    private readonly stlCodeParser: StandardLibraryCodeParser;

    constructor() {
        this.tokens = new Queue<string>();
        this.parserFactory = new ParserFactory();
        this.stlCodeParser = new StandardLibraryCodeParser(this, this.tokens);
    }

    public parseInput(input: string): void{
        const matches =
            Array.from(
                input.matchAll(
                    Tokenization.buildRegexPattern()
                ), match => match[0]
            );

        console.log(Tokenization.buildRegexPattern());
        for(const match of matches){
            this.tokens.enqueue(match);
        }
    }

    public parseCode(): ParsedCode{
        const parsed = new ParsedCode();
        while (this.tokens.length() > 0){
            parsed.expressions.push(this.parseExpression());
        }

        parsed.MoveFunctionsToTheFront();
        return parsed;
    }

    public parseExpression(): Expr{
        let expr = this.parseTerm();
        const operator = this.tokens.peek()!;
        if(TokenHelpers.isArithmeticToken(operator)){
            this.tokens.pop();
            expr = new BinaryExpr(expr, operator, this.parseExpression());
            expr = balanceExpr(expr);
        }

        return expr;
    }

    public parseTerm(): Expr {
        const token = this.tokens.pop() as string;

        const [isString, stringParsed] = stringTryParse(token);
        if(isString){
            return new ConstantExpr(stringParsed);
        }

        const [isDecimal, decimalParsed] = decimalTryParse(token);
        if(isDecimal){
            return new ConstantExpr(decimalParsed);
        }

        const [isInt, intParsed] = intTryParse(token);
        if(isInt){
            return new ConstantExpr(intParsed);
        }

        const [isBool, boolParse] = boolTryParse(token);
        if(isBool){
            return new ConstantExpr(boolParse);
        }

        //STL
        const stl = this.stlCodeParser.parseTerm(token);
        if(stl != null){
            return stl;
        }

        try{
            return this.parserFactory
                .getExpressionParser(token, this, this.tokens)
                .parse(token);
        } catch (_e){ /*ignore*/ }

        const isFunction= functionTryParse(token)[0];
        if(isFunction){
            return this.parserFactory
                .getExpressionParser("FUNCTION", this, this.tokens)
                .parse(token);
        }

        const isVariable= variableTryParse(token)[0];
        if(isVariable){
            if(this.tokens.peek() === Tokens.OPENING_BRACKET){
                return this.parserFactory
                    .getExpressionParser(Tokens.OPENING_BRACKET, this, this.tokens)
                    .parse(token);
            }
            return this.parserFactory
                .getExpressionParser("VARIABLE", this, this.tokens)
                .parse(token);
        }

        throw new Error(`Unknown token: ${token}.`);
    }
}
