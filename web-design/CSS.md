# CSS
### CSS设置多余的文本显示省略号
``` css
.text {
    width: 245px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
