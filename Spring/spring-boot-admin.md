# Spring Boot Admin
<!-- @author DHJT 2019-10-05 -->


```java
@SpringBootApplication
@EnableAdminServer
public class SlifeBootAdminApplication {
    public static void main(String[] args) {
        SpringApplication.run(SlifeBootAdminApplication.class, args);
    }
}
```

### server段
```xml
<dependencies>
    <dependency>
        <groupId>de.codecentric</groupId>
        <artifactId>spring-boot-admin-starter-server</artifactId>
        <version>2.1.0</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <exclusions>
            <exclusion>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-tomcat</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-jetty</artifactId>
    </dependency>
</dependencies>
```
### Client段
```xml
<dependencies>
    <dependency>
        <groupId>de.codecentric</groupId>
        <artifactId>spring-boot-admin-starter-client</artifactId>
        <version>2.1.0</version>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <exclusions>
            <exclusion>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-tomcat</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-jetty</artifactId>
    </dependency>
</dependencies>
```

[1]: https://github.com/codecentric/spring-boot-admin 'spring-boot-admin'
[2]: https://www.cnblogs.com/forezp/p/10242004.html 'Spring Boot Admin 2.1.0 全攻略'

## 问题
- [java.lang.IllegalStateException: Calling [asyncError()] is not valid for a request with Async state](https://blog.csdn.net/l1161558158/article/details/86569748)
