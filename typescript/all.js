var passcode = 'Remy Nguyen';
var Person = (function () {
    function Person() {
    }
    Object.defineProperty(Person.prototype, "name", {
        get: function () {
            if (passcode && passcode == 'Remy Nguyen') {
                return this._name;
            }
            else {
                return 'Errors: ' + this._name;
            }
        },
        set: function (name) {
            if (passcode && passcode == 'Remy Nguyen') {
                this._name = name;
            }
            else {
                this._name = 'Errors Passcode !!!';
            }
        },
        enumerable: true,
        configurable: true
    });
    return Person;
}());
var person = new Person();
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
// String
var demo_string = "This is string !!!";
// Number
var demo_number = 123213213;
// Boolean
var bool = true;
// array, string array
var str_array = ['one', 'two', 'three'];
// array, number array
var number_array = ['1', '2', '3', '4'];
// Enum
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Black"] = 1] = "Black";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var key = Color.Black; //(get ket in array )
var value = Color[2]; //(get value in array )
// Object
var obj = {
    childObj: {
        typesrcipt: 'started',
        angular2: 'part1',
        grandchildObj: {
            ionic: 'part2'
        }
    }
};
function notReturn() {
    console.log('Not found return !!!');
}
notReturn();
/// <reference path="app4.ts" />
/// <reference path="app.ts" />
function demo(x) {
    console.log("ok fine" + x);
}
demo(5);
// tsc -out all.js all.ts --watch
// tsc all.ts -t ES6
