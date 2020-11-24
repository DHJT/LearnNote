# Spring-Kafka
<!-- @author DHJT 2020-02-12 -->
## Features
- KafkaTemplate
- KafkaMessageListenerContainer
- @KafkaListener
- KafkaTransactionManager
- spring-kafka-test jar with embedded kafka server

## Kafka Client Compatibility
| Spring for Apache Kafka Version | Spring Integration for Apache Kafka Version |    kafka-clients    |
|---------------------------------|---------------------------------------------|---------------------|
| 2.4.x                           | 3.3.x                                       | 2.4.0               |
| 2.3.x                           | 3.2.x                                       | 2.3.1               |
| 2.2.x                           | 3.1.x                                       | 2.0.1, 2.1.x, 2.2.x |
| 1.3.x                           | 2.3.x                                       | 0.11.0.x, 1.0.x     |


1、Use this for processing individual ConsumerRecord s received from the kafka consumer poll() operation when using auto-commit, or one of the container-managed commit methods.
使用MessageListener接口实现时，当消费者拉取消息之后，消费完成会自动提交offset，即enable.auto.commit为true时，适合使用此接口
2、Use this for processing individual ConsumerRecord s received from the kafka consumer poll() operation when using one of the manual commit methods.
使用AcknowledgeMessageListener时，当消费者消费一条消息之后，不会自动提交offset，需要手动ack，即enable.auto.commit为false时，适合使用此接口
3、Use this for processing all ConsumerRecord s received from the kafka consumer poll() operation when using auto-commit, or one of the container-managed commit methods. AckMode.RECORD is not supported when using this interface since the listener is given the complete batch.

4、Use this for processing all ConsumerRecord s received from the kafka consumer poll() operation when using one of the manual commit methods.

BatchMessageListener和BatchAcknowledgingMessageListener接口作用与上述两个接口大体类似，只是适合批量消费消息决定是否自动提交offset

由于业务较重，且offset自动提交时，出现消费异常或者消费失败的情况，消费者容易丢失消息，所以需要采用手动提交offset的方式，因此实现AcknowledgeMessageListener接口。


### 事务

#### 配置Kafka事务管理器并使用@Transactional注解
```java
    @Bean
    public ProducerFactory<Integer, String> producerFactory() {
        DefaultKafkaProducerFactory factory = new DefaultKafkaProducerFactory<>(senderProps());
        factory.transactionCapable();
        factory.setTransactionIdPrefix("tran-");
        return factory;
    }

    @Bean
    public KafkaTransactionManager transactionManager(ProducerFactory producerFactory) {
        KafkaTransactionManager manager = new KafkaTransactionManager(producerFactory);
        return manager;
    }

    @Test
    @Transactional
    public void testTransactionalAnnotation() throws InterruptedException {
        kafkaTemplate.send("topic.quick.tran", "test transactional annotation");
        throw new RuntimeException("fail");
    }
```

#### 使用KafkaTemplate.executeInTransaction开启事务
不需要配置事务管理器的，也可以称为本地事务。
```java
kafkaTemplate.executeInTransaction(new KafkaOperations.OperationsCallback() {
    @Override
    public Object doInOperations(KafkaOperations kafkaOperations) {
        kafkaOperations.send("topic.quick.tran", "test executeInTransaction");
        throw new RuntimeException("fail");
    }
});
```

### 转发 ReplyTemplate

### 配置消息过滤器
```java
    @Autowired
    private ConsumerFactory consumerFactory;

    @Bean
    public ConcurrentKafkaListenerContainerFactory filterContainerFactory() {
        ConcurrentKafkaListenerContainerFactory factory = new ConcurrentKafkaListenerContainerFactory();
        factory.setConsumerFactory(consumerFactory);
        //配合RecordFilterStrategy使用，被过滤的信息将被丢弃
        factory.setAckDiscarded(true);
        factory.setRecordFilterStrategy(new RecordFilterStrategy() {
            @Override
            public boolean filter(ConsumerRecord consumerRecord) {
                long data = Long.parseLong((String) consumerRecord.value());
                log.info("filterContainerFactory filter : " + data);
                if (data % 2 == 0) {
                    return false;
                }
                //返回true将会被丢弃
                return true;
            }
        });
        return factory;
    }

    // @KafkaListener(topics={"xxx-mq","xxx-xxx","xxx-xxxx"})
    @KafkaListener(id = "filterCons", topics = "topic.quick.filter", containerFactory = "filterContainerFactory")
    public void filterListener(String data) {
        //这里做数据持久化的操作
        log.error("topic.quick.filter receive : " + data);
    }
```

### 使用Ack机制确认消费
Kafka的Ack机制相对于RabbitMQ的Ack机制差别比较大
```java
public class KafkaMessageListener implements AcknowledgingMessageListener<Integer, String> {
    @Override
    public void onMessage(final ConsumerRecord<Integer, String> message, final Acknowledgment acknowledgment) {
        //TODO 这里具体实现个人业务逻辑
        // 最后 调用acknowledgment的ack方法，提交offset
        acknowledgment.acknowledge();
    }
}
```

