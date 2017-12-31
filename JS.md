# Javascript
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
