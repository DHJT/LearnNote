# AOP(Aspect Oriented Programming)
<!-- @author DHJT 2019-10-29 -->

### Aspectj与Spring AOP比较[^1]
|                   `Spring AOP`               |         AspectJ                  |
|----------------------------------------------|--------------------------------------------|
| 纯 Java 实现                                  | 使用 Java 编程语言的扩展实现    |
| 不需要单独的编译过程                           | 除非设置LTW,否则需要AspectJ编译器(ajc)               |
| 只能使用运行时织入                             | 运行时织入不可用。支持编译时、编译后和加载时织入       |
| 功能不强-仅支持方法级编织                      | 更强大，可以编织字段、方法、构造函数、静态初始值设定项、最终类/方法等。 |
| 只能在由Spring容器管理的bean上实现             | 可以在所有域对象上实现                  |
| 仅支持方法执行切入点                           | 支持所有切入点                                        |
| 代理是由目标对象创建的, 并且切面应用在这些代理上 | 在执行应用程序之前(在运行时)前, 各方面直接在代码中进行织入            |
| 比AspectJ慢多了                               | 更好的性能                           |
| 易于学习和应用                                | 相对于`Spring AOP`来说更复杂             |

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```
@EnableAspectJAutoProxy
@PointCut注解声明切点（@Pointcut("@annotation(aop.Action)")），然后使用@After注解声明一个建言（@After("annotationPointCut()")）

### 方法规则拦截的好处是对原来的代码没有侵入性，即我们不需要在被拦截的方法上添加注解，仅根据包名、类名或方法名以及参数类型便可进行拦截。
在定义@Before时定义拦截规则`@Before("execution(* aop.DemoMethodService.*(..))")`

### AOP中扫描指定注解相关说明
（1）`@annotation`：用来拦截所有被某个注解修饰的方法
（2）`@within`：用来拦截所有被某个注解修饰的类
（3）`within`：用来指定扫描的包的范围
```java
@Aspect
@Component
@Order(10)
public class BidAuthorityProxy {
    /**
     * 扫描指定包下的类中使用@EnableRoleAuthority注解修饰的类
     */
    @Around("@within(com.core.annotation.EnableRoleAuthority) && within(com.bid..*)")
    public Object verifyRoleExecuteCommand(ProceedingJoinPoint pjp) throws Throwable {
        // 获取当前拦截方法的对象
        MethodSignature msig = (MethodSignature) pjp.getSignature();
        Method targetMethod = pjp.getTarget().getClass().getDeclaredMethod(msig.getName(), msig.getMethod().getParameterTypes());
        // 获取当前方法注解中的值
        VerifyRoleAuthority annotation = targetMethod.getAnnotation(VerifyRoleAuthority.class);
        // 如果类上面没有注解，则获取接口上此方法的注解
        if (annotation == null) {
            Class<?>[] inters = pjp.getTarget().getClass().getInterfaces();
            for (Class<?> inter : inters) {
                Method targetInterMethod = inter.getDeclaredMethod(msig.getName(), msig.getMethod().getParameterTypes());
                annotation = targetInterMethod.getAnnotation(VerifyRoleAuthority.class);
                if (annotation != null) {
                    break;
                }
            }
        }
        // 获取到注解中的值后进行后续自定义逻辑操作
        return pjp.proceed();// 执行方法
    }
}
```

## 问题

### 注解切面失效的情况
- AOP无法切入private
另外记录一个坑点，切面不能切入private方法，原因可以简单理解为就像反射不能获取私有成员一样，详细原理可以看这里。
- AOP无法切入方法内部调用
今天刚发现的，比方说service中有个方法A，controller中调用的是service.A()，而方法A()中内部调用了方法B和方法C。此时注解打在A()上面是没有问题的，打在B()或C()上是没有效果的，原因和上面类似，都是由于代理类的问题，

[^1]: [Aspectj与Spring AOP比较](https://www.jianshu.com/p/872d3dbdc2ca)