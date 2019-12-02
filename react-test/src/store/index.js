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

/*1.redux-thunk*/
// import { createStore, applyMiddleware,compose } from 'redux';
// import thunk from 'redux-thunk';
// import reducer from './reducer'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//浏览器的应用

// const enHancer = composeEnhancers(applyMiddleware(thunk));
// const store = createStore(reducer,enHancer);
// export default store

/*2.redux-saga */
// import { createStore, applyMiddleware,compose } from 'redux';
// import createSagaMiddleware from 'redux-saga'
// import reducer from './reducer'
// import saga from './sagas'

// //创建saga的中间件
// const sagaMiddleware = createSagaMiddleware()
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//浏览器的应用

// const enHancer = composeEnhancers(applyMiddleware(sagaMiddleware));
// const store = createStore(reducer,enHancer);
// sagaMiddleware.run(saga);//中间件运行sage
// export default store

/*3.react-redux*/
import { createStore, applyMiddleware,compose } from 'redux';
import reducer from './reducer'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store
