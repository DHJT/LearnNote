# Eclipse等开发工具

## Eclipse

### 基础
- 修改文件的默认打开方式
    + `Windows`->`Perferens`->`General`->`Editors`->`File Associations`
    + 选中相应的文件后缀设置默认打开方式

### 如何在eclipse的配置文件里指定jdk路径（即配置启动eclipse的JDK）
在eclipse的配置文件里指定jdk路径，只需在eclipse的配置文件里增加-vm参数即可。
打开eclipse目录下的eclipse.ini配置文件，增加-vm配置，需要注意的是该参数要加在-vmargs之前

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

[1]: https://blog.csdn.net/l4432321/article/details/52049125 'Eclipse中将Java项目转换成Web项目的方法'
[2]: http://tcrct.iteye.com/blog/736995/ '修改类及jsp文件后不用重启tomcat的方法'
[3]: https://blog.csdn.net/abc_cba_aaa/article/details/78774918 'ClassNotFoundException:org.springframework.web.context.ContextLoaderListener解决办法'