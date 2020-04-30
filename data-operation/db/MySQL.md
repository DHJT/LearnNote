# MySQL
<!-- @author DHJT 2019-10-16 -->

## 安装
- Mysql 5.7 windows安装 zip安装[^3]

### 注意
- mysql 不支持全连接查询，即`表1 full (outer) join 表2 on [condition]`
- zeroDateTimeBehavior=convertToNull
- useUnicode=true
- characterEncoding=utf-8
- allowMultiQueries=true

### 连接sql
```sql
-- mysql -P3307 -uroot -p123456
# 显示所有数据库
show databases
use [database name];
-- 显示当前库下的所有表
show tables;
show create database [database name];-- 查看数据库的编码方式
-- 显示数据表的结构：
describe 表名;
-- 删库和删表:
drop database 库名;
drop table 表名；
exit/quit -- 退出到终端命令行
```

### 查询更新
```sql
-- 如果是查询更新同一张表，MySql是不允许的，所以这里用INNER JOIN 引入内部关联表即可完后查询更新
UPDATE message_process2 mp
    INNER JOIN ( SELECT ICPN FROM message_process2 mp WHERE failture LIKE '%Connection refused%' AND status = 100 
    UNION 
    SELECT ICPN FROM message_process2 mp WHERE failture LIKE '%Read timed out%' AND status = 100  ) mp2
SET status = 1
WHERE mp.ICPN=mp2.ICPN AND status = 100

# update select 语句(注意:必须使用inner join)
# 语法 update a inner join (select yy from b) c on a.id =c.id set a.xx = c.yy
#SELECT knowledge_id,COUNT(0) nums FROM pro_base_timu_knowledge GROUP BY knowledge_id;
UPDATE pro_base_knowledge
INNER JOIN (
SELECT
knowledge_id,
COUNT(0) nums
FROM
pro_base_timu_knowledge
GROUP BY
knowledge_id
) b ON pro_base_knowledge.id = b.knowledge_id
SET pro_base_knowledge.timu_num = b.nums
```

### 动态SQL
```sql
set @sqlStr='select * from table where condition1 = ?';
prepare s1 for @sqlStr;
-- 如果有多个参数用逗号分隔
execute s1 using @condition1;
-- 手工释放，或者是 connection 关闭时， server 自动回收
deallocate prepare s1;
```

### Mysql锁详解（行锁、表锁、意向锁、Gap锁、插入意向锁）[^4]


### utf8mb4 & utf8 的区别
MySQL在5.5.3之后增加了这个utf8mb4的编码，mb4就是most bytes 4的意思，专门用来兼容四字节的unicode。好在utf8mb4是utf8的超集，除了将编码改为utf8mb4外不需要做其他转换。当然，为了节省空间，一般情况下使用utf8也就够了。

mysql支持的 utf8 编码最大字符长度为 3 字节，如果遇到 4 字节的宽字符就会插入异常了。三个字节的 UTF-8 最大能编码的 Unicode 字符是 0xffff，也就是 Unicode 中的基本多文种平面(BMP)。也就是说，任何不在基本多文本平面的 Unicode字符，都无法使用 Mysql 的 utf8 字符集存储。包括 Emoji 表情(Emoji 是一种特殊的 Unicode 编码，常见于 ios 和 android 手机上)，和很多不常用的汉字，以及任何新增的 Unicode 字符等等(utf8的缺点)。

### EXPLAIN 分析sql语句执行效率
1、开启慢查询日志，设置超过几秒为慢SQL，抓取慢SQL
2、通过explain对慢SQL分析（重点）
3、show profile查询SQL在Mysql服务器里的执行细节和生命周期情况（重点）
4、对数据库服务器的参数调优

### 索引
索引是在存储引擎中实现的，因此每种存储引擎的索引都不一定完全相同，并且每种存储引擎也不一定支持所有索引类型。
根据存储引擎定义每个表的最大索引数和最大索引长度。所有存储引擎支持每个表至少16个索引，总索引长度至少为256字节。
大多数存储引擎有更高的限制。MySQL中索引的存储类型有两种：BTREE和HASH，具体和表的存储引擎相关；
MYISAM和InnoDB存储引擎只支持BTREE索引；MEMORY和HEAP存储引擎可以支持HASH和BTREE索引

### 备份
```sql
-- 需要开启日志记录 mysql.general_log
SELECT * from mysql.general_log ORDER BY event_time DESC;
```

### 错误
- `[Err] 1093 - You can't specify target table 'bbb_copy' for update in FROM clause`[^1]
- MySQL—JDBC出现The server time zone value '???ú±ê×??±??' is unrecognized or represents more...的错误提示[^2]
    + 解决方法：JDBC连接的URL后面加上`serverTimezone = GMT`，如果需要使用`GMT + 8`时区，需要写成`GMT％2B8`。

#### mysql is not allowed to connect to this MySQL server解决方案
在检查mysql服务开启后，3306端口也已经开放后连接数据库报"is not allowed to connect to this MySQL server"错误，
这种情况是因为MySQL安装完毕后不允许远程登录

解决方法如下：

1.执行 mysql -u root -p，然后输入密码登陆mysql
2.授权法。使用myuser使用mypassword从任何主机连接到mysql服务器。
执行：`GRANT ALL PRIVILEGES ON *.* TO 'myuser'@'%' IDENTIFIED BY 'mypassword' WITH GRANT OPTION;`
3.执行：`FLUSH PRIVILEGES;`
4.此时可以使用myuser用户，mypassword密码远程登陆mysql服务器了


[为什么MariaDB更优于MySQL](https://cloud.tencent.com/developer/article/1140522)

[^1]: [sql异常及解决方法[Err] 1093 - You can't specify target table 'bbb_copy' for update in FROM clause](https://blog.csdn.net/qq_35216516/article/details/80524652)
[^2]: [MySQL—JDBC出现The server time zone value '???ú±ê×??±??' is unrecognized or represents more...的错误提示](https://blog.csdn.net/weixin_39126856/article/details/90766822)
[^3]: [Mysql 5.7 windows安装 zip安装](https://www.cnblogs.com/FlyJeans/p/10658386.html)
[^4]: [Mysql锁详解（行锁、表锁、意向锁、Gap锁、插入意向锁）](https://blog.csdn.net/u010841296/article/details/84204701)

[1]: https://www.cnblogs.com/HeiDi-BoKe/p/11531582.html 'MySQL5.7.27报错“[Warning] Using a password on the command line interface can be insecure.”在命令行使用密码不安全警告'