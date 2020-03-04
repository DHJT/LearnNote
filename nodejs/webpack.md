# webpack
<!-- @author DHJT 2019-08-30 -->

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

目的就是把有依赖关系的各种文件打包成一系列的静态资源。

[webpack官网](https://webpack.js.org/)
[webpack中文官网](https://webpack.docschina.org/)
从 webpack v4.0.0 开始，可以不用引入一个配置文件。然而，webpack 仍然还是高度可配置的。在开始前你需要先理解四个核心概念：

- 入口(entry)
- 输出(output)
- loader
- 插件(plugins)

### webpack 的优势
- webpack 是以 commonJS 的形式来书写脚本滴，但对 AMD/CMD 的支持也很全面，方便旧项目进行代码迁移。
- 支持很多模块加载器的调用，可以使模块加载器灵活定制，比如babel-loader加载器，该加载器能使我们使用ES6的语法来编写代码;less-loader加载器，可以将less编译成css文件；
- 开发便捷，能替代部分 grunt/gulp 的工作，比如打包、压缩混淆、图片转base64等。
- 可以通过配置打包成多个文件，有效的利用浏览器的缓存功能提升性能。

### wepback它的目标是是什么
webpack它能将依赖的模块转化成可以代表这些包的静态文件

- 将依赖的模块分片化，并且按需加载
- 解决大型项目初始化加载慢的问题
- 每一个静态文件都可以看成一个模块
- 可以整合第三方库
- 能够在大型项目中运用
- 可以自定义切割模块的方式

