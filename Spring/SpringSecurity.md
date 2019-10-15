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
- 最总的过滤器获取到`Authentication`，来判断权限
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

### 
- CSRF防御:Spring Security默认启用CSRF防御，要求每个POST请求都要都要带上CSRF token参数，如果感觉比较麻烦或者网站安全性要求不高，可以配置禁用：
- 默认账户为`user`，密码会在控制太打印

[Spring Security视频教程](http://www.toocruel.net/spring-security-video/)
链接:https://pan.baidu.com/s/1F3ao5FfmHbTE86HqIy69Nw 密码:29p0
课程源码：https://github.com/toocruel/security

[1]: https://blog.csdn.net/toocruel/article/details/79900697 'Spring Security 视频教程'
[2]: http://www.toocruel.net/spring-security-video/ 'Spring Security 视频教程'