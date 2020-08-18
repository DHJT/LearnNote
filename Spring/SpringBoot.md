# Spring Boot
<!-- @author DHJT 2017-12-23 -->
其设计目的是用来简化新 Spring应用的初始搭建以及开发过程。
核心思想就是约定大于配置，一切由内定的约束来自动完成。
SpringBoot的主要优点：
  1:为所有Spring开发者更快的入门
  2:开箱即用，提供各种默认配置来简化项目配置
  3:内嵌式容器简化Web项目
  4:没有冗余代码生成和XML配置的要求

[spring-boot文檔](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)

```java
@EnableTransactionManagement // 开启事务支持后 service方法上添加 @Transactional
@SpringBootApplication(scanBasePackages = {"com.hoperun"})
@EnableScheduling
@EnableAsync
//实现跨域注解
//origin="*"代表所有域名都可访问
//maxAge飞行前响应的缓存持续时间的最大年龄，简单来说就是Cookie的有效期 单位为秒
//若maxAge是负数,则代表为临时Cookie,不会被持久化,Cookie信息保存在浏览器内存中,浏览器关闭Cookie就消失
@CrossOrigin(origins = "*", maxAge = 3600)
// 使用定义的properties或者自定义的属性配置，@Autowired自动导入bean使用配置；
@ConfigurationProperties(prefix = "wisely2")
@ConfigurationProperties(prefix = "wisely", locations = "classpath:config/wisely.properties")
@EnableConfigurationProperties({WiselySettings.class, Wisely2Settings.class})
```

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
可以分为项目内配置文件以及`jar`同级目录下配置文件；
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

#### springboot项目实现jar包外配置文件管理[^1]
- [SpringBoot配置文件放在jar外部](https://blog.csdn.net/weixin_38405253/article/details/92802591)

### spring-boot的三种启动方式
1. 运行带有main方法类
2. 通过命令行 java -jar 的方式
```sh
java -jar emample.jar --server.port=8081
# 该命令通过在启动行指定了项目启动后绑定的端口号，因为该命令行参数，将会覆盖application.properties中的端口配置
```
3. 通过spring-boot-plugin的方式
```sh
# 需要进入项目的根目录，执行
mvn sprint-boot:run
mvn spring-boot:help -Ddetail
mvn spring-boot:run -Drun.arguments="--server.port=8888"
```

#### SpringBoot进入debug模式
1. 命令行
```java –jar  xxx.jar   --debug```
2. 在`application.properties`中设置属性`debug=true`
3.在启动上面设置`Run Configurations…`
在`VM arguments`中添加 `–Ddebug`

### 常用的 starter 启动器：
- 单元测试: spring-boot-starter-web;
- 数据库持久层框架 JPA：spring-boot-starter-data-jpa；
- 安全框架：spring-boot-starter-security;
- Redis 缓存：spring-boot-starter-data-redis；

- spring-boot-starter-actuator
- spring-boot-autoconfigure
- spring-boot-starter-parent

### actuator
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
### 不使用 spring-boot-starter-parent 构建 spring boot 应用

但是在真正的项目开发中，往往模块需要定义自己的 而 maven 的 pom 只允许一个 存在，这种情况下，可以采用下面的定义来避免使用 spring-boot-start-parent。安装如下配置的 pom.xml 可以通过 maven package 生成可以运行的 jar 包，通过`java -jar xxxx.jar`启动运行。
```xml
<parent>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-parent</artifactId>
  <version>1.4.0.RELEASE</version>
</parent>
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>1.4.0.RELEASE</version>
  </dependency>

  <!--ImportdependencymanagementfromSpringBoot-->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>1.4.0.RELEASE</version>
    <type>pom</type>
    <scope>import</scope>
  </dependency>
</dependencies>

<build>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <version>1.4.0.RELEASE</version>
      <configuration>
        <executable>true</executable>
      </configuration>
      <executions>
        <execution>
          <goals>
            <goal>repackage</goal>
          </goals>
        </execution>
      </executions>
    </plugin>
  </plugins>
</build>
```

### 不依赖 Spring 提供的父项目`spring-boot-starter-parent`
```xml
<!-- 在pom文件中，使用的SpringBoot提供的父依赖项目。在真实的企业级项目，我们可能会有自己的父项目，不想依赖Spring提供的父项目 -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <!-- Import dependency management from Spring Boot -->
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>1.4.3.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>

    </dependencies>
</dependencyManagement>
<!-- 其余配置和SpringBoot快速入门程序一样，启动类和测试步骤均一样。 -->
```
```yaml
management:
  endpoints:
    web:
      exposure:
        include: "*"
  endpoint:
    info:
      enabled: true
```

[1]: https://gitee.com/didispace/SpringBoot-Learning 'SpringBoot-Learning'
[2]: https://blog.csdn.net/love3765/article/details/79291584 'SpringBoot随笔（一）： spring-boot-starter-actuator 模块详解'
[3]: http://docs.spring.io/spring-boot/docs/1.4.3.RELEASE/reference/htmlsingle/#using-boot-maven-without-a-parent 'using-boot-maven-without-a-parent'
[4]: https://www.cnblogs.com/liaojie970/p/8043150.html 'spring boot 使用@ConfigurationProperties'
[5]: https://www.cnblogs.com/long88-club/p/11361174.html 'springboot中返回值json中null转换空字符串'
[6]: https://www.iteye.com/blog/wiselyman-2184586 'Spring Boot使用自定义的properties'

[^1]: [springboot项目实现jar包外配置文件管理](https://blog.csdn.net/xrq0508/article/details/80050119)