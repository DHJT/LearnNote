## Spring
- `Spring`读取参数配置文件
``` xml
<!--参数配置 -->
<context:property-placeholder location="classpath:db.properties" />
<!-- 参数配置第二种 -->
<bean id="propertyConfigurer"
    class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
    <property name="locations">
        <list>
            <value>classpath:system.properties</value>
        </list>
    </property>
</bean>

<!--数据库源 -->
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource"
    destroy-method="close">
    <property name="driverClass">
        <value>${db.driverclassname}</value>
    </property>
</bean>
```
- `Spring`:添加字段后报错，可以全局查询其他继承类中是否已经定义了该字段。
- **`Spring`**的定时任务，执行一些固定的任务，如数据的逾期状态更新
``` xml
<!-- PDF删除定时器 spring定时器任务 -->
<bean name="TimedTaskjob" class="org.springframework.scheduling.quartz.JobDetailBean">
    <property name="jobClass" value="com.app.task.TimedTask" />
    <property name="jobDataAsMap">
        <map>
            <entry key="timeout" value="0" />
        </map>
    </property>
</bean>

<bean id="cronTrigger" class="org.springframework.scheduling.quartz.CronTriggerBean">
    <property name="jobDetail" ref="TimedTaskjob" />
    <property name="cronExpression" value="0 30 23 * * ?" />
</bean>

<bean class="org.springframework.scheduling.quartz.SchedulerFactoryBean">
    <property name="triggers">
        <list>
            <ref bean="cronTrigger" />
        </list>
    </property>
</bean>
```
``` java
public class TimedTask  extends QuartzJobBean{
    private int timeout;  
    private static int i = 0;  
    //调度工厂实例化后，经过timeout时间开始执行调度  
    public void setTimeout(int timeout) {  
    this.timeout = timeout;  
    } 
    
    @Override
    protected void executeInternal(JobExecutionContext arg0)
            throws JobExecutionException {
        // TODO 自动生成的方法存根
        File f = new File(getClass().getResource("/").getPath());
        String file = f.getParent();
        f = new File(file);
        file = f.getParent();
        String pdf = "\\PDF\\pdf_bak";
        file+=pdf;
        System.out.println("定时任务执行中…" +file); 
        String Date = Util.getCurrentDate();
        String hql = " update Borrow  b set b.status ='3' where b.returnDate<='"+Date+"' ";
        App.getHibernateDao().executeBySql(hql);
    }
}
```