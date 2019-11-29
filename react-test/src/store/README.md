在入口文件： index.js
import React from 'react';
import ReactDOM from 'react-dom';
// 学习redux基础语法store={store}
import App from './view/store/todoList';
ReactDOM.render(<App/>, document.getElementById('root'))



## 什么是Redux

Redux是专注于状态管理,单一状态 ，单向数据流处理. 参看图片（https://img-blog.csdn.net/20180530163241334）

redux = reducer + flux(官方最开始推出的) 

理念：把所有的数据放在store里面，进行管理。

工作流程：查看工作流程图解析

简单理解：

在Redux中，所有的数据（比如state）被保存在一个被称为store的容器中 → 在一个应用程序中只能有一个。store本质上是一个状态树，保存了所有对象的状态。任何UI组件都可以直接从store访问特定对象的状态。要通过本地或远程组件更改状态，需要分发一个action。分发在这里意味着将可执行信息发送到store。当一个store接收到一个action，它将把这个action代理给相关的reducer。reducer是一个纯函数，它可以查看之前的状态，执行一个action并且返回一个新的状态。

简单的理解：old state  ———》action(行为状态：type:{接受类型})  ——》reducer 函数（计算state，）——》得到 new  state

## 安装

     npm install --save redux react-redux   

     npm install redux-thunk --save-dev 

redux是本地数据库使用，react-redux帮助你完成数据订阅，redux-thunk可以放你实现异步action，redux-logger是redux的日志中间件。

## 简单的案例
   
     1.创建store （管理员） store/index.js
          import { createStore } from 'redux'
          const store = createStore()
          export default store
          
     2.创建图书管理系统 reducers 里面进行数据的操作:reducers.js
          
          reducers 是一个函数，接受的参数 state 和action。state 整个管理系统的数据信息 
          //图书管理系统的数据 可以初始化设置 
          const defaultStore = {
              inputValue:'123',//input 输入的值
              list:["香蕉","苹果","梨"] //列表数组的数据
          }
          
          export default (state = defaultStore, action) => {
               return state
          }
          
     3.reducers把数据传给store
          import reducer from './reducer'

          const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

          export default store
          
     4.在组件中引用
          import store from '../../store'
          当前时刻的 State，可以通过store.getState()拿到。
          this.state = store.getState();
     
     5.组件 要改变input的值，绑定一个事件changeIpt
     
     6.组件要干嘛的话传递store
     
          changeIpt(e){
               const value = e.target.value;
               //这个是组件要的数据 payload 这个可以自定义，通常用payload
               const action = {
                  type:'change_input_value',
                  payload:value
               }
               store.dispatch(action);//把数据通过store传递
          }
     7.store 把数据信息传给reducer，reducers操作
     因为const store = createStore(reducer),这样的话，组件传递过来的数据就会自动传给reducers
     
     export default (state = defaultStore, action) => {
          console.log(state,action)//这边就会打印出 组件传递过来的信息
     }
     
     8.reducers可以接受state，但是绝不能直接的修改state的，只能通过把原型的state复制一份新的newState，在newState中进行修改，然后把newState传递给state,
          export default (state = defaultStore, action) => {
               console.log(state,action)
               switch (action.type) {
                    case 'change_input_value':
                         const newState = JSON.parse(JSON.stringify(state));
                         newState.inputValue = action.value;
                         return newState;
                    default:
                         return state
               }
          }
     9.store.subscribe()这个函数式负责监听state的变化，一旦 State 发生变化，就自动执行这个函数。
     所以在  constructor通过store.subscribe()绑定一个方法changeStore。来监听state的值
     constructor(props) {
          super(props)
          this.state = store.getState();
          this.changeIpt = this.changeIpt.bind(this);
          this.changeStore = this.changeStore.bind(this);
          store.subscribe(this.changeStore);
     }
     changeStore(){
          console.log('store change')
     }
     
     10. state的改变，组件也改变
     changeStore(){
           this.setState(store.getState());
     }
     
     11.ActionTypes的拆分 吧action type 提取出来，放在专门的文件，这个好处就是如果一不小心写错了，报错明显，可以找到，因为变量报错，会直接提醒，而字符串写错了，不会提示
          actionType.js

          export const CHANGE_INPUT_VALUE = 'change_input_value'
          export const ADD_TODO_LIST = 'add_todo_list'
          export const DEL_TODO_LIST = 'del_todo_list'
          
          2.修改组件 action方法 中的类型
               import {CHANGE_INPUT_VALUE,ADD_TODO_LIST,DEL_TODO_LIST} from '../../store/actionType.js'
               const action = {
                      type:CHANGE_INPUT_VALUE,
                      payload:value
               }
               把所有的字符串类型改成变量
          3.修改reducers 方法 中的类型
     
               import { CHANGE_INPUT_VALUE,ADD_TODO_LIST,DEL_TODO_LIST } from './actionType'
               
               //图书管理系统的数据
               const defaultStore = {
                   inputValue:'123',//input 输入的值
                   list:["香蕉","苹果","梨"] //列表数组的数据
               }
               export default (state = defaultStore, action) => {
                    const newState = JSON.parse(JSON.stringify(state));
                    switch (action.type) {
                         case CHANGE_INPUT_VALUE:
                              newState.inputValue = action.payload;
                              return newState;
                         case ADD_TODO_LIST:
                              newState.list.push(newState.inputValue);
                              newState.inputValue = '';
                              return newState;
                         case DEL_TODO_LIST:
                              newState.list.splice(action.payload,1);
                              return newState;
                         default:
                              return state
                    }
               }
     12.使用actionCreator统一创建action  这是为了统一管理，还有自动化测试也方便
     actionCreator.js
          import {CHANGE_INPUT_VALUE,ADD_TODO_LIST,DEL_TODO_LIST} from './actionType'
          
          export const getChangeInputValue = (value) => ({
              type: CHANGE_INPUT_VALUE,
              payload:value
          })
          export const addTodoList = () => ({
              type:ADD_TODO_LIST
          })
          export const delTodoList = (value) => ({
              type:DEL_TODO_LIST,
              payload:value
          })
               
          2.在去修改组件
          
          
