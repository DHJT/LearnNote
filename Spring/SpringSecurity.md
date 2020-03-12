# SpringSecurity
<!-- @author DHJT 2018-09-18 -->
权限安全控制框架

授权
## 基本原理

### 认证
Spring Security 过滤器链
SecurityContextPersistenceFilter
- 负责身份认证
    + `BasicAuthenticationFilter`
    + `UsernamePasswordAuthenticationFilter`
    + `RememberMeAuthenticationFilter`
    + `SmsCodeAuthenticationFilter`
    + `SocialAuthenticationFilter`
    + `OAuth2AuthenticationProcessingFilter`
    + `OAuth2ClientAuthenticationProcessingFilter`
- 匿名认证
    + `AnonymousAuthenticationFilter`
- 异常
    + `ExceptionTranslationFilter`
- 最终的过滤器获取到`Authentication`，来判断权限
    + `FilterSecurityInterceptor`
- 最终到达资源

### 鉴权
- `AccessDecisionManager`(I)
    + `AbstractAccessDecisionManager`
        * `AffirmativeBased`:一个通过就通过
        * `ConsensusBased`:多数通过
        * `UnanimousBased`:一个不通过就不通过
- `AccessDecisionVoter`
    + `WebExpressionVoter`

https://github.com/EarthChen/imooc-security-study/

### SpringBoot下使用
- [SpringSecurity前后端分离下对登录认证的管理](https://blog.csdn.net/XlxfyzsFdblj/article/details/82083443)
- [spring-security](https://docs.spring.io/spring-security/site/docs/5.0.8.RELEASE/reference/htmlsingle/#get-spring-security)
    + `https://docs.spring.io/spring-security/site/docs/current/guides/html5/hellomvc-javaconfig.html`
    + `https://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#what-is-acegi-security`

```yaml
# SpringBoot security关闭验证yml配置
# 监控关闭
security:
  basic:
    enabled: false
management:
  security:
    enabled: false
```

```java
public void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests()
    .antMatchers(
    SecurityConstants.DEFAULT_UNAUTHENTICATION_URL, SecurityConstants.DEFAULT_LOGIN_PROCESSING_URL_MOBILE,securityProperties.getBrowser().getLoginPage(), SecurityConstants.DEFAULT_VALIDATE_CODE_URL_PREFIX + "/*",securityProperties.getBrowser().getSignUpUrl(), securityProperties.getBrowser().getSession().getSessionInvalidUrl(), securityProperties. getBrowser(). getSignoutUrl(),
    "/user/regist")
    .permitAl1()
    .antMatchersCHttpMethod. GET, "/user/*".hasRole("ADMIN")
    .anyRequest()
    .authenticated()
    .and()
    .csrf(). disable();
}
// 匿名 AnonymousAuthenticationFiter.class
protected Authentication createAuthentication(HttpServletRequest request){
    AnonymousAuthenticationToken auth=new AnonymousAuthenticationToken(key, principal, authorities);
    auth.setDetails(authenticationDetailsSource.buildDetails(request));
    return auth;
}

```

### 使用

#### @EnableGlobalMethodSecurity详解
Spring Security默认是禁用注解的，要想开启注解，需要在继承`WebSecurityConfigurerAdapter`的类上加`@EnableGlobalMethodSecurity`注解，来判断用户对某个控制层的方法是否具有访问权限；
```java
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled=true) // 开启@Secured 注解过滤权限
@EnableGlobalMethodSecurity(jsr250Enabled=true) // 开启@RolesAllowed 注解过滤权限 
@EnableGlobalMethodSecurity(prePostEnabled=true) //  使用表达式时间方法级别的安全性
// 4个注解可用
@PreAuthorize // 在方法调用之前,基于表达式的计算结果来限制对方法的访问
@PostAuthorize // 允许方法调用,但是如果表达式计算结果为false,将抛出一个安全性异常
@PostFilter // 允许方法调用,但必须按照表达式来过滤方法的结果
@PreFilter // 允许方法调用,但必须在进入方法之前过滤输入值

@PreAuthorize("hasRole('admin')") // 用户具有admin角色，就能访问listAllUsers方法
```


### 
- CSRF防御:Spring Security默认启用CSRF防御，要求每个POST请求都要都要带上CSRF token参数，如果感觉比较麻烦或者网站安全性要求不高，可以配置禁用：
- 默认账户为`user`，密码会在控制太打印

[Spring Security视频教程](http://www.toocruel.net/spring-security-video/)
链接:https://pan.baidu.com/s/1F3ao5FfmHbTE86HqIy69Nw 密码:29p0
课程源码：https://github.com/toocruel/security

[1]: https://blog.csdn.net/toocruel/article/details/79900697 'Spring Security 视频教程'
[2]: http://www.toocruel.net/spring-security-video/ 'Spring Security 视频教程'


## SpringSecurity OAuth 2
[OAuth 2 Developers Guide](https://projects.spring.io/spring-security-oauth/docs/oauth2.html)

[/oauth/authorize]
[/oauth/token],methods=[POST]
[/oauth/token],methods=[GET]
[/oauth/check_token]
[/oauth/comfirm_access]

### OAuth协议中的授权模式
- 密码模式(resource owner password credentials)：用户将用户名密码交给第三方，有第三方携带用户名密码到认证服务器进行认证。此种模式下，认证中心不知道第三方是否合法取得用户的用户名密码，该种模式比较适合在公司多个app之间的同一登录。
    + 高度信任某个应用，RFC 6749 也允许用户把用户名和密码，直接告诉该应用。
- 授权码模式(authorization code)：
- 简化模式(implicit)：有些 Web 应用是纯前端应用，没有后端。这时就不能用上面的方式了，必须将令牌储存在前端。
    + 这种方式没有授权码这个中间步骤。
- 客户端模式(client credentials)：

不管上述哪种模式获取的token，都是同一个（没有或者过期了就生成一个，已经存在就是用存在的）
```json
{
    access_token: "",
    token_type: "bearer",
    refresh_token: "",
    expires_in: 43199,
    scope: "all"
}
```
```yaml
security:
  oauth2:
    client:
      clientId: testclient
      clientSecret: 1234567890
      accessTokenUri: http://localhost:8080/oauth/token
      userAuthorizationUri: http://localhost:8080/oauth/authorize
#      tokenName: oauth_token
#      authenticationScheme: query
      clientAuthenticationScheme: form
    resource:
      userInfoUri: http://localhost:8081/resource/user
```
```java
@EnableAuthorizationServer // 认证服务器
@EnableResourceServer // 资源服务器
```
默认的token的存储模式是在内存中的

### 参数说明
访问令牌 access_token (必需)
令牌类型 token_type (必须)
超时时间 expires_in (推荐)
刷新令牌 refresh_token （可选）
作用域 scope（可选）

当返回访问令牌时，HTTP服务器必须在HTTP头信息中增加两个属性
Cache-Control: no-store
Pragma: no-cache
确保客户端不缓存返回结果。

### 问题
- Could not fetch user details: class org.springframework.security.oauth2.common.exceptions.InvalidRequestException, Possible CSRF detected - state parameter was required but no state could be found
    + clientAuthenticationScheme: form 被注释了导致的，把注释去掉就不在有这个警告信息了，不知道是什么原理

