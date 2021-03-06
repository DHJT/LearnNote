# JTA
<!-- @author DHJT 2019-09-04 -->

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

## 基于XA协议的两阶段提交
XA是一个分布式事务协议，由提出。XA中大致分为两部分：事务管理器和本地资源管理器。其中本地资源管理器往往由数据库实现，比如Oracle、DB2这些商业数据库都实现了XA接口，而事务管理器作为全局的调度者，负责各个本地资源的提交和回滚。XA实现分布式事务的原理如下：
总的来说，XA协议比较简单，而且一旦商业数据库实现了XA协议，使用分布式事务的成本也比较低。但是，XA也有致命的缺点，那就是性能不理想，特别是在交易下单链路，往往并发量很高，XA无法满足高并发场景。XA目前在商业数据库支持的比较理想，在mysql数据库中支持的不太理想，mysql的XA实现，没有记录prepare阶段日志，主备切换回导致主库与备库数据不一致。许多nosql也没有支持XA，这让XA的应用场景变得非常狭隘。

消息事务+最终一致性
所谓的消息事务就是基于消息中间件的两阶段提交，本质上是对消息中间件的一种特殊利用，它是将本地事务和发消息放在了一个分布式事务里，保证要么本地操作成功成功并且对外发消息成功，要么两者都失败，开源的RocketMQ就支持这一特性.

该方案采用最终一致的，牺牲了一致性，换来了性能的大幅度提升。存在造成数据不一致的风险

## TCC编程模式
所谓的TCC编程模式，也是两阶段提交的一个变种。TCC提供了一个编程框架，将整个业务逻辑分为三块：Try、Confirm和Cancel三个操作。以在线下单为例，Try阶段会去扣库存，Confirm阶段则是去更新订单状态，如果更新订单失败，则进入Cancel阶段，会去恢复库存。总之，TCC就是通过代码人为实现了两阶段提交，不同的业务场景所写的代码都不一样，复杂度也不一样，因此，这种模式并不能很好地被复用。

具体实现
#### LCN
https://github.com/codingapi/tx-lcn

LCN分布式事务框架的核心功能是对本地事务的协调控制，框架本身并不创建事务，只是对本地事务做协调控制。因此该框架与其他第三方的框架兼容性强，支持所有的关系型数据库事务，支持多数据源，支持与第三方数据库框架一块使用（例如 sharding-jdbc），在使用框架的时候只需要添加分布式事务的注解即可，对业务的侵入性低。LCN框架主要是为微服务框架提供分布式事务的支持，在微服务框架上做了进一步的事务机制优化，在一些负载场景上LCN事务机制要比本地事务机制的性能更好，4.0以后框架开方了插件机制可以让更多的第三方框架支持进来

主要特点：

支持各种基于spring的db框架
兼容SpringCloud、Dubbo、motan
使用简单，低依赖，代码完全开源
基于切面的强一致性事务框架
高可用，模块可以依赖RPC模块做集群化，TxManager也可以做集群化
支持本地事务和分布式事务共存
支持事务补偿机制，增加事务补偿决策提醒
采用强一致性方案，事务要不全部成功，要不全部失败，保证了事务的一致性，代码简单，原有项目只需引入相关 jar 包，并在需要参与的事务的方法添加注解即可，节省了代码改造成本.

Spring Cloud示例：

添加依赖
```xml
<properties>
   <lcn.last.version>4.1.0</lcn.last.version>
</properties>

<dependency>
    <groupId>com.codingapi</groupId>
    <artifactId>transaction-springcloud</artifactId>
    <version>${lcn.last.version}</version>
</dependency>

<dependency>
   <groupId>com.codingapi</groupId>
   <artifactId>tx-plugins-db</artifactId>
   <version>${lcn.last.version}</version>
</dependency>
```
在需要执行的事务上添加注解
```java
@Override
@TxTransaction(isStart = true)
@Transactional
public int save() {
}
```
其中 @TxTransaction(isStart = true) 为lcn 事务控制注解，其中isStart = true 表示该方法是事务的发起方例如，服务A 需要调用服务B,服务B 需要调用服务C，此时 服务A为服务发起方，其余为参与方，参与方只需@TxTransaction 即可

在测试时需要将 事务管理服务启动 txManager, 具体示例参看：https://www.txlcn.org

#### ByteTCC
https://github.com/liuyangming/ByteTCC

ByteTCC是一个基于TCC（Try/Confirm/Cancel）机制的分布式事务管理器。兼容JTA，可以很好的与EJB、Spring等容器（本文档下文说明中将以Spring容器为例）进行集成。

ByteTCC特性
1、支持Spring容器的声明式事务管理；
2、支持普通事务、TCC事务、业务补偿型事务等事务机制；
3、支持多数据源、跨应用、跨服务器等分布式事务场景；
4、支持长事务；
5、支持dubbo服务框架；
6、支持spring cloud；

该实现方式，需要在业务层编写对应的 tcc（Try/Confirm/Cancel） 方法，开发需要一定的成本，同时某些业务可能无法保证数据可回滚

查看示例：https://github.com/liuyangming/ByteTCC

参考：

https://github.com/codingapi/tx-lcn
https://github.com/liuyangming/ByteTCC

[1]: https://www.cnblogs.com/balfish/p/8658691.html '分布式事务，两阶段提交协议，三阶段提交协议'
[2]: https://www.jianshu.com/p/cf8e01afd710 'JTA事务管理器-Atomikos 还是 Bitronix?（译）'