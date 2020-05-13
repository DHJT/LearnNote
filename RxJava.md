# RxJava
<!-- @author DHJT 2020-05-02 -->

支持异步的链式编程

### 应用场景
一、与Retrofit联用
Retrofit+RxJava的上网模式已经非常火了，如果有不了解的可以看笔者的这篇文章https://www.jianshu.com/writer#/notebooks/5118090/notes/25405151
二、Rxpermissions等类库的使用
基于RxJava的开源类库Rxpermissions、RxBinding以及RxBus在很多项目中已经非常常见，并且被证明了是极其好用的。
三、所有用到异步的地方

```xml
<!-- https://mvnrepository.com/artifact/io.reactivex.rxjava3/rxjava -->
<dependency>
    <groupId>io.reactivex.rxjava3</groupId>
    <artifactId>rxjava</artifactId>
    <version>3.0.2</version>
</dependency>
<!-- https://mvnrepository.com/artifact/io.reactivex.rxjava2/rxjava -->
<dependency>
    <groupId>io.reactivex.rxjava2</groupId>
    <artifactId>rxjava</artifactId>
    <version>2.2.19</version>
</dependency>

```