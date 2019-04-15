# Cmd批处理学习
titLe: narkdownI tA
date: zal3laz7 :04:01
tags:
[批处理](https://www.w3cschool.cn/pclrmsc/fmytnm.html)
[批处理](https://www.w3cschool.cn/pclrmsc/fmytnm.html)
``` batch
@echo off
netstat -a -n > a.txt
type a.txt | find "7626"
if exist c:\windows\History\*.* del c:\windows\History\*.*
```
## 应用实例(常用)
- `shutdown –s –t 10 –m \\192.168.33.158 –c “外星人入侵，计算机马上关闭”-f`
- `whoami /user`
- `reg delete "HKEY_USERS\<SID>\Software\Scooter Software\Beyond Compare 4" /v CacheId /f`
- 获取已经使用的端口信息：`netstat -aon`
- 获取到ip的路由跳转节点：`tracert ip`
- 获取无线密码信息：`for /f "skip=9 tokens=1,2 delims=:" %i in ('netsh wlan show profiles') do @echo %j | findstr -i -v echo | netsh wlan show profiles %j key=clear`
    + 指定wifi的密码：`Netsh wlan show profile name=”热点名字” key=clear`

分区处理
diskpart
list disk （此命令是列出所有磁盘驱动器 ，请务必看清楚你的U盘前面的数字编号，例如1）
select disk # （#是上一步中所显示的U盘编号数字，不要写成硬盘 编号）
clean
create partition primary
select partition 1
active
format quick fs=fat32
assign （U盘会退出重新识别）
exit

### 获取管理员权限
- [Win10让批处理文件自动获取管理员权限的方法](http://www.xitongzhijia.net/xtjc/20170124/91485.html)
```dos
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::      软媒魔方自动添加批处理文件管理员权限      ::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
@echo off
CLS
ECHO.
ECHO ================================
ECHO 软媒魔方获取批处理文件管理员权限
ECHO ================================
:init
setlocal DisableDelayedExpansion
set "batchPath=%~0"
for %%k in (%0) do set batchName=%%~nk
set "vbsGetPrivileges=%temp%\OEgetPriv_%batchName%.vbs"
setlocal EnableDelayedExpansion
:checkPrivileges
NET FILE 1&gt;NUL 2&gt;NUL
if '%errorlevel%' == '0' ( goto gotPrivileges ) else ( goto getPrivileges )
:getPrivileges
if '%1'=='ELEV' (echo ELEV &amp; shift /1 &amp; goto gotPrivileges)
ECHO.
ECHO ********************************
ECHO 请求 UAC 权限批准……
ECHO ********************************
ECHO Set UAC = CreateObject^("Shell.Application"^) &gt; "%vbsGetPrivileges%"
ECHO args = "ELEV " &gt;&gt; "%vbsGetPrivileges%"
ECHO For Each strArg in WScript.Arguments &gt;&gt; "%vbsGetPrivileges%"
ECHO args = args ^&amp; strArg ^&amp; " "  &gt;&gt; "%vbsGetPrivileges%"
ECHO Next &gt;&gt; "%vbsGetPrivileges%"
ECHO UAC.ShellExecute "!batchPath!", args, "", "runas", 1 &gt;&gt; "%vbsGetPrivileges%"
"%SystemRoot%\System32\WScript.exe" "%vbsGetPrivileges%" %*
exit /B
:gotPrivileges
setlocal &amp; pushd .
cd /d %~dp0
if '%1'=='ELEV' (del "%vbsGetPrivileges%" 1&gt;nul 2&gt;nul  &amp;  shift /1)
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::     以下为需要运行的批处理文件代码     ::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
rem 本行以下可修改为你需要的bat命令（从上面三行冒号开始到下面都可删改）
ECHO 欢迎使用软媒魔方！
ECHO.
pause
```

### 文件保存
- 后缀名：`.bat`,`.cmd`;

### 设置编码
``` dos
chcp 65001.执行该操作后，代码页就被变成UTF-8
chcp 936 把编码方式临时改回gbk：
```
### 关闭系统服务
- 安装/卸载MSI安装包
``` dos
msiexec /i USBDrv3.0-x64.msi
msiexec /x USBDrv3.0-x64.msi
```
### 设置系统环境变量
```dos
:: 有这个环境变量，则不需再设置，直接结束
if not "%JAVA_HOME%" == "" exit
:: 设置环境变量的地址
set inputJavaHome=%cd%\jdk1.6.0_07
:: 设置环境变量，也可以设置当前用户的变量
set EnvironmentHome=HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment
echo 正在设置环境变量，请稍候......
reg add "%EnvironmentHome%" /v JAVA_HOME /t reg_sz /d "%inputJavaHome%" /f
reg add "%EnvironmentHome%" /v ClassPath /t reg_sz /d ".;%%JAVA_HOME%%\lib" /f
reg add "%EnvironmentHome%" /v Path /t reg_sz /d "%%JAVA_HOME%%\bin;%Path%" /f]
:: 刷新，令环境变量生效
taskkill /f /im explorer.exe >nul
start "" "explorer.exe"
```

### 关闭系统服务
- 打开/关闭音频服务
``` dos
sc start AudioSrv
sc stop AudioSrv
```

### 启动系统服务
- Oracle数据库启动
``` dos
::比较好的启动顺序是：OracleOracle_homeTNSListener,OracleServiceSID,OracleDBConsoleSID。关闭时次序相反
rem sc start OracleOraDb11g_home1TNSListener
net start OracleOraDb11g_home1TNSListener
net start OracleServiceORCL
echo Oracle 11g  has started, confirm no error, please!

net start OracleServiceORCL
net start OracleOraDb11g_home1TNSListener
```

### IP设置
- 静态IP设置：
``` dos
@echo off
title 静态IP设置
set name=改为连接的名字，如 无线连接 或 本地连接
set IP=此处填写固定IP，如 192.168.1.2
set mask=此处填写子网掩码，如 255.255.255.0
set gw=此处填写网关，如 192.168.1.1
set dns=此处填写DNS服务器，192.168.1.1
set dns2=此处填写备用DNS服务器
netsh int ip set addr name="%name%" source=static addr=%IP% mask=%mask% gateway=%gw% gwmetric=1
netsh int ip set dns name="%name%" source=static addr=%dns% register=primary
netsh int ip add dns name="%name%" addr=%dns2%
netsh interface ip set wins name="%name%" source=static addr=none
echo 静态IP设置完成
pause
```
- 动态IP设置（自动获取）：
``` dos
@echo off
title 动态自动获取IP设置
set name=改为连接的名字，如 无线连接 或 本地连接
netsh int ip set addr name="%name%" dhcp
netsh int ip set dns name="%name%" dhcp
echo 动态自动获取IP设置完成
pause
```