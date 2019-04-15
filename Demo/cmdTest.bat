@echo off
rem if "%1"=="h" goto begin
rem start mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit
rem :begin
rem copy D:\office.txt d:\test.txt
rem net user guest /active:yes
rem net user
rem net user Administrator
rem net user guest 12345
rem cd d:\msgex.db 安全分析报告
rem mongod.exe --dbpath d:\data\db
rem mongod --dbpath d:\data\db
rem redis
rem ngix
rem exit
::echo.|time
rem start /b mongod --dbpath d:\data\db
rem start "" E:\ProgramFiles\SublimeText3\sublime_text.exe
rem start http://127.0.0.1:8080/rdda
rem E:\ProgramFiles\VirtualBox\VirtualBox.exe
rem start "" "E:\ProgramFiles\VirtualBox\VirtualBox.exe"
rem start "" "E:\ProgramFiles\MyEclipse 2016\myeclipse.exe"
rem pause
rem 比较好的启动顺序是：OracleOracle_homeTNSListener,OracleServiceSID,OracleDBConsoleSID。关闭时次序相反
rem sc start OracleOraDb11g_home1TNSListener
rem net start OracleOraDb11g_home1TNSListener
rem net start OracleServiceORCL
rem echo Oracle 11g  has started, confirm no error, please!

rem @@echo off
<"%~f0" more +4 >sy.vbs
start sy.vbs
dim WshShell
Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.run"sndvol32 -t",0
Wscript.Sleep 500
WshShell.SendKeys"{PGUP 5}"
pause