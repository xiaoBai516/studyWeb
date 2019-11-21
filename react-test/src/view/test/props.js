/*
********组件之间的传递数据
* 使用props传递数据
* 使用《组件 数据="值">的形式传递
* 组件里使用this.props获取值
* 如果组件只有render函数，还可以用函数的形式写组件
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

//1.无状态函数式组件
function Child(props){
     return <h2>骑兵连连长,名字叫:{props.nameChild}.</h2>
}


//记得是首字母需要大写
class Onebattalion extends React.Component {
     render(){
          return <h2>一营营长,名字叫:{this.props.nameBoss}.</h2>
     }
}

export default App;
