# Redis
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
- redis提供五种数据类型：string,hash,list,set及zset(sorted set).