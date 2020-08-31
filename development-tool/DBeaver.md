# DBeaver
<!-- @author DHJT 2019-10-14 -->

## DBeaver
- 社区版与企业版分离4.1.1
https://github.com/dbeaver/dbeaver/tree/4.1.1
- 配置文件目录[^1]

### 下载
- https://dbeaver.io/files/

### 使用
- 生成测试数据(Mock Data)
    + 在版本（6.1.5）中可用，之后版本移除
    + Note: since version 6.2 MockData generator extension is available only in Enterprise Edition.
    + [Mock Data Generation in DBeaver](https://github.com/dbeaver/dbeaver/wiki/Mock-Data-Generation-in-DBeaver)

### 自定义数据库连接
- Adding driver configuration in DBeaver.[^2]

### 升级
- 直接替换即可，保留原来胡配置文件，与安装位置不在一起
    + `%APPDATA%\DBeaverData\`：`DBeaver 6.1+`
    + 例`C:\Users\DHJT\AppData\Roaming\DBeaverData`

### 配置优先使用IPV4
需要在配置文件中进行，位置：软件安装路径下的`dbeaver.ini`文件；
```ini
-startup
plugins/org.eclipse.equinox.launcher_1.5.700.v20200207-2156.jar
--launcher.library
plugins/org.eclipse.equinox.launcher.win32.win32.x86_64_1.1.1100.v20190907-0426
-vmargs
-Djava.net.preferIPv4Stack=true
-XX:+IgnoreUnrecognizedVMOptions
--add-modules=ALL-SYSTEM
-Xms64m
-Xmx1024m
```

[^1]: [DBeaver Workspace Location](https://github.com/dbeaver/dbeaver/wiki/Workspace-Location)
[^2]: [Adding driver configuration in DBeaver](https://github.com/dbeaver/dbeaver/wiki/Database-drivers#Adding%20driver%20configuration%20in%20DBeaver)