##什么是Redux
Redux是专注于状态管理,单一状态 ，单向数据流处理. 参看图片（https://img-blog.csdn.net/20180530163241334）

简单理解：

在Redux中，所有的数据（比如state）被保存在一个被称为store的容器中 → 在一个应用程序中只能有一个。store本质上是一个状态树，保存了所有对象的状态。任何UI组件都可以直接从store访问特定对象的状态。要通过本地或远程组件更改状态，需要分发一个action。分发在这里意味着将可执行信息发送到store。当一个store接收到一个action，它将把这个action代理给相关的reducer。reducer是一个纯函数，它可以查看之前的状态，执行一个action并且返回一个新的状态。

简单的理解：old state  ———》action(行为状态：type:{接受类型})  ——》reducer 函数（计算state，）——》得到 new  state

##安装

     npm install --save redux react-redux   

     npm install redux-thunk --save-dev 

redux是本地数据库使用，react-redux帮助你完成数据订阅，redux-thunk可以放你实现异步action，redux-logger是redux的日志中间件。

##简单的案例

