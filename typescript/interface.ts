function getPerson(person:{name:string,age:number}):string{
    return "(function 1) Hello, my name is "+person.name+". I'm "+person.age+'years old !';
}
console.log(getPerson({
    name:'Remy Nguyen',
    age:20,
}));
////////////////////
interface personTwo{
    name:string,
    age:number,
}
function getPersonTwo(person: personTwo):string{
    return '(function 2) Name: '+ person.name + ', Age :'+ person.age
}
console.log(getPersonTwo({
    name:'Remy Nguyen 2',
    age:21,
}))
////////////////////////
interface PersonThree{
    name?: string,
    age?: number,
}
function getPersonThree(person:PersonThree):string{
    let output: string = '';
    if(person.name){
        output += '1My name is '+ person.name
    }
    if(person.age){
        output +="I'm "+person.age
    }
    // if(person.age && person.name){
    //     output += 'My name is '+person.name.' How old are you? '+ "I'm "+person.age
    // }
    if(!output){
        return "Not found database !";
    }
    return output;
}
console.log(getPersonThree({
    name:'Remy Nguyen 3'
}));
console.log(getPersonThree({
    age:22
}));
console.log(getPersonThree({
    name:'Remy Nguyen 3',
    age:22,
}));
console.log(getPersonThree({}));
//////////////////////////////////////////////
// CLass And Interface
interface PersonInterface{
    new (x:string, y:number, z:string): Person;
}
interface PersonInterface1{
    name:string;
    age:number
}
interface PersonInterface2{
    getPerson():any;
    setPerson({
        name:string,
        age:number,
    }):any;
}

// class Person implements PersonInterface1, PersonInterface2 {
//     name:string;
//     age:number;
//     constructor(name:string,age:number){
//         this.setPerson({
//             name : name,
//             age : age,
//         });
//     }
//     setPerson(person:{
//         name:string;
//         age:number;
//     }):any{
//         this.name = person.name;
//         this.age = person.age
//     }
//     getPerson():any{
//         return{
//             name:this.name,
//             age:this.age,
//         }
//     }
// }
// let demo : PersonInterface = Person
// let newDemo = new demo('HOLLA',29);
// console.log(newDemo.getPerson());


/////////////////// Extends Interface
interface Man extends PersonInterface1 ,PersonInterface2 {
    skill: string;
    getSkill(): string;
    setSKill(skill:string): any
}
class Person implements Man{
    name:string;
    age:number;
    skill:string;
    constructor(name:string,age:number,skill:string){
        this.setPerson({
            name : name,
            age : age,
            skill : skill,
        });
    }
    setSKill(skill:string){
        this.skill = skill;
        return this;
    }
    getSkill():string{
        return this.skill;
    }
    setPerson(person:{
        name:string;
        age:number;
        skill:string;
    }):any{
        this.name = person.name;
        this.age = person.age
        this.skill = person.skill
    }
    getPerson():any{
        return{
            name:this.name,
            age:this.age,
            skill:this.skill,
        }
    }
}
let demo : PersonInterface = Person
let newDemo = new demo('HOLLA',29,'Communication');
console.log(newDemo.getPerson());
///////////////////
