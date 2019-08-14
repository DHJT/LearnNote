# .NET Framework 3.5

MS酋长很早以前已经分享了《Win10离线安装.NET Framework 3.5的方法技巧》，同时分享了exe格式的.NET Framework 3.5离线安装包下载地址。但有部分网友反映安装过程中会出现错误提示安装失败，那么今天MS酋长就再分享一下cab格式的.NET Framework 3.5离线安装包下载地址，以及安装方法。

cab格式.NET Framework 3.5离线安装包下载地址：百度网盘

安装方法：
先把下载的名为NetFx3.cab的离线安装包放到Win10系统盘C:\Windows文件夹里。
然后以管理员身份运行命令提示符，输入并回车运行以下命令：
```sh
dism /online /Enable-Feature /FeatureName:NetFx3 /Source:"%windir%" /LimitAccess
```
等待部署进度100%即可。

[1]: https://www.windows10.pro/net-framework-3-5-netfx3-cab-download/ 'Win10离线安装.NET Framework 3.5的方法补充（附cab格式离线安装包下载）'