## 基础语法

1.import React from 'react';

2.class语法新建组件，render里直接使用

3.render 函数返回值就是输出JSX语法，会把jsx转成js执行

4.变量用{}包裹着：<div>{name}</div>

5.在 JSX 中不能使用 if else 语句，但可以使用 conditional (三元运算) 表达式：<div>{i == 1 ? 'True!' : 'False'}</div>

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

11.必须有div包裹，"{ }" 中返回的两个 "<p>" 也要用" <div>" 包裹

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
     
     
17.想调用父组件的方法,同时又要传值,有2种形式表达
     delItem 是父组件的方法
     1.箭头函数
     onClick={(index) => {this.props.delItem(index)}}


     2.定子组件的方法
     onClick={this.delListItem.bind(this,index)}
     delListItem(index){
          this.props.delItem(index);
     }


## react渲染HTML标签

     let htmls ='<h2>渲染HTML</h2>'

     dangerouslySetInnerHTML={{ __html:htmls}}


## React推出后，三种定义react组件的方式，殊途同归；具体的三种方式：

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
     

## 学习点

#组件传值props 和 拆分组件 : props.js    todoList.js

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
 
 
 * prop类型基础入门 :PropTypes与DefaultProps的应用 [](https://www.reactjscn.com/docs/typechecking-with-proptypes.html)
 
     1.安装npm install prop-types 
     
     2.引入prop-types ：import PropTypes from 'prop-types'; （对组件属性，参数变量进行强校验，设置默认值）
     
     A. propTypes ：todoLtem.js  
     
     主要用于限制父组件传递给子组件的数据类型
     
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
          
     
     B. defaultProps
     
     如果父组件没有传递这个test的值,则可以使用defaultProps设置默认值
     
          TodoItem.defaultProps = {
          
               test: 'hello world'
          
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
     
#生命周期 ：lifecycle.js [](https://www.jianshu.com/p/514fe21b9914) 查看生命周期流程.jpg

     什么是生命周期：生命周期函数指在某一个时刻组件会自动调用的函数 如：render函数
     
     1.组件初始化(initialization)： 设置state变量的值或是接受prop的值
     constructor(props){
          
     }
     
     2.挂载mounting：就是组件第一次渲染到页面的时候执行
     
     componentWillMount ->render ->componentDidMount
     所以：componentWillMount ，componentDidMount 只执行一次
     
     
     3.组件更新updation: 要么state变化，要么props变化，其实就是数据的变化
     
     shouldComponentUpdate -》componentWillUpdate -》 reader -》componentWillUpdate
     
          //这个组件是判断props 是否变化了，若变化了，this.setState将引起state变化，从而引起render
          /*
               条件：
               一个组件从父组件接受了参数
               如果这个组件第一次存在于父组件中，不会执行
               如果这个组件之前已经存在父组件中，才会执行
          */
          componentWillReceiveProps(){
               console.log('componentWillReceiveProps')
          }
     
     
          //组件更新之前，会被执行
          shouldComponentUpdate(){
               console.log('shouldComponentUpdate:组件更新之前，会被执行')
               //这个是组件要不要被更新，如果返回true则是更新，如果是false则不更新组件
               return true
          }
          //组件被更新之前，它会自动执行，但是它在shouldComponentUpdate执行之后，如果shouldComponentUpdate是true则执行，如果不是则不执行
          componentWillUpdate() {
               console.log('componentWillUpdate：组件马上就要更新了。。')
          }
          //组件更新完后
          componentDidUpdate() {
               console.log('componentDidUpdate(：组件更新完')
               return true
          }

     4.Unmounting卸载:把这个页面去除
     
          //当这个组件即将从这个页面剔除的时候，会被执行
          componentWillUnmount(){
               console.log('child:componentWillUnmount:组件卸载')
          }
     
* render函数 
 
     1.数据发生改变的时候，render发生改变
     2.父组件的state发生改变，子组件的render也会渲染
     
    
 * 使用的场景
   
     1.当父组件的state发生改变，而子组件随着父组件state的改变而发生渲染，这会影响性能方面。所以为了减少性能，子组件不随着而渲染
     
          在子组件中使用shouldComponentUpdate 生命周期，当props.item没有改变的时候，不更新 渲染
          shouldComponentUpdate(){
              return nextProps.item == this.props.item?false:true
          }
          
     2. ajax请求 
     
     render:render会一直被执行，只要state有稍微的改变，它就会改执行（如：input 输入值，就会一直被执行，请求），这样性能太高
     componentWillMount: 是没问题，但是reactNative,或是附件同构的时候，也就是深度的操作，在这里写ajax的请求可能与与以后技术发生冲突，所以为了避免以后的冲突，尽量不要在这里请求
     componentDidMount(){
          //请求数据  只会请求一次  以后也不会有问题
     }
     constructor 也是可以，这也是请求一次，但是还是建议使用componentDidMount
     
     所以总结：componentDidMount使用最好，同时使用axios的第三方工具 请求
 

#请求本地数据
     1.在public文件夹里创建list.json
     2.package.json里面 "proxy":"http://localhost:3000"
     3.在组件中请求
     componentDidMount(){
          console.log('请求')
          axios.get('./list.json').then((res)=>{
               console.log(res)
          })
     }

#setState 解说:  todiList.js  [](https://www.jianshu.com/p/a883552c67de)

     void setState (
          function|object nextState,
          [function callback]
     )

setState() 
     第一个参数：
          不仅能够接受一个对象作为参数，还能够接受一个函数作为参数。函数的参数为prevState, props，第一个是state 的前一个状态以及第二个是props。
     第二个参数是一个回调函数，在setState() 的异步操作结束并且组件已经重新渲染的时候执行。（简单理解：setState执行成功后，页面更新后，再去获取dom的节点 ）


* setState() 来接受一个对象

     this.setState({
          name:"小明" //修改state  中name的值
     })
     
*  setState() 来接受函数

     React 可以将多个setState() 调用合并成一个调用来提高性能。因为 this.props 和 this.state 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。

      <Input id="innerHtml" type="text" value={this.state.name} onChange={this.inpChane.bind(this)}/>
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
     
* setState执行成功后，页面更新后，再去获取dom的节点  refs.js

setState 是一个异步函数，不能立即就直接，而是要等一会就执行，如果你想setState执行成功后，页面更新后，再去获取dom的节点，

     正确的做法是：使用setState 第二参数
          
          
          // setState 第二参数,也是个函数
          this.setState( (prevState, props) => ({
               solders:[...prevState.solders,{"id":Math.random(),"name":prevState.name}],
               name:''
          }),() =>{
               console.log('li 的长度2：',this.ulRef.querySelectorAll('li').length)
          })

## React衍生出的思考，思想

#声明式开发：声明式编程就是拿来主义,拿已经封装好的纯函数来实现目的.但是实际上执行的步数不见得会比命令式的代码少,有时候甚至会更多.但是,由于这些纯函数有极强的稳定性,所以程序员根本不用考虑内部的具体实现过程.极大地减少了身心负担

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
     
    
## react开发调试工具

React developer tools


## 补充内容

#props，state与render函数的关系：todoList.js todeItem.js

简单的理解就是：数据和页面之间互相联动，它的底层运行记录是啥样

* 当组件的state或者props发生改变的时候，render函数就会重新执行,页面的数据就会重新渲染（页面是用render函数渲染出来的)

* 当父组件的render函数被运行时，它的资组件的render函数都将被重新运行

## 虚拟DOM

* 什么是虚拟DOM

第一次改变
     1.state 数据
     2.JSX 模板
     3.数据 + 模板结合 ，生成真实的DOM，来显示
     4.state发送改变
     5.数据 + 模板结构，生成真实的DOM，替换原始的DOM

     缺陷： 
          第一次生成了一个完整的DOM片段
          第二次生成了一个完整的DOM片段
          第二次的DOM替换第一次的DOM，非常耗性能

第二次改变：

     1.state 数据
     2.JSX 模板
     3.数据 + 模板结合 ，生成真实的DOM，来显示
     4.state发送改变
     5.数据 + 模板结构，生成真实的DOM，并不直接替换原始的DOM
     6.新的DOM和原始的DOM作比对，找差异
     7.找出input框发生了变化
     8.只用新的DOM中的input元素，替换掉老的DOM中的input元素

     缺陷：
          性能的提升并不是明显

第三次改变：

     1.state 数据
     2.JSX 模板
     3.生成虚拟DOM（虚拟DOM就是一个JS对象，用它来描述真实DOM）

          数组：
               ['div',{id:'abc'},['span',{},'hello world']]
          
     4.用虚拟dom的结果生成真实的DOM，来显示
          <div id='abc'><span>hello world</span></div>
          
     5.state发生改变
          hello world 变成 bye bye
          
     6.数据 + 模板结合 ，生成新的虚拟DOM
          ['div',{id:'abc'},['span',{},'bye bye']]
     7.比较原始虚拟DOM和新的虚拟DOM的区别，找到区别的的内容
          区别是span的内容
     8.直接操作DOM，改变区别地方的内容
          改变span中的内容


     优点：
          1.dom生成性能是极高的，而js对象生成性能是极低的
          2.2个js对象对比，性能消耗很低
          3.dom操作 与js对象的操作，DOM操作更消耗性能

总结：react引入虚拟dom，为啥能提高性能呢？
是因为减少真实dom的创建，以及真实dom的对比，取而代之 创建都是js对象，对比的也是js对象，通过这种方式 react性能提高了

所以虚拟dom 本质上就是js对象


JSX ——————》createElemnt ————》虚拟dom（js对象）——————》真实的dom


优点：
1.性能提升了
2.它使得跨端应用得以实现。react native
js对象 浏览器，原生都可以识别，所以没有虚拟dom 都不能制作app

## React的ref的使用 ：refs.js

     是为了直接获取dom元素，一般情况下尽量不要用 [](https://www.cnblogs.com/mengff/p/9554779.html)
     
React的ref有3种用法：

     * 字符串(已废弃)：最早的ref用法。
          
          a.dom节点上使用，通过this.refs[refName]来引用真实的dom节点
               <input ref="inputRef" /> //this.refs['inputRef']来访问
          b.类组件上使用，通过this.refs[refName]来引用组件的实例
               <CustomInput ref="comRef" /> //this.refs['comRef']来访问
          
     * 回调函数:回调函数就是在dom节点或组件上挂载函数，函数的入参是dom节点或组件实例，达到的效果与字符串形式是一样的，都是获取其引用。
     
          回调函数的触发时机：
          
          1. 组件渲染后，即componentDidMount后
          2. 组件卸载后，即componentWillMount后，此时，入参为null
          3. ref改变后
          
          a.dom节点上使用回调函数
               <input ref={(input) => {this.textInput = input;}} type="text" />
          b.类组件上使用
               <CustomInput ref={(input) => {this.textInput = input;}} />
               
          3.可用通过props跨级传递的方式来获取子孙级dom节点或组件实例
          
          下面是在跨两级获取到孙级别的组件内部的dom节点

               function CustomTextInput(props) {
                   return (
                       <div>
                           <input ref={props.inputRef} />
                       </div>
                   );
               }
               function Parent(props) {
                 return (
                   <div>
                     My input: <CustomTextInput inputRef={props.inputRef} />
                   </div>
                 );
               }
               class Grandparent extends React.Component {
                 render() {
                   return (
                     <Parent
                       inputRef={el => this.inputElement = el}
                     \/>
                   );
                 }
               }
     
     *  React.createRef() （React16.3提供）在React 16.3版本后，使用此方法来创建ref。将其赋值给一个变量，通过ref挂载在dom节点或组件上，该ref的current属性
将能拿到dom节点或组件的实例

     class Child extends React.Component{
         constructor(props){
             super(props);
             this.myRef=React.createRef();
         }
         componentDidMount(){
             console.log(this.myRef.current);
         }
         render(){
             return <input ref={this.myRef}/>
         }
     }
     
注意：
1. ref在函数式组件上不可使用，函数式组件无实例，但是其内部的dom节点和类组件可以使用
2. 可以通过ReactDOM.findDOMNode()，入参是一个组件或dom节点，返回值的组件对应的dom根节点或dom节点本身
   通过refs获取到组件实例后，可以通过此方法来获取其对应的dom节点
3. React的render函数返回的是vDom(虚拟dom)

## 性能优化

     * 函数绑定事件
          constructor(props) {
               this.addSolders = this.addSolders.bind(this)
          }
     * setState 内置性能提升，箭头函数的使用
     * 虚拟dom
     * 生命周期 
     
          1.子组件的渲染
          shouldComponentUpdate(nextProps, nextState){
               return nextProps.item == this.props.item?false:true
          }
          
## 组件

 UI组件、容器组件、无状态组件、普通组件
 
 容器组件：<TodoListUi inputValue={this.state.inputValue} changeIpt={this.changeIpt} submitBtn={this.submitBtn} list={this.state.list} delItem ={this.delItem}/>
 
 UI组件：就是样式的组件
 
 无状态组件：当组件只有render 函数就是无状态组件，就可以写成下面的这种形式
 
 const TodoListUi = (props)=>{
     return (
      //render函数的内容
     )
 }


##  路由 [](https://www.cnblogs.com/jsjx-xtfh/p/9972369.html)

     1.安装react-router-dom：cnpm install react-router-dom --save  react-router-dom 是最新的第三方路由
     
     2.使用，在app.js
     
     import { BrowserRouter, Route } from 'react-router-dom';
     import Home from './pages/home';
     import Login from './pages/login';
     
          class App extends Component {
               render() {
                         return (
                         <Provider store={store}>
                              <BrowserRouter>
                              <div>
                                   <Header />
                                        <Route path='/' exact component={Home}></Route>
                                        <Route path='/login' exact component={Login}></Route>
                              </div>
                              </BrowserRouter>
                         </Provider>
                    );
               }
          }
     * 路由传参
          路由跳转 必须匹配好，否则不进行跳转。
          如： <Route path='/detail/:id' exact component={Detail}></Route>//path='/detail/:id' 访问detail页面并且传参（id）   http://localhost:3000/detail/2   
          
          /detail/:id ==> :id 就是2.... 这样就匹配上了
          如果写的是 <Route path='/detail' exact component={Detail}></Route>  则不能访问http://localhost:3000/detail/2  Detail 页面组件


          ①动态路由获取参数
          A.显示组件
          <Route path='/detail/:id' exact component={Detail}></Route>  路由页面

          B.列表页跳转路由
          列表组件：
          <Link key={index} to={'/detail/' + item.id}>
               <ListItem >
                    20年后《还珠格格》晴儿和老佛爷重聚，抱着对方哭成泪人
               </ListItem>
          </Link>

          C.获取路由传递的数据
          详细页组件：
          this.props.match.params.id  //获取路由传递过来的数据

          ②
           A.显示组件
          <Route path='/detail' exact component={Detail}></Route>  路由页面

          B.列表页跳转路由
          列表组件：
          <Link key={index} to={'/detail?id=' + item.id}>
               <ListItem >
                    20年后《还珠格格》晴儿和老佛爷重聚，抱着对方哭成泪人
               </ListItem>
          </Link>

          C.获取路由传递的数据
          详细页组件：
          this.props.location.search.split("=")[1] //获取路由传递过来的数据



##  试试