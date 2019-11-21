##基础语法

1.import React from 'react';

2.class语法新建组件，render里直接使用

3.render 函数返回值就是输出JSX语法，会把jsx转成js执行

4.变量用{}包裹着：<div>{name}</div>

5.在 JSX 中不能使用 if else 语句，但可以使用 conditional (三元运算) 表达式：<h1>{i == 1 ? 'True!' : 'False'}</h1>

6.style={{ height: 10 }}或是 <p style={{display: true ? 'block' ? 'none'}}>hello world</p>

7.class 在JSX中变为className，

8.solders数组渲染

     <ul>
          {this.state.solders.map(v=>{
               return <li key={v}>{v}</li>
          })}
     </ul>
     
9.点击事件

     <div onClick={this.addfruits.bind(this,'凤梨')}>
     
10. {/* jsx 里面的注释 */}

11.必须有div包裹，{ } 中返回的两个 <p> 也要用 <div> 包裹

     {
          true ? <p>true</p>: <div>
               <p>false 1</p>
        <p>false 2</p>
      </div>
     }
     
12.React组件名字首字母需要大写，其他的随意

     class Onebattalion extends React.Component {
          render(){
               const boss = '张大喵'
               return <h2>一营营长,{boss}</h2>
          }
     }
13.state改变值

	获取： this.state.email
	修改：
		this.setState({
			email: '111@qq.com'
		})
          
14.绑定值 响应式

	<Input type="text" value={this.state.name} onChange={this.inpChane.bind(this)}/>
     inpChane(e){
          this.setState({
               name:e.target.value
          })
     }

15.不要直接修改state的内容，而是复制一个副本在改

16.<label>加上htmlFor，点击label 就会促使input聚焦

     <label htmlFor="innerHtml">请输入新成员的名字:</label> <Input id="innerHtml"/>

## react渲染HTML标签

     let htmls ='<h2>渲染HTML</h2>'

     dangerouslySetInnerHTML={{ __html:htmls}}


##React推出后，三种定义react组件的方式，殊途同归；具体的三种方式：

     1.函数式定义的无状态组件
     
          function Child(props){
               return <h2>骑兵连连长,名字叫:{props.nameChild}.</h2>
          }
          
     
     2.es5原生方式React.createClass定义的组件
     
          const Contacts = React.createClass({  
               render() {
                    return (
                         <div onClick={this.handleClick}></div>
                    );
               }
          });
     
     3.es6形式的extends React.Component定义的组件
     
          class Onebattalion extends React.Component {
               constructor(props) {
                   super(props);
               }
               render(){
                    return <h2>一营营长,名字叫:{this.props.nameBoss}.</h2>
               }
          }
     

##学习点

# 组件传值props 和 拆分组件 : props.js    todoList.js

* 使用props传递数据
* 使用《组件 数据="值">的形式传递
* 组件里使用this.props获取值
* 如果组件只有render函数，还可以用函数的形式写组件

1.this.props
 
     父组件App：
          <Onebattalion  nameBoss='张大喵'/>
     
     子组件Onebattalion：
           <h2>一营营长,名字叫:{this.props.nameBoss}.</h2>
           
2.函数的形式
 
     父组件App：
         <Child nameChild="孙德胜"/>
         
     子组件Child：
          function Child(props){
               return <h2>骑兵连连长,名字叫:{props.nameChild}.</h2>
          }
 

 
 * 父组件向子组件传递数据：通过属性形式来传递， 子组件 通过this.props.属性 接受 数据
 
 todoList.js
     <TodoItem  solders={this.state.solders}/>
  
 todoLtem.js  
  
     render() {
          return (
               <div>
                      <ul>
                           {
                                this.props.solders.length === 0?'无':
                                this.props.solders.map( (data,index) => {
                                     return <li  key={index} onClick={this.deleteData.bind(this,data)} dangerouslySetInnerHTML={{ __html:data.name}}></li>
                                })
                           }
                      </ul>
       
               </div>
          );
     }
  
* 子组件怎么修改父组件传递的数据：实际上是不允许修改的，但是可以通过调用父组件的方法去修改

     子组件怎么调用父组件的方法：只需要把父组件的方法传给子组件，也是通过属性的方式
          
          父组件：自定义属性名A = {this.父组件方法名.bind(this)}
          子组件：this.props.自定义的属性名A()
          
          再把父组件需要的参数通过传递过来的方法 传递过去，这样就可以起到修改父组件的的数据了
     
          todoList.js
               //删除
               deleteData(item){
                    // 不要直接修改state的内容，而是复制一个副本在改
                    let list = [...this.state.solders];
                    let  result = Qs.filter(list,function(res) {
                         return res.id !== item.id;
                    });
                    this.setState({
                         solders:result
                    })
               }
               <TodoItem  solders={this.state.solders} deleteItem = {this.deleteData.bind(this)}/>
           
          todoLtem.js  
               handClick(item){
                    //把点击获取的item，传递给父组件的方法，进行删除数据 
                    this.props.deleteItem(item);
               }
              render() {
                    const { solders } = this.props;
                   return (
                        <div>
                              <ul>
                                    {
                                         this.props.solders.length === 0?'无':
                                         this.props.solders.map( (data,index) => {
                                              return <li  key={index} onClick={this.handClick.bind(this,data)} dangerouslySetInnerHTML={{ __html:data.name}}></li>
                                         })
                                    }
                               </ul>
                
                        </div>
                   );
              }
     
               优化代码：
               
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
 
 
#组件内部state: state.js  todoList.js

