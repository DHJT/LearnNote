# k3s
<!-- @author DHJT 2020-01-03 -->

史上最轻量级Kubernetes
k3s是一个经过认证的Kubernetes发行版。 专为无人值守、资源受限、偏远地区或物联网设备内部的生产工作负载而设计。

- 移除过时的功能、Alpha功能、非默认功能，这些功能在大多数Kubernetes集群中已不可用。
- 删除内置插件(比如云供应商插件和存储插件)，可用外部插件程序替换。
- 添加SQLite3作为默认的数据存储。etcd3仍然可用，但并非默认项。
- 包含在一个简单的启动程序当中，可以处理复杂的TLS和其他选项。


### 四大使用场景
- Edge
- IoT
- CI
- ARM

- 删除
    + 过时的功能和非默认功能
    + Alpha功能
    + 内置的云提供商插件
    + 内置的存储驱动
    + Docker (可选)
- 新增
    + 简化安装
    + 除etcd外，还支持SQLite3数据存储
    + TLS管理
    + 自动的Manifest和Helm Chart管理
    + containerd, CoreDNS, Flannel


