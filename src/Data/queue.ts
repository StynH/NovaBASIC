export class Queue<T>{

    private readonly storage: T[];

    constructor() {
        this.storage = [];
    }

    public enqueue(item: T): void{
        this.storage.push(item);
    }

    public peek(): T | null{
        return this.storage[0] || null;
    }

    public pop(): T | null{
        return this.storage.shift() || null;
    }

    public length(): number{
        return this.storage.length;
    }

    public empty(): boolean{
        return this.storage.length == 0;
    }

    public clear(): void{
        this.storage.length = 0;
    }

}
