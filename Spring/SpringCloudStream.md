# Spring Cloud Stream
<!-- @author DHJT 2020-03-28 -->
构建消息驱动服务。提供了一种解耦合的方式。
RabbitMQ有exchange，kafka有Topic，partitions分区，
应用程序通过 inputs 或者 outputs 来与 Spring Cloud Stream 中binder 交互，通过我们配置来 binding ，而 Spring Cloud Stream 的 binder 负责与中间件交互。
应用通过Spring Cloud Stream插入的input(相当于消费者consumer，它是从队列中接收消息的)和output(相当于生产者producer，它是从队列中发送消息的。)通道与外界交流。
通道通过指定中间件的Binder实现与外部代理连接。业务开发者不再关注具体消息中间件，只需关注Binder对应用程序提供的抽象概念来使用消息中间件实现业务即可。

## 使用
### Binder
应用与消息中间件之间的粘合剂。目前 Spring Cloud Stream 实现了 Kafka 和 Rabbit MQ 的binder。

通过 binder ，可以很方便的连接中间件，可以动态的改变消息的destinations（对应于 Kafka 的topic，Rabbit MQ 的 exchanges），这些都可以通过外部配置项来做到。甚至可以任意的改变中间件的类型而不需要修改一行代码。

### Bindings
bindings 是我们通过配置把应用和spring cloud stream 的 binder 绑定在一起，之后我们只需要修改 binding 的配置来达到动态修改topic、exchange、type等一系列信息而不需要修改一行代码。

```yaml
server:
  port: 7888
spring:
  application:
    name: producer
  cloud:
    stream:
      kafka:
        binder:
          brokers: localhost:9092         #Kafka的消息中间件服务器
          zk-nodes: localhost:2181        #Zookeeper的节点，如果集群，后面加,号分隔
          auto-create-topics: true        #如果设置为false,就不会自动创建Topic 有可能你Topic还没创建就直接调用了。
      bindings:
        output:      #这里用stream给我们提供的默认output，后面会讲到自定义output
          destination: stream-demo    #消息发往的目的地
          content-type: text/plain    #消息发送的格式，接收端不用指定格式，但是发送端要
        #input是接收，注意这里不能再像前面一样写output了
        input:
          destination: stream-dem
```
```java
//这个注解给我们绑定消息通道的，Source是Stream给我们提供的，可以点进去看源码，可以看到output和input,这和配置文件中的output，input对应的。
@EnableBinding(Source.class)
public class SendService {

    @Autowired
    private Source source;

    public void sendMsg(String msg){
        source.output().send(MessageBuilder.withPayload(msg).build());
    }
}

//消息接受端，stream给我们提供了Sink,Sink源码里面是绑定input的，要跟我们配置文件的imput关联的。
@EnableBinding(Sink.class)
public class RecieveService {

    @StreamListener(Sink.INPUT)
    public void recieve(Object payload) {
        System.out.println(payload);
    }
}
@StreamListener(管道id，如Sink.INPUT)。管道id是在接收器中定义的。
```

### 自定义MySource：
用的是Stream给我们提供的默认Source，Sink，接下来我们要自己进行自定义，这种方式在工作中还是用的比较多的，因为我们要往不同的消息通道发消息，必然不能全都叫input,output的，那样的话就乱套了，因此首先自定义一个接口，如下：

Source（发射器） : 一个接口类，内部定义了一个输出管道，例如定义一个输出管道 @output（"XXOO"）。说明这个发射器将会向这个管道发射数据。
Sink（接收器） : 一个接口类，内部定义了一个输入管道，例如定义一个输入管道 @input（"XXOO"）。说明这个接收器将会从这个管道接收数据。
Binder（绑定器）：用于与管道进行绑定。Binder将于消息中间件进行关联。@EnableBinding （Source.class/Sink.class）。@EnableBinding（）里面是可以定义多个发射器/接收器

```java
public interface MySource {

    String str = "myOutput";   //管道名称为"myOutput"
    @Output(str)
    MessageChannel myOutput();
}
```

## spring-cloud-stream & Apache Kafka[^1]
### 使用
To use Apache Kafka binder, you need to add spring-cloud-stream-binder-kafka as a dependency to your Spring Cloud Stream application, as shown in the following example for Maven:
```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-stream-binder-kafka</artifactId>
</dependency>
```

Alternatively, you can also use the Spring Cloud Stream Kafka Starter, as shown inn the following example for Maven:
```xml
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-stream-kafka</artifactId>
</dependency>
```

[^1]: [Springcloud Stream详解与kafka整合实例](https://blog.csdn.net/JinXYan/article/details/90813592)