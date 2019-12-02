import axios from 'axios'
import {CHANGE_INPUT_VALUE,ADD_TODO_LIST,DEL_TODO_LIST,INIT_TODO_LIST,GET_TODO_LIST} from './actionType'

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
//请求接口的数据，传递给state的
export const initTodoList = (data) => ({
    type:INIT_TODO_LIST,
    payload:data
})


// 通过中间件 redux-thunk 
// export const getTodoList = () =>{
//      return (dispatch) =>{
//           axios.get('./list.json').then((res)=>{
//                const todoList = res.data.todoList;
//                const action = initTodoList(todoList);
//                dispatch(action);
//           })
//      }
     
// }
// redux-saga 中间件
export const getTodoList = () => ({
    type:GET_TODO_LIST
})