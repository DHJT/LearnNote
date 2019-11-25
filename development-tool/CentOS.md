# CentOS
<!-- @author DHJT 2019-02-27 -->

centos7如何关闭ipv6仅使用ipv4
centos7.0查看IP

```sh
# 开放端口
firewall-cmd --zone=public --add-port=5672/tcp --permanent   # 开放5672端口
firewall-cmd --zone=public --remove-port=5672/tcp --permanent  #关闭5672端口
firewall-cmd --reload   # 配置立即生效
# 查看防火墙所有开放的端口
firewall-cmd --zone=public --list-ports
# 关闭防火墙
systemctl stop firewalld.service
# 查看防火墙状态
firewall-cmd --state
# 查看监听的端口
netstat -lnpt
# 检查端口被哪个进程占用
netstat -lnpt | grep 5672
# 查看进程的详细信息
ps 6832
# 中止进程
kill -9 6832
```

## 安装
```sh
# 查找软件
rpm -qa|grep vim
yum -y install vim*
# yum-config-manager命令找不到的解决方法
yum -y install yum-utils
```

### 添加开机启动服务/脚本
```sh
systemctl enable jenkins.service #设置jenkins服务为自启动服务
systemctl start  jenkins.service #启动jenkins服务
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

### 7下防火墙
```sh
# 绿色字样标注的“active（running）”，说明防火墙是开启状态 disavtive（dead）的字样，说明防火墙已经关闭
systemctl status firewalld.service
# 一旦重启操作系统，防火墙就自动开启了
systemctl stop firewalld.service
# 禁止防火墙服务器
systemctl disable firewalld.service
```

### 7下的启用静态IP以及

默认情况下不能使用直接联网，需要配置才可

### Linux CentOS 7电源管理设置（合盖不睡眠）

有时候需要：合上笔记本盖子（显示屏关闭），但是远程在操作此机器，则希望合盖不睡眠（包括网络正常使用）
```sh
# gedit /etc/systemd/logind.conf  很多地方看的是system!!到处抄;这里是Centos7.2!在systemd目录!!!
vim /etc/systemd/logind.conf
#HandlePowerKey按下电源键后的行为，默认power off
#HandleSleepKey 按下挂起键后的行为，默认suspend
#HandleHibernateKey 按下休眠键后的行为，默认hibernate
#HandleLidSwitch 合上笔记本盖后的行为，默认suspend   （改为lock；即合盖不休眠）在原文件中，还要去掉前面的#
HandleLidSwitch=lock
# 运行：生效。
systemctl restart systemd-logind
```

### 连接无线
```sh
wpa_supplicant -B -i wlp9s0 -c <(wpa_passphrase "Xiaomi_1402" "xm13939761503")
```

### 安装 java
```sh
vi /etc/profile
source /etc/profile
# 添加如下两行并保存
export JAVA_HOME=/root/jdk1.8.0_211
export PATH=$PATH:$JAVA_HOME/bin
```

[1]: https://blog.csdn.net/xiaoyu19910321/article/details/78504400 'CentOS 7如何连接无线网络'
[2]: https://www.cnblogs.com/startcentos/p/6147444.html '【centos7】添加开机启动服务/脚本'