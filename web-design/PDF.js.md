# PDF.js
<!-- @author DHJT 2019-08-15 -->
打印权限：不允许
修改文档：不允许
文档组合：不允许
内容复制：允许
复制内容用于辅助工具：允许
页面提取：不允许
添加主释：不允许
填写表单：不允许
签名：不允许

标题添加标题
主题添加主题
生成器添加生成器
作者添加作者
创建工具添加创建工具
关键字添加关键字

http://zs.cpta.com.cn/certMng/frame/plugins/pdfjs/web/viewer.html?file=http%3A%2F%2Fzs.cpta.com.cn%3A80%2FcertMng%2Ffrontquery.do%3Fmethod%3DfwdCertFileView%26zsid%3D4E4E6BDC17F7C84E70D0065C181B6DA4#page=1&zoom=auto,-74,514

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