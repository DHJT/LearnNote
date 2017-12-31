# CSS
### CSS���ö�����ı���ʾʡ�Ժ�
``` css
.text {
    width: 245px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
```

### ʹ�ö��ͼ���ͼƬ
```css
.track-list li .node-icon{position: absolute; left: -6px; top: 50%; width: 11px; height: 11px; background: url(order-icons.png)  -21px -72px no-repeat;}
.track-list li.alive .node-icon{background-position:0 -72px;}
```
* ���� IE8 ������汾��������е� :first-child���������� <!DOCTYPE>��
``` css
@charset "utf-8";
.picon_lei{ background-image:url(../img/icon_lei.png);/* ���������css�ļ�·��Ϊ���� */
-ms-behavior: url(./public/css/backgroundsize.min.htc);/* ���������html�ļ�·��Ϊ���� */
behavior: url(./public/css/backgroundsize.min.htc);/* ���������html�ļ�·��Ϊ���� */
}
        /*��ȴ���1920px*/
@media screen and (min-width:1920px){
/*------------�ײ�-----------------*/
.footer .foot_bg { height:60px;}
.footer .foot_txt{ height:60px; line-height:60px; padding-right:26px;}
}
```
