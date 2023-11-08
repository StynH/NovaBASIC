import {Queue} from "../Data/queue";
import {Tokenization} from "./Tokens/tokenization";
import {Expr} from "./Expressions/expr";
import {Tokens} from "./Tokens/tokens";
import {BinaryExpr} from "./Expressions/binaryexpr";
import {NullExpr} from "./Expressions/nullexpr";
import {VariableDeclarationExpr} from "./Expressions/variabledeclarationexpr";
import {boolTryParse, decimalTryParse, intTryParse, stringTryParse, variableTryParse} from "../Data/Helpers/tryparse";
import {ConstantExpr} from "./Expressions/constantexpr";
import {ParsedCode} from "./parsedcode";
import {PrintExpr} from "./Expressions/STL/printexpr";
import {ParserFactory, ParsingType} from "./Parsers/Factory/parserfactory";

export class CodeParser{

    private readonly tokens: Queue<string>;
    private readonly parserFactory: ParserFactory;

    constructor() {
        this.tokens = new Queue<string>();
        this.parserFactory = new ParserFactory(this, this.tokens);
    }

    public parseInput(input: string): void{
        console.log(Tokenization.buildRegexPattern());
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

    public ParseCode(): ParsedCode{
        const parsed = new ParsedCode();
        while (this.tokens.length() > 0){
            parsed.expressions.push(this.ParseExpression());
        }
        return parsed;
    }

    private ParseVariableAssignment(): Expr {
        const variable = this.tokens.pop();
        const operator = this.tokens.pop();

        if(operator === Tokens.SET){
            const assignment = this.ParseExpression();
            return new VariableDeclarationExpr(variable as string, operator, assignment);
        }
        else{
            throw new Error("Variable declaration malformed.")
        }
    }
    private ParsePrint(): Expr {
        const value = this.tokens.pop() as string;
        if(this.tokens.peek() == Tokens.COMMA){
            this.tokens.pop();
            return new PrintExpr(value, this.ParseExpression())
        }

        return new PrintExpr(value);
    }

    public ParseExpression(): Expr{
        let expr = this.ParseTerm();
        const operator = this.tokens.peek();
        if(
            operator === Tokens.PLUS
            || operator === Tokens.MINUS
            || operator === Tokens.MULTIPLY
            || operator === Tokens.DIVIDE
        ){
            this.tokens.pop();
            expr = new BinaryExpr(expr, operator, this.ParseExpression());
        }

        return expr;
    }

    public ParseTerm(): Expr {
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

        if(
            token === Tokens.INCREMENT_STL
            || token === Tokens.DECREMENT_STL
            || token === Tokens.MULTIPLY_STL
            || token === Tokens.DIVIDE_STL
        ){
            return this.parserFactory
                .getExpressionParser(ParsingType.ARITHMETIC)
                .parse(token);
        }

        if(token === Tokens.PRINT_STL){
            return this.ParsePrint();
        }

        if(token === Tokens.NULL){
            return new NullExpr();
        }

        const isVariable= variableTryParse(token)[0];
        if(isVariable){
            return this.parserFactory
                .getExpressionParser(ParsingType.VARIABLE)
                .parse(token);
        }

        throw new Error(`Unknown token: ${token}.`);
    }
}
