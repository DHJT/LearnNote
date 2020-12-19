# Druid
<!-- @author DHJT 2019-01-18 -->


### StatViewServlet配置 内置web页面
druid内置提供了一个StatViewServlet用于展示Druid的统计信息。

这个StatViewServlet的用途包括：

- 提供监控信息展示的html页面
- 提供监控信息的JSON API
注意：使用StatViewServlet，建议使用druid 0.2.6以上版本。

#### 配置web.xml
StatViewServlet是一个标准的javax.servlet.http.HttpServlet，需要配置在你web应用中的WEB-INF/web.xml中。

```xml
<servlet>
    <servlet-name>DruidStatView</servlet-name>
    <servlet-class>com.alibaba.druid.support.http.StatViewServlet</servlet-class>
</servlet>
<servlet-mapping>
    <servlet-name>DruidStatView</servlet-name>
    <url-pattern>/druid/*</url-pattern>
</servlet-mapping>
```
根据配置中的`url-pattern`来访问内置监控页面，如果是上面的配置，内置监控页面的首页是`/druid/index.html`

例如： http://server:port/appname/druid/index.html

#### 配置allow和deny
StatViewSerlvet展示出来的监控信息比较敏感，是系统运行的内部情况，如果你需要做访问控制，可以配置allow和deny这两个参数。比如：
```xml
<servlet>
    <servlet-name>DruidStatView</servlet-name>
    <servlet-class>com.alibaba.druid.support.http.StatViewServlet</servlet-class>
  <init-param>
      <param-name>allow</param-name>
      <param-value>128.242.127.1/24,128.242.128.1</param-value>
  </init-param>
  <init-param>
      <param-name>deny</param-name>
      <param-value>128.242.127.4</param-value>
  </init-param>
</servlet>
```

#### 判断规则
deny优先于allow，如果在deny列表中，就算在allow列表中，也会被拒绝。
如果allow没有配置或者为空，则允许所有访问
ip配置规则
配置的格式

  <IP>
  或者
  <IP>/<SUB_NET_MASK_size>
其中

  128.242.127.1/24
24表示，前面24位是子网掩码，比对的时候，前面24位相同就匹配。

#### 不支持IPV6
由于匹配规则不支持IPV6，配置了allow或者deny之后，会导致IPV6无法访问。

#### 配置`resetEnable`
在`StatViewSerlvet`输出的html页面中，有一个功能是`Reset All`，执行这个操作之后，会导致所有计数器清零，重新计数。可以通过配置参数关闭它。
```xml
<servlet>
    <servlet-name>DruidStatView</servlet-name>
    <servlet-class>com.alibaba.druid.support.http.StatViewServlet</servlet-class>
    <init-param>
        <param-name>resetEnable</param-name>
        <param-value>false</param-value>
    </init-param>
</servlet>
```

### wall拦截器
java.sql.SQLException: sql injection violation, syntax error: syntax error, error in :'uble precisio
解决的办法是：
配置了druid连接池的 wall 拦截器，SQL防火墙拦截了你的SQL，解决办法：1.优化你的SQL；2.关闭wall拦截器

21. 我希望加密我的数据库密码怎么办？

## 问题
[spring boot 2.1.3 打开 druid 连接池监控报错 Sorry, you are not permitted to view this page.](https://blog.csdn.net/mxcai2005/article/details/89928806)

[^1]: [Druid 介绍及配置](https://www.cnblogs.com/niejunlei/p/5977895.html)