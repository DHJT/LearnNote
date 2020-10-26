# Service Mesh（服务网格）
<!-- @author DHJT 2020-02-24 -->
服务网格是一个用于处理服务间通信的基础设施层，它负责为构建复杂的云原生应用传递可靠的网络请求。在实践中，服务网格通常实现为一组和应用程序部署在一起的轻量级的网络代理，但对应用程序来说是透明的。

2017 年底，非侵入式的 Service Mesh 技术从萌芽到走向了成熟。

### Service Mesh的特点
- 应用程序间通讯的中间层
- 轻量级网络代理
- 应用程序无感知
- 解耦应用程序的重试/超时、监控、追踪和服务发现

Linkerd（https://github.com/linkerd/linkerd）：第一代 Service Mesh，2016 年 1 月 15 日首发布，业界第一个 Service Mesh 项目，由 Buoyant 创业小公司开发（前 Twitter 工程师），2017 年 7 月 11 日，宣布和 Istio 集成，成为 Istio 的数据面板。
Envoy（https://github.com/envoyproxy/envoy）：第一代 Service Mesh，2016 年 9 月 13 日首发布，由 Matt Klein 个人开发（Lyft 工程师），之后默默发展，版本较稳定。
Istio（https://github.com/istio/istio）：第二代 Service Mesh，2017 年 5 月 24 日首发布，由 Google、IBM 和 Lyft 联合开发，只支持 Kubernetes 平台，2017 年 11 月 30 日发布 0.3 版本，开始支持非 Kubernetes 平台，之后稳定的开发和发布。
Conduit（https://github.com/runconduit/conduit）：第二代 Service Mesh，2017 年 12 月 5 日首发布，由 Buoyant 公司开发（借鉴 Istio 整体架构，部分进行了优化），对抗 Istio 压力山大，也期待 Buoyant 公司的毅力。
nginMesh（https://github.com/nginmesh/nginmesh）：2017 年 9 月首发布，由 Nginx 开发，定位是作为 Istio 的服务代理，也就是替代 Envoy，思路跟 Linkerd 之前和 Istio 集成很相似，极度低调，GitHub 上的 star 也只有不到 100。
Kong（https://github.com/Kong/kong）：比 nginMesh 更加低调，默默发展中。

## serviceMesh开源工具对比

|     Feature      |                                                 Istio                                                 |                              Linkerd                              |            Conduit             |
|------------------|-------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|--------------------------------|
| 功能支持         | 负载均衡，服务TLS认证，服务调用监控，熔断，动态请求路由，服务发现，服务间流量管理，服务间访问策略管理 | 负载均衡，服务TLS认证，服务调用监控，熔断，动态请求路由，服务发现 | 官方文档暂未列出，发展还不完善 |
| 第三方插件集成   | 分布式调用链跟踪Zipkin、监控套件Prometheus与Grafana、日志套件EFK、服务图展示ServiceGraph              | 分布式调用链跟踪Zipkin、监控套件Prometheus,InfluxDB,StatsD        | 监控套件Prometheus             |
| 部署架构         | Envoy/Sidecar                                                                                         | DaemonSets                                                        | sidecar                        |
| 易用性           | 复杂                                                                                                  | 简单                                                              | 适中                           |
| 支持平台         | kuberentes                                                                                            | kubernetes/mesos/Istio/local                                      | kuberentes                     |
| 当前版本         | 0.7                                                                                                   | 1.3.7                                                             | 0.3                            |
| 是否已有生产部署 | 否                                                                                                    | 是                                                                | 否                             |
| 评分             | ★★★★☆                                                                                                 | ★★☆☆☆                                                             | ★★☆☆☆                          |

