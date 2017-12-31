# 插件
## video.js
- [js - videojs视频播放，支持ie8](http://blog.csdn.net/u012246458/article/details/44495353)
## HTML5shiv
- This HTML tutorial explains how to use HTML5shiv (a javascript workaround for IE8 and older) with syntax and examples.
- Description:`HTML5shiv is a javscript workaround to provide support for the new HTML 5 elements in IE Browsers older than IE 9.`
### Syntax

The syntax for the HTML5shiv is:
```js
<head>
<!--[if lt IE 9]>
  <script src="/js/html5shiv.js"></script>
<![endif]-->
</head>
```
### Note
- HTML5shiv is found within the `<head>` tag.
- HTML5shiv is a javascript file that is referenced in a `<script>` tag.
- You should use HTML5shiv when you are using the new HTML 5 elements such as:`<article>, <section>, <aside>, <nav>, <footer>`.
- Download the latest version of HTML5shiv from github or reference the Open Source Software CDN version at https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js
- You will require the HTML5shiv to provide compatibility for IE Browsers older than IE 9.