# PDF.js
<!-- @author DHJT 2019-08-15 -->

### pdf.js 接收二进制流进行渲染
前端：
```js
var data = "id=${id}";// 文件id
var url = "${hostUrl}/works/doc/getfile";// 请求路径
var xhr = new XMLHttpRequest();
xhr.onload = function () {
    var uint8Array = new Uint8Array(xhr.response);// 接收数据
    window.PDFViewerApplication.open(uint8Array);
};
try {
    xhr.open('POST', url, true);// 发送post请求
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');// 设置请求头
    xhr.responseType = 'arraybuffer';// 设置返回类型
    xhr.send(data);// 发送请求
} catch (e) {
    console.info(e);
}
```