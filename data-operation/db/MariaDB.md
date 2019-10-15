# MariaDB
<!-- @author DHJT 2018-12-17 -->

## 安装
- [Installing MariaDB Windows ZIP Packages][3]
- [mysql_install_db.exe](https://mariadb.com/kb/en/library/mysql_install_dbexe/)
```sh
mysql_install_db.exe --datadir=C:\db --service=MyDB --password=secret
# 启动
sc start MyDB
sc stop <servicename>
sc delete <servicename>
rmdir /s /q <path-to-datadir>
```

### 配置
在 `/***/data/***.err` 文件中看到了启动报错信息：

默认是 gbk 和拉丁字符集，这种情况可能会造成外部访问数据乱码的问题。另外对于utf8格式来说有utf8和utf8mb4两种不同的集合。我们设置成utf8mb4.具体设置是：打开配置文件 `my-medium.ini`，找到下面相应的节点，添加相应的内容
```ini
# vim /etc/my.cnf
[client]
default-character-set=utf8mb4

[mysqld]
character-set-client-handshake = false
character_set_server = utf8mb4
character_set_filesystem = binary
character_set_client = utf8mb4
collation_server = utf8mb4_unicode_ci
init_connect='SET NAMES utf8mb4'

[mysqldump]
character_set_client=utf8mb

[mysql]
default-character-set=utf8mb4
```

## 升级
```sh
# 查看版本
mysql -v
# 运行在旧版本上的数据库实例升级到新版本
mysql_upgrade -u root -p

mysql_upgrade_service --service=MySQL
```
直接替换即可，保留原来胡配置文件，一般都是在用户文档文件下，与安装位置不在一起
- [Upgrading MariaDB on Windows][1]

## MySQL和MariaDB之间的迁移
需要根据不同的版本进行具体的升级策略

### MySQL和MariaDB之间的差异
- [2018-09-10 MariaDB和MySQL全面对比：选择数据库需要考虑这几点][4]

Mon Aug 19 20:42:39 CST 2019 WARN: Establishing SSL connection without server's identity verification is not recommended. According to MySQL 5.5.45+, 5.6.26+ and 5.7.6+ requirements SSL connection must be established by default if explicit option isn't set. For compliance with existing applications not using SSL the verifyServerCertificate property is set to 'false'. You need either to explicitly disable SSL by setting useSSL=false, or set useSSL=true and provide truststore for server certificate verification.

 utf8和utf8mb4的区别

一、简介

   MySQL在5.5.3之后增加了这个utf8mb4的编码，mb4就是most bytes 4的意思，专门用来兼容四字节的unicode。好在utf8mb4是utf8的超集，除了将编码改为utf8mb4外不需要做其他转换。当然，为了节省空间，一般情况下使用utf8也就够了。

   二、内容描述

   那上面说了既然utf8能够存下大部分中文汉字,那为什么还要使用utf8mb4呢? 原来mysql支持的 utf8 编码最大字符长度为 3 字节，如果遇到 4 字节的宽字符就会插入异常了。三个字节的 UTF-8 最大能编码的 Unicode 字符是 0xffff，也就是 Unicode 中的基本多文种平面(BMP)。也就是说，任何不在基本多文本平面的 Unicode字符，都无法使用 Mysql 的 utf8 字符集存储。包括 Emoji 表情(Emoji 是一种特殊的 Unicode 编码，常见于 ios 和 android 手机上)，和很多不常用的汉字，以及任何新增的 Unicode 字符等等(utf8的缺点)。

### 常见错误
- [MariaDB Error importing sql database: Row size too large (> 8126) ](https://community.centminmod.com/threads/error-importing-sql-database-row-size-too-large-8126.16129/)


[1]: https://mariadb.com/kb/en/library/upgrading-mariadb-on-windows/ 'Upgrading MariaDB on Windows'
[2]: https://mariadb.com/kb/en/library/upgrading-between-minor-versions-on-linux/ 'Upgrading Between Minor Versions on Linux'
[3]: https://mariadb.com/kb/en/library/installing-mariadb-windows-zip-packages/ 'Installing MariaDB Windows ZIP Packages'
[4]: https://cloud.tencent.com/developer/article/1345160 '2018-09-10 MariaDB和MySQL全面对比：选择数据库需要考虑这几点'