# other
<!-- @author DHJT 2019-11-12 -->
```sh
java -Xmx1G -Xms1G -server -XX:+UseG1GC -XX:MaxGCPauseMillis=20 -XX:InitiatingHeapOccupancyPercent=35 -XX:+ExplicitGCInvokesConcurrent -XX:MaxInlineLevel=15 -Djava.awt.headless=true -Xloggc:/opt/kafka/bin/../logs/kafkaServer-gc.log -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=100M -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=utf-8 -Duser.timezone=GMT+8 -jar xxx.jar
```


### ansibe【自动化运维工具】

### secureCRT

secureCRT如何上传下载文件[^1]

### spring-boot:run启动时,如何带设置环境参数dev,test.[^2]

[1]: http://ask.zol.com.cn/x/4594777.html '如何找出某个软件的注册表,并删除? '
[^1]: [secureCRT如何上传下载文件](https://jingyan.baidu.com/article/49711c61b1b8d5fa441b7cea.html)
[^2]: [spring-boot:run启动时,如何带设置环境参数dev,test.](https://blog.csdn.net/qq_31840023/article/details/82662819)