# CentOS
<!-- @author DHJT 2019-02-27 -->

centos7如何关闭ipv6仅使用ipv4
centos7.0查看IP

## 安装
```sh
# 查找软件
rpm -qa|grep vim
yum -y install vim*
# yum-config-manager命令找不到的解决方法
yum -y install yum-utils
```

### centos7修改hostname
```sh
ip addr
[root@centos7 ~]$ hostnamectl set-hostname centos77.magedu.com             # 使用这个命令会立即生效且重启也生效
[root@centos7 ~]$ hostname                                                 # 查看下
centos77.magedu.com
[root@centos7 ~]$ vim /etc/hosts                                           # 编辑下hosts文件， 给127.0.0.1添加hostname
[root@centos7 ~]$ cat /etc/hosts                                           # 检查
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4 centos77.magedu.com
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
```

### 7下的启用静态IP以及

默认情况下不能使用直接联网，需要配置才可