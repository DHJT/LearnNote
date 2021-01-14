# Nginx应用基础
<!-- @author DHJT 2017-07-13 -->
> 俄罗斯程序设计师`Igor Sysoev`
> 轻量级的Web服务器/反向代理服务器及电子邮件、TCP/UDP代理服务器，在BSD-like协议下发行。
> 特点：占用内存少，并发能力强。
> http://ngix.org/

## 安装及使用
```sh
# 配置安装目录及编译安装
./configure --prefix=/{指定目录}/
make && make install
# 启动Nginx，默认监听80端口，`windows`下可以使用`start .\nginx.exe`启动
./sbin/nginx
nginx -s stop # 快速停止服务器
nginx -s quit # 停止服务器，但要等到请求处理完毕后关闭
nginx -s reload # 重新加载配置文件。
```

### 正向代理

### 反向代理(`Reverse Proxy`)
- [使用Nginx实现反向代理][1]
- [关于nginx+tomcat搭建反向代理时加载静态资源找不到的问题][2]
    + 当nginx代理端口不是80的时候需要修改tomcat的server.xml文件将connector的节点中增加一个proxyPort="nginx的端口号" nginx代理端口的位置
- 反向代理其实并不难，只要配置好即可，并且主要配置比较少，可以配置多个请求处理server
- `proxy_pass`配置前的准备工作，后端跑apache服务的ip和端口，也就是说可以通过http://ip:port能访问到你的网站。

然后就可以新建一个vhost.conf,加入如下内容，记得修改ip和域名为你的ip和域名。
修改nginx.conf，添加 include quancha.conf 到http{}段, reload nginx就可以了。

- quancha.conf文件如下：
``` sh
## Basic reverse proxy server ##
# 可以配置多个server，然后配置负载均衡策略以及权重
upstream apachephp  {
    server ip:8080;
    # weight=2 为权重
    # server ip:8080 weight=2;
}

## Start www.quancha.cn ##
server {
    listen 80;
    server_name  www.quancha.cn;

    # 日志格式参考 main，这一项需要配置，nginx默认配置中有配置，但被注释掉了，需要删除注释；
    access_log  logs/quancha.access.log  main;
    error_log  logs/quancha.error.log;
    root   html;
    index  index.html index.htm index.php;
    # 【Web安全漏洞 之 X-Frame-Options,X-XSS-Protection,X-Content-Type-Options 响应头配置】(https://blog.csdn.net/zhwxl_zyx/article/details/102717941)
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    ## send request back to apache ##
    location / {
        proxy_pass  http://apachephp; # localhost

        #Proxy Settings
        proxy_redirect     off;
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_max_temp_file_size 0;
        proxy_connect_timeout      90;
        proxy_send_timeout         90;
        proxy_read_timeout         90;
        proxy_buffer_size          4k;
        proxy_buffers              4 32k;
        proxy_busy_buffers_size    64k;
        proxy_temp_file_write_size 64k;
   }
}
## End www.quancha.cn ##
```

### Nginx代理proxy pass配置去除前缀
设置proxy_pass即可。请求只会替换域名。
根据url的前缀转发到不同的服务。

### 转发的路径样例
- `^~/user/`  `proxy_pass http://ip:port/`
    + `**/user/scene/list`->`http://ip:port/scene/list`
- `^~/user`  `proxy_pass http://ip:port/`
    + `**/user/scene/list`->`http://ip:port/scene/list`
- `^~/user/`  `proxy_pass http://ip:port`
    + `**/user/scene/list`->`http://ip:port/user/scene/list`

#### 一个种方案是proxy_pass后面加根路径/.
```
server {
    listen              80;
    server_name         abc.com;
    access_log  "pipe:rollback /data/log/nginx/access.log interval=1d baknum=7 maxsize=1G"  main;

    location ^~/user/ {
        proxy_set_header Host $host;
        proxy_set_header  X-Real-IP        $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://user/;
    }

    location ^~/order/ {
        proxy_set_header Host $host;
        proxy_set_header  X-Real-IP        $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://order/;
    }
}
```
`^~/user/`表示匹配前缀是`user`的请求，`proxy_pass`的结尾有`/`， 则会把`/user/*`后面的路径直接拼接到后面，即移除`user`.

#### 另一种方案是使用rewrite
```
upstream user {
  server localhost:8089 weight=1 max_fails=2 fail_timeout=30s;;
}
upstream order {
  server localhost:8090 weight=5;
}
server {
    listen              80;
    server_name         abc.com;
    access_log  "pipe:rollback /data/log/nginx/access.log interval=1d baknum=7 maxsize=1G"  main;

    location ^~/user/ {
        proxy_set_header Host $host;
        proxy_set_header  X-Real-IP        $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;

        rewrite ^/user/(.*)$ /$1 break;
        proxy_pass http://user;
    }
    location ^~/order/ {
        proxy_set_header Host $host;
        proxy_set_header  X-Real-IP        $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;

        rewrite ^/order/(.*)$ /$1 break;
        proxy_pass http://order;
    }
}
```
注意到`proxy_pass`结尾没有`/`，`rewrite`重写了url。
__rewrite语法描述__
```
syntax: rewrite regex replacement [flag]
Default: —
Context: server, location, if
```

