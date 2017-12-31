# MAVEN
``` xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
   http://maven.apache.org/xsd/maven-4.0.0.xsd">
   <modelVersion>4.0.0</modelVersion>

   <groupId>com.companyname.project-group</groupId>
   <artifactId>project</artifactId>
   <version>1.0</version>

</project>
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
    写在maven安装目录下的settings.xml表示全局配置，写在用户目录下的.m/settings.xml中表示用户范围。
