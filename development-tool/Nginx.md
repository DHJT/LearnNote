# Nginx应用基础
<!-- @author DHJT 2017-07-13 -->
> 俄罗斯程序设计师`Igor Sysoev`
> 轻量级的Web服务器/反向代理服务器及电子邮件、TCP/UDP代理服务器，在BSD-like协议下发行。
> 特点：占用内存少，并发能力强。
> 百度、新浪、网易、腾讯等。
> http://ngix.org/

## 启动关闭nginx
- `nginx`,启动Nginx,默认监听80端口
    + `windows`下可以使用`start .\nginx.exe`启动
- `ngix -s stop`,快速停止服务器
- `nginx -s quit`,停止服务器，但要等到请求处理完毕后关闭
- 'nginx -s reload',重新加载配置文件。

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
## Apache backend for www.quancha.cn ##
upstream apachephp  {
    server ip:8080; #Apache
}

## Start www.quancha.cn ##
server {
    listen 80;
    server_name  www.quancha.cn;

    access_log  logs/quancha.access.log  main;
    error_log  logs/quancha.error.log;
    root   html;
    index  index.html index.htm index.php;

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

[1]: https://blog.csdn.net/xuanjiewu/article/details/79458266 '使用Nginx实现反向代理'
[2]: https://blog.csdn.net/zhaoxiaohua125/article/details/78751953 '关于nginx+tomcat搭建反向代理时加载静态资源找不到的问题'
[3]: http://blog.sina.com.cn/s/blog_98a2fcab0102xrup.html 'nginx配置问题导致url访问不带指定端口'
[4]: http://www.runoob.com/w3cnote/linux-nginx-tomcat.html 'Linux下Nginx+Tomcat负载均衡和动静分离配置要点'
[5]: https://www.cnblogs.com/sixiweb/p/3988805.html 'nginx配置反向代理示例'
[6]: http://www.ttlsa.com/nginx/use-nginx-proxy/ '搭建nginx反向代理用做内网域名转发'
[7]: http://www.cnblogs.com/anruy/p/4989161.html 'nginx反向代理原理和配置讲解'