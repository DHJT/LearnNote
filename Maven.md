# MAVEN
``` xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.companyname.project-group</groupId>
  <artifactId>project</artifactId>
  <version>1.0</version>
  <packaging>war</packaging>

  <description> office 工具类 基于 poi</description>
  <licenses>
    <license>
      <name>The Apache License, Version 2.0</name>
      <url>http://www.apache.org/licenses/LICENSE-2.0.txt</url>
    </license>
  </licenses>

  <scm>
    <connection>scm:git:https://github.com/zhangdaiscott/jeecg.git</connection>
    <developerConnection>scm:git:https://github.com/zhangdaiscott/jeecg.git</developerConnection>
    <url>https://github.com/zhangdaiscott/jeecg</url>
  </scm>
  <developers>
    <developer>
      <name>DHJT.test</name>
      <email>dhjt11@qq.com</email>
    </developer>
  </developers>

  <!-- 配置部署的远程仓库 -->
  <distributionManagement>
    <snapshotRepository>
      <id>nexus-snapshots</id>
      <name>nexus distribution snapshot repository</name>
      <url>http://10.78.68.122:9090/nexus-2.1.1/content/repositories/snapshots/</url>
    </snapshotRepository>
  </distributionManagement>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <sub.version>2.1.4</sub.version>
    <poi.version>3.9</poi.version>
    <xerces.version>2.9.1</xerces.version>
    <guava.version>16.0.1</guava.version>
    <commons-lang.version>3.2.1</commons-lang.version>
    <slf4j.version>1.6.1</slf4j.version>
    <spring.version>4.0.9.RELEASE</spring.version>
  </properties>

</project>
```
### 国内仓库

``` xml
<!-- 添加国内阿里云的maven仓库镜像 2017-12-31 -->
<mirror>
  <id>alimaven</id>
  <name>aliyun maven</name>
  <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
  <mirrorOf>central</mirrorOf>
</mirror>

<mirrors>
    <!-- mirror
     | Specifies a repository mirror site to use instead of a given repository. The repository that
     | this mirror serves has an ID that matches the mirrorOf element of this mirror. IDs are used
     | for inheritance and direct lookup purposes, and must be unique across the set of mirrors.
     |
    --
    <mirror>
        <!-- 唯一标识一个mirror -->
        <id>mirrorId</id>
        <!-- 代表了一个镜像的替代位置，例如central就表示代替官方的中央库 -->
        <mirrorOf>repositoryId</mirrorOf>
        <!-- 貌似没多大用，相当于描述 -->
        <name>Human Readable Name for this Mirror.</name>
        <!-- 是官方的库地址 -->
        <url>http://my.repository.com/repo/path</url>
    </mirror>
     -->
     <!--默认的中央仓库-->
    <mirror>
        <id>mirrorId</id>
        <mirrorOf>repositoryId</mirrorOf>
        <name>Human Readable Name for this Mirror.</name>
        <url>http://my.repository.com/repo/path</url>
    </mirror>
    <!--自定义添加-->
    <mirror>
        <id>repo2</id>
        <mirrorOf>central</mirrorOf>
        <name>Human Readable Name for this Mirror.</name>
        <url>http://repo2.maven.org/maven2/</url>
    </mirror>
    <!--阿里云镜像-->
    <mirror>  
        <id>alimaven</id>  
        <name>aliyun maven</name>  
        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>  
        <mirrorOf>central</mirrorOf>          
    </mirror>
    <mirror>
        <id>ui</id>
        <mirrorOf>central</mirrorOf>
        <name>Human Readable Name for this Mirror.</name>
        <url>http://uk.maven.org/maven2/</url>
    </mirror>

    <mirror>
        <id>ibiblio</id>
        <mirrorOf>central</mirrorOf>
        <name>Human Readable Name for this Mirror.</name>
        <url>http://mirrors.ibiblio.org/pub/mirrors/maven2/</url>
    </mirror>

    <mirror>
        <id>jboss-public-repository-group</id>
        <mirrorOf>central</mirrorOf>
        <name>JBoss Public Repository Group</name>
        <url>http://repository.jboss.org/nexus/content/groups/public</url>
    </mirror>
    <!--访问慢的网址放入到后面-->
    <mirror>
        <id>CN</id>
        <name>OSChina Central</name>
        <url>http://maven.oschina.net/content/groups/public/</url>
        <mirrorOf>central</mirrorOf>
    </mirror>
    <mirror>
        <id>net-cn</id>
        <mirrorOf>central</mirrorOf>
        <name>Human Readable Name for this Mirror.</name>
        <url>http://maven.net.cn/content/groups/public/</url>
    </mirror>
    <mirror>
        <id>JBossJBPM</id>
        <mirrorOf>central</mirrorOf>
        <name>JBossJBPM Repository</name>
        <url>https://repository.jboss.org/nexus/content/repositories/releases/</url>
    </mirror>
</mirrors>
```
### maven配置文件中设置默认的jdk版本
``` xml
<profile>
  <id>jdk-1.8</id>
  <activation>
    <activeByDefault>true</activeByDefault>
    <jdk>1.8</jdk>
  </activation>
  <properties>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
    <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
  </properties>
</profile>
```

