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
