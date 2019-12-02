import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store'
//Provider 提供器，链接了store ，这时Provider里面放着的组件，因此Provider里面的组件都可以获取store的值

// 学习react基础语法
// import App from './view/test/group';
// import App from './view/test/props';
// import App from './view/test/state';
// import App from './view/test/todoList';
// import App from './view/test/lifecycle';
// import App from './view/test/refs';
// 学习redux基础语法store={store}
import App from './view/store/reactRedux';

const AppView = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(AppView, document.getElementById('root'))

serviceWorker.unregister();

/*下面是redux 的使用*/
// import React from 'react';
// import ReactDOM from 'react-dom';
// // import 'antd/dist/antd.css';
// // 学习redux基础语法store={store}
// import App from './view/store/reactRedux';
// ReactDOM.render(<App/>, document.getElementById('root'))
