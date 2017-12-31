# python
## python 2 / 3 共存
- [Win10下python3和python2同时安装并解决pip共存问题](https://www.cnblogs.com/thunderLL/p/6643022.html)
- [同时装了Python3和Python2，怎么用pip？](https://www.zhihu.com/question/21653286)

## 知识点
- `python`中一切都是对象，严格意义我们不能说值传递还是引用传递，我们应该说传不可变对象和传可变对象。
- 对于变量作用域，变量的访问以 L（Local） –> E（Enclosing） –> G（Global） –>B（Built-in） 的规则查找，即：在局部找不到，便会去局部外的局部找（例如闭包），再找不到就会去全局找，再者去内建中找

## 环境变量配置
- pip   easy_install
    + `./Scripts`

## plugin
### web模块：flask
`pip install Flask`
- [Python2.7+Django1.8+Bootstrap3 实现增删改查、分页（一）](https://www.cnblogs.com/dingshilei/p/4667642.html)
    + [demo](https://github.com/Dstone11/learn_models)