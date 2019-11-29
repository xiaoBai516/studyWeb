/*先引入组件，再引入样式*/
import React from 'react';
import {Button,Input } from 'antd';

import '../../style/base.scss'
import '../../style/style.scss'
import '../../style/App.scss'
import 'antd/dist/antd.css';


class App extends React.Component {
    //设置出事状态，执行 super(props)
     constructor(props) {
          super(props);
          //设置新的数组
          this.state = {
               name:'',
               solders:[]
          }
     }
     inpChane(e){
          /*
               1.e.target 就是元素的dom节点 <input id="innerHtml" type="text" value="22">
               2.获取当前节点还有可以使用ref 参数 （16.3版本后，ref 是一个函数）
               在html input 标签中加入 ref={(ipt) => {this.getIpt = ipt}}
             ru:  <input id="innerHtml" type="text" value={this.state.name} ref={(ipt) => {this.getIpt = ipt}} onChange={this.inpChane.bind(this)} /> 
               我们设置一个ref，可以自动接受一个参ipt。这个ref的引用叫this.getIpt,它指向这个input（ipt），获取对应的dom节点
               
          */
          
          //es6修改
          // console.log(this.getIpt,this.getIpt.value)
          const value = e.target.value;//this.getIpt.value
          this.setState( () => ({
                name:value
          }))
     }
     //增加
     addSolders(){
          //setState 是一个异步函数，不是立即就直接，而是要等一会就执行，如果你想setState执行成功后，页面更新后，再去获取dom的节点，正确的做法是：
          // setState 第二参数,也是个函数
          this.setState( (prevState, props) => ({
               solders:[...prevState.solders,{"id":Math.random(),"name":prevState.name}],
               name:''
          }),() =>{
               console.log('li 的长度2：',this.ulRef.querySelectorAll('li').length)
          })
          console.log('li 的长度1：',this.ulRef.querySelectorAll('li').length)
     }
     render(){
         return (
              <div>
                   <h2>一营营长,名字叫:{this.props.nameBoss}.</h2>,
                   <div><label htmlFor="innerHtml">请输入新成员的名字:</label> ,
                    <input id="innerHtml" type="text" value={this.state.name} ref={(ipt) => {this.getIpt = ipt}} onChange={this.inpChane.bind(this)} /> 
                   </div>
                   <Button type="primary" onClick={this.addSolders.bind(this)}>新成员加入</Button>
                   <div>一营里有成员:</div>
                   <ul ref={(el) => this.ulRef = el}>
                        {
                             this.state.solders.length === 0?'无':
                             this.state.solders.map( (data,index) => {
                                 return <li  key={index} dangerouslySetInnerHTML={{ __html:data.name}}></li>
                             })
                        }
                   </ul>
              </div>
         )
    }
}
export default App;
