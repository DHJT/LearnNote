# CSS

## color
```css
* {
    color: #0860a0;
}
```

## 一些记不住的属性
``` css
div {
    user-select: none; /* 禁止用户选中文本 */
}
/* 模糊本文 */
.blur {
   color: transparent;
   text-shadow: 0 0 5px rgba(0,0,0,0.5);
}
/* 彩色照片显示为黑白照片 */
img.desaturate {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
}
```
### 悬浮提示信息框
```css
.treeForDocNotExist:hover::after {
    /*content: attr(data-title);    取到data-title属性的值*/
    content: '影像不存在！';
    color: #ff8000;
    background-color: skyblue;
    display: inline-block;
    padding: 10px 14px;
    border: 1px solid #ddd;
    border-radius: 5px;
    position: absolute;
    top: -50px;
    left: 10px;
}
```
### CSS设置多余的文本显示省略号
``` css
.text {
    width: 245px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.text2 {
    display: -webkit-box;
    display: -moz-box;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 显示行数 */
}
```

### 使用多个图标的图片
```css
.track-list li .node-icon{position: absolute; left: -6px; top: 50%; width: 11px; height: 11px; background: url(order-icons.png)  -21px -72px no-repeat;}
.track-list li.alive .node-icon{background-position:0 -72px;}
```
* 对于 IE8 及更早版本的浏览器中的 :first-child，必须声明 <!DOCTYPE>。
``` css
@charset "utf-8";
.picon_lei{ background-image:url(../img/icon_lei.png);/* 这个属性以css文件路径为坐标 */
-ms-behavior: url(./public/css/backgroundsize.min.htc);/* 这个属性以html文件路径为坐标 */
behavior: url(./public/css/backgroundsize.min.htc);/* 这个属性以html文件路径为坐标 */
}
        /*宽度大于1920px*/
@media screen and (min-width:1920px){
/*------------底部-----------------*/
.footer .foot_bg { height:60px;}
.footer .foot_txt{ height:60px; line-height:60px; padding-right:26px;}
}
```
