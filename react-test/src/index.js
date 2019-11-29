// import React from 'react';
// import ReactDOM from 'react-dom';
// // import App from './App';
// import * as serviceWorker from './serviceWorker';

// import { Provider } from 'react-redux';
// import store from './store'


// // 学习react基础语法
// // import App from './view/test/group';
// // import App from './view/test/props';
// // import App from './view/test/state';
// // import App from './view/test/todoList';
// // import App from './view/test/lifecycle';
// // import App from './view/test/refs';
// // 学习redux基础语法store={store}
// import App from './view/store/todoList';

// const AppView = (
//     <Provider store={store}>
//         <App />
//     </Provider>
// )

// ReactDOM.render(AppView, document.getElementById('root'))

// serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
// 学习redux基础语法store={store}
import App from './view/store/todoList';
ReactDOM.render(<App/>, document.getElementById('root'))
