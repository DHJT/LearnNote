# Elasticsearch
<!-- @author DHJT 2019-02-27 -->
基于Lucene的搜索服务器。它提供了一个分布式多用户能力的全文搜索引擎，基于RESTful web接口。

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

## ElasticSearch-head
是一款能连接ElasticSearch搜索引擎，并提供可视化的操作页面对ElasticSearch搜索引擎进行各种设置和数据检索功能的管理插件，如在head插件页面编写RESTful接口风格的请求，就可以对ElasticSearch中的数据进行增删改查、创建或者删除索引等操作。类似于使用navicat工具连接MySQL这种关系型数据库，对数据库做操作。