### Maven常用命令:
``` sh
mvn archetype:generate ：创建 Maven 项目
mvn compile ：编译源代码
mvn test-compile ：编译测试代码
mvn test ： 运行应用程序中的单元测试
mvn site ： 生成项目相关信息的网站
mvn clean ：清除目标目录中的生成结果
mvn package ： 依据项目生成 jar 文件
mvn install ：在本地 Repository 中安装 jar
mvn deploy：将jar包发布到远程仓库
mvn eclipse:eclipse ：生成 Eclipse 项目文件
```
### 使用Maven学习总结：
1. 编写pom.xml文件
<modelVersion>
<parent><groupId><artifactId><version><relativePath>
<groupId>
<artifactId>
<packaging>
<name>
<modules>:聚合
<version>
<properties>
<dependencies>
<build>
<testResources>
<pluginManagement>

dependencyManagement适用于父pom文件中管理依赖

- 坐标和依赖
    + 依赖范围，compile，test，provided，runtime，system
    + 依赖调解-传递性依赖：一，路径最短者优先；二，第一声明者优先。传递性依赖与依赖范围。
    + 可选依赖：（在配置文件pom.xml中）显示声明。
        * 排除依赖：由于某个包传递性依赖于某个不稳定版本的包，建议显示声明依赖这个包的稳定版本。
        * 归类依赖：相关包，版本相同，升级时一同升级，使用参数配置<properties>.
        * 优化依赖：mvn dependency:analyze.
- 聚合项目的POM中packaging必须为pom。继承模块也是。

2. 聚合与继承
3. Maven构建web项目
4. 使用jetty快速开发代码，cargo测试web项目
5. 编写Archetype
6. settings.xml：
  更改本地仓库的位置
    <localRepository>D:\web_console\m2\repository</localRepository>
  编写远程仓库
    <mirror>
        <!-- 镜像所有远程仓库，但不包括指定的仓库 -->
        <id>mirror-osc</id>
        <mirrorOf>external:*,!repo-osc-thirdparty,!repo-iss</mirrorOf>
        <url>http://maven.oschina.net/content/groups/public/</url>
    </mirror>
    写在maven安装目录下的`settings.xml`表示全局配置，写在用户目录下的`.m/settings.xml`中表示用户范围。

### 问题解决
- Maven下载依赖时，出现Missing artifact错误提示
    + 原因： 其中某一个或者几个依赖缺少pom文件

## Maven私有仓库搭建
我们可以使用专门的 Maven 仓库管理软件来搭建私服，比如：`Apache Archiva`，`Artifactory`，`Sonatype Nexus`。这里我们使用 Sonatype Nexus。
一、仓库：本地仓库、第三方仓库（内部中心仓库\私服）、中央仓库

1、本地仓库：1）、maven将工程中依赖的jar包（构件）从远程下载到本地某目录下管理，通常默认存储地址为${user.home}/.m2/responsitory/（Windows下可以通过%USERPROFILE%直接定位到当前用户文件夹路径下）；2）、jar包存储方式为在responsitory下groupId/artifactId/version/*.jar；3）修改本地仓库方式，找到$MAVEN_HOME/conf/setting.xml文件，修改配置<localRepository>即可；3）、使用jar包时，先从本地仓库下载，如果没有就去第三方仓库，如果还没有就去中央仓库下载

2、私服：1）、公司自己设立，只为公司内部共享使用，同时减少外部访问和下载频率；2）、私服一般是第三方提供的，常见私服服务器为：`Nexus`和`Artifactory`；3）、setting.xml（全局的）或pom.xml（当前项目的）中可以同时配置多个私服地址；3）、私服要单独配置，如果没有配置，默认不使用

3、中央仓库：1）、地址为https://mvnrepository.com/；2）、如果本地没有jar包并且没有配置私服，要去中央仓库下载，需要联外网

[1]: https://blog.csdn.net/boling_cavalry/article/details/79059021 '实战maven私有仓库三部曲之一：搭建和使用'
[2]: https://blog.csdn.net/boling_cavalry/article/details/79111740 '实战maven私有仓库三部曲之三：Docker下搭建maven私有仓库'
[3]: https://blog.csdn.net/boling_cavalry/article/details/79070744 '实战maven私有仓库三部曲之二：上传到私有仓库'
[4]: https://blog.csdn.net/ckxuexixuexi/article/details/80824203 'maven jar包没有能正确下载，如何解决（我所知道的）'
[5]: https://blog.csdn.net/ou_yu_chen/article/details/82999577 'maven本地仓库jar包下载失败/不完全的解决'
[6]: https://blog.csdn.net/She_lock/article/details/79557022 '使用docker-maven-plugin插件构建和推送Docker映像'