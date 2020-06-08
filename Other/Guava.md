# Guava
<!-- @author DHJT 2020-06-05 -->

[guava](https://github.com/google/guava)

Guava is a set of core Java libraries from Google that includes new collection types (such as multimap and multiset), immutable collections, a graph library, and utilities for concurrency, I/O, hashing, caching, primitives, strings, and more! It is widely used on most Java projects within Google, and widely used by many other companies as well.

Guava comes in two flavors.

- The JRE flavor requires JDK 1.8 or higher.
- If you need support for JDK 1.7 or Android, use the Android flavor. You can find the Android Guava source in the android directory.

guava的优点：

- 高效设计良好的API，被Google的开发者设计，实现和使用
- 遵循高效的java语法实践
- 使代码更刻度，简洁，简单
- 节约时间，资源，提高生产力

Guava工程包含了若干被Google的 Java项目广泛依赖 的核心库，例如：

- 集合 [collections]
- 缓存 [caching]
- 原生类型支持 [primitives support]
- 并发库 [concurrency libraries]
- 通用注解 [common annotations]
- 字符串处理 [string processing]
- I/O 等等。

## 使用
```xml
<dependency>
  <groupId>com.google.guava</groupId>
  <artifactId>guava</artifactId>
  <version>29.0-jre</version>
  <!-- or, for Android: -->
  <version>29.0-android</version>
</dependency>
```

### 集合的创建
```java
// 普通Collection的创建
List<String> list = Lists.newArrayList();
Set<String> set = Sets.newHashSet();
Map<String, String> map = Maps.newHashMap();

// 不变Collection的创建
ImmutableList<String> iList = ImmutableList.of("a", "b", "c");
ImmutableSet<String> iSet = ImmutableSet.of("e1", "e2");
ImmutableMap<String, String> iMap = ImmutableMap.of("k1", "v1", "k2", "v2");
// 类中的 操作集合的方法（譬如add, set, sort, replace等）都被声明过期，并且抛出异常。 而没用guava之前是需要声明并且加各种包裹集合才能实现这个功能

// 当我们需要一个map中包含key为String类型，value为List类型的时候，以前我们是这样写的
Multimap<String,Integer> map = ArrayListMultimap.create();
map.put("aa", 1);
map.put("aa", 2);
System.out.println(map.get("aa"));  //[1, 2]

MultiSet: 无序+可重复   count()方法获取单词的次数  增强了可读性+操作简单
创建方式:  Multiset<String> set = HashMultiset.create();

Multimap: key-value  key可以重复
创建方式: Multimap<String, String> teachers = ArrayListMultimap.create();

BiMap: 双向Map(Bidirectional Map) 键与值都不能重复
创建方式:  BiMap<String, String> biMap = HashBiMap.create();

Table: 双键的Map Map--> Table-->rowKey+columnKey+value  //和sql中的联合主键有点像
创建方式: Table<String, String, Integer> tables = HashBasedTable.create();

...等等(guava中还有很多java里面没有给出的集合类型)
```
- immutable(不可变)对象
    + 在多线程操作下，是线程安全的
    + 所有不可变集合会比可变集合更有效的利用资源
    + 中途不可改变

### 将集合转换为特定规则的字符串
```java
List<String> list = new ArrayList<String>();
list.add("aa");
list.add("bb");
list.add("cc");
String result = Joiner.on("-").join(list); // result为  aa-bb-cc

Map<String, Integer> map = Maps.newHashMap();
map.put("xiaoming", 12);
map.put("xiaohong",13);
String result = Joiner.on(",").withKeyValueSeparator("=").join(map);
// result为 xiaoming=12,xiaohong=13
```

### 将String转换为特定的集合
```java
String str = "1-2-3-4-5-6";
List<String> list = Splitter.on("-").splitToList(str);
//list为  [1, 2, 3, 4, 5, 6]
// guava还可以使用 omitEmptyStrings().trimResults() 去除空串与空格
str="1-2-3-4- 5-  6  ";
List<String> list = Splitter.on("-").omitEmptyStrings().trimResults().splitToList(str);
str = "xiaoming=11,xiaohong=23";
Map<String,String> map = Splitter.on(",").withKeyValueSeparator("=").split(str);

// 支持多个字符切割，或者特定的正则分隔
String input = "aa.dd,,ff,,.";
List<String> result = Splitter.onPattern("[.|,]").omitEmptyStrings().splitToList(input);
// 关于字符串的操作 都是在Splitter这个类上进行的
// 判断匹配结果
boolean result = CharMatcher.inRange('a', 'z').or(CharMatcher.inRange('A', 'Z')).matches('K'); //true
// 保留数字文本  CharMatcher.digit() 已过时   retain 保留
//String s1 = CharMatcher.digit().retainFrom("abc 123 efg"); //123
String s1 = CharMatcher.inRange('0', '9').retainFrom("abc 123 efg"); // 123
// 删除数字文本  remove 删除
// String s2 = CharMatcher.digit().removeFrom("abc 123 efg");    //abc  efg
String s2 = CharMatcher.inRange('0', '9').removeFrom("abc 123 efg"); // abc  efg
```

### 集合的过滤

### 检查参数
```java
if(!Strings.isNullOrEmpty(str))
//use guava
Preconditions.checkArgument(count > 0, "must be positive: %s", count);
```
检查是否为空,不仅仅是字符串类型，其他类型的判断，全部都封装在 Preconditions类里，里面的方法全为静态
| 方法声明（不包括额外参数）                         | 描述                                                                            | 检查失败时抛出的异常      |
| checkArgument(boolean)                             | 检查boolean是否为true，用来检查传递给方法的参数。                               | IllegalArgumentException  |
| checkNotNull(T)                                    | 检查value是否为null，该方法直接返回value，因此可以内嵌使用checkNotNull。        | NullPointerException      |
| checkState(boolean)                                | 用来检查对象的某些状态。                                                        | IllegalStateException     |
| checkElementIndex(int index, int size)             | 检查index作为索引值对某个列表、字符串或数组是否有效。 index > 0 && index < size | IndexOutOfBoundsException |
| checkPositionIndexes(int start, int end, int size) | 检查[start,end]表示的位置范围对某个列表、字符串或数组是否有效                   | IndexOutOfBoundsException |


### 强大的Ordering排序器

### MoreObjects
这个方法是在Objects过期后官方推荐使用的替代品，该类最大的好处就是不用大量的重写 toString，用一种很优雅的方式实现重写，或者在某个场景定制使用。
```java
Person person = new Person("aa", 11);
String str = MoreObjects.toStringHelper("Person").add("age", person.getAge()).toString();
System.out.println(str);
//输出Person{age=11}
```

### 计算中间代码的运行时间
```java
Stopwatch stopwatch = Stopwatch.createStarted();
for(int i=0; i<100000; i++){
    // do some thing
}
long nanos = stopwatch.elapsed(TimeUnit.MILLISECONDS);
```

### 文件操作
```java
Files.copy(from,to);  //复制文件
Files.deleteDirectoryContents(File directory); //删除文件夹下的内容(包括文件与子文件夹)
Files.deleteRecursively(File file); //删除文件或者文件夹
Files.move(File from, File to); //移动文件
URL url = Resources.getResource("abc.xml"); //获取classpath根下的abc.xml文件url
```

### guava缓存
guava的缓存设计的比较巧妙，可以很精巧的使用。guava缓存创建分为两种，一种是`CacheLoader`,另一种则是`callback`方式
```java
// CacheLoader
LoadingCache<String, String> cahceBuilder = CacheBuilder
                .newBuilder()
                .build(new CacheLoader<String, String>() {
                    @Override
                    public String load(String key) throws Exception {
                        String strProValue = "hello " + key + "!";
                        return strProValue;
                    }
                });
System.out.println(cahceBuilder.apply("begincode"));  //hello begincode!
System.out.println(cahceBuilder.get("begincode")); //hello begincode!
System.out.println(cahceBuilder.get("wen")); //hello wen!
System.out.println(cahceBuilder.apply("wen")); //hello wen!
System.out.println(cahceBuilder.apply("da"));//hello da!
cahceBuilder.put("begin", "code");
System.out.println(cahceBuilder.get("begin")); //code
// apply声明为过期，声明中推荐使用get方法获取值

// callback
Cache<String, String> cache = CacheBuilder.newBuilder().maximumSize(1000).build();
            String resultVal = cache.get("code", new Callable<String>() {
                public String call() {
                    String strProValue = "begin " + "code" + "!";
                    return strProValue;
                }
            });
 System.out.println("value : " + resultVal); //value : begin code!
```

## 高级

### RateLimiter
限流算法有漏桶算法和令牌桶算法，guava的RateLimiter使用的是令牌桶算法，也就是以固定的频率向桶中放入令牌。
```java
//每秒只发出5个令牌 根据指定的稳定吞吐率创建RateLimiter，这里的吞吐率是指每秒多少许可数（通常是指QPS，每秒多少查询）
RateLimiter rateLimiter = RateLimiter.create(5.0);
// 从RateLimiter获取一个许可或指定许可数，该方法会被阻塞直到获取到请求
rateLimiter.acquire();
rateLimiter.acquire(5);
// 尝试获取令牌 从RateLimiter 获取许可，如果该许可可以在无延迟下的情况下立即获取得到的话
rateLimiter.tryAcquire();
rateLimiter.tryAcquire(5);// 获取5个
// 从RateLimiter 获取指定许可数如果该许可数可以在不超过timeout的时间内获取得到的话，或者如果无法在timeout 过期之前获取得到许可数的话，那么立即返回false （无需等待）
tryAcquire(int permits, long timeout, TimeUnit unit);
tryAcquire(long timeout, TimeUnit unit);
```
