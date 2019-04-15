# Sql Server
- 远程连接时，注意关闭**防火墙**。
- 备份。
    + 定时自动备份。
        * 首先需要启动SQL Server Agent服务，这个服务如果不启动是无法运行新建作业的，
        * 点击“开始”–“所有程序”–“Microsoft SQL Server 2008”–“启动SQL Server Management Studio”登录数据库
        * 点击管理–维护计划–右击维护计划向导
        * 注意：在利用SQL SQLSERVER 2008 的维护计划对数据库进行定期的备份时要启动“SQL SERVER 代理”服务。
    + 手动备份：
- 还原。
    + 增量还原数据。

### `sql server`数据导入/导出
#### 导入数据
- Excel：任务-导入数据-Excel；
- 注意：
    + 数据中是否包含特定字符
    + long型数据转成非科学计数表示形式：小数位位0；
#### 导出数据

### Like特殊情况：搜索通配符字符
上面的搜索可以针对普通的汉字或中文，那如果遇到上述四种通配符要被搜到时应该如何处理呢？首先需注意的是通配符字符可以搜索，并且有两种方法可指定平常用作通配符的字符：

使用 ESCAPE 关键字定义转义符。在模式中，当转义符置于通配符之前时，该通配符就解释为普通字符。例如，要搜索在任意位置包含字符串 5% 的字符串，请使用：

WHERE ColumnA LIKE '%5/%%' ESCAPE '/'
在上述 LIKE 子句中，前导和结尾百分号 (%) 解释为通配符，而斜杠 (/) 之后的百分号解释为字符%。

在方括号 ([ ]) 中只包含通配符本身。要搜索破折号 (-) 而不是用它指定搜索范围，请将破折号指定为方括号内的第一个字符：

WHERE ColumnA LIKE '9[-]5'
下表显示了括在方括号内的通配符的用法。

### General
- `text`类型字段转成varchar：`CAST(item.OCRTEXT as varchar(MAX))`
``` sql
-- 将一对多中多个字段值匹配到一个字段值 ——查询
SELECT (select stuff((select ',''' +cast(item.OCRTEXT as varchar(MAX))+'''' from T_QR_FILE_WSDA_DOC as item where item.OWNER_ID=w.ID group by cast(item.OCRTEXT as varchar(MAX)) for xml  path('')
        ),1,1,'') as item) as itemTitle from T_QR_FILE_WSDA as w ;
-- 将一对多中多个字段值匹配到一个字段值   ——更新
update qrda_gass.dbo.T_QR_FOLDER_WSDA  SET ITEM_TITLES=(select stuff((select ',''' +item.TITLE+'''' from T_QR_FOLDER_ITEM_WSDA as item  where item.OWNER_ID=T_QR_FOLDER_WSDA.ID  group by item.TITLE for xml  path('')),1,1,'') as item);
```

### `DBCC`命令
#### DBCC 性能调节命令
- DBCC dllname(FREE) ：在内存中卸载指定的扩展过程动态链接库（.dll)
- sp_helpextendedproc 查看加载的扩展PROC 
- DBCC DROPCLEANBUFFERS ：从缓冲池中删除所有缓冲区
- DBCC FREEPROCCACHE ：从执行计划缓冲区删除所有缓存的执行计划
- DBCC INPUTBUFFER ：显示从客户机发送到服务器的最后一个语句
- DBCC OPENTRAN (db_name) ：查询某个数据库执行时间最久的事务，由哪个程序拥有
- DBCC SHOW_STATISTICS ：显示指定表上的指定目标的当前统计信息分布
- DBCC SHOWCONTIG ：显示指定表的数据和索引的碎片信息
- DBCC SQLPERF (logspace) ：查看各个DB的日志情况
- (iostats) 查看IO情况
- (threads) 查看线程消耗情况
- 返回多种有用的统计信息 
- DBCC CACHESTATS ：显示SQL Server 2000内存的统计信息
- DBCC CURSORSTATS ：显示SQL Server 2000游标的统计信息
- DBCC MEMORYSTATS ：显示SQL Server 2000内存是如何细分的
- DBCC SQLMGRSTATS ：显示缓冲区中先读和预读准备的SQL语句
