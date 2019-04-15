@echo off
rem 启动redis脚本
if "%1"=="h" goto begin
start mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit
:begin
D:\ProgramFiles\Redis-x64-3.2.100\redis-server.exe D:\ProgramFiles\Redis-x64-3.2.100\redis.windows.conf
exit