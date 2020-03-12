# kubernetes
<!-- @author DHJT 2019-12-04 -->
开源的，用于管理云平台中多个主机上的容器化的应用，Kubernetes的目标是让部署容器化的应用简单并且高效（powerful）,Kubernetes提供了应用部署，规划，更新，维护的一种机制。
Google开源的一个容器编排引擎，它支持自动化部署、大规模可伸缩、应用容器化管理。在生产环境中部署一个应用程序时，通常要部署该应用的多个实例以便对应用请求进行负载均衡。

https://kubernetes.io/
https://github.com/kubernetes/kubernetes
[kubernetes中文社区](https://www.kubernetes.org.cn/)

Helm, 在Kubernetes中部署应用的利器https://helm.sh/

## 基础
- 学习 Kubernetes 基础知识[^1]

### 特点
- 可移植: 支持公有云，私有云，混合云，多重云（multi-cloud）
- 可扩展: 模块化，插件化，可挂载，可组合
- 自动化: 自动部署，自动重启，自动复制，自动伸缩/扩展

## Kubernetes 组件
- 1Master 组件
    + 1.1 kube-apiserver
    + 1.2 ETCD
    + 1.3 kube-controller-manager
    + 1.4 cloud-controller-manager
    + 1.5 kube-scheduler
    + 1.6 插件 addons
        * 1.6.1 DNS
        * 1.6.2 用户界面
        * 1.6.3 容器资源监测
        * 1.6.4 Cluster-level Logging
- 2节点（Node）组件
    + 2.1 kubelet
    + 2.2 kube-proxy
    + 2.3 docker
    + 2.4 RKT
    + 2.5 supervisord
    + 2.6 fluentd


[1]: https://www.awaimai.com/2804.html 'Kubernetes(k8s)完整安装教程'

[^1]: [学习 Kubernetes 基础知识](https://kubernetes.io/zh/docs/tutorials/kubernetes-basics/)