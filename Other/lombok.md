# lombok
<!-- @author DHJT 2019-02-19 -->
主要的作用提高代码的简洁、去除一些重复的get,set方法。

[为什么要放弃 Lombok？](https://zhuanlan.zhihu.com/p/146659383)

### 安装
在eclipse中安装完成之后，可以在工具栏`Help`->`About Eclipse IDE`中最后看到`Lombok v1.18.6 "Envious Ferret" is installed. https://projectlombok.org/`，这代表着安装成功。

### 使用
```java
@NoArgsConstructor
@AllArgsConstructor
@Data
@Accessors(chain = true)
```
### 使用
1. 需要官网下载jar包
https://projectlombok.org/download
2. 运行jar包，添加到eclipse目录下
点击install/update按钮，即可安装完成
检查eclipse.ini文件最后是否添加了jar包
3. 然后重启一下eclipse,
4. 最重要的是需要在maven中引入
```xml
    <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.16.6</version>
    </dependency>
```
```java
import lombok.Data;
@Data
public class EnergySource {
    private String energySourceId;
    private String fuel;
    private String dynamicMedium;
}
```
### 还有一些提供的注解：
- @Data   ：注解在类上；提供类所有属性的 getting 和 setting 方法，此外还提供了equals、canEqual、hashCode、toString 方法
- @Setter：注解在属性上；为属性提供 setting 方法
- @Getter：注解在属性上；为属性提供 getting 方法
- @Log4j ：注解在类上；为类提供一个 属性名为log 的 log4j 日志对象
- @NoArgsConstructor：注解在类上；为类提供一个无参的构造方法
- @AllArgsConstructor：注解在类上；为类提供一个全参的构造方法

### 常见问题
- lombok注解@Data使用在继承类上时出现警告[^1]

[^1]: [lombok注解@Data使用在继承类上时出现警告](https://blog.csdn.net/feinifi/article/details/85275280)


[1]: https://www.cnblogs.com/30go/p/8468981.html 'eclipse安装lombok'
[2]: https://www.cnblogs.com/qnight/p/8997493.html '学习Spring Boot：（十五）使用Lombok来优雅的编码'
[3]: https://www.jianshu.com/p/5411e9efd577 'lombok-maven-plugin delombok你的源码'
[4]: https://blog.csdn.net/motui/article/details/79012846 'Lombok 介绍'