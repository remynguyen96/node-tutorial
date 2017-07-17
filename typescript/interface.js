function getPerson(person) {
    return "(function 1) Hello, my name is " + person.name + ". I'm " + person.age + 'years old !';
}
console.log(getPerson({
    name: 'Remy Nguyen',
    age: 20
}));
function getPersonTwo(person) {
    return '(function 2) Name: ' + person.name + ', Age :' + person.age;
}
console.log(getPersonTwo({
    name: 'Remy Nguyen 2',
    age: 21
}));
function getPersonThree(person) {
    var output = '';
    if (person.name) {
        output += '1My name is ' + person.name;
    }
    if (person.age) {
        output += "I'm " + person.age;
    }
    // if(person.age && person.name){
    //     output += 'My name is '+person.name.' How old are you? '+ "I'm "+person.age
    // }
    if (!output) {
        return "Not found database !";
    }
    return output;
}
console.log(getPersonThree({
    name: 'Remy Nguyen 3'
}));
console.log(getPersonThree({
    age: 22
}));
console.log(getPersonThree({
    name: 'Remy Nguyen 3',
    age: 22
}));
console.log(getPersonThree({}));
var Person = (function () {
    function Person(name, age, skill) {
        this.setPerson({
            name: name,
            age: age,
            skill: skill
        });
    }
    Person.prototype.setSKill = function (skill) {
        this.skill = skill;
        return this;
    };
    Person.prototype.getSkill = function () {
        return this.skill;
    };
    Person.prototype.setPerson = function (person) {
        this.name = person.name;
        this.age = person.age;
        this.skill = person.skill;
    };
    Person.prototype.getPerson = function () {
        return {
            name: this.name,
            age: this.age,
            skill: this.skill
        };
    };
    return Person;
}());
var demo = Person;
var newDemo = new demo('HOLLA', 29, 'Communication');
console.log(newDemo.getPerson());
///////////////////
