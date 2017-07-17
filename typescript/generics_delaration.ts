function getSomething<yourType>(arg: yourType): yourType {
    return arg;
}

let str = getSomething<string>('Hello Mom !!!');
console.log(str);

let nub = getSomething<number>(21321321321);
console.log(nub);
// array

function getLength<yourType>(arg: yourType[]): number{
    return arg.length;
}

let str_arr = getLength<string>(["ok","job","good"]);
console.log(str_arr);

let num_arr = getLength<number>([1,2,3,4,5]);
console.log(num_arr);

// object

interface CustomType {
    x:string;
    y:number;
}

function getCustomType<Custom>(arg: any): any{
    let d: Custom = arg;
    return d;
}
console.log(getCustomType<CustomType>({
    x:'Hello everybody !',
    y:21321321321,
}))


class Style {
    changeBackground(): void{
        document.body.style.color = "#0f1e3c"
        document.querySelector('body').style.background = "rgb(30, 198, 127)";
    }
}

let test = new Style();
test.changeBackground();
