# quartz
<!-- @author DHJT 2019-10-28 -->

### Job 状态和并发
Job默认无状态可以并发执行
StatefulJob：有状态不能并发执行
有一组可添加到 Job 的 Annotation，可以影响 Quartz 的行为。
```java
@PersistJobDataAfterExecution
@DisallowConcurrentExecution //只有上一个人任务执行完毕才可以执行下一次任务
```

@DisallowConcurrentExecution 添加到 Job 类后，Quartz 将不会同时执行多个 Job 实例（什么是 Job 实例可参看上一节）。
注意措辞。我们用上一节的例子来讲解，如果 “SalesReportJob” 上添加了这个 Annotation，那么同时只能执行一个“SalesReportForJoe”，但是却可以同时执行“SalesReportForMike”。因此，可以说这个约束是基于 JobDetail 的而不是基于 Job 的。

@PersistJobDataAfterExecution 添加到 Job 类后，表示 Quartz 将会在成功执行 execute() 方法后（没有抛出异常）更新 JobDetail 的 JobDataMap，下一次执行相同的任务（JobDetail）将会得到更新后的值，而不是原始的值。就像@DisallowConcurrentExecution 一样，这个注释基于 JobDetail 而不是 Job 类的实例。

如果你使用了 @PersistJobDataAfterExecution 注释，那么强烈建议你使用 @DisallowConcurrentExecution 注释，这是为了避免出现并发问题，当多个 Job 实例同时执行的时候，到底使用了哪个数据将变得很混乱。

Quartz定时任务的并行与串行
1.Quartz定时任务的执行策略有并行和串行之分。
　　　　所谓并行是指多个任务同时运行的情况，即若两个任务的执行时间存在重叠，两个任务同时运行的情况。
　　　　串行则是指一个任务必须等其前一个任务执行完毕之后再执行的策略。
　　2.Spring集成Quartz时，控制定时任务的并行和串行是通过concurrent（译:同时发生的; 同时完成的; 同时存在的）
属性实现的。
　　3.当任务系统存在多个定时任务时，任务执行很可能会存在时间上的重叠，通过设置concurrent属性为false，
可以避免任务并行执行，job只能在其前一个job执行完成之后才开始执行


### Job 的其它属性
下面列举了一些通过 JobDetail 定义的 Job 属性：

    Durability – 持久性，如果 Job 是非持久性的，那么执行完 Job 后，如果没有任何活动的 Trigger 与之关联，那么将会被调度器自动删除。换句话说，非持久性的 Job 的生命周期与它关联的 Trigger 相关。
    RequestsRecovery – 如果任务设置了 RequestsRecovery，那么它在调度器发生硬停止（例如，当前进程 crash，或者机器宕机）后，当调度器再次启动的时候将会重新执行。这种情况下，JobExecutionContext.isRecovering() 方法将会返回 true。

### JobExecutionException
最后，我们来看看 Job.execute(…) 方法。这个方法只允许抛出一种异常（包括 RuntimeException），那就是 JobExecutionException。正是因为如此，你通常需要将 execute() 方法中的所有内容放入 try-catch 语句块中。你也需要花点时间看看 JobExecutionException 的文档，你的任务可以使用它提供的各种指令来控制如何处理异常。

### Quartz之InterruptableJob停止Quartz中正在执行的任务[^2]
任务类只需要实现InterruptableJob类就可以
只要实现一个方法:interrupt(),在这个方法中进行标记的改变,在执行中进行这个标记判断
就可实现中断任务了,另外在调度器上调用方法：sched.interrupt(job.getKey());

### 重试策略
```java
Trigger.withMisfireHandlingInstructionDoNothing();
```

### 持久化任务
脚本文件`quartz-2.3.1-sources\org\quartz\impl\jdbcjobstore\db-type.sql`
```yaml
spring:
  quartz:
    #相关属性配置
    properties:
      org:
        quartz:
          scheduler:
            instanceName: clusteredScheduler
            instanceId: AUTO
          jobStore:
            class: org.quartz.impl.jdbcjobstore.JobStoreTX
            driverDelegateClass: org.quartz.impl.jdbcjobstore.StdJDBCDelegate
            tablePrefix: QRTZ_
            isClustered: true
            clusterCheckinInterval: 10000
            useProperties: false
          threadPool:
            class: org.quartz.simpl.SimpleThreadPool
            threadCount: 10
            threadPriority: 5
            threadsInheritContextClassLoaderOfInitializingThread: true
    #数据库方式
    job-store-type: jdbc
    #初始化表结构
    #jdbc:
      #initialize-schema: never
```

<details>
  <summary><b>quartz.properties 配置</b> (click to show)</summary>
Quartz的属性配置文件主要包括三方面的信息：
1)集群信息；
2)调度器线程池；
3)任务调度现场数据的保存。

``` prop
# Default Properties file for use by StdSchedulerFactory
# to create a Quartz Scheduler Instance, if a different
# properties file is not explicitly specified.

#集群配置
org.quartz.scheduler.instanceName: DefaultQuartzScheduler
org.quartz.scheduler.rmi.export: false
org.quartz.scheduler.rmi.proxy: false
org.quartz.scheduler.wrapJobExecutionInUserTransaction: false

org.quartz.threadPool.class: org.quartz.simpl.SimpleThreadPool
org.quartz.threadPool.threadCount: 10
org.quartz.threadPool.threadPriority: 5
org.quartz.threadPool.threadsInheritContextClassLoaderOfInitializingThread: true

org.quartz.jobStore.misfireThreshold: 60000

#============================================================================
# Configure JobStore
#============================================================================

#默认配置，数据保存到内存
#org.quartz.jobStore.class: org.quartz.simpl.RAMJobStore
#持久化配置
org.quartz.jobStore.class:org.quartz.impl.jdbcjobstore.JobStoreTX
org.quartz.jobStore.driverDelegateClass:org.quartz.impl.jdbcjobstore.StdJDBCDelegate
org.quartz.jobStore.useProperties:true
#数据库表前缀
#org.quartz.jobStore.tablePrefix:qrtz_
#org.quartz.jobStore.dataSource:qzDS

#============================================================================
# Configure Datasources
#============================================================================
#JDBC驱动
#org.quartz.dataSource.qzDS.driver:com.mysql.jdbc.Driver
#org.quartz.dataSource.qzDS.URL:jdbc:mysql://localhost:3306/quartz
#org.quartz.dataSource.qzDS.user:root
#org.quartz.dataSource.qzDS.password:christmas258@
#org.quartz.dataSource.qzDS.maxConnection:10
```
</details>


[1]: https://www.jianshu.com/p/056281e057b3 '第四十七章：SpringBoot2.0新特性 - Quartz自动化配置集成'
[2]: https://blog.csdn.net/sx1119183530/article/details/85623937 'spring的task和quartz的区别'
[3]: https://www.jianshu.com/p/544daba1f7f6 'spring 定时任务不能并发执行问题'

[^1]: [第四十章：基于SpringBoot & Quartz完成定时任务分布式多节点负载持久化](https://www.jianshu.com/p/49133c107143)
[^2]: [Quartz之InterruptableJob ](https://www.iteye.com/blog/liuzidong-1145429)