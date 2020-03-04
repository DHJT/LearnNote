#  Drools
<!-- @author DHJT 2019-12-27 -->
Drools 是用 Java 语言编写的开放源码规则引擎，使用 Rete 算法对所编写的规则求值。Drools 允许使用声明方式表达业务逻辑。可以使用非 XML 的本地语言编写规则，从而便于学习和理解。并且，还可以将 Java 代码直接嵌入到规则文件中，这令 Drools 的学习更加吸引人。
https://download.jboss.org/drools/release/7.31.0.Final/drools-distribution-7.31.0.Final.zip

https://github.com/kiegroup/drools/tree/master/drools-examples
### Try the examples now
- Download the zip and unzip it
- On Linux/Mac, run examples/runExamples.sh
- On Windows, run examples/runExamples.bat

Requires Java™ to run.

### using Docker ?
- Business Central Workbench
- Business Central Workbench Showcase
- KIE Execution Server
- KIE Execution Server Showcase

More info at this post

This image provides the JBoss Drools Workbench web application. It's intended to be extended so you can add your custom configurations.

If you don't want to extend this image and you just want to try Drools Workbench, please take a look at the jboss/drools-workbench-showcase:latest Docker image, it contains some default configurations.

```sh
docker pull jboss/drools-workbench
docker pull jboss/drools-workbench-showcase

docker run -p 8080:8080 -p 8001:8001 -d --name drools-workbench jboss/drools-workbench-showcase:latest
```
http://localhost:8080/business-central

|    USER   |  PASSWORD |          ROLE         |
|-----------|-----------|-----------------------|
| admin     | admin     | admin,analyst,kiemgmt |
| krisv     | krisv     | admin,analyst         |
| john      | john      | analyst,Accounting,PM |
| sales-rep | sales-rep | analyst,sales         |
| katy      | katy      | analyst,HR            |
| jack      | jack      | analyst,IT            |

- 推理方式
    + 正向链推理：一条由问题开始搜索，并得到其解答的链称为正向链推理。
    + 反向链推理：一条由假设回推到支持该假设的事实的链称为反向链推理。

## kmoudle.xml
一个module下面可以配多个kbase，一个kbase可以配多个drl文件（如下边的配置方式），一个drl文件里可以配多个规则


## 基础
KieSession：有状态Session
StatelessKieSession：无状态Session

```java
// *.drl 语法
package package-name // 包名，必须的，指限于逻辑上的管理，若自定义查询或者函数属于同一包名，不管物理位置如何，都可以调用
imports // 需要导入的类名
globals // 全局变量
functions // 函数
queries // 查询
// rules 规则，可以有多个
rule "name"
    attributes-属性
    when
        LHS-条件
    then
        RHS-结果
end
```

### 规则模板

### 决策表(decision tables)
决策表是一个“精确而紧凑的”表示条件逻辑的方式，非常适合商业级别的规则。
目前决策表支持xls格式和csv格式。决策表与现有的drools drl文件使用可以无缝替换。

### 什么时候使用决策表
- 规则能够被表达为模板+数据的格式，考虑使用决策表
- 很少量的规则不建议使用决策表
- 不是遵循一组规则模板的规则也不建议使用决策表
- [Drools决策表的使用](https://blog.csdn.net/wo541075754/article/details/78848178)

### 可借鉴参考资源
- [secbr/drools](https://github.com/secbr/drools)
    + [Drools规则引擎](https://blog.csdn.net/wo541075754/category_9269332.html)

[1]: https://download.jboss.org/drools/release/7.31.0.Final/org.drools.updatesite/ 'Drools 7.31.0.Final Update Site - Nightly Build Update Site'
[2]: https://blog.csdn.net/qq_21383435/article/details/82987288 'drools 7.x 模板的简单使用'
[3]: https://blog.csdn.net/gongxsh00/article/details/79529924 'JBoss Drools如何动态加载并更新规则？'