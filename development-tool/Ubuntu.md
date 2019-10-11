# Ubuntu
<!-- @author DHJT 2018-03-12 -->

## Ubuntu服务器版本
安装包中包含了LAMP、Mail服务器、Mysql、Samba、Postgresql、以及OpenSSH等；
- 密码：`123456`;2018-03-12
```sh
# 给 root 用户设一个密码， ubuntu 默认是不开启 root 账户的
sudo passwd root
# 修改用户名
# 修改机器名；/etc/hostname;/etc/hosts
```
ubuntu 18.04不能直接修改/etc/hostname中主机名称,重启后又恢复到安装时设置的主机名称.正确的修改步骤如下:
1.首先修改/etc/cloud/cloud.cfg

sudo vim /etc/cloud/cloud.cfg
#找到preserve_hostname: false修改为preserve_hostname: ture
2.修改主机名(永久)

```sh
#修改主机名(临时)
#hostname master

#修改主机名(永久)
sudo vim /etc/hostname
#然后改为需要的主机名后存盘退出

#映射主机名
sudo vim /etc/hosts
#192.168.1.xxx 主机名
sudo reboot
```
重启后新的主机名就生效了,但是要注意不能将还原preserve_hostname: false,否则下次重新后主机名又被覆盖了.
3.其它
```sh
#查看主机名
uname -a
#主机名实际存储在/proc/sys/kernel/hostname,但是不能修改
cat /proc/sys/kernel/hostname
```

### ubuntu设置静态ip
```sh
# Ubuntu 18.04不再使用ifupdown配置网络，而改用netplan。在/etc/network/interfaces配置固定IP是无效的，重启网络的命令services network restrart或/etc/init.d/networking restart也是无效的。
sudo vim /etc/netplan/50-cloud-init.yaml
```

`AppImage`是新型的打包软件，它可以解决Linux上面的依赖问题。

[1]: https://www.jb51.net/article/145542.htm '基于Ubuntu 18.04配置固定IP的方法教程'
[2]: https://blog.csdn.net/kmblack1/article/details/80931286 'Ubuntu 18.04 修改主机名'