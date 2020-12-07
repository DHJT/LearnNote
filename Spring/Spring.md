# Spring
<!-- @author DHJT 2018-11-26 -->

## 原理
内部最核心的就是IOC了，动态注入，让一个对象的创建不用new了，可以自动的生产，这其实就是利用java里的反射，反射其实就是在运行时动态的去创建、调用对象，Spring就是在运行时，跟xml Spring的配置文件来动态的创建对象，和调用对象里的方法的。
Spring还有一个核心就是AOP这个就是面向切面编程，可以为某一类对象 进行监督和控制（也就是 在调用这类对象的具体方法的前后去调用你指定的 模块）从而达到对一个模块扩充的功能。这些都是通过  配置类达到的。
Spring目的：就是让对象与对象（模块与模块）之间的关系没有通过代码来关联，都是通过配置类说明管理的（Spring根据这些配置 内部通过反射去动态的组装对象）
要记住：Spring是一个容器，凡是在容器里的对象才会有Spring所提供的这些服务和功能。
最经典的一个设计模式就是：模板方法模式。 Spring里的配置是很多的，很难都记住，但是Spring里的精华也无非就是以上的两点，把以上两点跟理解了 也就基本上掌握了Spring.

### Spring AOP与IOC
一、 IoC(Inversion of control): 控制反转
1、IoC：
概念：控制权由对象本身转向容器；由容器根据配置文件去创建实例并创建各个实例之间的依赖关系
核心：bean工厂；在Spring中，bean工厂创建的各个实例称作bean
二、AOP(Aspect-Oriented Programming): 面向方面编程
1、 代理的两种方式：
静态代理：
 针对每个具体类分别编写代理类；
 针对一个接口编写一个代理类；
动态代理：
针对一个方面编写一个InvocationHandler，然后借用JDK反射包中的Proxy类为各种接口动态生成相应的代理类
AOP的主要原理：动态代理

- 避免 Spring 的 AOP 的自调用问题
    + 在 Spring 的 AOP 代理下，只有目标方法由外部调用，目标方法才由 Spring 生成的代理对象来管理，这会造成自调用问题。

### 框架结构
Spring 框架是一个分层架构，由 7 个定义良好的模块组成。Spring 模块构建在核心容器之上，核心容器定义了创建、配置和管理 bean 的方式，组成 Spring 框架的每个模块（或组件）都可以单独存在，或者与其他一个或多个模块联合实现。每个模块的功能如下：

- 核心容器：核心容器提供 Spring 框架的基本功能。核心容器的主要组件是 BeanFactory，它是工厂模式的实现。BeanFactory 使用控制反转 （IOC）模式将应用程序的配置和依赖性规范与实际的应用程序代码分开。

- Spring 上下文：Spring 上下文是一个配置文件，向 Spring 框架提供上下文信息。Spring 上下文包括企业服务，例如 JNDI、EJB、电子邮件、国际化、校验和调度功能。

- Spring AOP：通过配置管理特性，Spring AOP 模块直接将面向方面的编程功能集成到了 Spring 框架中。所以，可以很容易地使 Spring 框架管理的任何对象支持 AOP。Spring AOP 模块为基于 Spring 的应用程序中的对象提供了事务管理服务。通过使用 Spring AOP，不用依赖 EJB 组件，就可以将声明性事务管理集成到应用程序中。

- Spring DAO：JDBC DAO 抽象层提供了有意义的异常层次结构，可用该结构来管理异常处理和不同数据库供应商抛出的错误消息。异常层次结构简化了错误处理，并且极大地降低了需要编写的异常代码数量（例如打开和关闭连接）。Spring DAO 的面向 JDBC 的异常遵从通用的 DAO 异常层次结构。

- Spring ORM：Spring 框架插入了若干个 ORM 框架，从而提供了 ORM 的对象关系工具，其中包括 JDO、Hibernate 和 iBatis SQL Map。所有这些都遵从 Spring 的通用事务和 DAO 异常层次结构。

- Spring Web 模块：Web 上下文模块建立在应用程序上下文模块之上，为基于 Web 的应用程序提供了上下文。所以，Spring 框架支持与 Jakarta Struts 的集成。Web 模块还简化了处理多部分请求以及将请求参数绑定到域对象的工作。

