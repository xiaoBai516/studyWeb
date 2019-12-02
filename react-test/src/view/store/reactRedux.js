import React from 'react';
import {Button,Input,List} from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import {getTodoList,getChangeInputValue,addTodoList,delTodoList,initTodoList} from '../../store/actionCreators.js'


// 定义组件 class语法新建组件，render里直接使用 return 里面写jsx语法
class App extends React.Component {
     constructor(props) {
          super(props)
     }
	render() {

		return (
               <div style={{"margin":"20px"}}>
                    <h2>hello redux</h2>
                    <Input id="innerHtml" type="text" placeholder="请输入" style={{"width":"200px"}} value={this.props.inputValue} onChange={this.props.changeIpt}  />
                    <Button type="primary" onClick={this.props.submitBtn}>提交</Button>
               	<List style={{"marginTop":"20px"}}
               	     bordered
               	     dataSource={this.props.list}
               	     renderItem={(item,index) => (
               	        <List.Item >{item} </List.Item>
               	     )}
               	/>
               </div>
		);
	}
}
const mapStateToPrps = (state) =>{
     return {
          inputValue:state.inputValue,
          list:state.list
     }
}
//store.dispatch 
const mapDispatchToPrps = (dispatch) =>{
     return {
          changeIpt(e){
               const action = getChangeInputValue(e.target.value);
               dispatch(action);
          },
          submitBtn(){
               const action = addTodoList();
               dispatch(action);
          }
     }
}
export default connect(mapStateToPrps,mapDispatchToPrps)(App);
