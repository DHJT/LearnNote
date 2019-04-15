# lombok
<!-- @author DHJT 2019-02-19 -->
主要的作用提高代码的简洁
@Data
去除一些重复的get,set方法，
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
    private String industrialWater;
    private String gas;
    private String naturlGas;
    private String steam;
    private String oxygenNitrogen;
    private String compressedAir;
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