### KafkaListenerEndpointRegistry 注册 KafkaListener
```java
@Component
@EnableScheduling
@Slf4j
public class TaskListener {

    @Autowired
    private KafkaListenerEndpointRegistry registry;

    @Autowired
    private ConsumerFactory consumerFactory;

    @Bean
    public ConcurrentKafkaListenerContainerFactory delayContainerFactory() {
        ConcurrentKafkaListenerContainerFactory container = new ConcurrentKafkaListenerContainerFactory();
        container.setConsumerFactory(consumerFactory);
        //禁止自动启动
        container.setAutoStartup(false);
        return container;
    }

    @KafkaListener(id = "durable", topics = "topic.quick.durable", containerFactory = "delayContainerFactory")
    public void durableListener(String data) {
        //这里做数据持久化的操作
        log.info("topic.quick.durable receive : " + data);
    }

    //定时器，每天凌晨0点开启监听
    @Scheduled(cron = "0 0 0 * * ?")
    public void startListener() {
        log.info("开启监听");
        //判断监听容器是否启动，未启动则将其启动
        if (!registry.getListenerContainer("durable").isRunning()) {
            registry.getListenerContainer("durable").start();
        }
        registry.getListenerContainer("durable").resume();
    }

    //定时器，每天早上10点关闭监听
    @Scheduled(cron = "0 0 10 * * ?")
    public void shutDownListener() {
        log.info("关闭监听");
        registry.getListenerContainer("durable").pause();
    }
}
```
### Kafka动态topic消费方式
- [CDC场景下Kafka动态topic消费方式](http://cache.baiducontent.com/c?m=9d78d513d9d431ab4f9ee0697c67c015684381132ba6a4020ba4843896732d42506793e274764957c7823c390ef50f1aa8b12173441e3df2de8d9f4aaae3c97b73c97d73671cf1104f8c04edd642239176c60be3a94de5e9a1&p=ce6f8315d9c541e001be9b7c174c&newp=9c759a43d6d018fc57efd2601b5692695d0fc20e3bddd201298ffe0cc4241a1a1a3aecbf2d211b0fd5c57a6c02ab4b5beefb32743d0034f1f689df08d2ecce7e3cd1&user=baidu&fm=sc&query=%B6%AF%CC%AC%CF%FB%B7%D1kafka&qid=d7060038000068f2&p1=1)
- [Spring集成kafka态订阅消费消息](https://www.jianshu.com/p/5ea2de323e18)

```yaml
spring:
    kafka:
        #kafak服务器
        bootstrapServers:
            - 10.63.xxx.xxx:9092
        #连接到kafka服务器的客户端标识
        clientId: xxxx-mq
        producer:
            #同步到follower的数量,all的话就是所有的follower都同步成功了才返回给客户端
            acks: all
            #发送失败后的重试次数
            retries: 3
            #每批次发送的字节大小
            batchSize: 6144
            #划分给生产者使用的内存空间,指定的内存空间塞满后，发送方法会阻塞等待
            bufferMemory: 33554432
            #消息压缩格式
            compressionType: gzip
            key-serializer: org.apache.kafka.common.serialization.StringSerializer
            value-serializer: org.apache.kafka.common.serialization.StringSerializer

        consumer:
            #消费组id,按微服务名规范
            groupId: xxxxx-mq
            #当Kafka中没有初始offset或如果当前的offset不存在时,自动将偏移重置为最新偏移
            autoOffsetReset: latest
            #设置手动提交
            enableAutoCommit: true
            #如果enable.auto.commit设置为true，则消费者偏移量自动提交给Kafka的频率（以毫秒为单位）
            autoCommitInterval: 5000
            #如果没有足够的数据满足fetch.min.bytes，服务器将在接收到提取请求之前阻止的最大时间
            fetchMaxWait: 500
            #kafka服务器拉取请求返回的最小数据量，如果数据不足，请求将等待数据积累.
            fetchMinSize: 1
            #当使用Kafka的分组管理功能时，心跳到消费者协调器之间的预计时间。
            #心跳用于确保消费者的会话保持活动状态，并当有新消费者加入或离开组时方便重新平衡。
            #该值必须必比session.timeout.ms小，通常不高于1/3。
            #它可以调整的更低，以控制正常重新平衡的预期时间。
            heartbeatInterval: 3000
            #在单次调用poll()中返回的最大记录数
            maxPollRecords: 100
          #  key-deserializer: org.apache.kafka.common.serialization.StringSerializer
          #  value-deserializer: org.apache.kafka.common.serialization.StringSerializer

        template:
            #默认使用的Topic
            defaultTopic: xxxxx-mq-default-topic
```

[1]: https://blog.csdn.net/jpfjdmm/article/details/100709256 'kafka介绍及使用'
[2]: https://www.jianshu.com/p/13589c6839ec 'Spring-Kafka（七）—— 实现消息转发以及ReplyTemplate'
[3]: https://www.jianshu.com/c/0c9d83802b0c 'Spring-Kafka史上最强入门教程'
[4]: https://www.jianshu.com/p/92487ba9052f 'Kafka在SpringBoot中的入门配置'