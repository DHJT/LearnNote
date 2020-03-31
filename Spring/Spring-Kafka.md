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

    @KafkaListener(id = "filterCons", topics = "topic.quick.filter", containerFactory = "filterContainerFactory")
    public void filterListener(String data) {
        //这里做数据持久化的操作
        log.error("topic.quick.filter receive : " + data);
    }
```

### 使用Ack机制确认消费
Kafka的Ack机制相对于RabbitMQ的Ack机制差别比较大

### KafkaListenerEndpointRegistry 注册 KafkaListener
```java
@Component
@EnableScheduling
@Slf4j
public class TaskListener{

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

[1]: https://blog.csdn.net/jpfjdmm/article/details/100709256 'kafka介绍及使用'
[2]: https://www.jianshu.com/p/13589c6839ec 'Spring-Kafka（七）—— 实现消息转发以及ReplyTemplate'
[3]: https://www.jianshu.com/c/0c9d83802b0c 'Spring-Kafka史上最强入门教程'
[4]: https://www.jianshu.com/p/92487ba9052f 'Kafka在SpringBoot中的入门配置'