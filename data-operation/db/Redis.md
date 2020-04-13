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

## 队列
Redis的列表是使用__双向链表__实现的，保存了头尾节点，所以在列表头尾两边插取元素都是非常快的。
可以直接使用Redis的List实现消息队列，只需简单的两个指令lpush和rpop或者rpush和lpop。
`brpop`指令，这个指令只有在有元素时才返回，没有则会阻塞直到超时返回null，
列表类型天生支持用作消息队列;

## 发布/订阅模式
利用Redis的pub/sub模式可以实现一次生产多次消费的队列。
有两种类型，一种是频道，还有一种就是模式。
模式其实就是模式匹配的概念，`order.*`就表示匹配所有和 order 相关的消息。
Redis的pub/sub也有其缺点，那就是如果消费者下线，生产者的消息会丢失。

springboot2.0整合redis的发布和订阅[^1]

### Redis 订阅发布功能整的适合做消息中间件吗？
Redis 发送消息，是循环订阅者列表实现的，比如我有 100 个频道，每个频道有100个订阅者，由于是单线程，岂不是要循环处理，那么最后一个频道的最后一个订阅者岂不是会等死去。使用 redis 做消息中间件的，redis 并没有提供消息重试机制，也没有提供消息确认机制，更没有提供消息的持久化，所以一旦消息丢失，我们是没有任何办法的。而且现在突然订阅方断线，那么他将会丢失所有在短线期间发布者发布的消息，

[1]: http://redisdoc.com/index.html 'Redis 命令参考'

## 面试题

### 使用过Redis分布式锁么，它是怎么实现的
先拿setnx来争抢锁，抢到之后，再用expire给锁加一个过期时间防止锁忘记了释放。
如果在setnx之后执行expire之前进程意外crash或者要重启维护了，那会怎么样？
set指令有非常复杂的参数，这个应该是可以同时把setnx和expire合成一条指令来用的！

### redis-redisTemplate 模糊匹配keys
做项目遇到的问题模糊匹配
//匹配img开头的key,直接使用正则无效
redis中模糊匹配 redisTemplate.keys("img"+"*");//img.* //"img."+"*" 
stringRedisTemplate.keys() 这个线上用会导致redis 耗时很久，redis又是单线程的会容易被锁住，严重一点会导致redis服务器宕机

### RedisDesktopManager
Cross-platform GUI management tool for Redis https://redisdesktop.com
https://github.com/uglide/RedisDesktopManager

[1]: https://blog.csdn.net/weixin_30301449/article/details/101239123 '在RedisTemplate中使用scan代替keys指令'

[^1]: [springboot2.0整合redis的发布和订阅](https://www.cnblogs.com/powerwu/p/11505481.html)