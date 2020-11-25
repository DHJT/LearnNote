# WSL1&WSL2
<!-- @author DHJT 2020-10-08 -->
[wsl升级wsl2_WSL 2 简介](https://blog.csdn.net/cxu0262/article/details/107260708)
[Windows Subsystem for Linux Installation Guide for Windows 10](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
[Create a user account and password for your new Linux distribution](https://docs.microsoft.com/en-us/windows/wsl/user-support)
## 


## QA
Q: windows_termianl_wsl2 --参考的对象类型不支持尝试的操作
A: wsl2在使用vpn后会起不来，解决方案就是cmd下管理员权限执行 `netsh winsock reset`