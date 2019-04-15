# GitBook
<!-- @author DHJT 2019-01-25 -->
基于 Node.js 的命令行工具，支持 Markdown 和 AsciiDoc 两种语法格式，可以输出 HTML、PDF、eBook 等格式的电子书。所以我更喜欢把 GitBook 定义为文档格式转换工具。

GitBook支持输出多种文档格式：
·静态站点：GitBook默认输出该种格式，生成的静态站点可直接托管搭载Github Pages服务上；
·PDF：需要安装gitbook-pdf依赖；
·eBook：需要安装ebook-convert；
· 单HTML网页：支持将内容输出为单页的HTML，不过一般用在将电子书格式转换为PDF或eBook的中间过程；
·JSON：一般用于电子书的调试或元数据提取。
使用GitBook制作电子书，必备两个文件：README.md和SUMMARY.md。

GitBook 又与 Markdown 和 Git 息息相关，因为只有将它们结合起来使用，才能将它们的威力发挥到极致！因此，通常我们会选择合适的 Markdown 编辑工具以获得飞一般的写作体验；使用 GitBook 管理文档，预览、制作电子书；同时通过 Git 管理书籍内容的变更，并将其托管到云端（比如 GitHub、GitLab、码云，或者是自己搭建的 Git 服务器），实现多人协作。

## 安装
```sh
$ npm install -g gitbook-cli
# 检测安装是否成功：
$ gitbook -V
$ gitbook update
$ npm uninstall -g gitbook
```

GitBook Editor
官方编辑器，下载 https://www.gitbook.com/editor ，需要注册

## 使用
```sh
# 新建文件夹gitb，在gitb中执行如下命令进行初始化
$ gitbook init
# README.md —— 书籍的介绍写在这个文件里
# SUMMARY.md —— 书籍的目录结构在这里配置
```

[1]: https://www.jianshu.com/p/09a1cac0a0d0 'GitBook 使用'
[2]: https://blog.csdn.net/hk2291976/article/details/51173850 'GitBook入门（用github做出第一本书）——超详细配图说明'