- Spring MVC 框架：MVC 框架是一个全功能的构建 Web 应用程序的 MVC 实现。通过策略接口，MVC 框架变成为高度可配置的，MVC 容纳了大量视图技术，其中包括 JSP、Velocity、Tiles、iText 和 POI。

Spring 框架的功能可以用在任何 J2EE 服务器中，大多数功能也适用于不受管理的环境。Spring 的核心要点是：支持不绑定到特定 J2EE 服务的可重用业务和数据访问对象。毫无疑问，这样的对象可以在不同 J2EE 环境 （Web 或 EJB）、独立应用程序、测试环境之间重用。

spring的三种注入方式是什么?
        setter
        interface
        constructor
spring的核心接口及核类配置文件是什么?
        FactoryBean:工厂bean主要实现ioc/di
        ApplicationContext ac = new FileXmlApplicationContext("applicationContext.xml");
        Object obj = ac.getBean("id值");

## 版本控制
5.0： the framework is based on Java 8+ now

## 事务
- [Spring基于注解配置事务的属性] [1]
- [spring scope prototype与singleton区别] [2]
- Spring可以支持编程式事务和声明式事务。
- Spring提供的最原始的事务管理方式是基于`TransactionDefinition`、`PlatformTransactionManager`、`TransactionStatus`编程式事务。
- 而`TransactionTemplate`的编程式事务管理是使用模板方法设计模式对原始事务管理方式的封装。

- `Spring`读取参数配置文件
``` xml
<!--参数配置 -->
<context:property-placeholder location="classpath:db.properties" />
<!-- 参数配置第二种 -->
<bean id="propertyConfigurer" class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
    <property name="locations">
        <list>
            <value>classpath:system.properties</value>
        </list>
    </property>
</bean>

<!--数据库源 -->
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource" destroy-method="close">
    <property name="driverClass">
        <value>${db.driverclassname}</value>
    </property>
</bean>
```
- `Spring`:添加字段后报错，可以全局查询其他继承类中是否已经定义了该字段。
- **`Spring`**的定时任务，执行一些固定的任务，如数据的逾期状态更新
``` xml
<!-- PDF删除定时器 spring定时器任务 -->
<bean name="TimedTaskjob" class="org.springframework.scheduling.quartz.JobDetailBean">
    <property name="jobClass" value="com.app.task.TimedTask" />
    <property name="jobDataAsMap">
        <map>
            <entry key="timeout" value="0" />
        </map>
    </property>
</bean>

<bean id="cronTrigger" class="org.springframework.scheduling.quartz.CronTriggerBean">
    <property name="jobDetail" ref="TimedTaskjob" />
    <property name="cronExpression" value="0 30 23 * * ?" />
</bean>

<bean class="org.springframework.scheduling.quartz.SchedulerFactoryBean">
    <property name="triggers">
        <list>
            <ref bean="cronTrigger" />
        </list>
    </property>
</bean>
```
``` java
public class TimedTask extends QuartzJobBean {
    private int timeout;
    private static int i = 0;
    //调度工厂实例化后，经过timeout时间开始执行调度
    public void setTimeout(int timeout) {
    this.timeout = timeout;
    }

    @Override
    protected void executeInternal(JobExecutionContext arg0)
            throws JobExecutionException {
        // TODO 自动生成的方法存根
        File f = new File(getClass().getResource("/").getPath());
        String file = f.getParent();
        f = new File(file);
        file = f.getParent();
        String pdf = "\\PDF\\pdf_bak";
        file+=pdf;
        System.out.println("定时任务执行中…" +file);
        String Date = Util.getCurrentDate();
        String hql = " update Borrow  b set b.status ='3' where b.returnDate<='"+Date+"' ";
        App.getHibernateDao().executeBySql(hql);
    }
}
```

