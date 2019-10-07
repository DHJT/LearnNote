# Tomcat
<!-- @author DHJT 2018-11-28 -->

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

## tomcat启用身份授权验证

Solr独立服务就可以配置使用基础授权插件使用tomcat的身份验证

[1]: https://blog.csdn.net/qq_35959573/article/details/80597164 'Tomcat 配置错误界面'