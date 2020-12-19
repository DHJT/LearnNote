# Kafka Streams
<!-- @author DHJT 2020-12-10 -->

`Kafka Streams`是`Apache Kafka`从`0.10`版本引入的一个新`Feature`。它是提供了对存储于`Kafka`内的数据进行流式处理和分析的功能。

## `Kafka Streams`的特点
- `Kafka Streams`提供了一个非常简单而轻量的`Library`，它可以非常方便地嵌入任意`Java`应用中，也可以任意方式打包和部署
- 除了`Kafka`外，无任何外部依赖
- 充分利用`Kafka`分区机制实现水平扩展和顺序性保证
- 通过可容错的`state store`实现高效的状态操作（如`windowed join`和`aggregation`）
- 支持正好一次处理语义
- 提供记录级的处理能力，从而实现毫秒级的低延迟
- 支持基于事件时间的窗口操作，并且可处理晚到的数据（late arrival of records）
- 同时提供底层的处理原语`Processor`（类似于`Storm`的`spout`和`bolt`），以及高层抽象的`DSL`（类似于`Spark`的`map/group/reduce`）

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
  <dependency>
    <groupId>org.apache.kafka</groupId>
    <artifactId>kafka-streams</artifactId>
    <version>2.3.0</version>
  </dependency>
  <!-- 除了kafka-streams依赖之外，我们还必须添加kafka-clients依赖。如果不添加最后一个依赖项，则在创建时会遇到以下错误KStream：
java.lang.NoSuchMethodError: org.apache.kafka.clients.admin.AdminClientConfig -->
  <dependency>
    <groupId>org.apache.kafka</groupId>
    <artifactId>kafka-clients</artifactId>
    <version>2.3.0</version>
  </dependency>
</dependencies>
```

```java
Properties props = new Properties();
props.put(StreamsConfig.APPLICATION_ID_CONFIG, "processor1");
props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());

final StreamsBuilder builder = new StreamsBuilder();
//魔术关键行
builder.stream("my-kafka-streams-topic").filter((key, value) -> ((String) value).endsWith("#latin")).to("my-kafka-streams-out1");

final Topology topology = builder.build();
KafkaStreams streams1 = new KafkaStreams(topology, props);
streams1.start();
```

[1]: https://blog.csdn.net/BeiisBei/article/details/104627950 '【Kafka】（十五）流式计算 Kafka Streams 架构深入'
