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
                    <Onebattalion />
			</div>
		);
	}
}
//记得是首字母需要大写
class Onebattalion extends React.Component {
     render(){
          const boss = '张大喵'
          return <h2>一营营长,{boss}</h2>
     }
}

export default App;
