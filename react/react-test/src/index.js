import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './store'


// 学习react基础语法
// import App from './view/test/group';
// import App from './view/test/props';
// import App from './view/test/state';
import App from './view/test/todoList';
// import App from './view/test/lifecycle';


const AppView = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(AppView, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

