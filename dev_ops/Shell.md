# Shell命令
<!-- @author DHJT -->
```sh
sudo -i
netstat -anp | grep 80     # 查看80端口
netstat -nlpt| grep 80
ps aux|grep main
```

### 文件内容操作相关
```sh
# 查找指定文件中的指定字符串啊
more log_error.log |grep '多机构异常场景识别成功'
# 查看指定文件最后 n 行内容
tail -150f log_error.log
# ps查看进程信息并通过less分页显示
ps -ef |less
# 查看文件
less log2013.log

# 清空 /etc/test.txt 文档内容：
cat /dev/null > /etc/test.txt
```

## Shell输入输出功能和字符颜色设置
``` sh
#!/bin/bash
#test.sh
#shell输入功能
#echo本身输出一个空行（如果没有输出的内容）
#-e 输出后面有一个换行
echo -e "please input your name:"

echo -n "please input your name:"
read name
echo "my name is $name"

read -p 'please input your name :' name
echo $name

echo -e "httpd processs  \033[32;47m[OK]\033[0m"
#\033[前景颜色;背景颜色m
#\033[0m 恢复到系统默认的颜色
#前景(30-37)
#黑色　红色　绿色　棕色　蓝色　紫色　青色　白色
#背景(40-47)
#黑色　红色　绿色　棕色　蓝色　紫色　青色　白色
#heredoc
cat<<x
 please check:
     1) user1
     2) user2
     3) user3
x
#tee 边输出边保存
cat /etc/passwd|tee
#nl 将输出结果加上行号
cat /etc/passwd|head|nl
nl /etc/passwd
```
- MySQL批量插入数据脚本
``` sh
#!/bin/bash
i=1;
MAX_INSERT_ROW_COUNT=$1;
while [ $i -le $MAX_INSERT_ROW_COUNT ]
do
  mysql -uroot -proot dbname -e "insert into tablename (name,age,createTime) values ('HELLO$i',$i % 99,NOW());"
  d=$(date +%M-%d\ %H\:%m\:%S)
  echo "INSERT HELLO $i @@ $d"
  i=$(($i+1))
  sleep 0.05
done

exit 0
```

### 处理U盘
```sh
fdisk -l

sudo mkfs.vfat /dev/sdb1
mount /dev/sdb1 /mnt
eject /mnt
```

### 其他常用命令
```sh
unzip test.zip
# 显示压缩包内容但不解压
unzip -l test.zip

curl -L http://*.*.*.*:web/test.zip -o /usr/local/test2.zip
# 查看文件夹大小
du -h --max-depth=1 *
du -sh
du -sh <指定目录>
# 对于指定文件夹也可以指定显示层次深度，如
du -h --max-depth=0 software/
du -h --max-depth=1 software/
# 查看文件属性：创建日期、修改日期
stat log_xxx_error.log
```

## Shell脚本
下面定义一个带有return语句的函数：
```sh
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com
funWithReturn() {
    echo "这个函数会对输入的两个数字进行相加运算..."
    echo "输入第一个数字: "
    read aNum
    echo "输入第二个数字: "
    read anotherNum
    echo "两个数字分别为 $aNum 和 $anotherNum !"
    return $(($aNum + $anotherNum))
}
funWithReturn
echo "输入的两个数字之和为 $? !"
```
函数返回值在调用该函数后通过 $? 来获得。
注意：所有函数在使用前必须定义。这意味着必须将函数放在脚本开始部分，直至shell解释器首次发现它时，才可以使用。调用函数仅使用其函数名即可

## 实用技巧

### 超大日志文件的查看技巧
```sh
# 通过grep获取故障发生的大概时间的日志的行数，一个开始行、一个结束行
##  开始行：（双引号里的关键字，是每次请求前的固定字样加上时间，这样定位的行数准备；还有需要特别注意，特殊字符需要用\转义）
grep -an "\[dw\] 2020-04-15 08:34:01" /opt/tomcat/logs/catalina.2019-11-29.out|sed -n '1p'|awk '{print $1}'|cut -d ':' -f 1
## 结束行：
grep -an "\[dw\] 2019-11-29 11:52:01" /opt/tomcat/logs/catalina.2019-11-29.out|sed -n '$p'|awk '{print $1}'|cut -d ':' -f 1
# 获取到行数后，再通过sed截取两者之间的内容，输出到新文件中，这样的内容就不大，而且这个过程也很快（特别注意：命令中p，一定不能漏）
sed -n "60915,62959p" /opt/tomcat_dd3/logs/catalina.2020-09-16.out > /partner/shell_dir/20200916.out
```
