import {Queue} from "../Data/queue";
import {Tokenization} from "./Tokens/tokenization";
import {Expr} from "./Expressions/expr";
import {BinaryExpr} from "./Expressions/binaryexpr";
import {NullExpr} from "./Expressions/nullexpr";
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
import {ParserFactory, ParsingType} from "./Parsers/Factory/parserfactory";
import {TokenHelpers} from "../STL/AST/Helpers/tokenhelpers";
import {Tokens} from "./Tokens/tokens";
import {balanceExpr} from "../Data/Helpers/arithmetichelpers";

export class CodeParser{

    private readonly tokens: Queue<string>;
    private readonly parserFactory: ParserFactory;

    constructor() {
        this.tokens = new Queue<string>();
        this.parserFactory = new ParserFactory(this, this.tokens);
    }

    public parseInput(input: string): void{
        const matches =
            Array.from(
                input.matchAll(
                    Tokenization.buildRegexPattern()
                ), match => match[0]
            );

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

        if(token === Tokens.LET){
            return this.parserFactory
                .getExpressionParser(ParsingType.VARIABLE_DECLARATION)
                .parse(token);
        }

        if(TokenHelpers.isStlArithmeticToken(token)){
            return this.parserFactory
                .getExpressionParser(ParsingType.ARITHMETIC)
                .parse(token);
        }

        if(token === Tokens.PRINT_STL){
            return this.parserFactory
                .getExpressionParser(ParsingType.PRINT)
                .parse(token);
        }

        if(token.startsWith(Tokens.ARRAY_SIZE_STL)){
            return this.parserFactory
                .getExpressionParser(ParsingType.ARRAY_SIZE)
                .parse(token);
        }

        if(token === Tokens.IF){
            return this.parserFactory
                .getExpressionParser(ParsingType.CONDITIONAL)
                .parse(token);
        }

        if(token === Tokens.GUARD){
            return this.parserFactory
                .getExpressionParser(ParsingType.GUARD)
                .parse(token);
        }

        if(token === Tokens.NULL){
            return new NullExpr();
        }

        if(token === Tokens.SUB){
            return this.parserFactory
                .getExpressionParser(ParsingType.FUNCTION_DECLARATION)
                .parse(token);
        }

        if(token === Tokens.RETURN){
            return this.parserFactory
                .getExpressionParser(ParsingType.RETURN)
                .parse(token);
        }

        if(token === Tokens.FOR){
            return this.parserFactory
                .getExpressionParser(ParsingType.FOR_LOOP)
                .parse(token);
        }

        if(token === Tokens.OPENING_BRACKET){
            return this.parserFactory
                .getExpressionParser(ParsingType.ARRAY)
                .parse(token);
        }

        const isFunction= functionTryParse(token)[0];
        if(isFunction){
            return this.parserFactory
                .getExpressionParser(ParsingType.FUNCTION)
                .parse(token);
        }

        const isVariable= variableTryParse(token)[0];
        if(isVariable){
            if(this.tokens.peek() === Tokens.OPENING_BRACKET){
                return this.parserFactory
                    .getExpressionParser(ParsingType.ARRAY)
                    .parse(token);
            }
            return this.parserFactory
                .getExpressionParser(ParsingType.VARIABLE)
                .parse(token);
        }

        throw new Error(`Unknown token: ${token}.`);
    }
}
