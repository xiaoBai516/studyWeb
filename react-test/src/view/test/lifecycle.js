/*
********生命周期
* React组件有若干钩子函数，在组件不同的状态执行
* 初始化周期：页面组件第一次渲染，执行所有的函数
    
* 组件重新渲染生命周期：属性变化，或是数据重大的变化
* 
* 组件卸载周期：垃圾回收
*/


import React from 'react';
import {Button } from 'antd';
import '../../style/base.scss'
import '../../style/style.scss'
import '../../style/App.scss'
import 'antd/dist/antd.css';
import Qs from 'underscore'

class App extends React.Component {
    //设置出事状态，执行 super(props)  constructor 是es6的函数
     constructor(props) {
          super(props);
          //设置新的数组
          this.state = {
               name:"",
               solders:[]
          }
          console.log('组件初始化')
     }
     inpChane(e){
          const value = e.target.value;
          this.setState( () => ({
                name:value
          }))
     }
     //增加
     addSolders(){
          this.setState( (prevState, props) => ({
               solders:[...prevState.solders,{"id":Math.random(),"name":prevState.name}],
               name:''
          }))
     }
     //删除
     deleteData(item){
          this.setState( (prevState, props) =>{
               let list = [...prevState.solders];
               let  result = Qs.filter(list,function(res) {
                    return res.id !== item.id;
               });
               return { solders:result}
          }) 
     }
     //生命周期函数 render 之前调用 ：在这个方法里面调用 setState 改变状态
     componentWillMount() {
          console.log('componentWillMount：组件马上就要加载了。。')
     }
     //生命周期函数 render之后调用：这里可以获取组件的DOM节点
     componentDidMount() {
     	console.log('componentDidMount：组件加载完毕！')
     }
     //组件更新之前，会被执行 
     shouldComponentUpdate(){
          console.log('shouldComponentUpdate:组件更新之前，会被执行')
          //这个是组件要不要被更新，如果返回true则是更新，如果是false则不更新组件
          return true
     }
     //组件更新
     componentWillUpdate() {
          console.log('componentWillUpdate：组件马上就要更新了。。')
     }
     //组件更新完后
     componentDidUpdate() {
          console.log('componentDidUpdate：组件更新完')
     }
        
     render(){
          console.log('render：组件渲染')
         return (
              <div>
                  <div><label htmlFor="innerHtml">请输入新成员的名字:</label> 
                   <input id="innerHtml" type="text" value={this.state.name}  onChange={this.inpChane.bind(this)} /> 
                  </div>
                  <Button type="primary" onClick={this.addSolders.bind(this)}>新成员加入</Button>
                  <div>一营里有成员:</div>
                  <ul >
                       {
                            this.state.solders.map( (data,index) => {
                                   return <Childdiv key={data.id} item={data} deleteItem = {this.deleteData.bind(this)}/>
                            })
                       }
                  </ul>
              </div>
         )
    }
}

//记得是首字母需要大写
class Childdiv extends React.Component {
     constructor(props) {
          super(props);
          this.state = {};
     }
     shouldComponentUpdate(nextProps, nextState){
          return nextProps.item === this.props.item?false:true
     }
     //这个组件是判断props 是否变化了，若变化了，this.setState将引起state变化，从而引起render
     componentWillReceiveProps(){
          console.log('child:componentWillReceiveProps：props更新')
     }
     //删除
     handClick(item){
          this.props.deleteItem(item);
     }
     //当这个组件即将从这个页面剔除的时候，会被执行
     componentWillUnmount(){
          console.log('child:componentWillUnmount:组件卸载')
     }
     render(){
          console.log('子组件渲染')
           const { item } = this.props;
          return (
          
              <li  onClick={this.handClick.bind(this,item)} dangerouslySetInnerHTML={{ __html:item.name}}></li>
          )
     }
}
export default App;
