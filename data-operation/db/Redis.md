# Redis
<!-- @author DHJT 2019-10-14 -->
Redis 是一个开源的使用 ANSI C 语言编写、遵守 BSD 协议、支持网络、可基于内存亦可持久化的日志型、Key-Value 数据库，并提供多种语言的 API的非关系型数据库。

https://github.com/microsoftarchive/redis
Please note that Microsoft is not officially endorsing this product in any way.

## 基础使用
- 启动服务端和客户端
``` shell
# cd命令切换安装目录
redis-server.exe redis.windows.conf
# 切换到redis目录下运行
redis-cli.exe -h 127.0.0.1 -p 6379
# 设置键值对
set myKey abc
# 取出键值对
get myKey
```

### 启用密码
`--requirepass "mypassword" `

## 支持的数据类型
- String字符串
- Hash（哈希）
- List（列表）
- Set（集合）
- zset(sorted set：有序集合)

## Redis持久化？Redis有哪几种持久化方式？优缺点是什么？
持久化就是把内存的数据写到磁盘中去，防止服务宕机了内存数据丢失。
两种持久化方式:RDB（默认） 和AOF

存储结构: 内容是redis通讯协议(RESP )格式的命令文本存储。

### RDB(Redis DataBase)
功能核心函数rdbSave(生成RDB文件)和rdbLoad（从文件加载内存）两个函数

### AOF(Append-only file)

#### 区别
1. aof文件比rdb更新频率高，优先使用aof还原数据。
2. aof比rdb更安全也更大
3. rdb性能比aof好
4. 如果两个都配了优先加载AOF

## 面试题

### 使用过Redis分布式锁么，它是怎么实现的
先拿setnx来争抢锁，抢到之后，再用expire给锁加一个过期时间防止锁忘记了释放。
如果在setnx之后执行expire之前进程意外crash或者要重启维护了，那会怎么样？
set指令有非常复杂的参数，这个应该是可以同时把setnx和expire合成一条指令来用的！

### RedisDesktopManager
Cross-platform GUI management tool for Redis https://redisdesktop.com
https://github.com/uglide/RedisDesktopManager