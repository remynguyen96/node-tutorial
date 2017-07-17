class Person {
    public age: number;
     name: string;
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
    run(): void{
        console.log("Run........");
    }
    watch(): string{
        return this.name+" npm run watch it's very easy loading "+ this.age+" s";
    }
}

let person = new Person('Remy nguyen',21);
// person.run();
// console.log(person.watch());
////////////////////////////

class Man extends Person {
    gender: string;
    skill: number;
    constructor(name:string, age:number,gender:string,skill:number){
        super(name,age);
        this.gender = gender;
        this.skill = skill;
    }
    getAll(): string{
        return "This one "+this.name+ " Second "+ this.age+" Third "+this.gender+" finally "+ this.skill;
    }
}
let man = new Man('Remy nguyen',20,'Male',4);
console.log(man);
console.log(man.getAll());
console.log(man.watch());
