# Tomcat
## tomcat注册为Windows系统服务
1. 首先，切换到TOMCAT\BIN目录下，可以找到`service.bat`，
2. 运行命令"service install tomcat6"即可安装服务，而服务名就是`tomcat6`。
3. 好了，服务也完成，可以在Windows的服务管理器中直接启动了。
4. 另外，也可以用TOMCAT自已提供的TOMCAT监视器去启动和配置TOMCAT了，只需要为tomcat6w.exe建立一个快捷方式，目标写为“D:\tomcat6\bin\tomcat6w.exe //MS//Tomcat6”。