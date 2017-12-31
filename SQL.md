© 2017-04-19 DHJT
## 基础知识
- **SQL**中`group by`语句中，只能查询`group by`后面出现的分组字段.
``` sql 
//sqlserver
select DATEADD(day, KEEP_DAY,GETDATE()),
DATEDIFF(day, DATEADD(day, KEEP_DAY,GETDATE()),GETDATE()),
CONVERT(VARCHAR(50),KEEP_DATE,112),
DATEADD(day,KEEP_Day, KEEP_DATE)
FROM [qrda_fy].[dbo].[T_QR_ENTITY_BORROW]
order by STATUS desc
```
- 'split'伪实现：SUBSTRING(STR_05,1,charindex('-',STR_05+'-')-1)

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
  where t.REF=t1.Archive_Name
  
update qrda_rd.dbo.T_QR_FOLDER_WSDA set DAZL = (select rdjb from QR_RenDaA.dbo.T_Archive where REF=Archive_Name)

Select DAZL,INT_01,MIN(YEAR_CODE)+'-'+MAX(YEAR_CODE) AS y from qrda_rd.dbo.T_QR_FOLDER_WSDA where DAZL is not null GROUP BY DAZL,INT_01 ORDER BY INT_01

-- 从一张表修改另一张表的值
UPDATE qrda_rd.dbo.T_QR_FILE_WSDA SET
  BOX_NO = YEAR_CODE+'-'+RIGHT('0000'+cast(S.qr_hh as varchar(10)),4)
FROM QR_RenDaA.dbo.T_YWYJ S
JOIN qrda_rd.dbo.T_QR_FILE_WSDA T ON S.qr_dh = T.REF
```
- 模糊查询。
    + _ ： 表示任意单个字符。
    + % ：表示任意0个或多个字符。
    + [ ] ：表示括号内所列字符中的一个（类似正则表达式）。
    + [^ ] ：表示不在括号所列之内的单个字符。
    + 查询内容包含通配符时：由于通配符的缘故，导致我们查询特殊字符“%”、“_”、“[”的语句无法正常实现，而把特殊字符用“[ ]”括起便可正常查询。
``` sql
like '%pattern%';
SELECT * FROM [user] WHERE u_name LIKE '[张李王]三';
```
- 日期处理。
    + 字符串日期。

### 分页查询
- MySQL分页查询
```sql
/*
* sql:可以是单表的查询语句，也可以是多表的联合查询语句
* firstIndex:其实的索引
* pageSize:每页显示的记录数
*/
select o.* from (sql) o limit firstIndex,pageSize
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
select top pageSize o.* from (select row_number() over(order by orderColumn) as rownumber,* from(sql) as o where rownumber>firstIndex;
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
| 数据库        | 表名长度限制    |  字段名长度限制  |
| --------   | -----:   | :----: |
| oracle        | 30      |   30    |
| mysql        | 64      |   64    |
| db2        | 128      |   128    |
| access        | 64      |   64    |
| sqlserver        | 128      |   128    |

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
