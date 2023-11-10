export class Stack<T> {
    private readonly items: T[];

    public constructor() {
        this.items = [];
    }

    public push(item: T): void {
        this.items.push(item);
    }

    public pop(): T | undefined {
        return this.items.pop();
    }

    public peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    public getAll(): T[] | null {
        return this.items;
    }

    public empty(): boolean {
        return this.items.length === 0;
    }

    public length(): number {
        return this.items.length;
    }
}
