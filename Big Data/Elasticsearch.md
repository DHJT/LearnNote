# Elasticsearch
<!-- @author DHJT 2019-02-27 -->
基于Lucene的搜索服务器。它提供了一个分布式多用户能力的全文搜索引擎，基于RESTful web接口。

### 脑裂(split brain)
正常情况下，集群中的所有节点，应该对主节点的选择是一致的，即一个集群中只有一个选举出来的主节点。然而，在某些情况下，比如网络通信出现问题、主节点因为负载过大停止响应等等，就会导致重新选举主节点，此时可能会出现集群中有多个主节点的现象，即节点对集群状态的认知不一致，称之为脑裂现象。

### ZooKeeper 的 Quorums 机制对脑裂的防止

其实 master 选举问题由来以久。最早的比较完整的阐述称为 Paxos 算法。1990 年的一篇文章就对整个问题和算法进行了很完整的阐述。自文章问世以来，各个不同的工具都试图对这个问题进行一个实现。据我所知大都没有得到很广泛的应用。

ZooKeeper 是对结点管理的一个很强大的实现。 ZooKeeper 的选主过程使用的就是 paxos 算法。（ZooKeeper 的是数据复制使用的是 Zab (ZooKeeper atom broadcast) 算法，因为 paxos 无法保证多个写之间因果顺序，要实现的话只能串行执行，效率太低。）别的且不说，就脑裂这个问题，ZooKeeper 就提供了至少三种方式来认定整个集群是否可用，其中majority quorums 就是类似上面说的用结点个数限制的思想来实现的。即只有集群中超过半数节点投票才能选举出 master。这也是 ZooKeeper 的默认方式。还有两种一种是通过冗余通信，允许集群中采用多种通信方式来防止单一通信方式实效。另一种是通过共享资源，比如能看到共享资源就表示在集群中，反之则不是。
查看所有文档索引http://localhost:9200/_cat/indices/?v
### 使用
```sh
cd D:\ProgramFiles\elasticsearch-6.6.1
./bin/elasticsearch -d
```

默认情况下，Elastic 只允许本机访问，如果需要远程访问，可以修改 Elastic 安装目录的config/elasticsearch.yml文件，去掉network.host的注释，将它的值改成0.0.0.0，然后重新启动 Elastic。
线上服务不要这样设置，要设成具体的 IP。
本质上是一个分布式数据库，允许多台服务器协同工作，每台服务器可以运行多个 Elastic 实例。
单个 Elastic 实例称为一个节点（node）。一组节点构成一个集群（cluster）。

### 操作
`ES`以`RESTFul`风格来命名API的, 其`API`的基本格式类似如下：
> http://<ip>:<port>/<索引>/<类型>/<文档id>
以http来决定请求的方法或者动作: 常用的有`GET/PUT/POST/DELETE`

### jar包下载
```xml
<dependency>
  <groupId>org.elasticsearch.plugin</groupId>
  <artifactId>x-pack-sql-jdbc</artifactId>
  <version>7.6.1</version>
</dependency>
```
from `artifacts.elastic.co/maven` by adding it to the repositories list:
```xml
<repositories>
  <repository>
    <id>elastic.co</id>
    <url>https://artifacts.elastic.co/maven</url>
  </repository>
</repositories>
```

### elasticsearch max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
> ERROR: bootstrap checks failed max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]

#### 解决办法：
```sh
#修改配置`sysctl.conf`
sudo vi /etc/sysctl.conf
#添加下面配置：
vm.max_map_count=655360
# 并执行命令：
sysctl -p
```
然后，重新启动elasticsearch，即可启动成功。
*Windows下WSL2 Docker中可以使用shell配置使用的linux核心进行配置，实测有效*

### elasticsearch-head[^1]
是一款能连接ElasticSearch搜索引擎，并提供可视化的操作页面对ElasticSearch搜索引擎进行各种设置和数据检索功能的管理插件，如在head插件页面编写RESTful接口风格的请求，就可以对ElasticSearch中的数据进行增删改查、创建或者删除索引等操作。类似于使用navicat工具连接MySQL这种关系型数据库，对数据库做操作。
```sh
docker run -itd --name elasticsearch-head -p 9100:9100 --restart=always -e TZ="Asia/Shanghai" bolingcavalry/elasticsearch-head:6
# 修改启动时的默认es连接地址
vi /usr/src/app/elasticsearch-head-master/_site/app.js
# 将其中的localhost修改为自己的ip地址
 this.base_uri = this.config.base_uri || this.prefs.get("app-base_uri") || "http://localhost:9200";
 ↓
 this.base_uri = this.config.base_uri || this.prefs.get("app-base_uri") || "http://master:9200";
```


```sh
curl -H "Content-Type: application/json" -XGET http://19.18.89.23:9200/tbl_node/_search?pretty -d '{"query":{"range":{"scoreTime.keyword":{"gt":"2020-01-23 22:44:10","lt":"2020-01-23 23:44:10"}}}}'
# 索引重命名
# POST localhost:9200/_reindex
{
  "source": {
    "index": "indexName"
  },
  "dest": {
    "index": "newIndexName"
  }
}
# 查询复制索引到新的索引名称
POST localhost:9200/_reindex
{
  "source": {
    "index": "indexName",
    "type": "typeName",
    "query": {
      "term": {
        "name": "shao"
      }
    }
  },
  "dest": {
    "index": "newIndexName"
  }
}
# 查询ES版本信息
curl -XGET localhost:9200
```

## 问题

### SQL 错误: current license is non-compliant for [jdbc] current license is non
[current license is non-compliant for [jdbc]](https://blog.csdn.net/ctypyb2002/article/details/106115691)
http://localhost:9200/_license

[^1]: [elasticsearch-head 配置](https://www.cnblogs.com/nulijiushimeili/p/13866524.html)
