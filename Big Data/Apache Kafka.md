# `Apache Kafka`
<!-- @author DHJT 2018-11-23 -->
[Kafka](http://kafka.apache.org/)是一种高吞吐量的分布式发布订阅消息系统。Kafka建立在ZooKeeper同步服务之上
Apache Kafka 是一个分布式高吞吐量的流消息系统，Kafka 建立在 ZooKeeper 同步服务之上。它与 Apache Storm 和 Spark 完美集成，用于实时流数据分析，与其他消息传递系统相比，Kafka具有更好的吞吐量，内置分区，数据副本和高度容错功能，因此非常适合大型消息处理应用场景。

不支持严格的消息有序。仅仅保证在一个topic分区（队列）中是有序的。

- [kafka实战][kafka实战]
- `kafka_2.12-2.6.0.tgz`:
    + `2.12`: 代表着Kafka源代码的Scala编译器版本，Kafka服务器端代码完全由Scala语音编写
    + `2.6.0`: Kafka的版本号

### Kafka 特性
- 高并发： 支持数千个客户端同时读写。
- 可扩展性： kafka集群支持热扩展。
- 容错性： 允许集群中节点失败(若副本数量为n，则允许n-1个节点失败)。
- 持久性、可靠性： 消息被持久化到本地磁盘，并且支持数据备份防止数据丢失。
- 高吞吐量、低延迟： Kafka每秒可以处理几十万消息，延迟最低只有几毫秒，每个消息主题topic可以分多个区，消费者组(consumer group)对消息分区(partition)进行消费。

### 使用场景
- 日志收集： 可以用 kafka 收集各种服务的日志，通过kafka以统一接口服务的方式开放给各种消费者，如 Hadoop，Hbase，Solr 等。
- 消息系统： 解耦生产者和消费者、缓存消息等。
- 用户活动跟踪： Kafka 经常被用来记录web用户或者app用户的各种活动，如浏览网页，搜索，点击等活动，这些活动信息被各个服务器发布到 kafka 的 topic 中，然后订阅者通过订阅这些 topic 来做实时的监控分析，或者装载到 Hadoop、数据仓库中做离线分析和挖掘。
- 运营指标： Kafka也经常用来记录运营监控数据，包括收集各种分布式应用的数据，比如报警和报告等。
- 流式处理： 比如 Spark streaming 和 Storm。

### 使用场景
1. Building real-time streaming data pipelines that reliably get data between systems or applications.在系统或应用程序之间构建可靠的用于传输实时数据的管道，消息队列功能
2. Building real-time streaming applications that transform or react to the streams of data。构建实时的流数据处理程序来变换或处理数据流，数据处理功能

### 几个重要概念
- Producer：消息生产者。
- Broker：kafka集群中的服务器。
- Topic：消息的主题，可以理解为消息的分类，kafka的数据就保存在Topic。在每个broker上都可以创建多个Topic。
- Partition：Topic 的分区，每个 Topic 可以有多个分区，分区的作用是做负载，提高Kafka的吞吐量。
- Replication：每一个分区都有多个副本，副本的作用是做备胎。当主分区（Leader）故障的时候会选择一个备胎（Follower）上位，成为Leader。在kafka中默认副本的最大数量是10个，且副本的数量不能大于Broker的数量，follower和leader绝对是在不同的机器，同一机器对同一个分区也只可能存放一个副本（包括自己）。
- Consumer：消息消费者。
- Consumer Group：我们可以将多个消费组组成一个消费者组，在kafka的设计中同一个分区的数据只能被消费者组中的某一个消费者消费。同一个消费者组的消费者可以消费同一个topic的不同分区的数据，这也是为了提高kafka的吞吐量！
- Zookeeper：kafka集群依赖zookeeper来保存集群的的元信息，来保证系统的可用性。
    + ZooKeeper安装模式分为三种，分别为：单机模式（stand-alone）、集群模式和集群伪分布模式。

kafka将topic中的消息存在不同的partition中。如果存在键值（key），消息按照键值（key）做分类存在不同的partiition中，如果不存在键值（key），消息按照轮询（Round Robin）机制存在不同的partition中。默认情况下，键值（key）决定了一条消息会被存在哪个partition中。

### 什么情况会导致 kafka 运行变慢
- cpu 性能瓶颈
- 磁盘读写瓶颈
- 网络瓶颈

### 数据保留的策略
- 按照过期时间保留
- 按照存储的消息大小保留。

*kafka 执行数据清除工作，时间和大小不论那个满足条件，都会清空数据。*

### 使用 kafka 集群需要注意什么？
- 集群的数量不是越多越好，最好不要超过 7 个，因为节点越多，消息复制需要的时间就越长，整个群组的吞吐量就越低。
- 集群数量最好是单数，因为超过一半故障集群就不能用了，设置为单数容错率更高。

### 常见错误
- [kafka运行错误：找不到或者无法加载主类等错误解决方法][1]

### 运行
```sh
cd D:\ProgramFiles\kafka_2.12-2.1.1
# 启动zookeeper
bin/windows/zookeeper-server-start.bat config/zookeeper.properties
# 启动kafka
bin/windows/kafka-server-start.bat config/server.properties
# 创建一个topic mytopic
bin/windows/kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic mytopic
# 列出当前的所有topic
bin/windows/kafka-topics.bat --list --zookeeper localhost:2181
# 创建一个消息生产者
bin/windows/kafka-console-producer.bat --broker-list localhost:9092 --topic mytopic
# Step 5: Start a consumer
bin/windows/kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic mytopic --from-beginning
```

### 管理
```sh
## 创建主题（4个分区，2个副本）
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 2 --partitions 4 --topic test
```

### 查询
```sh
## 查询集群描述
bin/kafka-topics.sh --describe --zookeeper
## topic列表查询
bin/kafka-topics.sh --zookeeper 127.0.0.1:2181 --list
## topic列表查询（支持0.9版本+）
bin/kafka-topics.sh --list --bootstrap-server localhost:9092
## 新消费者列表查询（支持0.9版本+）
bin/kafka-consumer-groups.sh --new-consumer --bootstrap-server localhost:9092 --list
## 新消费者列表查询（支持0.10版本+）
bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list
## 显示某个消费组的消费详情（仅支持offset存储在zookeeper上的）
bin/kafka-run-class.sh kafka.tools.ConsumerOffsetChecker --zookeeper localhost:2181 --group test
## 显示某个消费组的消费详情（0.9版本 - 0.10.1.0 之前）
bin/kafka-consumer-groups.sh --new-consumer --bootstrap-server localhost:9092 --describe --group test-consumer-group
## 显示某个消费组的消费详情（0.10.1.0版本+）
bin/kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --group my-group
```

### 发送和消费
```sh
## 生产者
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test
## 消费者
bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic test
## 新生产者（支持0.9版本+）
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test --producer.config config/producer.properties
## 新消费者（支持0.9版本+）
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --new-consumer --from-beginning --consumer.config config/consumer.properties
## 高级点的用法
bin/kafka-simple-consumer-shell.sh --brist localhost:9092 --topic test --partition 0 --offset 1234  --max-messages 10
```

### kafka自带压测命令
```sh
bin/kafka-producer-perf-test.sh --topic test --num-records 100 --record-size 1 --throughput 100  --producer-props bootstrap.servers=localhost:9092
```

### Kafka Tool 2
- Kafka Tool 2是一款Kafka的可视化客户端工具，可以非常方便的查看Topic的队列信息以及消费者信息以及kafka节点信息。
- 下载地址：http://www.kafkatool.com/download.html
- [kafka可视化客户端工具（Kafka Tool）的基本使用](https://www.cnblogs.com/frankdeng/p/9452982.html)
    + 包含了kafka内容的查看：json内容查看等；

### 跨网络访问设置[^1][^2]
```
# Hostname and port the broker will advertise to producers and consumers. If not set, 
# it uses the value for "listeners" if configured.  Otherwise, it will use the value
# returned from java.net.InetAddress.getCanonicalHostName().
#advertised.listeners=PLAINTEXT://your.host.name:9092
```
KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://xxx.xxx.xxx.xxx：port （局域网宿主机的IP地址而非容器的IP，及暴露出来的端口）
advertised.listeners=PLAINTEXT://主机的域名:9092
kafka 0.9.x以后的版本新增了advertised.listeners配置
kafka 0.9.x以后的版本不要使用 advertised.host.name 和 advertised.host.port 已经deprecated


#### Error while fetching metadata with correlation id 34 : {other=LEADER_NOT_AVAILABLE}

[kafka实战]: https://www.cnblogs.com/hei12138/p/7805475.html 'kafka实战'
[kafka-0.10-demo]: https://gitee.com/wsmd/kafka-0.10-demo '王思密达/kafka-0.10-demo'
[命令行查看Kafka版本，快速docker安装Kafka版本命令](https://www.it610.com/article/1296353427802103808.htm)

[1]: https://blog.csdn.net/u010513487/article/details/79483860 'kafka运行错误：找不到或者无法加载主类等错误解决方法'
[2]: http://www.kafka.cc/ 'Kafka网站——趣谈kafka'
[3]: https://www.jianshu.com/c/0c9d83802b0c 'Spring-Kafka史上最强入门教程'

[^1]: [Kafka跨网络访问设置](https://www.cnblogs.com/cf532088799/p/7425021.html)
[^2]: [kafka listeners 和 advertised.listeners 的应用](https://segmentfault.com/a/1190000020715650?utm_source=tag-newest)