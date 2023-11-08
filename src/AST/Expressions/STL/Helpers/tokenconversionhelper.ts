import {Tokens} from "../../../Tokens/tokens";

export class TokenConversionHelper{

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

}
