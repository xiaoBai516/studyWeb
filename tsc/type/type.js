//1.string
var myName = 'Tom';
var myAge = 25;
// 模板字符串
var sentence = "Hello, my name is " + myName + ".I'll be " + (myAge + 1) + " years old next month.";
console.log(sentence); //Hello, my name is Tom.I'll be 26 years old next month.
//2.元组 Tuple
var x;
x = ['hello', 10];
x[1] = 1;
console.log('x[0]:', x[0]);
console.log('x:', x);
//枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var colorName = Color[2];
var c = Color.Green;
console.log('colorName', colorName);
