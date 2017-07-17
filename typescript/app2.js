function strFunction() {
    return "This is string";
}
//
function numberFunction() {
    return 123456789;
}
//
function strArrayFunction() {
    return ['one', 'two', 'three', 'four'];
}
//
function numArrayFunction() {
    return [1, 4, 5, 45, 6, 56, 3];
}
//
function anyFunction() {
    return {
        mobieApp: {
            Typescript: 'Part 1',
            Angular2: 'Part 2',
            Ionic: 'Part 3'
        }
    };
}
////////////////////////////////////////////////////
function Hi(name, age) {
    return 'Hello, my name is ' + name + ". I'm " + age + ' years old !';
}
console.log(Hi('Chau', 20));
//
var HiOrther = function (name, age) {
    return 'Hi, my name is ' + name + ". I'm " + age + ' years old !';
};
console.log(HiOrther('Chau', 20));
//
function add(x, y) {
    if (x === void 0) { x = 25; }
    if (y === void 0) { y = 75; }
    return x + y;
}
;
console.log(add());
//
function AnyChose(x, y) {
    if (y) {
        return y;
    }
    else {
        return 'Not found Y ....! And value X =' + x;
    }
}
console.log(AnyChose('Ok not Y111111', 9999));
console.log(AnyChose('Ok not Y'));
