# SQL
<!-- © 2017-04-19 DHJT -->

## 基础知识
- **SQL**中`group by`语句中，只能查询`group by`后面出现的分组字段.
``` sql
-- sqlserver
select DATEADD(day, KEEP_DAY,GETDATE()),
DATEDIFF(day, DATEADD(day, KEEP_DAY,GETDATE()),GETDATE()),
CONVERT(VARCHAR(50),KEEP_DATE,112),
DATEADD(day,KEEP_Day, KEEP_DATE)
FROM [qrda_fy].[dbo].[T_QR_ENTITY_BORROW]
order by STATUS desc
```
- 'split'伪实现：SUBSTRING(STR_05,1,charindex('-',STR_05+'-')-1)
- SUBSTRING ( expression, start, length )
    + 如果 start的索引是从1开始，则从表达式的第一个字符开始进行字符串截取，从2开始就从表达式的第二个字符开始截取，以此类推。
    + 如果start的索引是从小于1（0或负数）开始，则返回长度等于从1开始,截取长度为 length - ((start - 1)的绝对值)， 如果这个差为负数就返回空。

```sql
-- 获取当前的日期：yyyymmdd hh:MM:ss。
select GETDATE();
select CONVERT(nvarchar(12), GETDATE(), 112);
-- 获取当前年份、月份、日、小时、分钟、秒、当前第几周  YEAR/YY/MM/DD/hh/MI/SECOND/WEEK/WEEKDAY
select Datename(YEAR, GETDATE());
```

|           隔离级别           | 脏读（Dirty Read） | 不可重复读（NonRepeatable Read） | 幻读（Phantom Read） |
|------------------------------|--------------------|----------------------------------|----------------------|
| 未提交读（Read uncommitted） | 可能               | 可能                             | 可能                 |
| 已提交读（Read committed）   | 不可能             | 可能                             | 可能                 |
| 可重复读（Repeatable read）  | 不可能             | 不可能                           | 可能                 |
| 可串行化（Serializable ）    | 不可能             | 不可能                           | 不可能               |

### 数据库锁
共享锁，又称为读锁，获得共享锁之后，可以查看但无法修改和删除数据。
排他锁，又称为写锁、独占锁，获得排他锁之后，既能读数据，又能修改数据。

#### 加锁原则
拿MySql的InnoDB引擎来说，对于insert、update、delete等操作。会自动给涉及的数据加排他锁；
对于一般的select语句，InnoDB不会加任何锁，事务可以通过以下语句给显示加共享锁或排他锁。
```sql
共享锁：SELECT ... LOCK IN SHARE MODE;
排他锁：SELECT ... FOR UPDATE;
```

### 连接查询
```sql
-- 1. 内连接查询 inner join on
-- -- 产生的结果是AB的交集
-- 2. 左外连接查询 left outer join
-- -- 产生表A的完全集，而B表中匹配的则有值，没有匹配的则以null值取代。
-- 3. 右外连接查询 right outer join
-- -- 产生表B的完全集，而A表中匹配的则有值，没有匹配的则以null值取代。
-- 4. 全连接查询 full (outer) join
-- -- 产生A和B的并集。对于没有匹配的记录，则会以null做为值。
-- 5. 交叉连接查询 cross join on
-- 5.1 笛卡尔积
-- 5.2 select * from user,role;
```

### UNION ALL
使用时需要字段对应，语句中不能存在 order by 语句

### Like特殊情况：搜索通配符字符
使用`ESCAPE`关键字定义转义符。在模式中，当转义符置于通配符之前时，该通配符就解释为普通字符。例如，要搜索在任意位置包含字符串 5% 的字符串，请使用：

`WHERE ColumnA LIKE '%5/%%' ESCAPE '/'`
在上述 LIKE 子句中，前导和结尾百分号 (%) 解释为通配符，而斜杠 (/) 之后的百分号解释为字符%。
在方括号 ([ ]) 中只包含通配符本身。要搜索破折号 (-) 而不是用它指定搜索范围，请将破折号指定为方括号内的第一个字符：

`WHERE ColumnA LIKE '9[-]5'`

### 数据库操作
``` sql
---删除数据库
drop database qrda_wa;
-- 创建数据库
CREATE DATABASE database_name
```
### 表TABLE
``` sql
-- 创建表，删除表
DROP TABLE IF EXISTS `li_comment`;
CREATE TABLE `li_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) DEFAULT NULL COMMENT '文章id',
  `author` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `qq` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `belongid` int(11) DEFAULT '0' COMMENT '回复的评论id',
  `dig` int(11) DEFAULT '0',
  `tipoff` int(11) DEFAULT '0' COMMENT '举报',
  `createtime` datetime DEFAULT NULL,
  `pic` varchar(255) COLLATE utf8_bin DEFAULT '' COMMENT '头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 不存在就创建
