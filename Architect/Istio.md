# Istio
<!-- @author DHJT 2020-05-26 -->

是一个开源的服务网格产品，其实现和其它同类产品大同小异，由控制平面和数据平面组成。数据平面由反向代理 服务器 组成，这些反向代理和各个应用实例伴行，并替代应用行使通信职责。控制平面在请求路径之外，用于对数据平面的行为进行管控。

控制平面分为几个组成部分，其职责如下：

- Pilot ：核心的数据平面配置（xDS）服务器。
- Galley ：配置监听、验证和转发。
- Injector ：负责数据平面的注册和初始化。
- Citadel ：证书签发、Secret 生成、CA 集成等。
- Telemetry ： Mixer 组件之一，负责聚合监控信息到多种后端。
- Policy ： Mixer 组件之二，在请求路径之中负责实现策略支持。

运维人员通过一组配置指令来借由这些部件为数据平面提供服务并对其进行控制。

### Istiod
We are dramatically simplifying the experience of installing, running, and upgrading Istio by “embracing the monolith” and consolidating our control plane into a single new binary - Istiod. Operators’ lives will get much easier with fewer moving parts which are easier to debug and understand. For mesh users, Istiod doesn’t change any of their experience: all APIs and runtime characteristics are consistent with the previous components.

Keep your eyes out for a blog post in the coming days devoted to Istiod, and the benefits of moving to a simpler deployment model.


[istio's releases](https://istio.io/news/releases)