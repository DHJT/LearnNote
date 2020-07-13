# Swagger
<!-- @author DHJT 2018-09-28 -->

## swagger2访问url
swagger ： http://localhost:8080/swagger/index.html
springboot中的swagger：http://localhost:8080/swagger-ui.html

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
<!-- swagger-ui-layer 访问地址：http://localhost:8080/docs.html -->
<dependency>
    <groupId>com.github.caspar-chen</groupId>
    <artifactId>swagger-ui-layer</artifactId>
    <version>1.1.3</version>
</dependency>
```

### 几个基本注解
```java
@Api：用在请求的类上，表示对类的说明
    tags="说明该类的作用，可以在UI界面上看到的注解"
    value="该参数没什么意义，在UI界面上也看到，所以不需要配置"

@ApiOperation：用在请求的方法上，说明方法的用途、作用
    value="说明方法的用途、作用"
    notes="方法的备注说明"

@ApiImplicitParams：用在请求的方法上，表示一组参数说明
    @ApiImplicitParam：用在@ApiImplicitParams注解中，指定一个请求参数的各个方面
        name：参数名
        value：参数的汉字说明、解释
        required：参数是否必须传
        paramType：参数放在哪个地方
            · header --> 请求参数的获取：@RequestHeader
            · query --> 请求参数的获取：@RequestParam
            · path（用于restful接口）--> 请求参数的获取：@PathVariable
            · body（不常用）
            · form（不常用）
        dataType：参数类型，默认String，其它值dataType="Integer"
        defaultValue：参数的默认值

@ApiResponses：用在请求的方法上，表示一组响应
    @ApiResponse：用在@ApiResponses中，一般用于表达一个错误的响应信息
        code：数字，例如400
        message：信息，例如"请求参数没填好"
        response：抛出异常的类

@ApiModel：用于响应类上，表示一个返回响应数据的信息
            （这种一般用在post创建的时候，使用@RequestBody这样的场景，
            请求参数无法使用@ApiImplicitParam注解进行描述的时候）
@ApiModelProperty：用在属性上，描述响应类的属性

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
