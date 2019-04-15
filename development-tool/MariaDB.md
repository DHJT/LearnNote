# MariaDB
<!-- @author DHJT 2018-12-17 -->

## 安装
- [Installing MariaDB Windows ZIP Packages][3]

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

[1]: https://mariadb.com/kb/en/library/upgrading-mariadb-on-windows/ 'Upgrading MariaDB on Windows'
[2]: https://mariadb.com/kb/en/library/upgrading-between-minor-versions-on-linux/ 'Upgrading Between Minor Versions on Linux'
[3]: https://mariadb.com/kb/en/library/installing-mariadb-windows-zip-packages/ 'Installing MariaDB Windows ZIP Packages'
[4]: https://cloud.tencent.com/developer/article/1345160 '2018-09-10 MariaDB和MySQL全面对比：选择数据库需要考虑这几点'