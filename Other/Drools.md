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
@Duration：Drools引擎中事件的持续时间。


date-expires
此属性与date-effective的作用相反，用来设置规则的过期时间。时间格式可完全参考date-effective的时间格式。引擎在执行规则时会检查属性是否设置，如果设置则比较当前系统时间与设置时间，如果设置时间大于系统时间，则执行规则，否则不执行。实例代码同样参考date-effective。

duration
已废弃。设置该属性，规则将指定的时间之后在另外一个线程里触发。属性值为一个长整型，单位是毫秒。如果属性值设置为0，则标示立即执行，与未设置相同。

enabled
设置规则是否可用。true：表示该规则可用；false：表示该规则不可用。

salience:设置规则执行的优先级
值：数字（数字越大执行优先级越高）
no-loop:控制已经执行的规则条件再次满足是否再次执行
值：true/false
activation-group:若干个规则分为一个组
值：分组名称
declare:Drools除了接收用户在外部向WorkingMemory当中插入现成的Fact对象，还允许用户在规则文件当中定义一个新的Fact对象

### CEP

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