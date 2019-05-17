# Algorithm
<!-- @author DHJT 2019-05-17 -->
### 一致性哈希算法（Consistent Hashing）[1]

在设计分布式缓存系统时，如果某台服务器失效，对于整个系统来说如果不采用合适的算法来保证一致性，那么缓存于系统中的所有数据都可能会失效（即由于系统节点数目变少，客户端在请求某一对象时需要重新计算其hash值（通常与系统中的节点数目有关），由于hash值已经改变，所以很可能找不到保存该对象的服务器节点）
- 平衡性(Balance)
- 单调性(Monotonicity)
- 分散性(Spread)
- 负载(Load)
- 平滑性(Smoothness)

[1]: https://www.cnblogs.com/lpfuture/p/5796398.html '一致性哈希算法原理'