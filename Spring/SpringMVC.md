# SpringMVC
Spring MVC 是 Spring 提供的一个强大而灵活的 Web 框架。Spring MVC主要由DispatcherServlet、处理器映射、处理器(控制器)、视图解析器、视图组成。他的两个核心是两个核心：

- 处理器映射：选择使用哪个控制器来处理请求
- 视图解析器：选择结果应该如何渲染
### 配置多视图（jsp，freemarker，HTML等）
- [springmvc 配置多视图（jsp，freemarker，HTML等）](springmvc 配置多视图（jsp，freemarker，HTML等）)

### 在SpringMVC中获取request对象的几种方式
1.最简单的方式（注解法）
``` java
@Autowired
private  HttpServletRequest request;
```
- 最麻烦的方法
    + 在web.xml中配置一个监听
    + 之后在程序里可以用
``` xml
<listener>  
        <listener-class>  
            org.springframework.web.context.request.RequestContextListener  
        </listener-class>  
</listener>  
```
``` java
HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
```
- 最直接的方法:`public String hello(HttpServletRequest request, HttpServletResponse response)`


