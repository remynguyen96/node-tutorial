function strFunction(): string{
    return "This is string";
}
//

function numberFunction(): number{
    return 123456789;
}

//

function strArrayFunction(): string[]{
    return ['one','two','three','four'];
}

//

function numArrayFunction(): number[]{
    return [1,4,5,45,6,56,3];
}
//

function anyFunction(): any{
    return {
        mobieApp:{
            Typescript: 'Part 1',
            Angular2: 'Part 2',
            Ionic: 'Part 3',
        }
    };
}
////////////////////////////////////////////////////

function Hi(name: string, age: number):string {
    return 'Hello, my name is '+name+". I'm "+age+' years old !';
}
console.log(Hi('Chau',20))
//

let HiOrther: (name:string,age:number) => string = function (name,age){
    return 'Hi, my name is '+name+". I'm "+age+' years old !';
}
console.log(HiOrther('Chau',20))

//

function add(x:number = 25,y:number = 75):number{
    return x+y;
};
console.log(add());
//


function AnyChose(x:string, y?:number):any {
    if(y){
        return y;
    }else{
        return 'Not found Y ....! And value X =' + x;
    }
}
console.log(AnyChose('Ok not Y111111',9999))
console.log(AnyChose('Ok not Y'))
