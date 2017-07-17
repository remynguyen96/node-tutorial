var passcode = 'Remy Nguyen';
class Person{
    private _name: string;
    private _age: number;
    get name(): string {
        if(passcode && passcode == 'Remy Nguyen'){
            return this._name;
        }else {
            return 'Errors: '+ this._name;
        }
    }
    set name(name: string){
        if(passcode && passcode == 'Remy Nguyen'){
            this._name = name;
        }else {
            this._name = 'Errors Passcode !!!';
        }
    }
}

let person = new Person();
// True
person.name = 'Remy Nguyen';
console.log(person.name);
// False
passcode = 'not';
person.name = 'Remy Nguyen111';
console.log(person.name);
//
passcode = 'Remy Nguyen';
person.name = 'Mark Remy';
console.log(person.name);


// tsc all.ts -t ES6
