import React from 'react';
import {Button } from 'antd';
import './style/base.scss'
import './style/style.scss'
import './style/App.scss'
import 'antd/dist/antd.css';

// 定义组件 class语法新建组件，render里直接使用
class App extends React.Component {
	render() {
		const user = '表单处理';
          // return 里面写jsx语法
		return (
			<div>
				<h1>{user}!</h1>
                    <div className="ss">设计好</div>
				<Button type="primary">Primary</Button>
			</div>
		);
	}
}
export default App;
