# aria2
<!-- @author DHJT 2019-01-23 -->
aria2 is a lightweight multi-protocol & multi-source command-line download utility. It supports HTTP/HTTPS, FTP, SFTP, BitTorrent and Metalink. aria2 can be manipulated via built-in JSON-RPC and XML-RPC interfaces.
## 安装
https://aria2.github.io/
https://github.com/aria2/aria2/releases/tag/release-1.34.0
下载后解压，配置环境变量后，即可以使用


## 使用
Very simple to use, no build scripts, no installation scripts. First start aria2 in the background either in your local machine or in a remote one. You can do that as follows:
```sh
# 01/29 14:14:28 [NOTICE] IPv4 RPC: listening on TCP port 6800
# 01/29 14:14:28 [NOTICE] IPv6 RPC: listening on TCP port 6800
$ aria2c --enable-rpc --rpc-listen-all
```

### WebUI-Aria2[^5]
```sh
# aria2c开启端口
$ aria2c --enable-rpc --rpc-listen-all
# GitHub中下载WebUI-Aria2的源码
$ cd webui-aria2
$ node node-server.js
```
`http://localhost:8888/`

[^1]: [aria2（命令行下载器）使用](https://www.jianshu.com/p/6e6a02e1f15e)
[^2]: [Aria2-不限速全平台下载利器](https://www.cnblogs.com/timhbw/p/6531176.html)
[^3]: [BaiduExporter](https://github.com/acgotaku/BaiduExporter)
[^4]: [无限制下载神器aria2](https://baijiahao.baidu.com/s?id=1595877979348356747&wfr=spider&for=pc)
[^5]: [https://github.com/ziahamza/webui-aria2/](https://github.com/ziahamza/webui-aria2/)