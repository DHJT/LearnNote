#  Drools
<!-- @author DHJT 2019-12-27 -->
Drools 是用 Java 语言编写的开放源码规则引擎，使用 Rete 算法对所编写的规则求值。Drools 允许使用声明方式表达业务逻辑。可以使用非 XML 的本地语言编写规则，从而便于学习和理解。并且，还可以将 Java 代码直接嵌入到规则文件中，这令 Drools 的学习更加吸引人。
https://download.jboss.org/drools/release/7.31.0.Final/drools-distribution-7.31.0.Final.zip

https://github.com/kiegroup/drools/tree/master/drools-examples

【Drools Fusion (CEP) Example 和 关键概念】(https://www.cnblogs.com/zhwbqd/p/4212766.html)

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

### GEF 插件
http://download.eclipse.org/tools/gef/updates/releases/

## 基础
KieSession：有状态Session
StatelessKieSession：无状态Session
基于KIE（Knowledge Is Everything 知识就是一切）概念的API

日期的格式默认是"dd-mmmm-yyyy"，可以更改。
Drools使用标准的java 正规表达式：java API中 Pattern 类；

### Drools的构成

#### Guvnor
Guvnor是一个通过Web界面可以管理,更改规则的工具,也可以提供Repository的服务.(似乎各种开源软件里都会提供这样的Web管理界面,Heritrix,Nutch,AllGeography等等等等).支持Dsl和QA.

#### Expert
传统的规则引擎,应该说Drools的核心,也是前身.通过Rete算法来实现模式匹配.

#### Jbpm
工作流的处理交给了JBPM这个模块,除了工作流之外还提供了各种各样的集成(Camel,Spring,Osgi等).其中Camel适用于路由转发

#### Fusion
用于做CEP的处理.

#### Planner
Planer用来解决一系列的问题,如N皇后问题,TSP
(话说这些问题有什么共同点我还没有领会得到,大体的感觉是可以用来解决一些规划问题,或者是说求解问题).

(Linear,Rete,Treat,Leap).

### 条件元素
```java
// 1. and、&&，不写默认为and
// 2. or、||，不写默认为and
// 3. exists 、Not
// 4. from
// customer中的accounts列表中存在name="碧落"的account对象
Account(name=="碧落") from $customer.accounts
// 5. collect
// 列表中status="Y"的Account对象大于等于4个，
$accounts:ArrayList(size >= 4) from collect (Account(status == "Y"))
// 6. Accumulate 聚合函数
// 工作空间中，account对象的num属性之和大于400时符合规则
$total:Number( intValue > 400) from accumulate (Account($num:num),sum($num))

// contains： 对比是否包含操作，操作的被包含目标可以是一个复杂对象也可以是一个简单的值
Person( fullName not contains "Jr" )
// not contains：与contains相反。
// memberOf：判断某个Fact属性值是否在某个集合中，与contains不同的是他被比较的对象是一个集合，而contains被比较的对象是单个值或者对象
CheeseCounter( cheese memberOf $matureCheeses )
// not memberOf：与memberOf正好相反
// matches：正则表达式匹配
Cheese( type matches "(Buffalo)?\\S*Mozarella" )
// 注意： 就像在Java中，写为字符串的正则表达式需要转义“\”
// not matches：与matches正好相反
```
操作符：`>`、`>=`、`<`、`<=`、`==`、`!=`、`contains`、`not contains`、`memberOf`、`not memberOf`、`matches`、`not matches`

### 结果部分- RHS
insert：往当前workingMemory中插入一个新的Fact对象，会触发规则的再次执行，除非使用no-loop限定
update：更新
modify：修改，与update语法不同，结果都是更新操作
retract：删除
```java
rule "Rule 03"
    when
        $number : Number( )
        not Number( intValue < $number.intValue )
    then
        System.out.println("Number found with value: " + $number.intValue() );
        modify ( $number )  { setValue( 23 ) }
        retract( $number );
end
```

### Drools规则文件种类
1、DRL高级别的表达式语言
2、xml结构化规则
3、DSL
4、Decision Tables决策表，如：解析Excel
5、自定义UI界面

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

#### agenda-group 的使用[^1]
1. 如果没有指定agenda-group 则默认把所有未指定agenda-group的 rules 都执行一遍
2. 如果指定了agenda-group 使用的时候必须指定该name才能被使用，默认是不能使用的
3. agenda-group name可以重复
4. agenda-group 用于区分rule

### CEP
[Drools Fusion(CEP)定义及使用方法讲解](https://www.jb51.net/article/157770.htm)

### Drools事件监听
RuleRuntimeEvenListener
AgendaEventListener
ProcessEventListener 3个接口

Drools提供了一些监听器来获得规则引擎执行过程中发生的一些事件：
WorkingMemoryEventListene，AgendEventListener和RuleFlowEventListener

从名称来看我们也大概能知道他们分别的作用：
WorkingMemoryEventListene是监听WorkingMemory中发生的一些时间，WorkingMemory发生的事件那就是Fact的插入，删除，修改。
对应的借口为：
objectInserted(ObjectInsertedEvent e);
objectRetracted(ObjectRetractedEvent e);
objectUpdated(ObjectUpdatedEvent e);
AgendEventListener是舰艇运行过程中Agenda管理调配规则发生的一些事件：
Action 在我理解应该是一个冲突就是上面提到过的 完全符合规则条件的，包含规则和数据的对象。
activationCancelled action被取消，可能是因为在规则的执行过程中，某个对象被修改或者某个对象被删除引起。
activationCreated 当有数据能匹配到规则，就能发生这个事件。
afterActivationFired 在规则执行后触发这个事件
agendaGroupPopped 规则组。。。
agendaGroupPushed
beforeActivationFired 在规则执行前触发这个事件

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
[4]: https://blog.csdn.net/u013115157/article/details/88119175 'Drools7多线程，高并发测试总结'
[5]: https://blog.csdn.net/lifetragedy/article/details/51143914 'jboss规则引擎KIE Drools 6.3.0 Final 教程(1)'
[6]: https://blog.csdn.net/lifetragedy/article/details/60755213 'jboss规则引擎KIE Drools 6.3.0-高级讲授篇'
[7]: https://blog.csdn.net/qq_21383435/article/details/82907021 'drools 7.x-复杂事件处理入门'
[8]: https://blog.csdn.net/top_explore/article/details/93882257 'drools 复杂事件处理Complex Event Processing'
[9]: https://www.lefer.cn/posts/30551/ 'Drools性能实践总结'
[10]: https://www.cnblogs.com/mufeng07/p/12626251.html#_label23 'drools基本知识'


[^1]: [drools7 (二、agenda-group 的使用)](https://www.cnblogs.com/xiaojf/p/8331351.html)
