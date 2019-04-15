# `Emmet`前端神器
<!-- @author DHJT 2018-12-07 -->
可以适用多个编辑器： `Sublime Text`,`Eclipse`.etc

## 实例
### 快速编写HTML代码 
- 新建一个HTML文档
`html:xt`
`html:5`/`!`

emmet除了能快速编辑出上面的代码以外，还有一些其他代码也可快速编辑，具体的、全面的快速编辑方式，还请浏览 [Emmet官方文档][1] （有详细说明哦！）

### CSS中缩写
单位：
p 表示%
e 表示 em
r表示 rem
宽度：
命令：w100   结果：width:100px; 默认单位px

命令：w100p   结果：width:100%;  
高度：
 命令：h100r   结果：height: 100rem;

颜色：

命令：c#3    结果： color: #333;

命令：c#e0    结果： color: #e0e0e0;

命令：c#fc0    结果： color: #ffcc00;
CSS3前缀
w 表示 -webkit-
m 表示 -moz-
s 表示 -ms-
o 表示 -o-
命令：-wmso-transform
属性模糊匹配：

如果有些缩写你拿不准，Emmet会根据你的输入内容匹配最接近的语法，比如输入ov:h、ov-h、ovh和oh，生成的代码是相同的： 

所以在平时使用的时候可留意emmet的提示

命令：h10p+m5e   结果：height: 10%;margin: 5em;

### 附加功能 
生成`Lorem ipsum`文本 

`Lorem psum`指一篇常用于排版设计领域的拉丁文文章，主要目的是测试文章或文字在不同字型、版型下看起来的效果。通过`Emmet`，你只需输入`lorem`或`lipsum`即可生成这些文字。还可以指定文字的个数，比如`lorem10`，将生成： 

``Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero delectus.``

### 定制Emmet插件
加新缩写或更新现有缩写，可修改snippets.json文件
更改Emmet过滤器和操作的行为，可修改preferences.json文件
定义如何生成HTML或XML代码，可修改syntaxProfiles.json文件

[1]: http://docs.emmet.io/cheat-sheet/ 'Emmet官方文档'
[2]: https://www.cnblogs.com/jesse131/p/4978966.html 'Emmet插件使用方法总结'
[3]: https://yq.aliyun.com/ziliao/476385 'Emmet使用详解'