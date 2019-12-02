import React from 'react';
import '../../style/base.scss'
import '../../style/style.scss'
import '../../style/App.scss'
import store from '../../store'
import axios from 'axios'
import {getTodoList,getChangeInputValue,addTodoList,delTodoList,initTodoList} from '../../store/actionCreators.js'
import TodoListUi from './todoListUi.js'

// 定义组件 class语法新建组件，render里直接使用 return 里面写jsx语法
class App extends React.Component {
     constructor(props) {
          super(props)
          this.state = store.getState();
          this.changeIpt = this.changeIpt.bind(this);
          this.submitBtn = this.submitBtn.bind(this);
          this.changeStore = this.changeStore.bind(this);
          this.delItem = this.delItem.bind(this);
          store.subscribe(this.changeStore);
     }
     changeStore(){
          console.log('store change')
          this.setState(store.getState());
     }
     changeIpt(e){
          const action = getChangeInputValue( e.target.value);
          store.dispatch(action);
     }
     submitBtn(){
          const action = addTodoList();
          store.dispatch(action);
     }
     delItem(index){
          const action = delTodoList(index);
          store.dispatch(action);
     }
     componentDidMount(){
          //3. redux-saga
          const action = getTodoList();
          store.dispatch(action);
          //1. 一般的请求
          // axios.get('./list.json').then((res)=>{
          //      const todoList = res.data.todoList;
          //      const action = initTodoList(todoList);
          //      store.dispatch(action);
          // })
          //2.redux-thunk
          // const action = getTodoList();
          // store.dispatch(action);
     }
	render() {

		return (
               <TodoListUi inputValue={this.state.inputValue} changeIpt={this.changeIpt} submitBtn={this.submitBtn} list={this.state.list} delItem ={this.delItem}/>
		);
	}
}
export default App;
