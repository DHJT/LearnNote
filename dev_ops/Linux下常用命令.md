# Linux下常用命令
<!-- @author DHJT 2021-01-07 -->

## vi/vim

### 显示行数/隐藏行数

1、显示当前行行号，在VI的命令模式下输入：`:nu`
2、显示所有行号，在VI的命令模式下输入：`:set nu`
:set number 或者 :set nu
:set nonumber 或者 :set nonu

打开vim的时候自动设置行号，需要我们设置配置文件，两种配置方式
`/etc/vimrc`   是系统范围的初始化配置
`～/.vimrc`     个人的vim初始化配置
在配置文件输入`set number` 或者 `set nu`

## cp/mv/rm/rmdir/mkdir touch
```sh
touch file
mkidr 目录
```

## 文本查看：more/less/tail/cat
```sh
tail -100f /etc/log/log_error.log
# 从第 20 行开始显示 testfile 之文档内容。
more +20 testfile

# 查看命令历史使用记录并通过less分页显示
history | less

# 统计当前目录下文件的个数（不包括目录）
ls -l | grep "^-" | wc -l
# 统计当前目录下文件的个数（包括子目录）
ls -lR| grep "^-" | wc -l
# 查看某目录下文件夹(目录)的个数（包括子目录）
ls -lR | grep "^d" | wc -l
# 是列出所有文件，包括子目录。
ls -lR
# 过滤ls的输出信息，只保留一般文件，只保留目录
grep "^-"
# 统计输出信息的行数，统计结果就是输出信息的行数，一行信息对应一个文件，所以就是文件的个数。
wc -l

netstat -nlpt|grep 8080
netstat -an|grep 5596
# 复制其他机器上的文件至本机指定目录
scp -r tomcat6.0.32 root@192.168.120.203:/opt/soft
```

## 查看物理CPU个数、核数、逻辑CPU个数

总核数 = 物理CPU个数 X 每颗物理CPU的核数
总逻辑CPU数 = 物理CPU个数 X 每颗物理CPU的核数 X 超线程数
```sh
# 查看物理CPU个数
cat /proc/cpuinfo| grep "physical id"| sort| uniq| wc -l
# 查看每个物理CPU中core的个数(即核数)
cat /proc/cpuinfo| grep "cpu cores"| uniq
# 查看逻辑CPU的个数
cat /proc/cpuinfo| grep "processor"| wc -l
# 查看CPU信息（型号）
cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c
```
另外，top命令中看到的CPU数目是逻辑CPU（输入top后再按1