# 总结：

     1.store是唯一的
     2.只有store能够改变自己的内容，
     reducers不能改变state,只能复制一份新的newState，在newState中进行修改，然后
     把newState传递给state,然后store自己去替换内容（state就是store里面的数据）
     3.reducers 必须是纯函数

     纯函数指的是：给定固定的输入，就一定会有固定的输出，而且不会有任何副作用

     副作用：就是对参数进行修改
     export default (state = defaultStore, action) => {
          state.inputValue = action.payload ;这个就是副作用
     }

* 方法：

     createStore :创建store   const store = createStore()
     store.dispatch: 把组件 需要的数据传给 reducers
     store.getState： 获取store的数据
     store.subscribe：监听 store的数据的变化
     
## redux 中发送异步请求获取数据

     #请求本地数据
          1.在public文件夹里创建list.json
          2.package.json里面 "proxy":"http://localhost:3000"
          3.在组件中请求
          componentDidMount(){
               axios.get('./list.json').then((res)=>{
                    const todoList = res.data.todoList;
                    const action = initTodoList(todoList);
                    store.dispatch(action);
               })
          }
          4.请求接口的数据，传递给state的
               actionType.js:
                    export const INIT_TODO_LIST = 'init_todo_list'
               actionCreators.js:
                    export const getTodoList = (data) => ({
                        type:INIT_TODO_LIST,
                        payload:data
                    })
                    
          5.renducers
               export default (state = defaultStore, action) => {
                    console.log(state)
                    const newState = JSON.parse(JSON.stringify(state));
                    switch (action.type) {
                         case INIT_TODO_LIST:
                              newState.list = action.payload;
                              return newState;
                         default:
                              return state
                    }
               }
## 使用Redux-thunk中间件实现ajax数据请求
     安装redux-thunk:
          cnpm install --save redux-thunk
     import { createStore, applyMiddleware } from 'redux';
     import thunk from 'redux-thunk';
     import reducer from './reducer'
     
     
     
     const store = createStore(
          reducer,
          applyMiddleware(thunk)
     );
     注意：如果你还想使用  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()的话，那就得在安装 redux-devtools-extension redux调试工具
          
          import { createStore, applyMiddleware,compose } from 'redux';
          import thunk from 'redux-thunk';
          import reducer from './reducer'
          
          const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//浏览器的应用
          
          const enHancer = composeEnhancers(applyMiddleware(thunk));
          const store = createStore(reducer,enHancer);
          export default store
          
          


redux-thunk 安装好，创建store 使用这个中间件，同时通过enHancer的使用，结合了redux-thunk + redux-devtools-extension 的调试工具的结合使用。

1.异步的操作代码

组件挂载完后，使用了redux-thunk 后，action 就可以是对象或是函数（没有redux-thunk,action只能是对象）
实际上store只能接受对象，store发现接受的是函数，就会自动找到这个函数，去执行它
componentDidMount(){
     const action = getTodoList();
     store.dispatch(action);
}

 actionCreators.js: 里面找到这个函数getTodoList ，获取数据，又要传递store
 
     export const getTodoList = () =>{
          return (dispatch) =>{
                axios.get('./list.json').then((res)=>{
                     const todoList = res.data.todoList;
                     const action = initTodoList(todoList);
                     dispatch(action);
                })
          }
     }


## ss 