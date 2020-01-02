# `Apache Kafka`
<!-- @author DHJT 2018-11-23 -->
[Kafka](http://kafka.apache.org/)是一种高吞吐量的分布式发布订阅消息系统。Kafka建立在ZooKeeper同步服务之上

- [kafka实战][kafka实战]

### 使用场景
1. Building real-time streaming data pipelines that reliably get data between systems or applications.在系统或应用程序之间构建可靠的用于传输实时数据的管道，消息队列功能
2. Building real-time streaming applications that transform or react to the streams of data。构建实时的流数据处理程序来变换或处理数据流，数据处理功能

ZooKeeper安装模式分为三种，分别为：单机模式（stand-alone）、集群模式和集群伪分布模式。

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
### 

Kafka Tool 2

Kafka Tool 2是一款Kafka的可视化客户端工具，可以非常方便的查看Topic的队列信息以及消费者信息以及kafka节点信息。直接丢下载地址：http://www.kafkatool.com/download.html



[kafka实战]: https://www.cnblogs.com/hei12138/p/7805475.html 'kafka实战'
[kafka-0.10-demo]: https://gitee.com/wsmd/kafka-0.10-demo '王思密达/kafka-0.10-demo'
[1]: https://blog.csdn.net/u010513487/article/details/79483860 'kafka运行错误：找不到或者无法加载主类等错误解决方法'
[2]: http://www.kafka.cc/ 'Kafka网站——趣谈kafka'
[3]: https://www.jianshu.com/c/0c9d83802b0c 'Spring-Kafka史上最强入门教程'