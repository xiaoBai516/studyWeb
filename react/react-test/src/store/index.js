//1.安装redux，引入redux. Redux 提供createStore这个函数，用来生成新的Store。
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
