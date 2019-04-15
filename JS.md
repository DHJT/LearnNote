# Javascript
## ECMAScript 6（ES6）
- [学习 ES6，一篇文章就够了](https://blog.csdn.net/QQ80583600/article/details/73693512)
`JavaScript`语言的下一代标准，2015年6月正式发布。
简单来说，`ECMAScript`是`JavaScript`语言的国际标准，`JavaScript`是`ECMAScript`的实现。


`ES6`的目标，是使得JavaScript语言可以用来编写大型的复杂的应用程序，成为企业级开发语言。
`Babel`：将`ES6`代码转为`ES5`代码 http://babeljs.io/

### 新特性
#### let、const
- `let`定义的变量不会被变量提升，`const`定义的常量不能被修改，`let`和`const`都是块级作用域

#### import、export
- import导入模块、export导出模块

#### class、extends、super
- ES5中最令人头疼的的几个部分：原型、构造函数，继承，有了ES6我们不再烦恼！
- ES6引入了Class（类）这个概念。

#### arrow functions（箭头函数）
- 函数的快捷写法。不需要 function 关键字来创建函数，省略 return 关键字，继承当前上下文的 this 关键字

#### template string （模板字符串）
- 解决了 ES5 在字符串功能上的痛点。
- 第一个用途：字符串拼接。将表达式嵌入字符串中进行拼接，用 ` 和${}`来界定。
- 第二个用途：在ES5时我们通过反斜杠来做多行字符串拼接。ES6反引号 “ 直接搞定。
- 另外：includes repeat

#### destructuring （解构）
- 简化数组和对象中信息的提取。

#### default 函数默认参数

#### rest arguments （rest参数）

#### Spread Operator （展开运算符）

#### 对象
- 另外：Object.assign()实现浅复制

#### Promise
用同步的方式去写异步代码
```js
// 发起异步请求
fetch('/api/todos')
  .then(res => res.json())
  .then(data => ({
    data
  }))
  .catch(err => ({
    err
  }));
```

#### Generators
能返回一个迭代器的函数


## 严格模式(`strict mode`)
- `ECMAscript5`才引入的第二种运行模式
- 支持严格模式的浏览器:Internet Explorer 10 +、 Firefox 4+、 Chrome 13+、 Safari 5.1+、 Opera 12+。
- [Javascript 严格模式详解](http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html)

`"use strict";`

1. 针对单个函数
2. 针对整个脚本文件
3. 脚本文件的变通写法
```js
// 因为第一种调用方法不利于文件合并，所以更好的做法是，借用第二种方法，将整个脚本文件放在一个立即执行的匿名函数之中。
(function () {
    "use strict";
    // some code here
})();
```
### 语法和行为改变
- 全局变量必须显式声明

### 闭包 (closure）
``` js
function foo(x) {
    var tmp = 3;
    return function (y) {
        alert(x + y + (++tmp));
    }
}
var bar = foo(2); // bar 现在是一个闭包
bar(10);

var btnList = document.getElementsByClassName("btn"),
      len = btnList.length;
for（var i = 0; i < len; i++）{
     (function(j) {
            btnList[j].onclick = function(){
            console.log("第" + j + "个按钮被点击到了")
         }   
    })(i)
}   
```
