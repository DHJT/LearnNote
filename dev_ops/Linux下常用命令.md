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


netstat -nlpt|grep 8080
netstat -an|grep 5596
# 复制其他机器上的文件至本机指定目录
scp -r tomcat6.0.32 root@192.168.120.203:/opt/soft
```