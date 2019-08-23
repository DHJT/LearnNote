# HTML

## 基础
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Iconfont-阿里巴巴矢量图标库</title>
  <meta name="description" content="Iconfont-国内功能很强大且图标内容很丰富的矢量图标库，提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造，设计和前端开发的便捷工具" />
  <meta name="keywords" content="中国 矢量图标库 下载 在线存储 格式转换 阿里巴巴体验团队 Iconfont" />
  <meta name="google" value="notranslate">
  <meta name="baidu-site-verification" content="0fFS5DZPGS" />
  <link rel="shortcut icon" href="//gtms04.alicdn.com/tps/i4/TB1_oz6GVXXXXaFXpXXJDFnIXXX-64-64.ico" type="image/x-icon"/>
  <link rel="stylesheet" type="text/css" href="//g.alicdn.com/thx/cube/1.3.1/neat.min.css">
  <link rel="stylesheet" type="text/css" href="//g.alicdn.com/mm/iconfont-plus-bp/0.5.0/app/assets/index.css">
  <script type="text/javascript" src="//g.alicdn.com/mm/iconfont-plus-bp/0.5.0/app/libs/sea.js"></script>
  <meta content="2xZPMn1SyBRRI33qen61icon-font" name="csrf-ctoken" />
  <meta content="ribaHxIC-CJFwRvmTGIrDJ2HZytSjoo_X5U8" name="csrf-token" />
  <meta name="data-spm" content="a313x">
</head>
<body>
  <div contenteditable="true">
    This text can be edited by the user.
  </div>
</body>
</html>
```
### 鼠标手势
cursor:default | wait| move | text | pointer

### 文件上传
- 多文件上传`<input type="file" multiple="multiple" accept=".zip" name="uploadFile" />`
- 文件夹上传

### 阻止`a`标签的默认跳转
- `<a href="javascript:void(0);" onclick="js_method()"/>`

### 获取子/父中的元素
``` js
// 调用子/父中的方法
window.archive.test($(this).text());  // archive是iframe的name属性值。
window.parent.openDialog(id, "FolderWS");
```
### DIV在body中居中
``` js
body { text-align: center; }
#center { margin-right: auto; margin-left: auto; }
```


### HTML5增加标签
#### 1、结构标签
（1）section：独立内容区块，可以用h1~h6组成大纲，表示文档结构，也可以有章节、页眉、页脚或页眉的其他部分；
（2）article：特殊独立区块，表示这篇页眉中的核心内容；
（3）aside：标签内容之外与标签内容相关的辅助信息；
（4）header：某个区块的头部信息/标题；
（5）hgroup：头部信息/标题的补充内容；
（6）footer：底部信息；
（7）nav：导航条部分信息
（8）figure：独立的单元，例如某个有图片与内容的新闻块。

#### 2、表单标签

（1）email：必须输入邮件；
（2）url：必须输入url地址；
（3）number：必须输入数值；
（4）range：必须输入一定范围内的数值；
（5）Date Pickers：日期选择器；
a.date：选取日、月、年
b.month：选取月、年
c.week：选取周和年
d.time：选取时间（小时和分钟）
e.datetime：选取时间、日、月、年（UTC时间）
f.datetime-local：选取时间、日、月、年（本地时间）
（6）search：搜索常规的文本域；
（7）color：颜色

#### 3、媒体标签
（1）video：视频
（2）audio：音频
（3）embed：嵌入内容（包括各种媒体），Midi、Wav、AU、MP3、Flash、AIFF等。

#### 4、其他功能标签

（1）mark：标注（像荧光笔做笔记）
（2）progress：进度条；<progress max="最大进度条的值" value="当前进度条的值">
（3）time：数据标签，给搜索引擎使用；发布日期<time datetime="2014-12-25T09:00">9：00</time>更新日期<time datetime="2015-01-23T04:00" pubdate>4:00</time>
（4）ruby和rt：对某一个字进行注释；<ruby><rt>注释内容</rt><rp>浏览器不支持时如何显示</rp></ruby>
（5）wbr：软换行，页面宽度到需要换行时换行；
（6）canvas：使用JS代码做内容进行图像绘制；
（7）command：按钮；
（8）deteils ：展开菜单；
（9）dateilst：文本域下拉提示；
（10）keygen:加密；

### 浏览器url限制

游览器的种类繁多，并且对URL的长度限制是有所差异的，具体如下：

| 游览器                          | 最大长度（字符数）             | 备注                                     |
| :------------------------------ | ------------------------------ | ---------------------------------------- |
| Internet Explorer               | 2083                           | 如果超过这个数字，提交按钮没有任何反应   |
| Firefox                         | 65,536                         |                                          |
| chrome                          | 8182                           |                                          |
| Safari                          | 80,000                         |                                          |
| Opera                           | 190,000                        |                                          |
| curl（linux下指令）             | 8167                           |                                          |