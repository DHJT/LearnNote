# Logback
<!-- @author DHJT 2019-07-04 -->

logback是log4j团队创建的开源日志组件。与log4j类似，但是比log4j更强大，是log4j的改良版本。主要优势在于：

        a) 更快的实现，logback内核重写过，是的性能有了很大的提升，内存占用也更小。
        b) logback-classic对slf4j进行了更好的集成
        c) 自动重新加载配置文件，当配置文件修改后，logback-classic能自动重新加载配置文件
        d) 配置文件能够处理不同的情况，开发人员在不同的环境下（开发，测试，生产）切换的时候，不需要创建多个文件，可以通过<if><else><then>标签来实现
        e) 自动压缩已经打出来的日志文件：RollingFileAppender在产生新文件的时候，会自动压缩已经打印出来的日志文件。而且这个压缩的过程是一个异步的过程。

### logback中的logger、appender、layout
- logger:作为日志的记录器，把它关联到对应的context后，主要用于存放日志对象，也可以定义日志类型，级别。
- appender:主要用于指定日志输出的目的地。目的地可以是控制台，文件，远程套接字服务器，数据库mysql等。
- layout:负责把时间转换成字符串，格式化日志信息的输出。

### logback中主要模块有三个模块？
- logback-core: 所有logback模块的基础
- logback-classic: 是log4j的一个改良版本，同时完整的实现了slf4j api
- logback-access: 访问模块和servlet容器集成，提供通过http来访问日志的功能。

@slf4j的注解，就可以调用log实例写入日志

级别排序为： TRACE < DEBUG < INFO < WARN < ERROR。

### Logback 的初始化步骤：
1. logback 会在类路径下寻找名为 logback-test.xml 的文件。
2. 如果没有找到，logback 会继续寻找名为 logback.groovy 的文件。
3. 如果没有找到，logback 会继续寻找名为 logback.xml 的文件。
4. 如果没有找到，将会通过 JDK 提供的 ServiceLoader 工具在类路径下寻找文件 `META-INFO/services/ch.qos.logback.classic.spi.Configurator`，该文件的内容为实现了 Configurator 接口的实现类的全限定类名。
5. 如果以上都没有成功，logback 会通过 BasicConfigurator 为自己进行配置，并且日志将会全部在控制台打印出来。

<details>
    <summary><b>web.xml中配置Logback</b> (click to show)</summary>
```xml
<context-param>
    <param-name>logbackConfigLocation</param-name>
    <param-value>classpath:logback.xml</param-value>
</context-param>
```
</details>
<details>
    <summary><b>Logback.xml</b> (click to show)</summary>
## Logback.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!--定义日志文件的存储地址 勿在 LogBack 的配置中使用相对路径-->
    <property name="LOG_HOME" value="c:/log" />
    <!-- 控制台输出 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <!-- 日志输出编码 -->
        <Encoding>UTF-8</Encoding>
        <layout class="ch.qos.logback.classic.PatternLayout">
            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n
            </pattern>
        </layout>
    </appender>
    <!-- 按照每天生成日志文件 -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <Encoding>UTF-8</Encoding>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!--日志文件输出的文件名-->
            <FileNamePattern>${LOG_HOME}/myApp.log.%d{yyyy-MM-dd}.log</FileNamePattern>
            <MaxHistory>30</MaxHistory>
        </rollingPolicy>
        <layout class="ch.qos.logback.classic.PatternLayout">
            <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度%msg：日志消息，%n是换行符-->
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n
            </pattern>
        </layout>
        <!--日志文件最大的大小-->
        <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
            <MaxFileSize>10MB</MaxFileSize>
        </triggeringPolicy>
    </appender>
    <!-- show parameters for hibernate sql 专为 Hibernate 定制 -->
    <logger name="org.hibernate.type.descriptor.sql.BasicBinder" level="TRACE" />
    <logger name="org.hibernate.type.descriptor.sql.BasicExtractor" level="DEBUG" />
    <logger name="org.hibernate.SQL" level="DEBUG" />
    <logger name="org.hibernate.engine.QueryParameters" level="DEBUG" />
    <logger name="org.hibernate.engine.query.HQLQueryPlan" level="DEBUG" />

    <!--日志异步到数据库 -->
    <appender name="DB" class="ch.qos.logback.classic.db.DBAppender">
        <!--日志异步到数据库 -->
        <connectionSource class="ch.qos.logback.core.db.DriverManagerConnectionSource">
            <!--连接池 -->
            <dataSource class="com.mchange.v2.c3p0.ComboPooledDataSource">
                <driverClass>com.mysql.jdbc.Driver</driverClass>
                <url>jdbc:mysql://127.0.0.1:3306/databaseName</url>
                <user>root</user>
                <password>root</password>
            </dataSource>
        </connectionSource>
    </appender>

    <!-- 日志输出级别 -->
    <root level="INFO">
        <appender-ref ref="STDOUT" />
        <appender-ref ref="FILE" />
    </root>
</configuration>
```
</details>

### 保存到数据库
```sql
BEGIN;
DROP TABLE IF EXISTS logging_event_property;
DROP TABLE IF EXISTS logging_event_exception;
DROP TABLE IF EXISTS logging_event;
COMMIT;

BEGIN;
CREATE TABLE logging_event
  (
    timestmp         BIGINT NOT NULL,
    formatted_message  TEXT NOT NULL,
    logger_name       VARCHAR(254) NOT NULL,
    level_string      VARCHAR(254) NOT NULL,
    thread_name       VARCHAR(254),
    reference_flag    SMALLINT,
    arg0              VARCHAR(254),
    arg1              VARCHAR(254),
    arg2              VARCHAR(254),
    arg3              VARCHAR(254),
    caller_filename   VARCHAR(254) NOT NULL,
    caller_class      VARCHAR(254) NOT NULL,
    caller_method     VARCHAR(254) NOT NULL,
    caller_line       CHAR(4) NOT NULL,
    event_id          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY
  );
COMMIT;

BEGIN;
CREATE TABLE logging_event_property
  (
    event_id       BIGINT NOT NULL,
    mapped_key        VARCHAR(254) NOT NULL,
    mapped_value      TEXT,
    PRIMARY KEY(event_id, mapped_key),
    FOREIGN KEY (event_id) REFERENCES logging_event(event_id)
  );
COMMIT;

BEGIN;
CREATE TABLE logging_event_exception
  (
    event_id         BIGINT NOT NULL,
    i                SMALLINT NOT NULL,
    trace_line       VARCHAR(254) NOT NULL,
    PRIMARY KEY(event_id, i),
    FOREIGN KEY (event_id) REFERENCES logging_event(event_id)
  );
COMMIT;
```

[1]: https://www.cnblogs.com/EasonJim/p/7800880.html 'Java日志框架-logback的介绍及配置使用方法（纯Java工程）（转）'
[2]: http://www.logback.cn/ 'logback中文手册'