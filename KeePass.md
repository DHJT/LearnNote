# KeePass
<!-- @author DHJT 2019-01-12 -->
KeePass is available in two different editions: 1.x and 2.x. They are fundamentally different (2.x is not based on 1.x). Both editions run on Windows operating systems; KeePass 2.x additionally runs on Mono (Linux, Mac OS X, BSD, etc.).
KeePass 用于安全地保存密码，官方网站是 http://keepass.info/。1.x 版本只能用于 Windows，而 2.x 版本利用 .NET、Mono 技术，实现 Windows、Linux、Mac OS 上运行。

市面上常用的密码管理软件有 Keepass、LastPass、1Password 三剑客，这三兄弟算是各有利弊吧：
LastPass 和 1PassWord 默认是收费的，貌似只有 Keepass 是免费的。如果不想额外花钱的话，需要单独为Keepass找同步平台。

## 设置语言包以及版本比对
- [KeePass Edition Comparison][1]
- [官方语言包——Translations][2]

### 安装与更新
- zip版的更新：直接下载解压后，将解压后的文件覆盖老版本的`keepa`即可；

### 下载类型区别
KeePass-2.xx-Setup.exe: An installer program for Windows.
KeePass-2.xx.zip: A KeePass ZIP package (portable version).
KeePass-2.xx-Source.zip: The source code.

## 自定义配置
- [Customization (2.x)][3]

## 插件

### 插件安装
在keepaass主界面中点击【工具】→【插件管理器】→【打开文件夹】；
将下载的后缀为.plgx的文件复制并粘贴到步骤1打开的的文件夹中（zip包请先解压）；
关闭然后重新打开keepass。
（度盘下载的chromeIPass插件安装方法：点击chrome浏览器右上角的三个点→【更多工具】→【扩展程序】，在打开标签页的右上角启用开发者模式→将下载的crx文件拖动到此标签页）
直接将下载的插件(.plgx)放置在插件文件夹中，重启软件即可。

### YetAnotherFaviconDownloader
### KeePassQuickUnlock
- [一劳永逸：KeePass全网最详使用指南 DLC1](https://post.smzdm.com/p/735073/)

### 浏览器插件
Keepass支持浏览器自动输入（使用chromeIPass插件），这个插件也是开源的，也就是说不会存在数据安全问题。chrome安装chromeIPass扩展，keepass安装KeePassHttp插件，这样就能相互传递数据。<br>
chrom浏览器安装chromeIPass：chrome应用商店安装<br>
keepass安装KeePassHttp：官方下载<br>
keepassHTTP的安装方法和之前的语言包安装方式一样，只需要放入keepass的应用程序目录即可。

### 手机电脑同步
微软的onedrive或者国内的坚果云，这两款同步盘都是不错的。安卓手机使用的app为keepass2android，这款app也是开源项目，不放心的可以直接去开源的网站下载后自己编译。

[1]: https://keepass.info/compare.html 'KeePass Edition Comparison'
[2]: https://keepass.info/translations.html 'Translations'
[3]: https://keepass.info/help/v2_dev/customize.html 'customize'
[4]: https://www.52pojie.cn/thread-670464-1-1.html '密码管理：keepass2'
[5]: https://post.smzdm.com/p/713042/ '软件教程 篇一：从入门到熟练：KeePass全网最详使用指南'