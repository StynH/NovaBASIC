import {FunctionTable} from "./functiontable";
import {MemoryTable} from "./memorytable";

export class GarbageCollector{

    constructor(
        private memoryTable: MemoryTable,
        private functionTable: FunctionTable,
        private debugging: boolean = false
    ) {
    }

    public destroyScope(scope: string): void{
        const removedVariables = this.memoryTable.removeVariablesByScope(scope);

        if(this.debugging){
            if(removedVariables.length > 0){
                console.log(`GC: Removed these variables [${removedVariables.map(variable => variable.name).join(', ')}].`)
            }
            else{
                console.log(`GC: No variables removed for scope.`)
            }
        }
    }
}