* JSX本质就是js,所以直接数组.map渲染列表
*  constructor(props)  设置出事状态，执行 super(props)
* state就是一个不可变得对象，使用this.state获取

简单的操作

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
    
#事件:todoList.js

     1.onClick 点击事件
          比如：函数名：addSolders 
          * JSX里，onClick= {this.addSolders}来绑定事件
          * this引用的问题，所以需要在构造函数里用bind绑定this:
               a. onClick= {this.addSolders.bind(this)}
               b.constructor(props) {
                    this.addSolders = this.addSolders.bind(this)
               }
          * this.setState 修改state,记得返回新的state，而不是修改

eg:onClick={this.deleteData.bind(this,data)}

     <li  key={index} onClick={this.deleteData.bind(this,data)} dangerouslySetInnerHTML={{ __html:data.name}}></li>
     
     deleteData(item){
          // 不要直接修改state的内容，而是复制一个副本在改
          let list = [...this.state.solders];
          let  result = Qs.filter(list,function(res) {
               return res.id !== item.id;
          });
          this.setState({
               solders:result
          })
     }
     
#生命周期 ：lifecycle.js

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
          
     }
     
##性能优化

#setState 解说:  todiList.js

* setState() 来接受一个对象

如：
     inpChane(e){
               this.setState({
                    name:e.target.value
               })
          }
     
*  setState() 来接受函数

React 可以将多个setState() 调用合并成一个调用来提高性能。因为 this.props 和 this.state 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。


inpChane(e){
     // this.setState 接受函数  
     const value = e.target.value;
     this.setState( () =>{
         return {
              name:value
         }
     }) 
     //es6修改
     const value = e.target.value;
     this.setState( () => ({
           name:value
     }))
}

*  setState() 来接受函数 参数

this.setState((prevState, props) =>({}))  prevState是state的值，props是组件传递的参数的值

     addSolders(){
           //第一种方式：
           this.setState( (prevState, props) => ({
                solders:[...prevState.solders,{"id":Math.random(),"name":prevState.name}],
                name:''
          }))
            //第二种方式：
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
            //第一种方式：
          let list = [...this.state.solders];
          let  result = Qs.filter(list,function(res) {
                return res.id !== item.id;
          });
          this.setState({
                solders:result
          })
            //第二种方式：
          this.setState( (prevState, props) =>{
               let list = [...prevState.solders];
               let  result = Qs.filter(list,function(res) {
                    return res.id !== item.id;
               });
               return { solders:result}
          }) 
     }

##React衍生出的思考，思想

#声明式开发：声明式编程就是拿来主义,拿已经封装好的纯函数来实现目的.但是实际上执行的步数不见得会比命令式的代码少,有时候甚至会更多.但是,由于这些纯函数有极强的稳定性,所以程序员根本不用考虑内部的具体实现过程.极大地减少了身心负担

eg:
     ar numbers = [1,2,3,4,5]

     var doubled = numbers.map(function(n) {

       return n * 2
     })
     console.log(doubled) //=> [2,4,6,8,10]

     map 利用当前的数组创建了一个新数组，新数组里的每个元素都是经过了传入map的函数(这里是function(n) { return n*2 })的处理。map函数所作的事情是将直接遍历整个数组的过程归纳抽离出来，让我们专注于描述我们想要的是什么(what)。注意，我们传入map的是一个纯函数；它不具有任何副作用(不会改变外部状态)，它只是接收一个数字，返回乘以二后的值。

#可以与其他框架并存：jq、va-mobile

#组件化：首字母是大写的就是组件

#单项数据流：父组件可以向子组件传递数据，但是子组件只能使用这个值，不能去改变修改这个值，只能通过调用父组件的方法去修改（这个本质其实还是父组件进行修改数据，而不是子组件）

#视图层框架：react在面对复杂的项目（更多的的组件需要同一个数据的时候），这时就不能使用多个组件来传递数据了，而是要把react当作视图层框架，使用redux来管理数据

#函数式编程：每个模块整理出来，封装函数，这样能好实现前端自动化测试

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