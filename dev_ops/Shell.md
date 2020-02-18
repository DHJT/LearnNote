# Shell命令
<!-- @author DHJT -->
```sh
sudo -i
netstat -anp | grep 80     # 查看80端口
netstat -nlpt| grep 80
ps aux|grep main
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