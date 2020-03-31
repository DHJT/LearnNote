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
