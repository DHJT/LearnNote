# MongoDB
<!-- @author DHJT 2019-02-19 -->
[MongoDB](https://www.mongodb.com/zh)是专为可扩展性，高性能和高可用性而设计的数据库。它可以从单服务器部署扩展到大型、复杂的多数据中心架构。

- MongoDB将数据目录存储在 db 目录下。但是这个数据目录不会主动创建，我们在安装完成后需要创建它
MongoDB使用`BSON`对象来存储，与`JSON`格式类型的键值对（key/value）类似，MongoDB数据库和关系型DB的存储模型对应关系：
| 关系型数据库 |        MongoDB        |
|--------------|-----------------------|
| Database     | Database              |
| Table        | Collection            |
| Row          | Document              |
| Column       | Key/Value or Document |

NoSQL 数据库的理论基础是`CAP`理论

### `mongodb`启动
``` sh
# Create database directory.
cd D:\
md "\data\db"
# Start your MongoDB database
# "C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="c:\data\db"
$ mongod.exe --dbpath "d:\data\db"
# 启动成功显示 [initandlisten] waiting for connections
# Connect to MongoDB.
# "C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe"
mongo.exe
# Add MongoDB binaries to the System PATH
```
```sh
.\mongod.exe -dbpath D:\data\db --replSet rs0
D:\ProgramFiles\mongodb\bin\mongod.exe -dbpath D:\data\db27018 --port 27018  --replSet rs0
D:\ProgramFiles\mongodb\bin\mongo.exe --port 27017
> rs.initiate()
rs0:SECONDARY> rs.add('localhost:27018')
```

- 将`MongoDB`服务器作为`Windows`服务运行

请注意，你必须有管理权限才能运行下面的命令。执行以下命令将MongoDB服务器作为Windows服务运行：

mongod --bind_ip yourIPadress --logpath "C:\data\dbConf\mongodb.log" --logappend --dbpath "C:\data\db" --port yourPortNumber --serviceName "YourServiceName" --serviceDisplayName "YourServiceName" --install

[1]: https://www.cnblogs.com/liuyanpeng/p/7735698.html 'MongoDB 安装和可视化工具'