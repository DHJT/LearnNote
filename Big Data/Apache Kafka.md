# `Apache Kafka`
<!-- @author DHJT 2018-11-23 -->
[Kafka](http://kafka.apache.org/)是一种高吞吐量的分布式发布订阅消息系统。Kafka建立在ZooKeeper同步服务之上
Apache Kafka 是一个分布式高吞吐量的流消息系统，Kafka 建立在 ZooKeeper 同步服务之上。它与 Apache Storm 和 Spark 完美集成，用于实时流数据分析，与其他消息传递系统相比，Kafka具有更好的吞吐量，内置分区，数据副本和高度容错功能，因此非常适合大型消息处理应用场景。

- [kafka实战][kafka实战]

### Kafka 特性
- 高并发： 支持数千个客户端同时读写。
- 可扩展性： kafka集群支持热扩展。
- 容错性： 允许集群中节点失败(若副本数量为n，则允许n-1个节点失败)。
- 持久性、可靠性： 消息被持久化到本地磁盘，并且支持数据备份防止数据丢失。
- 高吞吐量、低延迟： Kafka每秒可以处理几十万消息，延迟最低只有几毫秒，每个消息主题topic可以分多个区，消费者组(consumer group)对消息分区(partition)进行消费。

### 使用场景
- 日志收集： 可以用 kafka 收集各种服务的日志，通过kafka以统一接口服务的方式开放给各种消费者，如 hadoop，Hbase，Solr 等。
- 消息系统： 解耦生产者和消费者、缓存消息等。
- 用户活动跟踪： Kafka 经常被用来记录web用户或者app用户的各种活动，如浏览网页，搜索，点击等活动，这些活动信息被各个服务器发布到 kafka 的 topic 中，然后订阅者通过订阅这些 topic 来做实时的监控分析，或者装载到 hadoop、数据仓库中做离线分析和挖掘。
- 运营指标： Kafka也经常用来记录运营监控数据，包括收集各种分布式应用的数据，比如报警和报告等。
- 流式处理： 比如 spark streaming 和 storm。

### 使用场景
1. Building real-time streaming data pipelines that reliably get data between systems or applications.在系统或应用程序之间构建可靠的用于传输实时数据的管道，消息队列功能
2. Building real-time streaming applications that transform or react to the streams of data。构建实时的流数据处理程序来变换或处理数据流，数据处理功能

### 
- Producer：消息生产者。
- Broker：kafka集群中的服务器。
- Topic：消息的主题，可以理解为消息的分类，kafka的数据就保存在topic。在每个broker上都可以创建多个topic。
- Partition：Topic的分区，每个topic可以有多个分区，分区的作用是做负载，提高kafka的吞吐量。
- Replication：每一个分区都有多个副本，副本的作用是做备胎。当主分区（Leader）故障的时候会选择一个备胎（Follower）上位，成为Leader。在kafka中默认副本的最大数量是10个，且副本的数量不能大于Broker的数量，follower和leader绝对是在不同的机器，同一机器对同一个分区也只可能存放一个副本（包括自己）。
- Consumer：消息消费者。
- Consumer Group：我们可以将多个消费组组成一个消费者组，在kafka的设计中同一个分区的数据只能被消费者组中的某一个消费者消费。同一个消费者组的消费者可以消费同一个topic的不同分区的数据，这也是为了提高kafka的吞吐量！
- Zookeeper：kafka集群依赖zookeeper来保存集群的的元信息，来保证系统的可用性。
    + ZooKeeper安装模式分为三种，分别为：单机模式（stand-alone）、集群模式和集群伪分布模式。

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

### 创建第一个消息
创建一个topic
创建一个消息消费者
创建一个消息生产者

### Kafka Tool 2
- Kafka Tool 2是一款Kafka的可视化客户端工具，可以非常方便的查看Topic的队列信息以及消费者信息以及kafka节点信息。
- 直接丢下载地址：http://www.kafkatool.com/download.html



[kafka实战]: https://www.cnblogs.com/hei12138/p/7805475.html 'kafka实战'
[kafka-0.10-demo]: https://gitee.com/wsmd/kafka-0.10-demo '王思密达/kafka-0.10-demo'
[1]: https://blog.csdn.net/u010513487/article/details/79483860 'kafka运行错误：找不到或者无法加载主类等错误解决方法'
[2]: http://www.kafka.cc/ 'Kafka网站——趣谈kafka'
[3]: https://www.jianshu.com/c/0c9d83802b0c 'Spring-Kafka史上最强入门教程'