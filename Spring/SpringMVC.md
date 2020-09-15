# SpringMVC
Spring MVC 是 Spring 提供的一个强大而灵活的 Web 框架。Spring MVC主要由DispatcherServlet、处理器映射、处理器(控制器)、视图解析器、视图组成。他的两个核心是两个核心：

- 处理器映射：选择使用哪个控制器来处理请求
- 视图解析器：选择结果应该如何渲染

```java
@RequestMapping(value = "/example", method = { RequestMethod.POST }, produces = "application/json;charset=UTF-8")
@PutMapping("/update")
@CrossOrigin(methods = { RequestMethod.PUT }, origins = "*") // 跨域处理

```

### @RequestParam

### @RequestBody
`@RequestBody`的含义是在当前对象获取整个http请求的body里面的所有数据，
主要用来接收前端传递给后端的json字符串中的数据的(请求体中的数据的)；
GET方式无请求体，所以使用@RequestBody接收数据时，前端不能使用GET方式提交数据，而是用POST方式进行提交。在后端的同一个接收方法里，@RequestBody与@RequestParam()可以同时使用，@RequestBody最多只能有一个，而@RequestParam()可以有多个。

- 一个请求，只有一个RequestBody；一个请求，可以有多个RequestParam。
- 将一个`request body`中的`content`反序列化成几个Java实例是另外一个问题。有三个解决方向：
    + 创建一个新的`entity`，将你的两个`entity`都进去。这是最简单的，但是不够“优雅”。
    + 用`Map<String, Object>`接受`request body`，自己反序列化到各个`entity`中。
    + 类似方法2，不过更为generic，实现自己的`HandlerMethodArgumentResolver`


注：当同时使用@RequestParam（）和@RequestBody时，@RequestParam（）指定的参数可以是普通元素、
       数组、集合、对象等等(即:当，@RequestBody 与@RequestParam()可以同时使用时，原SpringMVC接收
       参数的机制不变，只不过RequestBody 接收的是请求体里面的数据；而RequestParam接收的是key-value
       里面的参数，所以它会被切面进行处理从而可以用普通元素、数组、集合、对象等接收)。
       即：如果参数时放在请求体中，传入后台的话，那么后台要用@RequestBody才能接收到；如果不是放在
              请求体中的话，那么后台接收前台传过来的参数时，要用@RequestParam来接收，或则形参前
              什么也不写也能接收。

注：如果参数前写了@RequestParam(xxx)，那么前端必须有对应的xxx名字才行(不管其是否有值，当然可以通
       过设置该注解的required属性来调节是否必须传)，如果没有xxx名的话，那么请求会出错，报400。

注：如果参数前不写@RequestParam(xxx)的话，那么就前端可以有可以没有对应的xxx名字才行，如果有xxx名
       的话，那么就会自动匹配；没有的话，请求也能正确发送。
       追注：这里与feign消费服务时不同；feign消费服务时，如果参数前什么也不写，那么会被默认是
                  @RequestBody的。

如果后端参数是一个对象，且该参数前是以@RequestBody修饰的，那么前端传递json参数时，必须满足以下要求：

    后端@RequestBody注解对应的类在将HTTP的输入流(含请求体)装配到目标类(即：@RequestBody后面的类)时，会根据json字符串中的key来匹配对应实体类的属性，如果匹配一致且json中的该key对应的值符合(或可转换为)，这一条我会在下面详细分析，其他的都可简单略过，但是本文末的核心逻辑代码以及几个结论一定要看！ 实体类的对应属性的类型要求时,会调用实体类的setter方法将值赋给该属性。

    json字符串中，如果value为""的话，后端对应属性如果是String类型的，那么接受到的就是""，如果是后端属性的类型是Integer、Double等类型，那么接收到的就是null。

    json字符串中，如果value为null的话，后端对应收到的就是null。

    如果某个参数没有value的话，在传json字符串给后端时，要么干脆就不把该字段写到json字符串中；要么写value时， 必须有值，null  或""都行。千万不能有类似"stature":，这样的写法，

### 配置多视图（jsp，freemarker，HTML等）
- [springmvc 配置多视图（jsp，freemarker，HTML等）](springmvc 配置多视图（jsp，freemarker，HTML等）)

### 在SpringMVC中获取request对象的几种方式
1.最简单的方式（注解法）
``` java
@Autowired
private HttpServletRequest request;
```
- 最麻烦的方法
    + 在web.xml中配置一个监听
    + 之后在程序里可以用
``` xml
<listener>
    <listener-class>org.springframework.web.context.request.RequestContextListener</listener-class>
</listener>
```
``` java
HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
```
- 最直接的方法:`public String hello(HttpServletRequest request, HttpServletResponse response)`
- mvc 静态资源等配置
``` xml
<mvc:interceptor>
    <mvc:mapping path="/**" />
    <!-- 排除欢迎页面文件 -->
    <mvc:exclude-mapping path="/"/>
    <mvc:exclude-mapping path="/index.html"/>
    <!-- 排除404，500页面 -->
    <mvc:exclude-mapping path="/404.html"/>
    <mvc:exclude-mapping path="/500.html"/>
    <!-- 排除静态文件 -->
    <mvc:exclude-mapping path="/resources/**" />
    <!-- 排除频繁访问验证页面 -->
    <mvc:exclude-mapping path="/validation" />
    <!-- 排除网站头像 -->
    <mvc:exclude-mapping path="/favicon.ico" />
    <!-- 排除登录页面 -->
    <mvc:exclude-mapping path="/login"/>
    <bean class="com.interceptor.AdminLogInInterceptor" />
</mvc:interceptor>
```

## 问题
- [springboot No primary or default constructor found for interface java.util.List](https://blog.csdn.net/qq_39723363/article/details/84379685)
