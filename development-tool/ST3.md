# Sublime Text 3
<!-- @author DHJT 2018-12-11 -->

## NodeJS开发
## 配置Git以及Git同步代码

## 推荐安装的插件列表
易用性：

- `ChineseLocalization` , 完全汉化插件
- `Monokai Extended` 主题，推荐使用
- `HTML5`，HTML5标签拓展
- `JsFormat`，javascript格式化
- CSS Format，CSS格式化
- Tag，HTML格式化
- Brackethighlighter，标签对标记
- SideBarEnhancements ，增强型侧边栏
- BufferScroll，代码折叠状态保留
- StyleToken , 标记颜色代码功能：
- Emmet，前端神器
- TortoiseSVN，SVN你懂的
- QuoteHTML，把HTML拼接成js插入字符串，神器
- Clipboard Manager，增强型剪贴板，可访问历史剪贴板记录
- `FileHeader`，文件模板 , 可自动更新修改时间
- AutoPrefixer，浏览器私有属性前缀补全 (Node.js依赖)
- ColorConvert，RGBA颜色转换，十六进制颜色转换为RGBA颜色
- Better Completion，全能代码提示
- LiveStyle，双向更改无刷新实时预览 , 包含chrome插件 Emmet LiveStyle
- SFTP , 需要激活 ，看这里 Sublime Text SVN/SFTP 插件序列号通过微信自动获取
- *jQuery，jQuery 代码提示（Better Completion 已可替代此插件）
- *Sass以及SASS Build，使用Sass必备，ctrl+b执行编译
- *yui compressor，JS和CSS压缩 (JRE依赖)，ctrl+b执行编译推荐使用面向未来的前端自动化工具（相对成熟的Grunt，以及后起之秀 Gulp - ，还有百度 FIE），以上两个星标插件都可被自动化工具所取代。Gulp教程移步这里：Gulp 自动化你的前端
- 其他：
- `ConvertToUTF8`，GBK编码兼容
- `IMESupport`，输入法不跟随时安装
- `TrailingSpaces`，多余空格标记，强迫症患者福音
- Hasher，符号转义，ctrl+shift+p 选择 Entity Encode
- PackageResourceViewer，插件修改必备，ctrl+shift+p 调用 Open Resource
- [sublime-mermaid](https://github.com/hlfcoding/sublime-mermaid)
    + 文件夹需重命名为`Mermaid`
    + https://packagecontrol.io/packages/Mermaid

### 插件异常
- 插件发生报错时，可以从控制查看详细的报错信息。<kbd>Ctrl</kbd>+<kbd>`</kbd>
``` log
OmniMarkupPreviewer: [INFO] Launching web browser for http://localhost:51004/view/27
OmniMarkupPreviewer: [ERROR] Error while launching user defined web browser
  Traceback (most recent call last):
    File "C:\ProgramFiles\SublimeText3\Data\Packages\OmniMarkupPreviewer\OmniMarkupPreviewer.py", line 80, in launching_web_browser_for_url
    subprocess.Popen(browser_command)
    File "./python3.3/subprocess.py", line 819, in __init__
    File "./python3.3/subprocess.py", line 1063, in _execute_child
    File "./python3.3/subprocess.py", line 632, in list2cmdline
  TypeError: Type str doesn't support the buffer API
```
- 解决国内 https://packagecontrol.io 无法访问的问题
    + `https://github.com/HBLong/channel_v3_daily`

[1]: https://blog.csdn.net/u010071211/article/details/80791368 'sublime3176注册码破解汉化及常用插件'
[2]: https://www.cnblogs.com/ma-dongdong/p/7653231.html 'Sublime Text3使用指南'
[3]: https://blog.csdn.net/xiazhiyiyun/article/details/52142307 'OmniMarkupPreviewer的实时预览无法使用问题的解决'
[4]: https://blog.csdn.net/xingerr/article/details/71519189 'Sublime Text3--打造完美的Markdown编辑器'
[5]: https://blog.csdn.net/qq_30490125/article/details/53230408 '近乎完美的Markdown写作体验 - SublimeText3 + OmniMarkupPreviewer'
[6]: https://www.cnblogs.com/net66/p/5583880.html 'ATOM & Sublime Text 下MarkDown插件功能比较'