### @PropertySouce、@PropertySources
`@PropertySouce`是`spring3.1`开始引入的基于`java config`的注解。
在Spring 4中，Spring提供了一个新的注解——`@PropertySources`,从名字就可以猜测到它是为多配置文件而准备的。
通过`@PropertySource`注解将properties配置文件中的值存储到Spring的 Environment中，Environment接口提供方法去读取配置文件中的值，参数是properties文件中定义的key值。
```java
@Configuration
@PropertySource("classpath:jdbc.properties")
public class PropertiesWithJavaConfig {
   @Value(${jdbc.driver})
   private String driver;
   @Value(${jdbc.url})
   private String url;
   @Value(${jdbc.username})
   private String username;
   @Value(${jdbc.password})
   private String password;
   // 要想使用@Value 用${}占位符注入属性，这个bean是必须的，这个就是占位bean,另一种方式是不用value直接用Envirment变量直接getProperty('key')  
   @Bean
   public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
      return new PropertySourcesPlaceholderConfigurer();
   }
}
```

[Spring加载Properties配置文件的四种方式] [3]

### @RequestBodyAdvice&@ResponseBodyAdvice
- 作用
    + 需要对项目中的所有输入进行前后空格的过滤;
    + 替换一些特殊字符的输入;
    + 解密一些关键性字段;
    + 注入一些参数在请求方法的时候;
    + 返回参数统一处理，如果后台返回空，统一返回成功信息;
    + 身份证等特殊字符统一做 * 号处理等
- RequestBodyAdvice：在 sping 4.2 新加入的一个接口，它可以使用在 @RequestBody 或 HttpEntity 修改的参数之前进行参数的处理，比如进行参数的解密。
    + Spring默认提供了接口的抽象实现类`RequestBodyAdviceAdapter`, 我们可以继承这个类按需实现 , 让代码更简洁一点
    + 针对所有以@RequestBody的参数，在读取请求body之前或者在body转换成对象之前可以做相应的增强。我们处理了有参数和没有参数的情况，打印出请求类、方法、请求参数。注意：这里要加上@ControllerAdvice请求才能增强。
- ResponseBodyAdvice是spring4.1的新特性，其作用是在响应体写出之前做一些处理；比如，修改返回值、加密等。

### Spring 获取 实现某接口的所有实例bean
首先，获取 applicationContext，通过ApplicationAware自动注入
```java
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

/**
 * @description: (spring功能类，用于获取bean)
 */
@Component("springBeanUtil")
public class SpringBeanUtil implements ApplicationContextAware {
    protected final static Log logger = LogFactory.getLog(SpringBeanUtil.class);
    private static ApplicationContext ctx = null;
    private static Map<String, Properties> propMap = new HashMap<String, Properties>(0);

    @Override
    public void setApplicationContext(ApplicationContext ctx) throws BeansException {
        SpringBeanUtil.ctx = ctx;
    }

    public static ApplicationContext getApplicationContext() {
        return ctx;
    }

    public static <T> T getBean(String prop) {
        Object obj = ctx.getBean(prop);
        if (logger.isDebugEnabled()) {
            logger.debug("property=[" + prop + "],object=[" + obj + "]");
        }
        return (T) obj;
    }

    public static Properties getProperties(String filepath) {
        if (propMap.containsKey(filepath))
            return propMap.get(filepath);
        Resource resource = ctx.getResource(filepath);
        Properties prop = new Properties();
        try {
            prop.load(resource.getInputStream());
            propMap.put(filepath, prop);
            return prop;
        } catch (IOException e) {
            logger.error("can not find the resource file:[" + filepath + "]", e);
            return null;
        }
    }
}

// key位 bean name，value为实例
Map<String, Interface> result = SpringBeanUtil.getApplicationContext().getBeansOfType(Interface.class);
// 返回 bean name 的String 数组
String[] result = SpringBeanUtil.getApplicationContext().getBeanNamesForType(IPrizeInvoke.class);
```

[1]: https://blog.csdn.net/qingpengshan/article/details/80598366 'Spring基于注解配置事务的属性'
[2]: http://www.cnblogs.com/lizhonghua34/p/4953500.html 'spring scope prototype与singleton区别'
[3]: https://blog.csdn.net/haha_sir/article/details/79105951 'Spring加载Properties配置文件的四种方式'