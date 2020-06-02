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
017 年底，非侵入式的 Service Mesh 技术从萌芽到走向了成熟。
Service Mesh 又译作“服务网格”，作为服务间通信的基础设施层。

### Service Mesh的特点
- 应用程序间通讯的中间层
- 轻量级网络代理
- 应用程序无感知
- 解耦应用程序的重试/超时、监控、追踪和服务发现

Linkerd（https://github.com/linkerd/linkerd）：第一代 Service Mesh，2016 年 1 月 15 日首发布，业界第一个 Service Mesh 项目，由 Buoyant 创业小公司开发（前 Twitter 工程师），2017 年 7 月 11 日，宣布和 Istio 集成，成为 Istio 的数据面板。
Envoy（https://github.com/envoyproxy/envoy）：第一代 Service Mesh，2016 年 9 月 13 日首发布，由 Matt Klein 个人开发（Lyft 工程师），之后默默发展，版本较稳定。
Istio（https://github.com/istio/istio）：第二代 Service Mesh，2017 年 5 月 24 日首发布，由 Google、IBM 和 Lyft 联合开发，只支持 Kubernetes 平台，2017 年 11 月 30 日发布 0.3 版本，开始支持非 Kubernetes 平台，之后稳定的开发和发布。
Conduit（https://github.com/runconduit/conduit）：第二代 Service Mesh，2017 年 12 月 5 日首发布，由 Buoyant 公司开发（借鉴 Istio 整体架构，部分进行了优化），对抗 Istio 压力山大，也期待 Buoyant 公司的毅力。
nginMesh（https://github.com/nginmesh/nginmesh）：2017 年 9 月首发布，由 Nginx 开发，定位是作为 Istio 的服务代理，也就是替代 Envoy，思路跟 Linkerd 之前和 Istio 集成很相似，极度低调，GitHub 上的 star 也只有不到 100。
Kong（https://github.com/Kong/kong）：比 nginMesh 更加低调，默默发展中。

## Servletless

## DDD


[^1]: [什么是微服务](https://blog.csdn.net/wuxiaobingandbob/article/details/78642020?locationNum=1&fps=1)
[^2]: [微服务（Microservices）和服务网格（Service Mesh）架构概念整理](https://www.cnblogs.com/xishuai/p/microservices-and-service-mesh.html)