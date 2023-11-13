import {Stack} from "../../Data/stack";
import {Interpreter} from "../interpreter";

export class ScopeManager{

    private scope: Stack<string>

    public constructor() {
        this.scope = new Stack<string>();
    }

    public toScopedName(name: string, maxDepth = -1): string{
        if(maxDepth > 0){
            return `${this.getScopeUntil(maxDepth)}_${name}`;
        }
        return `${this.getScope()}_${name}`;
    }

    public addScope(scope: string): void{
        this.scope.push(scope);
    }

    public popScope(): void{
        this.scope.pop();
    }

    public getScope(): string{
        if(this.scope.empty()){
            return `_${Interpreter.GLOBAL_SCOPE}`;
        }
        return `_${this.scope.getAll()!.join("_")!}`;
    }

    public getScopeUntil(maxDepth: number): string{
        if(maxDepth < 0 || maxDepth > this.amountOfScopes()){
            throw new Error("Out of bounds for scopes!");
        }
        return this.buildScopeName(this.scope.getAll()?.slice(0, maxDepth) as string[]);
    }

    public amountOfScopes(): number{
        return this.scope.length();
    }

    public buildScopeName(scopes: string[]): string{
        return `_${scopes.join("_")!}`;
    }
}
