# MAT(Memory Analyzer tool)
<!-- @author DHJT 2020-10-30 -->
一种快速,功能丰富的Java堆分析工具,能帮助你查找内存泄漏和减少内存消耗。
Eclipse Memory Analyzer是一个快速且功能丰富的Java堆分析器，可帮助您查找内存泄漏并减少内存消耗。使用Memory Analyzer分析具有数亿个对象的高效堆转储，快速计算对象的保留大小，查看谁阻止垃圾收集器收集对象，运行报告以自动提取泄漏嫌疑者。
[下载地址](https://www.eclipse.org/mat/downloads.php)

- `MAT`用来做什么
    + 找出内存泄漏的原因
    + 找出重复引用的类和jar
    + 分析集合的使用
    + 分析类加载器

## 怎样获取Dump
- 通过OOM获取，即在OutOfMemoryError后获取一份HPROF二进制Heap Dump文件，可以在jvm里添加参数：

`-XX:+HeapDumpOnOutOfMemoryError`

- 主动获取，即在虚拟机添加参数如下，然后在Ctrl+Break组合键即可获取一份Heap Dump

`-XX:+HeapDumpOnCtrlBreak`

- 使用HPROF agent

- 使用Agent可以在程序执行结束时或受到SIGOUT信号时生成Dump文件。配置在虚拟机的参数如下：

`-agentlib:hprof=heap=dump,format=b`

- jmap 可以在cmd里执行，命令如下：

`jmap -dump:format=b file=<文件名XX.hprof> <pid>`

- 使用JConsole
- 使用Memory Analyzer Tools的File -> Acquire Heap Dump功能
