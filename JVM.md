# JVM原理
<!-- @autho DHJT 2019-02-14 -->

### 自定义类加载器
- [为什么要类加载器，类加载器做了什么,加载类的过程][1]
类加载器:启动类加载器(bootstrap classLoader),扩展类加载器(extension),应用类加载器(Application),自定义类加载器(user ClassLoader);
双亲委派模型:如果一个类加载器收到了加载某个类的请求,则该类加载器并不会去加载该类,而是把这个请求委派给父类加载器,每一个层次的类加载器都是如此,因此所有的类加载请求最终都会传送到顶端的启动类加载器;只有当父类加载器在其搜索范围内无法找到所需的类,并将该结果反馈给子类加载器,子类加载器会尝试去自己加载.

使用双亲委派模型原因:java类随着其类加载器一起具备了一种带有优先级的层次关系.例如 java.lang.Object,无论哪一个类加载器要加载该类,最终都是委托给处于顶端的启动类加载器,因此object在程序的各种类加载器环境中都是同一个类.相反如果没有使用双亲委派模型,那么假如用户自定义了一个称为java.lang.Object的类,并放在classPath中,那么系统将会出现多个不同的Object类,则java类型体系中最基础的行为都无法保证.

为什么需要自定义类加载器:
- 我们需要的类不一定存放在已经设置好的classPath下(有系统类加载器AppClassLoader加载的路径)，对于自定义路径中的class类文件的加载，我们需要自己的ClassLoader.
- 加密:java代码可以轻易的被反编译,如果你需要对你的代码进行加密以防止反编译,可以先将编译后的代码用加密算法加密,类加密后就不能再使用java自带的类加载器了,这时候就需要自定义类加载器.
- 从非标准的来源加载代码:字节码是放在数据库,甚至是云端,就可以自定义类加载器,从指定来源加载类.
- 可以定义类的实现机制，实现类的热部署,如OSGi中的bundle模块就是通过实现自己的ClassLoader实现的。

自定义类加载器的方法:
1、如果不想打破双亲委派模型，那么只需要重写findClass方法即可.
2、如果想打破双亲委派模型，那么就重写整个loadClass方法
创建自己的ClassLoader时只需要覆写findClass(name)和findResource()即可
```java
    private File getClassFile(String name) {
        File file = new File("D:/Person.class");// 此处要提前编译Person类,并把class文件放到d盘下.
        return file;
    }
```

## 基础

### 


[1]: https://blog.csdn.net/xiaoliuliu2050/article/details/53023734 '为什么要类加载器，类加载器做了什么,加载类的过程'