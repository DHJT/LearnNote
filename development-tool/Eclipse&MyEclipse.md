# Eclipse & MyEclipse 等开发工具
<!-- @author DHJT 2019-10-16 -->

## Eclipse

### 基础
- 修改文件的默认打开方式
    + `Windows`->`Perferens`->`General`->`Editors`->`File Associations`
    + 选中相应的文件后缀设置默认打开方式

### Install/Update
[https://download.eclipse.org/releases/](https://download.eclipse.org/releases/)
[eclipse 自身升级方法](https://blog.csdn.net/peakerli/article/details/8958733)
[如何升级Eclipse最新版(Eclipse 2018-12 4.1.0升级）](https://blog.csdn.net/penker_zhao/article/details/91526095)
When features and plug-ins are manually installed on top of an Eclipse-based product install located on a FAT file system that has already been run at least once, the product must be explicitly restarted with -clean. That is,

    eclipse.exe -clean

### 显示行数、竖线
竖线：代码最好不要超过一定的长度;[window-preferences]->[general-editors--text editors]->[show print margin] 中勾选后可以输入自己的限制长度，我这里是100。不是强制换行的意思，只是提醒我们代码不易过长，起到一个提示的作用。
行数：在代码左侧右击，选择`show line numbers`；

### 实用快捷键、功能
- 选中代码的注释：<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>/</kbd>
- 去除选中代码的注释：<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>\</kbd>
- 生成变量：方法或函数的返回值，<kbd>Ctrl</kbd>+<kbd>1</kbd>

### 缩进线（结构辅助线）
IndentGuide这个缩进插件

### 如何在 Eclipse 的配置文件里指定 jdk 路径（即配置启动 Eclipse 的JDK）
在eclipse的配置文件里指定jdk路径，只需在eclipse的配置文件里增加-vm参数即可。
打开eclipse目录下的eclipse.ini配置文件，增加-vm配置，需要注意的是该参数要加在-vmargs之前

### 如何在 Eclipse 中彻底修改一个项目名称
- [如何在Eclipse中彻底修改一个项目名称](https://blog.csdn.net/a18716374124/article/details/79499589)

### Eclipse设置禁用IPv6：-Djava.net.preferIPv4Stack=true
Window--Preferences--JAVA--Installed JREs--选中JDK--EDIT
Deault VM Arguments:-Djava.net.preferIPv4Stack=true

java.net.preferIPv4Stack=<true|false> 
java.net.preferIPv6Addresses=<true|false>

#### DBeaver中设置该参数的话，需要在配置文件中进行
位置：软件安装路径下的`dbeaver.ini`文件；
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

### 代码模板
- 在Preferences”对话框中点击“Java”->“Editor”->“Templates”
```ini
<!-- 变量 -->
${cursor}

/**
 * @author 作者名 <br/>
 * ${currentDate:date('yyyy-MM-dd HH:mm')}
 */
```
### Eclipse Class Decompiler

- [Eclipse中将Java项目转换成Web项目的方法][1]
- [eclipse-jee-galileo 修改类及jsp文件后不用重启tomcat的方法][2]
- [ClassNotFoundException:org.springframework.web.context.ContextLoaderListener解决办法][3]

### 复制workspace设置方法
1 使用eclipse新建workspace。
2 将新建的workspace下的.metadata.plugins内容全部删除。
3 将需要拷贝的workspace下的.metadata.plugins内容除了org.eclipse.core.resources文件夹的其他文件夹全部拷贝到新workspace的.metadata.plugins目录下。
4 重启eclipse（可直接在eclipse菜单中点击File->Restart）。

参考资料：
http://www.iteye.com/problems/77918
http://chanir.blog.51cto.com/6909185/1220190

### 插件
### `alibaba/p3c`
- [p3c](https://github.com/alibaba/p3c)
    + eclipse安装：https://p3c.alibaba.com/plugin/eclipse/update

### Subversive - SVN Team Provider
- [subversive](http://marketplace.eclipse.org/content/subversive-svn-team-provider)

### Basic
- [Emmet](http://download.emmet.io/eclipse/updates/)
- [FindBugs](http://findbugs.sourceforge.net/)

### Eclipse Color Theme
- [](http://marketplace.eclipse.org/content/eclipse-color-theme)

### Maven Integration for Eclipse
- [](http://marketplace.eclipse.org/content/maven-integration-eclipse-juno-and-newer)

### PyDev
- [](http://marketplace.eclipse.org/content/pydev-python-ide-eclipse)
#### JBPM工具插件
#### [SpringIDE](http://dist.springsource.com/release/TOOLS/update/e4.2)
#### [StrutsIDE](http://amateras.sourceforge.jp/cgi-bin/fswiki_en/wiki.cgi?page=StrutsIDE)
#### jshint

#### spket(收费)
- 破解版使用。
    + 将links文件夹放在Myeclipse的根目录。
    + 将links文件夹下的spket.link中的路径修改为spket的放置位置(包含至spket)
    + 重启MyEclipse.
- 使用。
    + 添加spket的支持框架包，如`ext`。
    + 设置`*.js`的默认打开方式。

#### 中文语言包
- [eclipse官网中文包](http://www.eclipse.org/babel/downloads.php)又或者在eclipse中安装。
- eclipse.ini里面任意新起一行，增加下面参数即可：
``` ini
-Duser.language=EN //中文ZH
```

## MyEclipse
- 在MyEclipse中可以设置tomcat的启动超时时间。`start-timeout`
- 添加项目的一种方式，new->java Project->指向源码地址。(主要适用于硬部署)
- [EclipseThemesStore](http://themes.jeeeyul.net)
- 项目下的`classes`被删除后，Meclipse需要<kbd>clean</kbd>
- 导入项目：new java project->定位于源码包
  - buildPath的classes
  - javeEE包
  - Java的jdk1.8包
  - 编码设置
- `D:\Workspaces\MyEclipse2016\qrda_fy\.classpath`编译后的jar包路径文件。`ClassDeFound`
- 源码包src目录不能作为源码包解析：删除**MyEclipse**的项目（不删除源码），并删除一些配置文件成纯净的项目包，重新导入项目，然后在BuildPath.
- **Java BuildPath**：
    + Source:`Source folders on build path:qrda_fy/src`
        `Dafault output folders:qrda_fy/WebRoot/WEB-INF/classes`
    + Libraries:`JavaEE 6.0 Generic Library`,`JRE System Library[jdk1.8.0]`,`lib下的jar包导入`
- Myeclipse的配置文件(myeclipse.ini)
``` ini
#utf8 (do not remove)
-startup
../Common/plugins/org.eclipse.equinox.launcher_1.2.0.v20110502.jar
--launcher.library
../Common/plugins/org.eclipse.equinox.launcher.i18n.win32.win32.x86_64_4.2.0.v201201111650
-install
D:/MyEclipse/MyEclipse 10
-vm
D:/MyEclipse/Common/binary/com.sun.java.jdk.win32.x86_64_1.6.0.013/bin/javaw.exe
-vmargs
-Xmx4096m
-XX:MaxPermSize=2048m
-XX:ReservedCodeCacheSize=512m
-Dosgi.nls.warnings=ignore
```

### 问题解决
- [eclipse鼠标悬停提示一移开就消失解决办法](https://blog.csdn.net/chen_changying/article/details/80601986)
    + eclipse4.11实测：`org.eclipse.ui.editors.prefs`、`org.eclipse.wst.html.ui.prefs`;
- eclipse中文注释缩进异常[^1]
- Eclipse注释中文格式没对齐[^2]
- 修改Eclipse注释里的${Date}变量格式
    + 日期格式化的方法： ${d:date('yyyy/MM/dd HH:mm:ss')}
    + 【格外注意】这种日期变量进行格式化的方法只支持eclipse 4.x以上版本，原因：eclipse 4.x之前的版本没有这个功能，不支持日期的字符串格式化。

## 快捷键
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>：全部转大写
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Y</kbd>：全部转大写
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd>：打开快捷键列表面板（STS中无效）


[1]: https://blog.csdn.net/l4432321/article/details/52049125 'Eclipse中将Java项目转换成Web项目的方法'
[2]: http://tcrct.iteye.com/blog/736995/ '修改类及jsp文件后不用重启tomcat的方法'
[3]: https://blog.csdn.net/abc_cba_aaa/article/details/78774918 'ClassNotFoundException:org.springframework.web.context.ContextLoaderListener解决办法'
[4]: https://blog.csdn.net/johnson67/article/details/8574871 'eclipse无法正确显示代码提示，显示No Default Proposals'

[^1]: [eclipse中文注释缩进异常](https://blog.csdn.net/jianggujin/article/details/83479729)
[^2]: [Eclipse注释中文格式没对齐](https://blog.csdn.net/shuoshuo_12345/article/details/82969271)