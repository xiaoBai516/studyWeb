/*
********组件内部state
* JSX本质就是js,所以直接数组.map渲染列表
*  constructor(props)  设置出事状态，执行 super(props)
* state就是一个不可变得对象，使用this.state获取
* 
* 
*/

import React from 'react';
import {Button } from 'antd';
import '../../style/base.scss'
import '../../style/style.scss'
import '../../style/App.scss'
import 'antd/dist/antd.css';

// 定义组件 class语法新建组件，render里直接使用 return 里面写jsx语法
class App extends React.Component {
	render() {
		const boss = '李云龙';
		return (
			<div>
				<h2>独立团,团长{boss}</h2>
                    <Onebattalion  nameBoss='张大喵'/>
                    <Child nameChild="孙德胜"/>
			</div>
		);
	}
}

//无状态函数式组件
function Child(props){
     return <h2>骑兵连连长,名字叫:{props.nameChild}.</h2>
}


//记得是首字母需要大写
class Onebattalion extends React.Component {
     //1.设置出事状态，执行 super(props)
     constructor(props) {
         super(props);
         //2.设置新的数组
         this.state = {
              solders:[
                   {"id":"1","name":"小勇"},
                   {"id":"2","name":"小时"},
                   {"id":"3","name":"翔子"}
              ]
         }
     }
     render(){
          return (
               <div>
                    <h2>一营营长,名字叫:{this.props.nameBoss}.</h2>
                    <div>一营里有成员:</div>
                    {/*3.数组渲染*/}
                    <ul>
                         {
                              this.state.solders.length == 0?'无':
                              this.state.solders.map( data => {
                                  return <li  key={data.id}>{data.name}</li>
                              })
                         }
                    </ul>
               </div>
          )
     }
}

export default App;
