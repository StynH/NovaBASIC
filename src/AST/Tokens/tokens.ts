import {tokenRegistry} from "./tokenization";

export class Tokens {
    //Operators
    @Token() public static readonly PLUS = '+';
    @Token() public static readonly MINUS = '-';
    @Token() public static readonly MULTIPLY = '*';
    @Token() public static readonly DIVIDE = '/';
    @Token() public static readonly POWER = '^';
    @Token() public static readonly QUESTION_MARK = '?';
    @Token() public static readonly SEMICOLON = ':';
    @Token() public static readonly COMMA = ',';
    @Token() public static readonly GTE = ">="
    @Token() public static readonly LTE = "<="
    @Token() public static readonly GT = ">"
    @Token() public static readonly LT = "<"
    @Token() public static readonly EQUALS = '==';
    @Token() public static readonly NOT_EQUALS = '!=';
    @Token() public static readonly SET = '=';
    @Token() public static readonly OPENING_BRACKET = '[';
    @Token() public static readonly CLOSING_BRACKET = ']';
    @Token() public static readonly BOOL_TRUE = 'true';
    @Token() public static readonly BOOL_FALSE = 'false';
    @Token() public static readonly NULL = 'null';
    @Token() public static readonly OR = '||';
    @Token() public static readonly AND = '&&';

    //Syntax
    @Token() public static readonly IF = "IF";
    @Token() public static readonly THEN = "THEN";
    @Token() public static readonly RETURN = "RETURN";
    @Token() public static readonly ENDIF = "ENDIF";
    @Token() public static readonly SUB = "SUB";
    @Token() public static readonly END_SUB = "ENDSUB";
    @Token() public static readonly GUARD = "GUARD";
    @Token() public static readonly ELSE = "ELSE";
    @Token() public static readonly END_GUARD = "ENDGUARD";

    @Token(true) public static readonly FUNCTION = "[a-zA-Z_$][a-zA-Z0-9_$]*\\(";
    @Token() public static readonly OPENING_PARENTHESIS = '(';
    @Token() public static readonly CLOSING_PARENTHESIS = ')';

    @Token() public static readonly LET = "LET";
    @Token() public static readonly FOR = "FOR";
    @Token() public static readonly TO = "TO";
    @Token() public static readonly STEP = "STEP";
    @Token() public static readonly NEXT = "NEXT";
    @Token() public static readonly GOTO = "GOTO";
    @Token() public static readonly BY = "BY";

    //STL
    @Token() public static readonly INCREMENT_STL = "INCREMENT";
    @Token() public static readonly DECREMENT_STL = "DECREMENT";
    @Token() public static readonly MULTIPLY_STL = "MULTIPLY";
    @Token() public static readonly DIVIDE_STL = "DIVIDE";
    @Token() public static readonly PRINT_STL = "PRINT";
    @Token() public static readonly MATCHES_STL = "MATCHES";

    //Patterns
    @Token(true) public static readonly AZ09 = "[a-zA-Z0-9_]+";
    @Token(true) public static readonly LITERALS = "\"([^\"]+)\"";
}

export function Token(isPattern = false) {
    return function(target: any, propertyKey: string) {
        tokenRegistry.push({ value: target[propertyKey], isPattern });
    };
}