Create Table IF NOT EXISTS datas (
    'Key' VARCHAR(64) PRIMARY KEY,
    'Value' VARCHAR
);
-- 删除表中数据
DELETE qrda_fy.dbo.T_QR_BORROW
-- 修改列
ALTER TABLE Table1 ALTER COLUMN column1 VARCHAR(255);
-- 添加/删除列
ALTER TABLE Person ADD/DROP COLUMN Birthday
```
### 视图VIEW
``` sql
CREATE VIEW V_Visit_Reading AS
(
  SELECT * FROM T_Visit_Reading A LEFT JOIN 
    T_QR_FOLDER_SSDA B ON A.Reading_AID = B.ID
)

---------   查看视图名 
sp_helptext   视图
---------修改视图 
ALTER VIEW [dbo].[View_Orginization]
AS
SELECT    *
FROM         [qrdazyfwq].dbo.T_QR_ORGINIZATION
```
### 索引
``` sql
--ALTER TABLE用来创建普通索引、UNIQUE索引或PRIMARY KEY索引。
ALTER TABLE table_name ADD INDEX index_name (column_list)
ALTER TABLE table_name ADD UNIQUE (column_list)
ALTER TABLE table_name ADD PRIMARY KEY (column_list)
```
- 聚簇索引/非聚簇索引
- [视图创建索引](http://www.cnblogs.com/anncesky/articles/2441583.html)
    + 会有数据更新不及时的问题（实际就是建立表）

## 有效的sql实例：
``` sql
SELECT t.REF,t1.Archive_Name
  FROM qrda_rd.dbo.T_QR_FOLDER_WSDA t,QR_RenDaA.dbo.T_Archive t1
  WHERE t.REF=t1.Archive_Name

UPDATE qrda_rd.dbo.T_QR_FOLDER_WSDA SET DAZL = (SELECT rdjb FROM QR_RenDaA.dbo.T_Archive WHERE REF=Archive_Name)

SELECT DAZL,INT_01,MIN(YEAR_CODE)+'-'+MAX(YEAR_CODE) AS y from qrda_rd.dbo.T_QR_FOLDER_WSDA WHERE DAZL IS NOT NULL GROUP BY DAZL,INT_01 ORDER BY INT_01

-- 从一张表修改另一张表的值
UPDATE qrda_rd.dbo.T_QR_FILE_WSDA SET
  BOX_NO = YEAR_CODE+'-'+RIGHT('0000'+cast(S.qr_hh AS varchar(10)),4)
