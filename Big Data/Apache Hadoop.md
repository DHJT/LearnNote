# Apache Hadoop
<!-- @author DHJT 2020-02-21 -->
Hadoop是一个由Apache基金会所开发的分布式系统基础架构。用户可以在不了解分布式底层细节的情况下，开发分布式程序。充分利用集群的威力进行高速运算和存储。Hadoop实现了一个分布式文件系统（Hadoop Distributed File System），简称HDFS。HDFS有高容错性的特点，并且设计用来部署在低廉的（low-cost）硬件上；而且它提供高吞吐量（high throughput）来访问应用程序的数据，适合那些有着超大数据集（large data set）的应用程序。HDFS放宽了（relax）POSIX的要求，可以以流的形式访问（streaming access）文件系统中的数据。Hadoop的框架最核心的设计就是：HDFS和MapReduce。HDFS为海量的数据提供了存储，而MapReduce则为海量的数据提供了计算。

Hadoop是一种分布式数据和计算的框架。它很擅长存储大量的半结构化的数据集。数据可以随机存放，所以一个磁盘的失败并不会带来数据丢失。Hadoop也非常擅长分布式计算——快速地跨多台机器处理大型数据集合 。
MapReduce是处理大量半结构化数据集合的编程模型。编程模型是一种处理并结构化特定问题的方式。

### hadoop使用docker安装和使用(单节点适合开发环境)[^1]
hadoop jar hadoop-mapreduce-examples-2.6.5.jar wordcount /wordcount/input /wordcount/output


[^1]: [hadoop使用docker安装和使用(单节点适合开发环境)](https://blog.csdn.net/qq_16563637/article/details/81702633)