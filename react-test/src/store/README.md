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
     
     * 什么是redux中间件
          中间件是action和store的中间。中间件一定是redux的中间件
          中间件是对store.dispatch方法的封装，升级。原始dispatch只能接受对象，因为有了中间件，dispatch还可以接受到函数。如果组件传递是对象，则直接把对象传给store，如果是函数，则会先执行函数，把输出的值传给store
        
     
     * 其他的中间
     
      redux-saga 
      
     * 安装
          安装redux-thunk:
          cnpm install --save redux-thunk
          
     * 使用
          1. index.js  store使用
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

          2.异步的操作代码

          组件挂载完后，使用了redux-thunk 后，action 就可以是对象或是函数（没有redux-thunk,action只能是对象）
          实际上store只能接受对象，store发现接受的是函数，就会自动找到这个函数，去执行它，这个函数 是在请求，获取json数据，数据改了，同时要改变store里面的数据；要改变store的数据，就要走redux的流程，
          先去创建action，然后我们调用store.dispatch的方法，我们返回这个函数就会自动返回dispatch的方法
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


## redux-saga

     * 安装
          npm install --save redux-saga
     *使用
          
          1.根据官方文档把saga的使用配置做好 index.js store
          
           import { createStore, applyMiddleware,compose } from 'redux';
           import createSagaMiddleware from 'redux-saga'
           import reducer from './reducer'
           import mySaga from './sagas'
           
           //创建saga的中间件
           const sagaMiddleware = createSagaMiddleware()
           const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//浏览器的应用
           
           const enHancer = composeEnhancers(applyMiddleware(sagaMiddleware));
           const store = createStore(reducer,enHancer);
           export default store
          
          2.组件 派发action 给reducers
               actionCreators.js
               export const getTodoList = () => ({
                   type:GET_TODO_LIST
               })
               componentDidMount(){
                    //3. redux-saga
                   const action = getTodoList();
                   store.dispatch(action);
     
               }
          3.组件的派发action，除了reducers会收到，sage文件也是会受到的，
          saga的文件，这个文件一定要导出generator的函数，在这个函数里面写逻辑：当我接受到action类型，我会执行相对应的方法
          这个方法generator函数 去取数据，去完数据，在创建action，派发给store，store给了reducers
          takeEvery的，在这里
          
               import axios from 'axios'
               import { put, takeEvery} from 'redux-saga/effects'
               import {GET_TODO_LIST} from './actionType'
               import {initTodoList} from './actionCreators'
               
               
               function* getTodoList(){
                    try{
                         const res =yield axios.get('./list.json');
                         const action = initTodoList(res.data.todoList);
                         yield put(action)   
                    }catch(e){
                         console.log('list.json网络请求失败')
                    }
                    
               }
               function* mySaga() {
                    yield takeEvery(GET_TODO_LIST,getTodoList)
               }
               
               export default mySaga;
          
redux-saga比redux-thunk 复杂多。redux-saga 适用于大项目

## react-redux 这是第三方插件 :reactRedux.js
     
     
     这是为了更方便使用redux。
     
     * 安装：npm install react-redux --save
     
     * 使用
       
     1.创建store index.js
     
     2.入口文件
          import React from 'react';
          import ReactDOM from 'react-dom';
          import * as serviceWorker from './serviceWorker';
          import { Provider } from 'react-redux';
          import store from './store'
          //Provider 提供器，提供store ，这时Provider里面放着的组件，因此Provider里面的组件都可以获取store的值
          
          import App from './view/store/reactRedux';
          
          const AppView = (
              <Provider store={store}>
                  <App />
              </Provider>
          )
          
          ReactDOM.render(AppView, document.getElementById('root'))
          
     3.组件
     import { connect } from 'react-redux';
     connect使组件获取store。
     原理是：connect是链接，谁和谁做链接，是组件和store做链接；怎么做链接，有个映射关系，就是mapStateToPrps里面。mapStateToPrps里面的state 映射到组件的变量里
    
     3.1 获取store的数据
     const mapStateToPrps = (state) =>{
         return {
              inputValue:state.inputValue,
              list:state.list
         }
     }
     访问的时候则是 this.props.inputValue
     3.2 修改store数据
     const mapDispatchToPrps = (dispatch) =>{
          return {
               changeIpt(e){
                    const action = getChangeInputValue(e.target.value);
                    dispatch(action);
               },
               submitBtn(){
                    const action = addTodoList();
                    dispatch(action);
               
          }
     }
      <Button type="primary" onClick={this.props.submitBtn}>提交</Button>
       
    export default connect(mapStateToPrps,mapDispatchToPrps)(App);
    
    
## 使用Immutable.js来管理store中的数据：Immutable.js

     因为 store的数据是不能直接修改的，必须复制一份来，在进行操作。Immutable 刚好就是针对这个的操作。
     Immutable 是第三方的模块，Facebook的团队开发的第三方库。Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象
     state 创建成Immutable 对象，这样就变成不可改变了。
     
     1.安装：
          npm install immutable
          
      2.使用
          在reducers.js文件里，
          
          1.引用：import { fromJS } from 'immutable';
          
          2.创建Immutable 对象
          const defaultStore = {
              inputValue:'111',//input 输入的值
              list:['水果']//列表数组的数据
          }
          修改成
          const defaultState = fromJS({
          	inputValue:'111',//input 输入的值
          	list:['水果']//列表数组的数据
          });
          
          3.修改组件的
          const mapStateToPrps = (state) =>{
               return {
                    inputValue:state.inputValue,
                    list:state.list
               }
          }
          
          修改成
          const mapStateToPrps = (state) =>{
               return {
                    inputValue:state.get('inputValue'),
                    list:state.get('list')
               }
          }
          4.
          immutable对象的set方法，会结合之前immutable对象的值和设置的值，返回一个全新的对象
          export default (state = defaultStore, action) => {
               switch (action.type) {
                    case CHANGE_INPUT_VALUE:
                         return state.set('inputValue',action.payload);
                    default:
                         return state
               }
          }
          
        
          