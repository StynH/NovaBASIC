import {Tokenization} from "./tokenization";
import {Tokens} from "./tokens";

console.log(Tokenization);
console.log(Tokens);

declare const require: {
    context(file: string, flag: boolean, exp: RegExp): any;
};

const parserContext = require.context('../Parsers', true, /\.ts$/);
const stlContext = require.context('../../STL/AST/Parsers', true, /\.ts$/);

[parserContext, stlContext].forEach(context => {
    context.keys().forEach((key: any) => {
        context(key);
        console.log(key);
    });
});
