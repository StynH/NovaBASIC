export interface IPrinter{
    print(value: string, interpolation: any | null): void;
}

export class ConsolePrinter implements IPrinter{

    public print(value: string, interpolation: any | null = null): void {
        if(interpolation != null && value.includes("#{0}")){
            value = value.replace("#{0}", interpolation);
        }
        else if(interpolation != null){
            value = `"${value.substring(1, value.length - 1)}${interpolation}"`;
        }

        console.log(value);
    }

}
