# JTA
<!-- @author DHJT 2019-10-11 -->

## 使用JTA分布式事务
通过使用Atomikos或Bitronix嵌入式事务管理器，Spring Boot支持跨多个XA资源的分布式JTA事务，在部署到合适的Java EE应用服务器时也支持JTA事务。

当检测到JTA环境时，使用Spring的JtaTransactionManager来管理事务，自动配置的JMS、数据源和JPA bean被升级为支持XA事务，你可以使用标准的Spring风格，例如@Transactional，来参与分布式事务。如果你在JTA环境中，并且仍然希望使用本地事务，你可以设置spring.jta.enabled属性为false以禁用JTA自动配置。

### 1 使用Atomikos事务管理器
Atomikos是一种流行的开源事务管理器，可以嵌入到Spring Boot应用程序中，你可以使用`spring-boot-starter-jta-atomikos`启动器来拉取适当的Atomikos库，Spring Boot可以自动配置Atomikos，并确保将适当的依赖设置应用到你的Spring bean中，以实现正确的启动和关闭顺序。

默认情况下，Atomikos事务日志被写入应用程序的主目录中的transaction-logs目录(应用程序jar文件所在的目录)，你可以通过在`application.properties`文件中设置spring.jta.log-dir来定制这个目录的位置，从`spring.jta.atomikos.properties`开始的属性还可以用于定制Atomikos UserTransactionServiceImp，请参阅AtomikosProperties Javadoc获取完整的详细信息。

为了确保多个事务管理器可以安全地协调相同的资源管理器，每个Atomikos实例必须配置唯一的ID，默认情况下，这个ID是Atomikos运行的机器的IP地址。为了确保生产中具有唯一性，你应该为应用程序的每个实例配置spring.jta.transaction-manager-id属性的不同值。

### 2 使用Bitronix事务管理器
Bitronix是一个流行的开源JTA事务管理器实现，你可以使用`spring-boot-starter-jta-bitronix`启动器向项目添加适当的Bitronix依赖项，与Atomikos一样，Spring Boot可以自动配置Bitronix并对bean进行后处理，以确保启动和关闭顺序是正确的。

默认情况下，Bitronix事务日志文件(part1.btm和part2.btm)被写入到应用程序主目录中的transaction-logs目录中，你可以通过设置spring.jta.log-dir属性来定制这个目录的位置。从spring.jta.bitronix.properties开始的属性也绑定到bitronix.tm.Configuration bean，允许进行完全定制，详细信息请参阅Bitronix文档。

### 3 使用Narayana事务管理器
Narayana是JBoss支持的一个流行的开源JTA事务管理器实现，你可以使用`spring-boot-starter-jta-narayana`启动器向项目添加适当的Narayana依赖项，与Atomikos和Bitronix一样，`Spring Boot`将自动配置Narayana并对bean进行后处理，以确保启动和关闭顺序是正确的。

默认情况下，Narayana事务日志被写到应用程序主目录中的transaction-logs目录(应用程序jar文件所在的目录)，你可以在application.properties文件通过设置spring.jta.log-dir属性来定制这个目录的位置，从`spring.jta.narayana.properties`开始的属性也可以用来定制narayana配置，有关详细信息，请参阅NarayanaProperties Javadoc。

### 4 使用Java EE Managed事务管理器
如果将Spring Boot应用程序打包为war或ear文件并将其部署到Java EE应用服务器，则可以使用应用服务器的内置事务管理器。Spring Boot试图通过查看常见的JNDI位置(java:comp/UserTransaction, java:comp/TransactionManager，等等)自动配置事务管理器，如果你使用由应用服务器提供的事务服务，你通常还希望确保所有资源都由服务器管理，并通过JNDI公开。Spring Boot试图通过在JNDI路径(java:/JmsXA或java:/XAConnectionFactory)查找ConnectionFactory来自动配置JMS，你可以使用spring.datasource.jndi-name属性来配置DataSource。

### 5 混合XA和非XA JMS连接
在使用JTA时，主要的JMS ConnectionFactory bean是支持xa的，并参与分布式事务，在某些情况下，你可能希望通过使用非XA ConnectionFactory来处理某些JMS消息，例如，你的JMS处理逻辑可能需要比XA超时更长的时间。

如果希望使用非XA ConnectionFactory，可以注入nonXaJmsConnectionFactory bean而不是@Primary jmsConnectionFactory bean，为了保持一致性，jmsConnectionFactory bean也通过使用bean别名xaJmsConnectionFactory提供。

下面的示例演示如何注入ConnectionFactory实例:
```java
// Inject the primary (XA aware) ConnectionFactory
@Autowired
private ConnectionFactory defaultConnectionFactory;

// Inject the XA aware ConnectionFactory (uses the alias and injects the same as above)
@Autowired
@Qualifier("xaJmsConnectionFactory")
private ConnectionFactory xaConnectionFactory;

// Inject the non-XA aware ConnectionFactory
@Autowired
@Qualifier("nonXaJmsConnectionFactory")
private ConnectionFactory nonXaConnectionFactory;
```
### 6 支持供选择的嵌入式事务管理器
可以使用XAConnectionFactoryWrapper和XADataSourceWrapper接口来支持供选择的嵌入式事务管理器，接口负责封装XAConnectionFactory和XADataSource bean，并将它们公开为常规的ConnectionFactory和DataSource bean，它们透明地注册到分布式事务中。数据源和JMS自动配置使用JTA变体，前提是你有一个JtaTransactionManager bean和在你的ApplicationContext中注册的适当的XA包装器bean。

BitronixXAConnectionFactoryWrapper和BitronixXADataSourceWrapper提供了如何编写XA包装器的好例子。

[1]: https://www.cnblogs.com/balfish/p/8658691.html '分布式事务，两阶段提交协议，三阶段提交协议'