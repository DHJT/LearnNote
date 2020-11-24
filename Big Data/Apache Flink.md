# Apache Flink
<!-- @author DHJT 2019-02-27 -->
一个分布式大数据处理引擎，可对_有限数据流_和_无限数据流_进行有状态计算。可部署在各种集群环境，对各种大小的数据规模进行快速计算。
Flink 集成了所有常见的集群资源管理器，例如`Hadoop YARN`、`Apache Mesos`和`Kubernetes`，但同时也可以作为独立集群运行。

目前开源大数据计算引擎有很多选择，
流计算如Storm,Samza,Flink,`Kafka Stream`等，
批处理如Spark,Hive,Pig,Flink等。
而同时支持流处理和批处理的计算引擎，只有两种选择：一个是`Apache Spark`，一个是`Apache Flink`。
基于流计算来模拟批计算，低延迟、高吞吐、统一的大数据计算引擎，提供了一个`Exactly-once`的一致性语义。

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