FROM QR_RenDaA.dbo.T_YWYJ S
JOIN qrda_rd.dbo.T_QR_FILE_WSDA T ON S.qr_dh = T.REF
-- 一次插入多条数据
INSERT INTO scheduler.t_schedule_task_log
(job_key, task_key, task_msg, task_status, task_handle_time, task_handle_finished_time, create_time)
VALUES( 'test-1', '', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
( 'test-2', '', '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

```
- 模糊查询。
    + _ ： 表示任意单个字符。
    + % ：表示任意0个或多个字符。
    + [ ] ：表示括号内所列字符中的一个（类似正则表达式）。
    + [^ ] ：表示不在括号所列之内的单个字符。
    + 查询内容包含通配符时：由于通配符的缘故，导致我们查询特殊字符“%”、“_”、“[”的语句无法正常实现，而把特殊字符用“[ ]”括起便可正常查询。
``` sql
LIKE '%pattern%';
SELECT * FROM [user] WHERE u_name LIKE '[张李王]三';
```
- 日期处理。
    + 字符串日期。

### 游标(Cursor)
- MYSQL 函数，会发现无法使用返回多行结果的语句。但如果你又确实想要使用时，就需要使用到游标，游标可以帮你选择出某个结果（这样就可以做到返回单个结果）。
- 另外，使用游标也可以轻易的取出在检索出来的行中前进或后退一行或多行的结果。
- 游标可以遍历返回的多行结果。
- MYSQL 中游标只适用于存储过程以及函数。
```sql
create procedure p1()
begin
    declare id int;
    declare name varchar(15);
    -- 声明游标
    declare mc cursor for select * from class;
    -- 打开游标
    open mc;
    -- 获取结果
    fetch mc into id,name;
    -- 这里是为了显示获取结果
    select id,name;
    -- 关闭游标
    close mc;
end;

create procedure p3()
begin
    declare id int;
    declare name varchar(15);
    declare flag int default 0;
    -- 声明游标
    declare mc cursor for select * from class;
    declare continue handler for not found set flag = 1;
    -- 打开游标
    open mc;
    -- 获取结果
    l2:loop

    fetch mc into id,name;
    if flag=1 then -- 当无法fetch会触发handler continue
        leave l2;
    end if;
    -- 这里是为了显示获取结果
    insert into class2 values(id,name);
    -- 关闭游标
    end loop;
    close mc;

end;

call p3();-- 不报错
select * from class2;
```

### 分页查询
- MySQL分页查询
```sql
/*
* sql:可以是单表的查询语句，也可以是多表的联合查询语句
* firstIndex:其实的索引
* pageSize:每页显示的记录数
*/
SELECT o.* FROM (sql) o LIMIT firstIndex,pageSize
```
- sqlserver2005分页查询
    +  在sqlserver2005之前一直借助top关键字来实现分页查询，不过效率低，在sqlserver2005及其之后的版本都使用row_number()解析函数来完成分页查询，效率有了很大的提高，不过sql语句比较复杂，下面给出分页查询的通式：
```sql
/*
* firstIndex:起始索引
* pageSize:每页显示的数量
* orderColumn:排序的字段名
* sql:可以是简单的单表查询语句，也可以是复杂的多表联合查询语句
*/
SELECT TOP pageSize o.* FROM (SELECT row_number() over(ORDER BY orderColumn) as rownumber,* from(sql) as o where rownumber>firstIndex;
```
- oracle分页查询
    + ROWNUM查询分页通式：
```sql
/*
* firstIndex:起始索引
* pageSize:每页显示的数量
* sql:可以是简单的单表查询语句，也可以是复杂的多表联合查询语句
*/
select * from(select a.*,ROWNUM rn from(sql) a where ROWNUM<=(firstIndex+pageSize)) where rn>firstIndex
```
    + row_number()解析函数分页查询通式：
```sql
/*
* firstIndex:起始索引
* pageSize:每页显示的数量
* orderColumn:排序的字段名
* sql:可以是简单的单表查询语句，也可以是复杂的多表联合查询语句
*/
select * from(select * from(select t.*,row_number() over(order by orderColumn) as rownumber from(sql) t) p where p.rownumber>firstIndex) where rownum<=pageSize
```

## sql查询数据库,发现的确是大小不敏感 。
#### 通过查询资料发现需要设置collate（校对）。collate规则：
- *_bin: 表示的是binary case sensitive collation，也就是说是区分大小写的
- *_cs: case sensitive collation，区分大小写
- *_ci: case insensitive collation，不区分大小写

#### 解决方法。
1. 可以将查询条件用binary()括起来。`select  * from TableA  where  columnA like binary('aaa');`
2. 可以修改该字段的collation 为 binary
``` sql
ALTER TABLE TABLENAME MODIFY COLUMN COLUMNNAME VARCHAR(50) BINARY CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL;
```

## 高级功能
- 透明网关（Transparent Gateway）
    + racle利用透明网关的技术实现与SQL Server和DB2等多种数据库互联
- SQL Server使用的LINKED SERVER，通过ODBC与其他类型的数据库互联。

## 性能优化
- [大数据量查询优化——数据库设计、SQL语句、JAVA编码](http://www.cnblogs.com/zhoubang521/p/5200169.html)

## 数据库差异
| 数据库    | 表名长度限制 | 字段名长度限制 |
| --------  | -----:       | :----:         |
| oracle    | 30           | 30             |
| mysql     | 64           | 64             |
| db2       | 128          | 128            |
| access    | 64           | 64             |
| sqlserver | 128          | 128            |

* On Oracle 12.2, you can use built-in constant, ORA_MAX_NAME_LEN, set to 128 bytes (as per 12.2) Prior to Oracle 12.1 max size was 30 bytes.
- `Oracle`
    + boolean：Number(1),Char(1)
    + 标识符，即用户自定义的关键词，比较表名、字段名、视图名、序列名、主键等，表名也属于标识符,最大长度在Oracle中是30个字符
    + 顺序问题(非空约束与默认值约束)：`IS_SHOW varchar2(50) DEFAULT ((0)) NOT NULL `
    + 授予视图权限：`grant create any view,select any table to da;`
- `Mysql`
    + `create or replace view`
- `Sql server`:
    + `if exists`
```sql
-- 数据库连接性能查看
-- -- Sqlserver
SELECT * FROM
[Master].[dbo].[SYSPROCESSES] WHERE [DBID] IN (
    SELECT [DBID]
    FROM [Master].[dbo].[SYSDATABASES]
    WHERE NAME='qrda_rd'
)
```
