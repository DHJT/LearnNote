# Jenkins
<!-- @author DHJT 2019-02-15 -->
Jenkins是一个跨平台，持续集成和交付应用程序的工具，可以不断构建和测试项目，使开发人员能够更轻松地将更改集成到项目中，并使用户更轻松地获得新的构建。它还允许您通过提供强大的方法来定义构建管道并与大量测试和部署技术集成，从而持续交付软件。

### 安装
  https://jenkins.io/ 官网下载，安装包多种，最简单的方式是下载war包，然后执行
```sh
java -jar jenkins.war

# docker 方式
docker run -d -p 8000:8080 -p 50000:50000 -v /home/jenkins:/var/jenkins_home --name jenkins --restart always --privileged=true  -u root jenkins
# 初始密码
cat /var/jenkins_home/secrets/initialAdminPassword
```
jenkins启动成功，命令面板上有一串密码，浏览器输入http://localhost:8080（建议使用chrome，其他浏览器样式兼容不太好），登录时候复制进去。开启jenkins之旅。

### jenkins按照插件很慢，提速的解决方法[^1]
`https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json`
安装以后，找到安装目录的d`efault.json`

`C:\Program Files (x86)\Jenkins\updates\default.json`【windows】

打开default.json
替换`updates.jenkins-ci.org/download`为`mirrors.tuna.tsinghua.edu.cn/jenkins`

然后把`www.google.com`修改成`www.baidu.com`

执行命令：
```sh
# 找到刚才的`jenkins`安装目录
./jenkins.exe stop
./jenkins.exe start
```


[1]: https://blog.csdn.net/wshl1234567/article/details/78999920 'Jenkins 持续集成——SpringCloud项目一键打包发布'
[2]: https://www.cnblogs.com/nhdlb/p/12576273.html 'Docker：docker安装部署jenkins'
[3]: https://www.cnblogs.com/yoyoketang/p/12115569.html 'jenkins学习3-Jenkins插件下载速度慢、安装失败'
[4]: https://www.cnblogs.com/yueminghai/p/12929048.html ' jenkins+gitlab实现自动部署'

[^1]: [Jenkins安装插件提速](https://www.cnblogs.com/hellxz/p/jenkins_install_plugins_faster.html)