# Software Architect
<!-- @author DHJT 2018-12-17 -->
首席架构师:`Chief Software Architect`

### 基础
Tomcat集群，Redis共享SESSION处理客户端会话。
LVS+Keepalived
VARNISH
数据库读写分离
Solr、Elasticsearch
MyCat、读库水平拆表，写库垂直拆分
分布式文件系统MongileFS、FastDFS
消息中间件

## Microservice
微服务英文名称，Microservice架构模式就是将整个Web应用组织为一系列小的Web服务。这些小的Web服务可以独立地编译及部署，并通过各自暴露的API接口相互通讯。它们彼此相互协作，作为一个整体为用户提供功能，却可以独立地进行扩。

### 微服务架构需要的功能或使用场景
1. 我们把整个系统根据业务拆分成几个子系统。
2. 每个子系统可以部署多个应用，多个应用之间使用负载均衡。
3. 需要一个服务注册中心，所有的服务都在注册中心注册，负载均衡也是通过在注册中心注册的服务来使用一定策略来实现。
4. 所有的客户端都通过同一个网关地址访问后台的服务，通过路由配置，网关来判断一个URL请求由哪个服务处理。请求转发到服务上的时候也使负载均衡。
5. 服务之间有时候也需要相互访问。例如有一个用户模块，其他服务在处理一些业务的时候，要获取用户服务的用户数据。
6. 需要一个断路器，及时处理服务调用时的超时和错误，防止由于其中一个服务的问题而导致整体系统的瘫痪。
7. 还需要一个监控功能，监控每个服务调用花费的时间等。

- 目前主流的微服务框架：Dubbo、SpringCloud、thrift、Hessian等，目前国内的中小企业用的大多数都是Dubbo，SpringCloud估计很少，也许有些开发同学都没听说过。
- SpringBoot:旨在简化创建产品级的Spring应用和服务，简化了配置文件，使用嵌入式web服务器，含有诸多开箱即用微服务功能，可以和spring cloud联合部署。
- SpringCloud：微服务工具包，为开发者提供了在分布式系统的配置管理、服务发现、断路器、智能路由、微代理、控制总线等开发工具包。

## 服务网格（Service Mesh）

### Service Mesh的特点
- 应用程序间通讯的中间层
- 轻量级网络代理
- 应用程序无感知
- 解耦应用程序的重试/超时、监控、追踪和服务发现

## Servletless

## DDD


[^1]: [什么是微服务](https://blog.csdn.net/wuxiaobingandbob/article/details/78642020?locationNum=1&fps=1)
[^2]: [微服务（Microservices）和服务网格（Service Mesh）架构概念整理](https://www.cnblogs.com/xishuai/p/microservices-and-service-mesh.html)