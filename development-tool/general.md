# general
<!-- @author DHJT 2020-06-22 -->

## Mysql

### 重装系统后的MySQL恢复
所有的应用程序都在E盘安装的，MySQL也不例外，所以需要恢复的话，执行下面几步就行：
1、系统操作路径：需要重新配一下系统的环境变量，在path变量后面加上这一行 `E:\MySQL\mysql-5.7.25-winx64\bin;`注意分号；
2、启动控制台，注意用超级管理员权限运行cmd，执行下列指令：
```sh
mysqld --install mysql --defaults-file="E:\MySQL\mysql-5.7.25-winx64\my.ini" 
```
3、启动MySQL服务：`net start mysql`

PS：文件路径部分可以根据需要修改。

## Windows
windows10 的下载更新位置为`C:\Windows\SoftwareDistribution`；
禁止更新可以禁止这个文件夹或者下面的`Download`文件的所有操作权限：写入、读取等；

