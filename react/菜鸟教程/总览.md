react特点:声明式设计，高效，灵活。JSX,组件，单向响应的数据流



### 创建开发环境

1.react安装，建议CDN官网上下载安装包react.development.min.js 、react-dom.development.min.js 和 babel.min.js,如果我们需要使用 JSX，则 <script> 标签的 type 属性需要设置为 text/babel。

```安装包引入,注意使用bable编译安装包效率特别低
<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<!-- 生产环境中不建议使用 -->
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
```



2.使用create-react-app快速构建开发环境

```
构建指令:
npx i create-react-app 项目名

遇到问题1:
create-react-app 执行慢的解决方法：
在使用 create-react-app my-app 来创建一个新的React应用，在拉取各种资源时,往往会非常慢,一直卡在那。
解决:解决方法是换成淘宝的资源：
$ npm config set registry https://registry.npm.taobao.org
-- 配置后可通过下面方式来验证是否成功
$ npm config get registry
-- 或 npm info express

```

3.创建元素

```
react创建元素:
jsx语法创建:
const 元素名=<标签名>文本内容/节点/{插入内容，脚本}</标签名>
例:
const element=<h1>标题</h1>

js原生创建:
document.getElement('div')

元素的渲染:react元素都是不可变的,当元素被创建之后，你是无法改变其内容或属性的,目前更新界面的唯一办法是创建一个新的元素，然后将它传入 ReactDOM.render()
计时器例子:
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>现在是 {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('example')
  );
}


 
setInterval(tick, 1000);
```



4.react渲染

```
渲染:
reactDOM.render(渲染内容，渲染目标) 
例:
const div = document.createElement('div'); //创建渲染目标
reactDOM.render(<App/>,div) 渲染到目标对象

解除渲染:
unmountComponentAtNode() 这个方法是解除渲染挂载，作用和 render 刚好相反，也就清空一个渲染目标中的 React 部件或 html 内容。
例如:
ReactDOM.unmountComponentAtNode(div);
```



5.创建虚拟dom对象的两种方式

-使用原生js创建(不常用)

```
 //使用jsx语法创建dom对象，最终会被解析为原生js
      let RootA = <h1>China</h1>;
```

​	-使用jsx语法创建

```
 //语法 React.createElement("标签名",{属性名:属性值},..."后面的所有都是插入的值")
      let Element = React.createElement(
        "h1",
        { className: "aa" },
        "hello world"
      );
      
     //将虚拟dom 渲染到真实dom元素中取
      ReactDOM.render(RootA, document.getElementById("root"));
```



6.react定义组件的两种方式

```
    <script type="text/babel">
      /*  react中定义组件的两种方式 */
      //1.工厂函数组件
      function MyContainer() {
        return <h2>工厂函数组件</h2>;
      }

      //方式二: es6类组件(复杂组件)
      class MyContainer2 extends React.Component {
        render() {
          console.log(this);
          const a = "ES6";
          return (
            <div>
              <MyContainer />
              <h2>es6类组件(复杂组件 ){a}</h2>
            </div>
          );
        }
      }
      //将组件渲染到真实dom中去
      ReactDOM.render(<MyContainer2 />, document.getElementById("root"));
    </script>
```



7.react的三大属性

state:状态机用来更新状态数据，触发视图更新

```
  <script type="text/babel">
      //组件中的三大属性
      /*  ref 获取真实dom节点，便于操作dom
          state 状态机，通过改变组件中的状态来更新对应页面
          props  父子组件间用来传参 */
      class MyContainer extends React.Component {
        constructor(props) {
          super(props);
          //初始化state
          this.state = {
            name: "小",
            age: "one",
            sex: "man",
          };
        }
        //读取state
        /*  this.state.name */

        //react绑定事件使用
        click = () => {
          //读取state
          /* console.log( this.state.name); */
          this.setState({
            name: "我喜欢你",
          });
        };

        render() {
          const { name, age, sex } = this.state;
          return (
            <h1 onClick={this.click}>
              {name},{age},{sex}
            </h1>
          );
        }
      }
      ReactDOM.render(<MyContainer />, document.getElementById("root"));
   
```



ref:获取dom节点，以便操作dom(尽量不操作)

```
deleteTab = () => {
          //获取要删除标签的dom
          console.log(this.refs);
          //操作移除
          this.refs.h1.remove();
        };

        render() {
          const { name, age, sex } = this.state;
          return (
            <div>
              <button ref="inp" onClick={this.deleteTab}>
                删除标签
              </button>
              <h1 ref="h1" className="ddd" onClick={this.click}>
                {name},{age},{sex}
              </h1>
              <MyContainer2 id="d" name={name} />
              <MyContainer3 name={name} />
            </div>
          );
        }
```



​	props:组件标签的所有属性都保存在props中，用来父子组件传递数据，数据是只读的不可修改,在原生js总作为形参进行接收和传递

