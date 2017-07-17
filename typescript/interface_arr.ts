interface Arr {
    (numberArr: number[]): number[]
}
var getArr: Arr;
getArr  = function(n:number[]){
    n.push(4,5,6);
    return n;
}
// console.log(getArr([1,2,3]));


// array type
interface StringArray {
    [index: number]: string;
    length: number;
    push: any;
}

let myArray: StringArray;
myArray = ['Remy','Nguyen'];
myArray.push("ok");
console.log(myArray[1]);
console.log(myArray.length);
//

interface StringArray2 {
    [index: string]: string;
    length: number;
}

let Object: StringArray2 = {
    VueJs : 'part 1',
    typescript : 'part 2',
    Angular2 : 'part 3',
    Ionic : 'part 4',
}
console.log(Object['VueJs']);
