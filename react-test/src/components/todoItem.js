import React from 'react';
import PropTypes from 'prop-types'
import '../style/base.scss'
import '../style/style.scss'
import '../style/App.scss'
import 'antd/dist/antd.css';

// 定义组件 class语法新建组件，render里直接使用 return 里面写jsx语法
class TodoItem extends React.Component {
     constructor(props) {
          super(props);
          this.state = {};
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
          console.log("子组件 render运行")
		return (
			<div>
                    <ul>
                         {this.getCreateDiv() }
                    </ul>

			</div>
		);
	}
}
/*
对TodoItem组件的属性类型做校验，
solders 是数组类型
deleteItem 是函数类型

isRequired 是必须传这个值
*/
TodoItem.propTypes = {
     solders:PropTypes.array.isRequired,
     deleteItem:PropTypes.func
}

export default TodoItem;