# HSQLDB
<!-- @author DHJT 2019-05-09 -->

## HSqlDB简介
HSQLDB是一款Java内置的数据库，非常适合在用于快速的测试和演示的Java程序中。(无需独立安装数据库) 
HSQLDB有三种模式： 

1. Server 就像Mysql那样 
2. In-Process 又叫做 Standalone 模式，数据放在本地文件，伴随JVM一起启动，是HSQLDB的主要应用场景 
3. Memory-only， 仅仅在内存中，一旦重启，数据就消失。

2 客户端
2.1 运行HSQLDB_Client类中的main方法
其主方法调用了DatabaseManagerSwing的主方法

这回导致启动一个Swing做的客户端

2.2 创建数据库，账号和密码
填写连接参数
1. Setting Name：输入test
2. Type: 选择HSQL Database Engine Standalone
3. Driver: 使用默认的org.hsqldb.jdbcDriver
4. URL： 输入 Jdbc:hsqldb:file: D:/SoftWareInstall/HSqlDB/test
5. User: root
6: Password:root
第3步： 这是Standalone方式，对于同一个数据库，只能启动一次，不支持多进程连接同一个数据库，所以后续在写JAVA代码连接的时候，必须把这个客户端关闭掉才行。
第4步： Jdbc:hsqldb:file: D:/SoftWareInstall/HSqlDB/test会导致在D:/SoftWareInstall/HSqlDB目录下创建一个test数据库
第5,6步：会导致创建账号密码，以后再连接D:/SoftWareInstall/HSqlDB下的test数据库，就必须用这个账号密码了。
