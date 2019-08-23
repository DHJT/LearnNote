# MariaDB
<!-- @author DHJT 2018-12-17 -->

## 安装
- [Installing MariaDB Windows ZIP Packages][3]

### 配置
在 `/***/data/***.err` 文件中看到了启动报错信息：

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

[1]: https://mariadb.com/kb/en/library/upgrading-mariadb-on-windows/ 'Upgrading MariaDB on Windows'
[2]: https://mariadb.com/kb/en/library/upgrading-between-minor-versions-on-linux/ 'Upgrading Between Minor Versions on Linux'
[3]: https://mariadb.com/kb/en/library/installing-mariadb-windows-zip-packages/ 'Installing MariaDB Windows ZIP Packages'
[4]: https://cloud.tencent.com/developer/article/1345160 '2018-09-10 MariaDB和MySQL全面对比：选择数据库需要考虑这几点'