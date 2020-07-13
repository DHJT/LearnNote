# JavaScript
<!-- @author DHJT -->

## 获取页面间传值
```js
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]);
    return null;
}
```
```html
Google Analytics
We use Google Analytics on key webpages to gather information on website usage patterns. This information is then used to help us prioritize what areas of the website should get more attention.

To enable a page for Google Analytics you need to added the following block of JavaScript immediately before the closing </head> in the HTML.

<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-98607986-1']);
  _gaq.push(['_setDomainName', 'openoffice.org']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
```

- js中获取应用根目录
``` js
var local = window.location;
var contextPath = local.pathname.split("/")[1];
var basePath = local.protocol + "//" + local.host + "/" + contextPath;
```

## 问题
js支持的最大整数是2的53次方减1,所以损失了精度;
js能够表示整数的范围是正负数的绝对值都不能大于2^53，也就是正负数的绝对值都不能大于9007199254740992，这个数是16位，超过16位的整数就不能精确表示了：超过16位会导致后面的即为都为0；

解决办法:
1.存储到数据库为varchar
2.取出后返回前端前转为String类型
