# JavaMore
<!-- @author DHJT 2019-01-18 -->

## Java差异
### Java5
`import static`静态导bai入是JDK1.5中的新特性。一般我们导入一个类都用 import com.....ClassName;而静态导入是这样：`import static com.....ClassName.*;`这里的多了dao个static，还有就是类名ClassName后面多了个 .* ，意思是导入这个类里的静态方法。当然，也可以只导入某个静态方法，只要把 .* 换成静态方法名就行了。然后在这个类中，就可以直接用方法名调用静态方法，而不必用ClassName.方法名 的方式来调用。

### Java7与Java8
- [JAVA8 十大新特性详解](https://www.jb51.net/article/48304.htm)
- [Java8的新特性：Lambda、方法引用、Stream流](https://zhuanlan.zhihu.com/p/103593275)
```java
// 方法引用
List<String> strList = abList.stream().map(ArchiveBox::getBoxNumber).collect(Collectors.toList());
```

### 方法引用(method references)
- 静态方法引用：`ClassName::methodName`
- 实例上的实例方法引用：`instanceReference::methodName`
- 超类上的实例方法引用：`super::methodName`
- 类型上的实例方法引用：`ClassName::methodName`
- 构造方法引用：`Class::new`。调用的构造方法是和函数式接口的参数类型一致的。
- 数组构造方法引用：`TypeName[]::new`

### BiFunction
```java
// BinaryOperator接受两个相同类型的参数，并返回其参数相同类型的结果。
@FunctionalInterface
public interface BinaryOperator<T> extends BiFunction<T,T,T> {
}
// BiFunction接受两个任意类型的参数，并返回任意类型的结果。
@FunctionalInterface
public interface BiFunction<T, U, R> {
      R apply(T t, U u);
}
```
#### BinaryOperator
BinaryOperator是一个功能接口，它扩展了BiFunction 。
如果数学运算涉及基本类型（如int ，请更改为IntBinaryOperator以获得更好的性能。
```java
// BiFunction
BiFunction<Integer, Integer, Integer> func = (x1, x2) -> x1 + x2;
Integer result = func.apply(2, 3);
System.out.println(result); // 5
// BinaryOperator
BinaryOperator<Integer> func2 = (x1, x2) -> x1 + x2;
Integer result2 = func.apply(2, 3);
System.out.println(result2); // 5
```

### 流式数据处理

#### 并行流式数据处理
流式处理中的很多都适合采用 分而治之 的思想，从而在处理集合较大时，极大的提高代码的性能，java8的设计者也看到了这一点，所以提供了 并行流式处理。上面的例子中我们都是调用`stream()`方法来启动流式处理，java8还提供了`parallelStream()`来启动并行流式处理，`parallelStream()`本质上基于java7的`Fork-Join`框架实现，其默认的线程数为宿主机的内核数。

启动并行流式处理虽然简单，只需要将`stream()`替换成`parallelStream()`即可，但既然是并行，就会涉及到多线程安全问题，所以在启用之前要先确认并行是否值得（并行的效率不一定高于顺序执行），另外就是要保证线程安全。此两项无法保证，那么并行毫无意义，毕竟结果比速度更加重要，以后有时间再来详细分析一下并行流式数据处理的具体实现和最佳实践。

_安全性、活性失败_

#### 数组转为 Stream
- 数组转为Stream：[Java –如何将数组转换为流](https://blog.csdn.net/cyan20115/article/details/106548847)
    + 在Java 8中，可以使用`Arrays.stream`或`Stream.of`将`Array`转换为`Stream`。

## java安全沙箱
java是一种类型安全的语言，它有四类称为安全沙箱机制的安全机制来保证语言的安全性，这四类安全沙箱分别是：

1. 类加载体系[^1]
2. `.class`文件检验器[^2]
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

## 多线程与并发

### ThreadLocal
ThreadLocal<T>其实是与线程绑定的一个变量。
ThreadLocal和Synchonized都用于解决多线程并发访问。
但是ThreadLocal与synchronized有本质的区别。Synchronized用于线程间的数据共享，而ThreadLocal则用于线程间的数据隔离。
ThreadLocal为每一个线程都提供了变量的副本，使得每个线程在某一时间访问到的并不是同一个对象，这样就隔离了多个线程对数据的数据共享。

线程隔离的秘密，就在于 ThreadLocalMap 这个类。 ThreadLocalMap 是ThreadLocal类的一个静态内部类，它实现了键值对的设置和获取，每个线程中都有一个独立的 ThreadLocalMap 副本，它所存储的值，只能被当前线程读取和修改。

ThreadLocal是一种空间换时间的思想

ThreadLocal 的使用场景:用来解决数据库连接、Session 管理等。

[ThreadLocal使用场景分析](https://www.jianshu.com/p/f956857a8304)
[ThreadLocal 的使用场景](https://zhuanlan.zhihu.com/p/82737256)

### 闭锁CountDownLatch

## Java之四大内置注解 @Override、 @Deprecated、 @SuppressWarnings、 @SafeVarargs

### @SafeVarargs
必须是可变参数方法和构造器
如果是可变参数的方法，那么必须是static和final的
```java
public class VarargsWaring {

    @SafeVarargs
    private static List<String> useVarargs(List<String>... args) {
        return args.length > 0 ? args[0] : null;
    }

    public static void main(String[] args) {
        List list = new ArrayList<String>();
        System.out.println(VarargsWaring.useVarargs(list));
    }
}
```

### List转Map
```java
Map<Long, User> maps = uList.stream().collect(Collectors.toMap(User::getId, Function.identity()));
// 看来还是使用JDK 1.8方便一些。另外，转换成map的时候，可能出现key一样的情况，如果不指定一个覆盖规则，上面的代码是会报错的。转成map的时候，最好使用下面的方式：
maps = uList.stream().collect(Collectors.toMap(User::getId, Function.identity(), (key1, key2) -> key2));
// 有时候，希望得到的map的值不是对象，而是对象的某个属性，那么可以用下面的方式：
Map<Long, String> maps = uList.stream().collect(Collectors.toMap(User::getId, User::getAge, (key1, key2) -> key2));
```

[^1]: [java安全沙箱（一）之ClassLoader双亲委派机制](https://my.oschina.net/xionghui/blog/499725)
[^2]: [java安全沙箱（二）之.class文件检验器](https://www.cnblogs.com/duanxz/p/6108347.html)
[^3]: [java安全沙箱（三）之内置于Java虚拟机（及语言）的安全特性](https://my.oschina.net/xionghui/blog/501165)
[^4]: [java安全沙箱（四）之安全管理器及Java API](https://www.cnblogs.com/duanxz/p/6108357.html)
[^5]: [Java双亲委派模型及破坏](https://blog.csdn.net/zhangcanyan/article/details/78993959)
[^6]: [Java自定义类加载器与双亲委派模型](https://www.cnblogs.com/wxd0108/p/6681618.html)

## Tips
- 枚举中的字段类型要与数据库中的一致，否则匹配不上：1与"1"；
- LocalDateTime不能使用 pattern = "yyyy-MM-dd"
- 注：泛型的类型参数使用大写形式，且比较短，一般一个字母，这是很常见的。在java库中，使用变量E表示集合的元素类型。K和V分别表示键与值的类型，比如：Map的键与值。T（需要时还可以用临近的字母U和S）表示“任意类型”。