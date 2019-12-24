TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持，它由 Microsoft 开发。

1.TypeScript 增加了代码的可读性和可维护性

    A.类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
    
    B.可以在编译阶段就发现大部分错误，这总比在运行时候出错好
    
    C.增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等
    
2.TypeScript 非常包容

    A.TypeScript 是 JavaScript 的超集，.js 文件可以直接重命名为 .ts 即可
    
    B.即使不显式的定义类型，也能够自动做出类型推论
    
    C.可以定义从简单到复杂的几乎一切类型
    
    E.即使 TypeScript 编译报错，也可以生成 JavaScript 文件
    
    D.兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取

3.TypeScript 拥有活跃的社区
   
    A.大部分第三方库都有提供给 TypeScript 的类型定义文件
    
    B.Google 开发的 Angular2 就是使用 TypeScript 编写的
    
    C.TypeScript 拥抱了 ES6 规范，也支持部分 ESNext 草案的规范
    
4.TypeScript 的缺点
    任何事物都是有两面性的，我认为 TypeScript 的弊端在于：
    
    A.有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念
    
    B.短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本
    
    C.集成到构建流程需要一些工作量
    
    E.可能和一些库结合的不是很完美


一.创建简单的项目

1.先创建hello.ts文件

    function hello(person){
        return 'hello '+person
    }
    let user = 'Yee'
    console.log(hello(user))

注意:虽然是js的内容，但是本身是ts文件，所以需要编译

2.命令 在文件目录下

tsc hello.ts 编译

这时可以看到目录下生成 hello.js 里面内容就是刚刚创建的

3.执行 node hello.js  这时就可以执行js内容 

输出：hello Yee

二.性质

1.TypeScript 只会进行静态检查，如果发现有错误，编译的时候就会报错。

TypeScript 编译的时候即使报错了，还是会生成编译结果

    function sayHello(person: string) {
        return 'Hello, ' + person;
    }

    let user = [0, 1, 2];
    
    console.log(sayHello(user));

tsc hello.ts 编译的时候会报错，但是还是会生成js文件

    function hello(person) {
        return 'hello ' + person;
    }
    var user = [0, 1, 2];
    console.log(hello(user));
    
 注意：如果要在报错的时候终止 js 文件的生成，可以在 tsconfig.json 中配置 noEmitOnError 即可。