## 日志配置
1. access_log指令
语法: access_log path [format [buffer=size [flush=time]]];
access_log path format gzip[=level] [buffer=size] [flush=time];
access_log syslog:server=address[,parameter=value] [format];
access_log off;
默认值: access_log logs/access.log combined;
配置段: http, server, location, if in location, limit_except
gzip压缩等级。
buffer设置内存缓存区大小。
flush保存在缓存区中的最长时间。
不记录日志：access_log off;
使用默认combined格式记录日志：access_log logs/access.log 或 access_log logs/access.log combined;

2. log_format指令
语法: log_format name string …;
默认值: log_format combined “…”;
配置段: http

name表示格式名称，string表示等义的格式。log_format有一个默认的无需设置的combined日志格式，相当于apache的combined日志格式，
3. open_log_file_cache指令
语法: open_log_file_cache max=N [inactive=time] [min_uses=N] [valid=time];
open_log_file_cache off;
默认值: open_log_file_cache off;
配置段: http, server, location

对于每一条日志记录，都将是先打开文件，再写入日志，然后关闭。可以使用open_log_file_cache来设置日志文件缓存(默认是off)，格式如下：
参数注释如下：
max:设置缓存中的最大文件描述符数量，如果缓存被占满，采用LRU算法将描述符关闭。
inactive:设置存活时间，默认是10s
min_uses:设置在inactive时间段内，日志文件最少使用多少次后，该日志文件描述符记入缓存中，默认是1次
valid:设置检查频率，默认60s
off：禁用缓存
实例如下：

open_log_file_cache max=1000 inactive=20s valid=1m min_uses=2;
1
open_log_file_cache max=1000 inactive=20s valid=1m min_uses=2;
4. log_not_found指令
语法: log_not_found on | off;
默认值: log_not_found on;
配置段: http, server, location
是否在error_log中记录不存在的错误。默认是。

5. log_subrequest指令
语法: log_subrequest on | off;
默认值: log_subrequest off;
配置段: http, server, location
是否在access_log中记录子请求的访问日志。默认不记录。

6. rewrite_log指令
由ngx_http_rewrite_module模块提供的。用来记录重写日志的。对于调试重写规则建议开启。 Nginx重写规则指南
语法: rewrite_log on | off;
默认值: rewrite_log off;
配置段: http, server, location, if
启用时将在error log中记录notice级别的重写日志。

7. error_log指令
语法: error_log file | stderr | syslog:server=address[,parameter=value] [debug | info | notice | warn | error | crit | alert | emerg];
默认值: error_log logs/error.log error;
配置段: main, http, server, location
配置错误日志。

## 问题
- [Nginx出现403 forbidden](https://blog.csdn.net/qq_35843543/article/details/81561240)
    + 由于启动用户和nginx工作用户不一致所致: 查看nginx的启动用户，发现是nobody，而为是用root启动的
- [Nginx访问日志（access_log）配置](https://www.cnblogs.com/xuyuQAQ/p/8728773.html)
    + Nginx访问日志主要有两个参数控制
    + log_format #用来定义记录日志的格式（可以定义多种日志格式，取不同名字即可）
    + access_log #用来指定日至文件的路径及使用的何种日志格式记录日志
- [编译安装nginx却requires the PCRE library](https://www.cnblogs.com/crxis/p/6973232.html)
    + 需要安装pcre的devel包，pcre-devel。使用yum安装即可：（以下命令还带有ssl、zlib等依赖的安装）
    + `yum -y install zlib zlib-devel openssl openssl--devel pcre pcre-devel`

[1]: https://blog.csdn.net/xuanjiewu/article/details/79458266 '使用Nginx实现反向代理'
[2]: https://blog.csdn.net/zhaoxiaohua125/article/details/78751953 '关于nginx+tomcat搭建反向代理时加载静态资源找不到的问题'
[3]: http://blog.sina.com.cn/s/blog_98a2fcab0102xrup.html 'nginx配置问题导致url访问不带指定端口'
[4]: http://www.runoob.com/w3cnote/linux-nginx-tomcat.html 'Linux下Nginx+Tomcat负载均衡和动静分离配置要点'
[5]: https://www.cnblogs.com/sixiweb/p/3988805.html 'nginx配置反向代理示例'
[6]: http://www.ttlsa.com/nginx/use-nginx-proxy/ '搭建nginx反向代理用做内网域名转发'
[7]: http://www.cnblogs.com/anruy/p/4989161.html 'nginx反向代理原理和配置讲解'
[8]: https://blog.csdn.net/qq_35843543/article/details/81561240 'Nginx出现403 forbidden'