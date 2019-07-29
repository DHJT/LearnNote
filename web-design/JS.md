# JavaScript
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
