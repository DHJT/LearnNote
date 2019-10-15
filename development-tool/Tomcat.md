# Tomcat
<!-- @author DHJT 2018-11-28 -->
tomcat手册： [http://tomcat.apache.org/tomcat-9.0-doc/index.html](http://tomcat.apache.org/tomcat-9.0-doc/index.html)

## Tomcat
- `tomcat`的硬部署(apache-tomcat-6.0.45\conf)
`MyEclipse`自带的`tomcat`可能将硬部署的两个地址后面的地址删除，可以使用原始的`Tomcat`
`<Host><Context path="/qrda_fy" docBase="F:\project\qrda_fy\WebRoot" /></Host>`
- 清理缓存
    - `apache-tomcat-8.0.43\work\Catalina\localhost`
    - `apache-tomcat-8.0.43\temp`

## tomcat注册为Windows系统服务
1. 首先，切换到`tomcat\bin`目录下，可以找到`service.bat`，
2. 运行命令"service install tomcat6"即可安装服务，而服务名就是`tomcat6`。
3. 服务也完成，可以在Windows的服务管理器中直接启动了。
4. 另外，也可以用TOMCAT自已提供的TOMCAT监视器去启动和配置TOMCAT了，只需要为tomcat6w.exe建立一个快捷方式，目标写为`D:\tomcat6\bin\tomcat6w.exe //MS//Tomcat6`。
5. 服务卸载：`service.bat remove tomcat6`

### Tomcat 管理页面
```xml
<!-- 开启管理界面，在tomcat-users.xml中配置 -->
<!-- http://127.0.0.1:8080/manager -->
<role rolename="manager-gui"/>
<user username="admin" password="admin" roles="manager-gui"/>
```
`http://127.0.0.1:8080/manager/status`

## Tomcat 配置错误界面
- [Tomcat 配置错误界面][1]

### 性能优化[^1]
编辑`tomcat/bin/catalina.bat`文件，添加如下一段，具体要根据现场环境进行参数调整
```sh
@echo off
SET JAVA_OPTS=-server -Xms13312m -Xmx13312m -XX:NewSize=3072m -XX:MaxNewSize=4096m -XX:PermSize=512m -XX:MaxPermSize=512m -XX:MaxTenuringThreshold=10 -XX:NewRatio=2 -XX:+DisableExplicitGC
```

### 开启`JMX`远程连接(Enabling JMX Remote)[^2]
```sh
set CATALINA_OPTS=-Dcom.sun.management.jmxremote
  -Dcom.sun.management.jmxremote.port=%my.jmx.port%
  -Dcom.sun.management.jmxremote.ssl=false
  -Dcom.sun.management.jmxremote.authenticate=false
```

## tomcat启用身份授权验证

Solr独立服务就可以配置使用基础授权插件使用tomcat的身份验证



[1]: https://blog.csdn.net/qq_35959573/article/details/80597164 'Tomcat 配置错误界面'

[^1]: [Tomcat 调优总结](https://www.cnblogs.com/onmyway20xx/p/3626449.html)
[^2]: [Enabling_JMX_Remote](http://tomcat.apache.org/tomcat-9.0-doc/monitoring.html#Enabling_JMX_Remote)