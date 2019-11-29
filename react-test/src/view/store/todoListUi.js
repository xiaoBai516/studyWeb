import React from 'react';
import {Button,Input,List} from 'antd';
import '../../style/base.scss'
import '../../style/style.scss'
import '../../style/App.scss'
import 'antd/dist/antd.css';


// 定义组件 class语法新建组件，render里直接使用 return 里面写jsx语法
class TodoListUi extends React.Component {
	render() {
          const {inputValue,changeIpt,submitBtn,list}= this.props;
		return (
			<div style={{"margin":"20px"}}>
                    <h2>hello redux</h2>
                    <Input id="innerHtml" type="text" placeholder="请输入" style={{"width":"200px"}} value={inputValue} onChange={changeIpt}  />
                    <Button type="primary" onClick={submitBtn}>提交</Button>
				<List style={{"marginTop":"20px"}}
				     bordered
				     dataSource={list}
				     renderItem={(item,index) => (
				        <List.Item onClick={() => {this.props.delItem(index)}}>{item} </List.Item>
				     )}
				/>
			</div>
		);
	}
}
export default TodoListUi;

/*
想调用父组件的方法,同时又要传值,有2种形式表达

delItem 是父组件的方法
1.箭头函数
onClick={(index) => {this.props.delItem(index)}}


2.定子组件的方法
onClick={this.delListItem.bind(this,index)}
delListItem(index){
     this.props.delItem(index);
}


*/