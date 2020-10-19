# Spring WebFlux
<!-- @author DHJT 2020-09-24 -->

`Spring WebFlux`是一个新的 reactive web应用框架，自 Spring Framework 5.0引入。与`Spring MVC`不同的是,它不需要`the Servlet API`,是完全异步和非阻塞的，实现了`Reactive Streams specification`。

## starter-web和starter-webflux能否一起工作
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```
当两者一起时配置的并不是`webflux web application`, 仍然时一个`spring mvc web application`。

官方文档中有这么一段注解：很多开发者添加spring-boot-start-webflux到他们的spring mvc web applicaiton去是为了使用reactive WebClient. 如果希望更改webApplication 类型需要显示的设置，如`SpringApplication.setWebApplicationType(WebApplicationType.REACTIVE)`.
```java
SpringApplication app = new SpringApplication(HealthEvalApplication.class);
app.setWebApplicationType(WebApplicationType.REACTIVE);
app.run(args);
```

## Spring WebFlux有两种方式: functional and annotation-based.

### 基于注解的方式很类似与Spring MVC model，如下面的例子:
```java
@RestController
@RequestMapping("/users")
public class MyRestController {
    @GetMapping("/{user}")
    public Mono<User> getUser(@PathVariable Long user) {
        // ...
    }
    @GetMapping("/{user}/customers")
    public Flux<Customer> getUserCustomers(@PathVariable Long user) {
        // ...
    }
    @DeleteMapping("/{user}")
    public Mono<User> deleteUser(@PathVariable Long user) {
        // ...
    }

}
```
### “WebFlux.fn”, the functional variant, 分开了路由配置routing configuration 和实际的请求handler，如下面的例子:
```java
@Configuration
public class RoutingConfiguration {
    @Bean
    public RouterFunction<ServerResponse> monoRouterFunction(UserHandler userHandler) {
        return route(GET("/{user}").and(accept(APPLICATION_JSON)), userHandler::getUser)
                .andRoute(GET("/{user}/customers").and(accept(APPLICATION_JSON)), userHandler::getUserCustomers)
                .andRoute(DELETE("/{user}").and(accept(APPLICATION_JSON)), userHandler::deleteUser);
    }
}
@Component
public class UserHandler {
    public Mono<ServerResponse> getUser(ServerRequest request) {
        // ...
    }
    public Mono<ServerResponse> getUserCustomers(ServerRequest request) {
        // ...
    }
    public Mono<ServerResponse> deleteUser(ServerRequest request) {
        // ...
    }
}
```

[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-developing-web-applications.html#boot-features-webflux 'boot-features-webflux'
[2]: https://blog.csdn.net/iteye_13139/article/details/82726588 'Spring（31）——WebClient介绍'
[3]: https://blog.csdn.net/qq_28958301/article/details/101293122 'Spring中的WebFlux和WebClient'