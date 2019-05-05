# Spring Boot
<!-- @author DHJT 2017-12-23 -->
其设计目的是用来简化新 Spring应用的初始搭建以及开发过程。
核心思想就是约定大于配置，一切由内定的约束来自动完成。
SpringBoot的主要优点：
  1:为所有Spring开发者更快的入门
  2:开箱即用，提供各种默认配置来简化项目配置
  3:内嵌式容器简化Web项目
  4:没有冗余代码生成和XML配置的要求

## 功能列表
- spring bootjson
- spring boot hibernate
- spring boot jsp支持
- 定时任务——Quartz
- 分页查询

[getting-started-guides](https://github.com/spring-guides/getting-started-guides)
[rest-service](https://spring.io/guides/gs/rest-service/)

springboot 2.0 默认连接池就是Hikari了，所以引用parents后不用专门加依赖
```java
# jdbc_config   datasource
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/datebook?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&useSSL=false&zeroDateTimeBehavior=convertToNull
spring.datasource.username=root
spring.datasource.password=root
# Hikari will use the above plus the following to setup connection pooling
spring.datasource.type=com.zaxxer.hikari.HikariDataSource
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.maximum-pool-size=15
spring.datasource.hikari.auto-commit=true
spring.datasource.hikari.idle-timeout=30000
spring.datasource.hikari.pool-name=DatebookHikariCP
spring.datasource.hikari.max-lifetime=1800000
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.connection-test-query=SELECT 1
```

## 扩展
- Spring Cache添加Redis支持

## 功能小点
- application.yml是用户级的资源配置项；
- bootstrap.yml是系统级的，优先级更加高；

### 性能优化
- 更改默认的Tomcat插件，使用更加小巧的Jetty；
- `@RestController`和`@Controller`的区别在`@RestController`返回JSON数据时，不需要指定@ResponseBody

## SpringBoot 配置文件存放位置及读取顺序

`SpringBoot`配置文件可以使用`yml`格式和`properties`格式
分别的默认命名为：`application.yml`、`application.properties`

存放目录
SpringBoot配置文件默认可以放到以下目录中，可以自动读取到：
项目根目录下项目根目录中config目录下项目的resources目录下项目resources目录中config目录下 

读取顺序
     如果在不同的目录中存在多个配置文件，它的读取顺序是：
        1、config/application.properties（项目根目录中config目录下）
        2、config/application.yml
        3、application.properties（项目根目录下）
        4、application.yml
        5、resources/config/application.properties（项目resources目录中config目录下）
        6、resources/config/application.yml
        7、resources/application.properties（项目的resources目录下）
        8、resources/application.yml
    注：
        1、如果同一个目录下，有application.yml也有application.properties，默认先读取application.properties。
        2、如果同一个配置属性，在多个配置文件都配置了，默认使用第1个读取到的，后面读取的不覆盖前面读取到的。
        3、创建SpringBoot项目时，一般的配置文件放置在“项目的resources目录下”

### spring-boot的三种启动方式
运行带有main方法类

    2. 通过命令行 java -jar 的方式
```sh
java -jar emample.jar --server.port=8081
# 该命令通过在启动行指定了项目启动后绑定的端口号，因为该命令行参数，将会覆盖application.properties中的端口配置
```
    3. 通过spring-boot-plugin的方式
    我们需要进入项目的根目录，执行
```sh
mvn sprint-boot:run
mvn spring-boot:help -Ddetail
mvn spring-boot:run -Drun.arguments="--server.port=8888"
```

### 常用的 starter 启动器：
- 单元测试: spring-boot-starter-web;
- 数据库持久层框架 JPA：spring-boot-starter-data-jpa；
- 安全框架：spring-boot-starter-security;
- Redis 缓存：spring-boot-starter-data-redis；

### 
- spring-boot-starter-actuator[2]
    + 一个spring提供的监控模块
- spring-boot-devtools实现热部署

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>

  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
  </dependency>
</dependencies>

<build>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <configuration>
        <fork>true</fork>
      </configuration>
    </plugin>
  </plugins>
</build>
```

[1]: https://gitee.com/didispace/SpringBoot-Learning 'SpringBoot-Learning'
[2]: https://blog.csdn.net/love3765/article/details/79291584 `SpringBoot随笔（一）： spring-boot-starter-actuator 模块详解`