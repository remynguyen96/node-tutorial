var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Person = (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.run = function () {
        console.log("Run........");
    };
    Person.prototype.watch = function () {
        return this.name + " npm run watch it's very easy loading " + this.age + " s";
    };
    return Person;
}());
var person = new Person('Remy nguyen', 21);
// person.run();
// console.log(person.watch());
////////////////////////////
var Man = (function (_super) {
    __extends(Man, _super);
    function Man(name, age, gender, skill) {
        var _this = _super.call(this, name, age) || this;
        _this.gender = gender;
        _this.skill = skill;
        return _this;
    }
    Man.prototype.getAll = function () {
        return "This one " + this.name + " Second " + this.age + " Third " + this.gender + " finally " + this.skill;
    };
    return Man;
}(Person));
var man = new Man('Remy nguyen', 20, 'Male', 4);
console.log(man);
console.log(man.getAll());
console.log(man.watch());
