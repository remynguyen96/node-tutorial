function getSomething(arg) {
    return arg;
}
var str = getSomething('Hello Mom !!!');
console.log(str);
var nub = getSomething(21321321321);
console.log(nub);
// array
function getLength(arg) {
    return arg.length;
}
var str_arr = getLength(["ok", "job", "good"]);
console.log(str_arr);
var num_arr = getLength([1, 2, 3, 4, 5]);
console.log(num_arr);
function getCustomType(arg) {
    var d = arg;
    return d;
}
console.log(getCustomType({
    x: 'Hello everybody !',
    y: 21321321321
}));
var Style = (function () {
    function Style() {
    }
    Style.prototype.changeBackground = function () {
        document.body.style.color = "#0f1e3c";
        document.querySelector('body').style.background = "rgb(30, 198, 127)";
    };
    return Style;
}());
var test = new Style();
test.changeBackground();
