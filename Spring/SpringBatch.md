# Spring Batch
<!-- @author DHJT 2020-10-11 -->
是一个轻量级，全面的批处理框架，旨在开发对企业系统日常运营至关重要的强大批处理应用程序。
spring提供的一个数据处理框架。企业域中的许多应用程序需要批量处理才能在关键任务环境中执行业务操作。 这些业务运营包括：

无需用户交互即可最有效地处理大量信息的自动化，复杂处理。 这些操作通常包括基于时间的事件（例如月末计算，通知或通信）。
在非常大的数据集中重复处理复杂业务规则的定期应用（例如，保险利益确定或费率调整）。
集成从内部和外部系统接收的信息，这些信息通常需要以事务方式格式化，验证和处理到记录系统中。 批处理用于每天为企业处理数十亿的交易。

提供了可重用的功能，这些功能对于处理大量的数据至关重要，包括记录/跟踪，事务管理，作业处理统计，作业重启，跳过和资源管理。 它还提供更高级的技术服务和功能，通过优化和分区技术实现极高容量和高性能的批处理作业。 Spring Batch可用于两种简单的用例（例如将文件读入数据库或运行存储过程）以及复杂的大量用例（例如在数据库之间移动大量数据，转换它等等） 上）。 大批量批处理作业可以高度可扩展的方式利用该框架来处理大量信息。

```xml
<!-- Brantch -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-batch</artifactId>
</dependency>
```

```yaml
#Spring Batch
spring:
  batch:
    job:
      enabled: false
    initialize-schema: always
    table-prefix: dhjt_batch
```

## spring-batch-admin
https://github.com/spring-attic/spring-batch-admin
NOTE: This project is being moved to the Spring Attic and is not recommended for new projects. Spring Cloud Data Flow is the recommended replacement for managing and monitoring Spring Batch jobs going forward. You can read more about migrating to Spring Cloud Data Flow here.

[1]: https://anoyi.com/p/cccfdf207623 '史上最轻松入门之Spring Batch - 轻量级批处理框架实践'
[2]: https://blog.csdn.net/topdeveloperr/article/details/84337956 '批处理框架spring batch基础知识介绍'
[3]: https://blog.csdn.net/zhangcongyi420/article/details/104041829 'springbatch开启任务的两种方式'