/*
图书管理系统：操作很多，如 图书的类型，图书的信息
 reducers 是一个函数 
 接受的参数 state ，action
 state 整个管理系统的数据信息 
 
 
 reducers 可以接受state，但是绝不能直接的修改state的，
 只能通过把原型的state复制一份新的newState，在newState中进行修改，然后
 把newState传递给state,
 
*/

import { CHANGE_INPUT_VALUE,ADD_TODO_LIST,DEL_TODO_LIST,INIT_TODO_LIST ,GET_TODO_LIST} from './actionType'

//图书管理系统的数据
const defaultStore = {
    inputValue:'111',//input 输入的值
    list:['水果']//列表数组的数据
}


export default (state = defaultStore, action) => {
     console.log(state)
     const newState = JSON.parse(JSON.stringify(state));
     switch (action.type) {
          case CHANGE_INPUT_VALUE:
          console.log(action)
               newState.inputValue = action.payload;
               return newState;
          case ADD_TODO_LIST:
               newState.list.push(newState.inputValue);
               newState.inputValue = '';
               return newState;
          case DEL_TODO_LIST:
               newState.list.splice(action.payload,1);
               return newState;
          case INIT_TODO_LIST:
               newState.list = action.payload;
               return newState;
          default:
               return state
     }
}
