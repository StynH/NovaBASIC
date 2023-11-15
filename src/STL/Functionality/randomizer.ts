export interface IRandomizer{
    randomIntBetween(min: number, max: number, inclusive: boolean, seed: number): number;
}

class LinearCongruentialGenerator {
    private seed: number;
    private readonly a = 1664525;
    private readonly c = 1013904223;
    private readonly m = 4294967296;

    constructor(seed: number) {
        this.seed = seed;
    }

    next(): number {
        this.seed = (this.a * this.seed + this.c) % this.m;
        return this.seed / this.m;
    }
}

export class LinearCongruentialRandomizer implements IRandomizer{

    public randomIntBetween(min: number = 0, max: number = 1, inclusive: boolean = false, seed: number = Date.now()): number {
        const lcg = new LinearCongruentialGenerator(seed);
        let randomNum = lcg.next();
        if (inclusive) {
            randomNum = Math.floor(randomNum * (max - min + 1)) + min;
        } else {
            randomNum = randomNum * (max - min) + min;
        }
        return randomNum;
    }

}
