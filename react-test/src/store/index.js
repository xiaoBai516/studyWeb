/*
安装redux，引入redux. Redux 提供createStore这个函数，用来生成新的Store。
 1.创建store （管理员）
     import { createStore } from 'redux'
     const store = createStore()
 2.创建图书管理系统 reducers,把数据传给store
     import reducer from './reducer'
 
 const store = createStore()
 
 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 这是 如果redux-devtools-extension调试工具 安装了，则可以在redux 那边看到数据，进行调试
*/
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//浏览器的应用

const enHancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer,enHancer);
export default store
