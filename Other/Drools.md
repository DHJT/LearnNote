#  Drools
<!-- @author DHJT 2019-12-27 -->
Drools 是用 Java 语言编写的开放源码规则引擎，使用 Rete 算法对所编写的规则求值。Drools 允许使用声明方式表达业务逻辑。可以使用非 XML 的本地语言编写规则，从而便于学习和理解。并且，还可以将 Java 代码直接嵌入到规则文件中，这令 Drools 的学习更加吸引人。
https://download.jboss.org/drools/release/7.31.0.Final/drools-distribution-7.31.0.Final.zip


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


[1]: https://download.jboss.org/drools/release/7.31.0.Final/org.drools.updatesite/ 'Drools 7.31.0.Final Update Site - Nightly Build Update Site'
[2]: https://blog.csdn.net/qq_21383435/article/details/82987288 'drools 7.x 模板的简单使用'