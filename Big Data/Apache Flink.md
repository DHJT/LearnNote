# Apache Flink
<!-- @author DHJT 2019-02-27 -->
一个分布式大数据处理引擎，可对_有限数据流_和_无限数据流_进行有状态计算。可部署在各种集群环境，对各种大小的数据规模进行快速计算。
Flink 集成了所有常见的集群资源管理器，例如`Hadoop YARN`、`Apache Mesos`和`Kubernetes`，但同时也可以作为独立集群运行。

目前开源大数据计算引擎有很多选择，
流计算： Storm,Samza,Flink,`Kafka Stream`等，
批处理： Spark,Hive,Pig,Flink等。
而同时支持流处理和批处理的计算引擎，只有两种选择：一个是`Apache Spark`，一个是`Apache Flink`。
基于流计算来模拟批计算，低延迟、高吞吐、统一的大数据计算引擎，提供了一个`Exactly-once`的一致性语义。

### 数据源和接收器
Flink提供现成的源和接收连接器，包括`Apache Kafka`、`Amazon Kinesis`、`HDFS`和`Apache Cassandra`等。
Flink程序可以作为集群内的分布式系统运行，也可以以独立模式或在`YARN`、`Mesos`、基于`Docker`的环境和其他资源管理框架下进行部署。

### 数据流的运行流程
Flink程序在执行后被映射到流数据流，每个Flink数据流以一个或多个源（数据输入，例如消息队列或文件系统）开始，并以一个或多个接收器（数据输出，如消息队列、文件系统或数据库等）结束。Flink可以对流执行任意数量的变换，这些流可以被编排为有向无环数据流图，允许应用程序分支和合并数据流。

### 使用
```sh

```
启动webui查看Flink状态
http://localhost:8081

### docker&docker-compose
```sh
docker pull flink
# run a local Flink cluster with one TaskManager and the Web UI exposed on port 8081, run:
docker run -t -p 8081:8081 flink local
# 进入容器，查看flink的版本
flink --version
```

[1]: https://flink.apache.org/zh/ 'Flink 中文文档'