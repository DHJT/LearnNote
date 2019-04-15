# WebJars
<!-- @author DHJT 2019-03-12 -->
[WebJars](http://www.webjars.org/)是将客户端（浏览器）资源（JavaScript，Css等）打成jar包文件，以对资源进行统一依赖管理。WebJars的jar包部署在Maven中央仓库上。

### 使用
1、 WebJars主官网 查找对于的组件，比如Vuejs
```xml
<dependency>
    <groupId>org.webjars.bower</groupId>
    <artifactId>vue</artifactId>
    <version>1.0.21</version>
</dependency>
```
2、页面引入
```html
<link th:href="@{/webjars/bootstrap/3.3.6/dist/css/bootstrap.css}" rel="stylesheet"></link>
<script type="text/javascript" src="<%=request.getContextPath()%>/webjars/jquery/1.9.0/jquery.min.js"></script>
<img alt="sprinboot" src="webjars/demo/0.0.1/springboot.jpg">
```

### 三种应用webjars的方式
在webjars的网站中，讲到了三种应用webjars的方式，分别为NPM WebJars、Bower WebJars、Classic WebJars，上述方法属于Classic Webjars方式。