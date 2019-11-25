# Swagger
<!-- @author DHJT 2018-09-28 -->

swagger2访问url
swagger ： http://localhost:8080/swagger/index.html
springboot中的swagger：http://localhost:8080/swagger-ui.html      非常简单

```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.9.2</version>
</dependency>
<!-- swagger-ui 访问地址：http://localhost:8080/swagger-ui.html -->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>${swagger.version}</version>
</dependency>
<!-- 访问地址：http://localhost:8080/doc.html -->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>swagger-bootstrap-ui</artifactId>
    <version>1.9.3</version>
</dependency>
```

### 
3.1 @Api 类注释
@Api：用来描述类的，属性如下：
tags 描述类的用途value 对显示而言没有任何用途可以不用设置
代码示例：
@Api(tags = "文章接口")
3.2 @ApiOperation 方法注释
@ApiOperation：用来描述方法的，属性如下：
value 方法的描述notes 方法备注说明
3.3 @ApiImplicitParams 参数注释

@ApiImplicitParams：描述多参数

@ApiImplicitParam：描述单参数

属性如下：

name 参数value 参数的描述required 是否必传paramType 参数存放位置：header、query、path(resuful接口)、body、formdataType 参数类型defaultValue 参数默认值

3.4 @ApiModel 实体对象描述

@ApiModel：实体类名描述，属性如下：

description 类描述

@ApiModelProperty：字段描述，属性如下：

value 字段描述
```java
// controller描述
@Api(description = "问卷控制器")
// 方法描述
@ApiOperation(value = "获取用户", notes = "根据id获取用户")
// 参数描述
@ApiImplicitParams({
    @ApiImplicitParam(paramType= "path", name = "id", value = "用户id", required = true, dataType = "Integer")
})
```

cpj-swagger
- [swagger4j](https://github.com/cpjit/swagger)

- [5分钟了解swagger](https://blog.csdn.net/i6448038/article/details/77622977)
- [swagger完整教程。杜绝copy](https://blog.csdn.net/qq_32446775/article/details/75546553)
- [swagger环境的搭建（swagger-editor|swagger-ui）](https://blog.csdn.net/ron03129596/article/details/53559803)
- [cpj-swagger分别整合struts2、spring mvc、servlet] [1]

[1]: http://www.cnblogs.com/jiafuwei/p/6252632.html 'cpj-swagger分别整合struts2、spring mvc、servlet'
[2]: https://segmentfault.com/a/1190000019273239 'springboot2.x集成swagger'
