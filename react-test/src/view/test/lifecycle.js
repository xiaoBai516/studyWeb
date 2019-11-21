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
               solders:[
                  {"id":"1","name":"小吴"},
                  {"id":"2","name":"小时"},
                  {"id":"3","name":"翔子"}
               ]
          }
          console.log('组件初始化')
          // this.addSolders = this.addSolders.bind(this);
     }
     //生命周期函数 render 之前调用 ：在这个方法里面调用 setState 改变状态
     componentWillMount() {
          console.log('组件马上就要加载了。。')
     }
     componentWillUpdate() {
          console.log('组件马上就要更新了。。')
     }
      //生命周期函数 render之后调用：这里可以获取组件的DOM节点
     componentDidMount() {
    		console.log('组件加载完毕！')
    	}
     render(){
         return (
              <div>
                   <h2>一营营长,名字叫:{this.props.nameBoss}.</h2>
                   <div>一营里有成员:</div>
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