```
 render() {
          const { name, age, sex } = this.state;
          return (
            <div>
              <h1 onClick={this.click}>
                {name},{age},{sex}
              </h1>
              //在组件内部传参 所有属性都可以被子组件MyContainer2拿到  自定义名字={值}
              <MyContainer2 name={name} />
              <MyContainer3 name={name} />
            </div>
          );
        }
        
     //原生js创建组件
      function MyContainer2(props) {
        console.log(props);
        return <h1>你好,{props.name}</h1>;
      }

      class MyContainer3 extends React.Component {
        constructor(props) {
          super(props);
        }
        render() {
          const { name } = this.props;
          console.log(this.props);
          return <h3>奥特曼{name}</h3>;
        }
      }
```

8.react中触发事件（合成事件）

```
 //如果写成click(){}会报错，原因是没有绑定到react实例上
 click=()=>{
 
 }
 
 //定义到当前react实例上面  on+事件名(事件名开头需大写)
 <h1 onClick={this.click}>{name},{age},{sex} </h1>
```



9.受控组件收集表单数据

-受控组件:通过state和onChange事件的方法来自动收集表单数据

```
<script type="text/babel">
      class MyFrom extends React.Component {
        //初始化state
        state = {
          password: "",
        };
        getPassword = (event) => {
          //更新state
          this.setState({
            //使用受控组件更新state
            password: event.target.value,
          });
          console.log(this.refs.getUserName.value, this.state.password);
          //非受控组件 使用ref 获取数据，只是在特定的时候需要
          console.log(this.state.password);
        };
        render() {
          let { password } = this.state;
          return (
            <div>
              用户名: <input type="text" ref="getUserName" />
              密码:{" "}
              <input
                type="password"
                value={password}
                onChange={this.getPassword}
              />
              <button type="submit">提交</button>
            </div>
          );
        }
      }
      ReactDOM.render(<MyFrom />, document.getElementById("root"));
    </script>
```

​	-非受控组件：需要时才通过ref收集表单数据



9.react事件处理

```
//on+事件名  采用大驼峰命名法   类组件中事件的函数名要加this才能访问到
<button onClikc={函数名} > </button>
```

注意:react中不能通过return false 来阻止默认行为，必须使用preventDefault.

```
//阻止a标签的默认打开新页面
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('链接被点击');
  }
 
  return (
    <a href="#" onClick={handleClick}>
      点我
    </a>
  );
}
```

事件传参：

```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
上述两种方式是等价的。
上面两个例子中，参数 e 作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。
```



10.运算符

```
//与运算符  通过用花括号包裹代码在 JSX 中嵌入任何表达式 ，也包括 JavaScript 的逻辑与 &&，它可以方便地条件渲染一个元素
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          您有 {unreadMessages.length} 条未读信息。
        </h2>
      }
    </div>
  );
}
 
const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('example')
);
```

```
//三目运算符  条件渲染的另一种方法是使用 JavaScript 的条件运算符:
condition ? true : false。
```

```
//条件渲染  通过控制false和true来实现
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }
 
  return (
    <div className="warning">
      警告!
    </div>
  );
}
 
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true}
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
 
  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }
 
  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? '隐藏' : '显示'}
        </button>
      </div>
    );
  }
}
 
ReactDOM.render(
  <Page />,
  document.getElementById('example')
);
```



11.react的列表 & Keys

```
//使用 map() 方法遍历数组生成了一个 1 到 5 的数字列表:
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
 
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('example')
);
```

key的定义:

元素的 key 只有在它和它的兄弟节点对比时才有意义，元素的 key 在他的兄弟元素之间应该唯一

```
//1.如果全部是数字 key={number.toString()}  转字符串作为key
//2.key通常来自 data的id
//3.当没有id时，可以使用它的序列号来作为索引的key,如果列表可以重新排序，我们不建议使用索引来进行排序，因为这会导致渲染变得很慢
```



12.react组件的api

```
设置状态:setState    
替换状态:replateState
设置属性:setProps
替换属性:replateProps 
强制更新:forceUpdate  会使自身的redner()方法重新渲染组件，组件的子组件也会调用自己的render(),尽量避免使用
获取DOM节点:findDOMNode  如果组件已经挂载到dom中国，改方法返回对应的本地浏览器dom元素
判断组件挂载状态:isMounted  返回值true或false,表示组件是否已挂载到DOM中

```

13.react的生命周期

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbcb3b6abc444f468fab4b903aba1747~tplv-k3u1fbpfcp-watermark.awebp)

组件生命周期的执行顺序：
 Mounting：

- constructor()
- componentWillMount()
- render()
- componentDidMount()

Updating：

- componentWillReceiveProps(nextProps)
- shouldComponentUpdate(nextProps, nextState)
- componentWillUpdate(nextProps, nextState)
- render()
- componentDidUpdate(prevProps, prevState)

Unmounting：

- componentWillUnmount()



14.route路由

```
下载插件库:
npm i react-router
npm i react-router-dom

创建router文件夹，router.js
import home from "./pages/home"
const routers=[{
   path:’/home‘,
   component:Home,
   name:"Home"
}]

在页面中引入插件组件
import {BrowserRouter as Router, NavLink,Route,Switch,} from "react-router-dom";

//在APP中使用 能导航全局路由
<Router>
    <Switch>
      {routes.map((route) => {
        return <Route {...route} key={route.path} />;
      })}
    </Switch>
</Router>

```





