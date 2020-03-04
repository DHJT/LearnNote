## cnpm
<!-- @author DHJT 2019-01-23 -->
说明：因为npm安装插件是从国外服务器下载，受网络影响大，可能出现异常，如果npm的服务器在中国就好了，所以我们乐于分享的淘宝团队干了这事。来自官网：“这是一个完整 npmjs.org 镜像，你可以用此代替官方版本(只读)，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。”
官方网址：http://npm.taobao.org
安装：命令提示符执行npm install cnpm -g --registry=https://registry.npm.taobao.org
注意：安装完后最好查看其版本号cnpm -v或关闭命令提示符重新打开，安装完直接使用有可能会出现错误
注：cnpm跟npm用法完全一致，只是在执行命令时将npm改为cnpm。
- [cnpm](http://npm.taobao.org)
```sh
npm install cnpm -g --registry=https://registry.npm.taobao.org

```

### audit
```sh
npm audit ： npm@5.10.0 & npm@6，允许开发人员分析复杂的代码，并查明特定的漏洞和缺陷。
npm audit fix ：npm@6.1.0,  检测项目依赖中的漏洞并自动安装需要更新的有漏洞的依赖，而不必再自己进行跟踪和修复。
# 1 . 运行audit fix，但是只更新pkglock， 不更新node_modules：
$ npm audit fix --package-lock-only
# 2. 只更新dependencies中安装的包，跳过devDependencies中的包：
$ npm audit fix --only=prod
# 3.运行命令，得到audit fix将会更新的内容，并且输出json格式的安装信息，但是并不真的安装更新：
$ npm audit fix --dry-run --json
# 4. 得到json格式的详细检测报告
$ npm audit --json
```
npm-audit 官网地址：https://docs.npmjs.com/cli/audit


## 报错


[1]: https://www.cnblogs.com/GlenLi/p/10173609.html '解决 windows npm ERR! asyncWrite is not a function 问题'