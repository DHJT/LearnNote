# MySQL
<!-- @author DHJT 2019-10-16 -->

## 安装
- Mysql 5.7 windows安装 zip安装[^3]

### 注意
- mysql 不支持全连接查询，即`表1 full (outer) join 表2 on [condition]`

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

### EXPLAIN 分析sql语句执行效率


1、开启慢查询日志，设置超过几秒为慢SQL，抓取慢SQL
2、通过explain对慢SQL分析（重点）
3、show profile查询SQL在Mysql服务器里的执行细节和生命周期情况（重点）
4、对数据库服务器的参数调优

### 错误
- `[Err] 1093 - You can't specify target table 'bbb_copy' for update in FROM clause`[^1]
- MySQL—JDBC出现The server time zone value '???ú±ê×??±??' is unrecognized or represents more...的错误提示[^2]
    + 解决方法：JDBC连接的URL后面加上`serverTimezone = GMT`，如果需要使用`GMT + 8`时区，需要写成`GMT％2B8`。

[为什么MariaDB更优于MySQL](https://cloud.tencent.com/developer/article/1140522)

[^1]: [sql异常及解决方法[Err] 1093 - You can't specify target table 'bbb_copy' for update in FROM clause](https://blog.csdn.net/qq_35216516/article/details/80524652)
[^2]: [MySQL—JDBC出现The server time zone value '???ú±ê×??±??' is unrecognized or represents more...的错误提示](https://blog.csdn.net/weixin_39126856/article/details/90766822)
[^3]: [Mysql 5.7 windows安装 zip安装](https://www.cnblogs.com/FlyJeans/p/10658386.html)