import React from 'react';
import '../style/base.scss'
import '../style/style.scss'
import '../style/App.scss'
import 'antd/dist/antd.css';

// 定义组件 class语法新建组件，render里直接使用 return 里面写jsx语法
class TodoItem extends React.Component {
     constructor(props) {
          super(props);
     }
     //删除
     handClick(item){
          this.props.deleteItem(item);
     }
     getCreateDiv(){
          const { solders } = this.props;
          return (
               solders.length === 0?'无':
               solders.map( (data,index) => {
                     return <li  key={index} onClick={this.handClick.bind(this,data)} dangerouslySetInnerHTML={{ __html:data.name}}></li>
                })
          )
     }
	render() {
          
		return (
			<div>
                    <ul>
                         {this.getCreateDiv() }
                    </ul>

			</div>
		);
	}
}


export default TodoItem;