# CSS

## color
```css
* {
    color: #0860a0;
}
```

## һЩ�ǲ�ס������
``` css
div {
    user-select: none; /* ��ֹ�û�ѡ���ı� */
}
/* ģ������ */
.blur {
   color: transparent;
   text-shadow: 0 0 5px rgba(0,0,0,0.5);
}
/* ��ɫ��Ƭ��ʾΪ�ڰ���Ƭ */
img.desaturate {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
}
```
### ������ʾ��Ϣ��
```css
.treeForDocNotExist:hover::after {
    /*content: attr(data-title);    ȡ��data-title���Ե�ֵ*/
    content: 'Ӱ�񲻴��ڣ�';
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
### CSS���ö�����ı���ʾʡ�Ժ�
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
    -webkit-line-clamp: 2; /* ��ʾ���� */
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
