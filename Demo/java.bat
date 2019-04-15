@echo off
rem @author DHJT 2019-04-11
rem 设置java环境变量
setx JAVA_HOME "D:\ProgramFiles\Java\jdk1.8.0_111" /m
rem setx -m Path "%PATH%;%JAVA_HOME%\bin";
setx -m CLASSPATH ".;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;"

set regPath= HKEY_CURRENT_USER\Environment
set key=path
::判断是否存在该路径
reg query %regPath% /v  %key% 1>nul 2>nul
if %ERRORLEVEL%==0 (
::取值
For /f "tokens=3,4 delims= " %%v in ('Reg Query %regPath% /v %key% ') do Set oldValue=%%v
) else Set oldValue=""
echo %key%的原值为：%oldValue%
pause
pause