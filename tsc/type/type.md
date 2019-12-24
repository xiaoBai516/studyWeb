isDone 是变量  boolean 是类型

1.布尔值

let isDone: boolean = false; 

2.number

let decLiteral: number = 6;

ES6 中的二进制表示法

let hexLiteral: number = 0xf00d;

3.string 

${expr} 用来在模板字符串中嵌入表达式

let myName: string = 'Tom';

let myAge: number = 25;

模板字符串
let sentence: string = `Hello, my name is ${myName}.I'll be ${myAge + 1} years old next month.`;

console.log(sentence)//Hello, my name is Tom.I'll be 26 years old next month.

4.数组

数字类型的数组

let list:number[] = [1,2,3];//推荐使用

let list:Array<number> = [1,2,3]

5.元组 Tuple
允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

let x:[string,number]

注意：自从typescript3.1版本之后，访问越界元素会报错，我们不应该再使用该特性

6.枚举


7.any

不清楚变量的指定类型的时候，不希望类型检测,这时可以使用any 随机改变变量的类型。
注意不要随意用，谨慎用

8.viod

void 表示没有任何返回值的函数。声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null：

let unusable: void = undefined;

9.null和underfine


10.never

表示永远都不存在的数组 ，场景：函数没有返回值或抛出异常的时候

function error(msg:string): never{
    throw new Error(msg)
}

11.object


12.类型断言

比较清楚变量的类型的时候



