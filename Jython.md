# Jython
<!-- @author DHJT 2019-11-08 -->

## 开始[^1]
```xml
<dependency>
    <groupId>org.python</groupId>
    <artifactId>jython-standalone</artifactId>
    <version>2.7.0</version>
</dependency>
```
```java
public class JpythonScript {
    public static void main(String args[]) {
        // jpython抛错Cannot import site module
        Properties props = new Properties();
        props.put("python.import.site", "false");
        Properties preprops = System.getProperties();

        PythonInterpreter.initialize(preprops, props, new String[0]);
        PythonInterpreter interpreter = new PythonInterpreter();
        interpreter.exec("days=('mod','Tue','Wed','Thu','Fri','Sat','Sun'); ");
        interpreter.exec("print days[1];");
    }
}
```

[^1]: [Java调用Python程序方法总结(最全最详细)](https://blog.csdn.net/qq_26591517/article/details/80441540)