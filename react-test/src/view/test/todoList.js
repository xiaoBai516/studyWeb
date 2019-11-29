/*
********事件
* JSX里，onClick= {this.函数名}来绑定事件
* this引用的问题，所以需要在构造函数里用bind绑定this:
          * onClick= {this.函数名.bind(this)}
          * constructor(props) {
               this.addSolders = this.addSolders.bind(this)
          }
* this.setState 修改state,记得返回新的state，而不是修改
* 
* 
*/
/*先引入组件，再引入样式*/
import React from 'react';
import {Button,Input } from 'antd';
import TodoItem from '../../components/todoItem'

import '../../style/base.scss'
import '../../style/style.scss'
import '../../style/App.scss'
import 'antd/dist/antd.css';
import Qs from 'underscore'

// 定义组件 class语法新建组件，render里直接使用 return 里面写jsx语法
class App extends React.Component {
	render() {
		const boss = '李云龙';
		return (
			<div>
				<h2>独立团,团长{boss}</h2>
                    <Onebattalion  nameBoss='张大喵'/>
			</div>
		);
	}
}


//记得是首字母需要大写
class Onebattalion extends React.Component {
    //设置出事状态，执行 super(props)
     constructor(props) {
          super(props);
          //设置新的数组
          this.state = {
               name:'',
               solders:[
                  {"id":"1","name":"小吴"},
                  {"id":"2","name":"小时"},
                  {"id":"3","name":"翔子"}
               ]
          }
          
          // this.addSolders = this.addSolders.bind(this);
     }
     inpChane(e){
          // this.setState({
          //      name:e.target.value
          // })
          
          // this.setState 升级函数
          // const value = e.target.value;
          // this.setState( () =>{
          //     return {
          //          name:value
          //     }
          // }) 
          //es6修改
          const value = e.target.value;
          this.setState( () => ({
                name:value
          }))
     }
     //增加
     addSolders(){
          // this.setState( (prevState, props) => ({
          //      solders:[...prevState.solders,{"id":Math.random(),"name":prevState.name}],
          //      name:''
          // }))
          this.setState( (prevState, props) =>{
               console.log('参数：',prevState)
               console.log('参数props：', props)
               return {
                    solders:[...prevState.solders,{"id":Math.random(),"name":prevState.name}],
                    name:''
               }
          }) 
     }
     //删除
     deleteData(item){
          // 不要直接修改state的内容，而是复制一个副本在改
          // let list = [...this.state.solders];
          // let  result = Qs.filter(list,function(res) {
          //      return res.id !== item.id;
          // });
          // this.setState({
          //      solders:result
          // })
          this.setState( (prevState, props) =>{
               let list = [...prevState.solders];
               let  result = Qs.filter(list,function(res) {
                    return res.id !== item.id;
               });
               return { solders:result}
          }) 
     }
     render(){
          console.log("父组件 render运行")
         return (
              <div>
                   <h2>一营营长,名字叫:{this.props.nameBoss}.</h2>
                   <div>一营里有成员:</div>
                   <TodoItem  solders={this.state.solders} deleteItem = {this.deleteData.bind(this)}/>
                    {/*
                    吧这块换成 组件的形式为传递数据
                    <ul>
                         {
                              this.state.solders.length === 0?'无':
                              this.state.solders.map( (data,index) => {
                                  return <li  key={index} onClick={this.deleteData.bind(this,data)} dangerouslySetInnerHTML={{ __html:data.name}}></li>
                              })
                         }
                    </ul>*/}
                   <div><label htmlFor="innerHtml">请输入新成员的名字:</label> <Input id="innerHtml" type="text" value={this.state.name} onChange={this.inpChane.bind(this)}/></div>
                   <Button type="primary" onClick={this.addSolders.bind(this)}>新成员加入</Button>
              </div>
         )
    }
}
export default App;
