# HTML
- `contentEditable`
``` 
<div contenteditable="true">
  This text can be edited by the user.
</div>
```
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
<body></body>
</html>
```
### 鼠标手势
cursor:default | wait| move | text | pointer
### 文件上传
- 多文件上传`<input type="file" multiple="multiple" accept=".zip" name="uploadFile" />`
- 文件夹上传
### 阻止`a`标签的默认跳转
- `a href="javascript:void(0);" onclick="js_method()"`
### 获取子/父中的元素
``` js
// 调用子/父中的方法
window.archive.test($(this).text());  // archive是iframe的name属性值。
window.parent.openDialog(id, "FolderWS");
```
### DIV在body中居中
``` js
body {text-align: center;}   
#center { margin-right: auto; margin-left: auto; }   
```
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