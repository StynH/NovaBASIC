import {Tokens} from "../../../AST/Tokens/tokens";

export class TokenHelpers {

    public static StlToOperator(stl: string): string{
        switch (stl){
            case Tokens.INCREMENT_STL:
                return Tokens.PLUS;
            case Tokens.DECREMENT_STL:
                return Tokens.MINUS;
            case Tokens.MULTIPLY_STL:
                return Tokens.MULTIPLY;
            case Tokens.DIVIDE_STL:
                return Tokens.DIVIDE;
        }

        throw new Error(`Unknown STL operation ${stl}.`)
    }

    public static isArithmeticToken(token: string): boolean{
        return token === Tokens.PLUS
            || token === Tokens.MINUS
            || token === Tokens.MULTIPLY
            || token === Tokens.DIVIDE
            || token ==  Tokens.EQUALS
            || token === Tokens.GTE
            || token === Tokens.LTE
            || token === Tokens.LT
            || token === Tokens.GT
    }

    public static isStlArithmeticToken(token: string): boolean{
        return token === Tokens.INCREMENT_STL
            || token === Tokens.DECREMENT_STL
            || token === Tokens.DIVIDE_STL
            || token === Tokens.MULTIPLY_STL
    }

}
