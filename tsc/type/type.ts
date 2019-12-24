//1.string

let myName: string = 'Tom';
let myAge: number = 25;

// 模板字符串
let sentence: string = `Hello, my name is ${myName}.I'll be ${myAge + 1} years old next month.`;
console.log(sentence)//Hello, my name is Tom.I'll be 26 years old next month.

//2.元组 Tuple

let x:[string,number];
x = ['hello',10];
x[1] = 1;
console.log('x[0]:',x[0])// hello
console.log('x:',x)//x: [ 'hello', 1 ]

//枚举

enum Color{
    Red=1,
    Green,
    Blue
}
let colorName:string = Color[2];
let c:Color = Color.Green;
console.log('colorName',colorName)//Green



//any

let notSure:any = 4

notSure = 'hello'

notSure = false;

let list:any[] = [1,true,'free']

//void

function alertName(): void {
    alert('My name is Tom');
}
//声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null：
let unusable: void = undefined;


//never

function error(msg:string): never{
    throw new Error(msg)
}

//类型断言
//(<string>someValue)/ (someValue as string) 这2种都是强制转换类型方法


let somrValue:any ='this is a string'

let strLength:number = (<string>someValue).length
let strLength:number = (someValue as string).length