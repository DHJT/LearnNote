# JavaMore
<!-- @author DHJT 2019-01-18 -->

## Java差异

### Java7与Java8
- [JAVA8 十大新特性详解](https://www.jb51.net/article/48304.htm)

## java安全沙箱
java是一种类型安全的语言，它有四类称为安全沙箱机制的安全机制来保证语言的安全性，这四类安全沙箱分别是：

1. 类加载体系[^1]
2. .class文件检验器[^2]
3. 内置于Java虚拟机（及语言）的安全特性[^3]
4. 安全管理器及Java API[^4]


| 名称              | 底层结构         | 线程安全    | 有序性      | 值唯一性    |
| :--------------:  | :------------:   | :---------: | :---------: | :---------: |
| Vector            | 数组             | 安全        | 有序        | 不唯一      |
| HashTable         | 数组+链表        | 安全        | 无序        | 不为空      |
| LinkedList        | 双向链表         | 不安全      | 有序        | 不唯一      |
| ArrayList         | 数组             | 不安全      | 有序        | 不唯一      |
| HashSet           | 数组+链表        | 不安全      | 无序        | 唯一        |
| TreeSet           | 红黑树           | 不安全      | 有序        | 唯一        |
| HashMap           | 数组+链表/红黑树 | 不安全      | 无序        | 不唯一      |
| TreeMap           | 红黑树           | 不安全      | 有序        | 不唯一      |
| ConcurrentHashMap | 数组+链表/红黑树 | 安全        | 无序        | 不唯一      |


[^1]: [java安全沙箱（一）之ClassLoader双亲委派机制](https://my.oschina.net/xionghui/blog/499725)
[^2]: [java安全沙箱（二）之.class文件检验器](https://www.cnblogs.com/duanxz/p/6108347.html)
[^3]: [java安全沙箱（三）之内置于Java虚拟机（及语言）的安全特性](https://my.oschina.net/xionghui/blog/501165)
[^4]: [java安全沙箱（四）之安全管理器及Java API](https://www.cnblogs.com/duanxz/p/6108357.html)
[^5]: [Java双亲委派模型及破坏](https://blog.csdn.net/zhangcanyan/article/details/78993959)
[^6]: [Java自定义类加载器与双亲委派模型](https://www.cnblogs.com/wxd0108/p/6681618.html)