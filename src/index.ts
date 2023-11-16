import 'reflect-metadata';
import "./AST/Tokens/boilerplate";
import {Interpreter} from "./Interpeter/interpreter";
import {CodeParser} from "./AST/codeparser";

export class NovaBasic{

    constructor(
        private codeParser: CodeParser = new CodeParser()
    ) {
    }

    /* eslint-disable @typescript-eslint/no-unused-vars*/
    public parseCode(code: string): void{
    /* eslint-enable @typescript-eslint/no-unused-vars*/
        this.codeParser.parseInput(code);
        const parsed = this.codeParser.parseCode();
        const interpreter = new Interpreter();
        parsed.execute(interpreter);

        interpreter.debug();
    }
}


