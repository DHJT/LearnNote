# microservice
<!-- @author DHJT 2019-01-29 -->

## 什么样的项目适合微服务
微服务可以按照业务功能本身的独立性来划分，如果系统提供的业务是非常底层的，如：操作系统内核、存储系统、网络系统、数据库系统等等，这类系统都偏底层，功能和功能之间有着紧密的配合关系，如果强制拆分为较小的服务单元，会让集成工作量急剧上升，并且这种人为的切割无法带来业务上的真正的隔离，所以无法做到独立部署和运行，也就不适合做成微服务了。

能不能做成微服务，取决于四个要素：

- 小：微服务体积小，2 pizza 团队。
- 独：能够独立的部署和运行。
- 轻：使用轻量级的通信机制和架构。
- 松：为服务之间是松耦合的。


Nacos 致力于帮助您发现、配置和管理微服务

Spring Cloud：http://projects.spring.io/spring-cloud（现在非常流行的微服务架构）
Dubbo：http：//dubbo.io
Dropwizard：http://www.dropwizard.io （关注单个微服务的开发）
Consul、etcd&etc.（微服务的模块）

服务链路追踪:`Spring Cloud Sleuth`(Zipkin/PinPoint)
- 链路追踪组件有Google的`Dapper`，Twitter 的`Zipkin`，以及阿里的`Eagleeye`（鹰眼）Skywalking
- APM（ApplicationPerformance Management）

|       模块       |                          组件                         |
|------------------|-------------------------------------------------------|
| 配置中心         | Apollo、`SpringCloud Config`                          |
| 网关             | Eureka、`SpringCloud Getaway`/Consul,ZK               |
| 服务链路追踪     | `Spring Cloud Sleuth`(Zipkin/PinPoint)                |
| 客户端软负载均衡 | `Ribbon`、`spring-cloud-loadbalancer`                 |
| 熔断器           | Hystrix、spring-cloud-r4j(Resilience4J)，阿里Sentinel |


配置管理
服务注册与发现
断路器
智能路由
服务间调用
负载均衡
微代理控制
总线
一次性令牌
全局锁
领导选举
分布式会话
集群状态
分布式消息
...

### 微服务架构的六种模式[^1]
1. 聚合器微服务设计模式
2. 代理微服务设计模式
3. 链式微服务设计模式
4. 分支微服务设计模式
5. 数据共享微服务设计模式
6. 异步消息传递微服务设计模式
[^1]: [微服务架构的六种模式](https://cloud.tencent.com/developer/article/1458881)