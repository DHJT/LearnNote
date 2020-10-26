# SpringBoot starter-data-mongodb
<!-- @author DHJT 2020-10-11  -->
MongoDB 是由C++语言编写的，是一个基于分布式文件存储的开源数据库系统。
在高负载的情况下，添加更多的节点，可以保证服务器性能。
MongoDB 旨在为WEB应用提供可扩展的高性能数据存储解决方案。
MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。
MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

## MongoDB 优缺点

### 优点
- 文档结构的存储方式，能够更便捷的获取数据
- 内置GridFS，支持大容量的存储
- 海量数据下，性能优越
- 动态查询
- 全索引支持,扩展到内部对象和内嵌数组
- 查询记录分析
- 快速,就地更新
- 高效存储二进制大对象 (比如照片和视频)
- 复制（复制集）和支持自动故障恢复
- 内置 Auto- Sharding 自动分片支持云级扩展性，分片简单
- MapReduce 支持复杂聚合
- 商业支持,培训和咨询

### 缺点
- 不支持事务操作
- MongoDB 占用空间过大 （不过这个确定对于目前快速下跌的硬盘价格来说，也不算什么缺点了）
- MongoDB没有如MySQL那样成熟的维护工具
- 无法进行关联表查询，不适用于关系多的数据
- 复杂聚合操作通过mapreduce创建，速度慢
- 模式自由,自由灵活的文件存储格式带来的数据错
- MongoDB 在你删除记录后不会在文件系统回收空间。除非你删掉数据库。但是空间没有被浪费

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```
在配置文件 application.properties 添加如下配置
```yaml
spring.data.mongodb.uri: mongodb://192.168.252.121:20000,192.168.252.122:20000,192.168.252.12:20000/demo
# 多个IP集群的配置：
spring.data.mongodb.uri: mongodb://user:secret@mongo1.example.com:12345,mongo2.example.com:23456/test

# 或者
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=lk
# 默认没有账号密码
#spring.data.mongodb.username=
#spring.data.mongodb.password=
```

spring-data-mongodb中的实体映射是通过MongoMappingConverter这个类实现的。它可以通过注释把java类转换为mongodb的文档。

### 它有以下几种注释：

- @Id - 文档的唯一标识，在mongodb中为ObjectId，它是唯一的，通过时间戳+机器标识+进程ID+自增计数器（确保同一秒内产生的Id不会冲突）构成。
- @Document - 把一个java类声明为mongodb的文档，可以通过collection参数指定这个类对应的文档。@Document(collection=“mongodb”) mongodb对应表
- @DBRef - 声明类似于关系数据库的关联关系。ps：暂不支持级联的保存功能，当你在本实例中修改了DERef对象里面的值时，单独保存本实例并不能保存DERef引用的对象，它要另外保存，如下面例子的Person和Account。
- @Indexed - 声明该字段需要索引，建索引可以大大的提高查询效率。
- @CompoundIndex - 复合索引的声明，建复合索引可以有效地提高多字段的查询效率。
- @GeoSpatialIndexed - 声明该字段为地理信息的索引。
- @Transient - 映射忽略的字段，该字段不会保存到mongodb。
- @PersistenceConstructor - 声明构造函数，作用是把从数据库取出的数据实例化为对象。该构造函数传入的值为从DBObject中取出的数据


Spring Data Mongo提供了一个`MongoTemplate`类似于Spring的设计的类JdbcTemplate。