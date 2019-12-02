/*
takeEvery  

saga的写法比较是generator 函数（yield）
*/
import axios from 'axios'
import { put, takeEvery} from 'redux-saga/effects'
import {GET_TODO_LIST} from './actionType'
import {initTodoList} from './actionCreators'


function* getTodoList(){
     try{
          const res =yield axios.get('./list.json');
          console.log(res)
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