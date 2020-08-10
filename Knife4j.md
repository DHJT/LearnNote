# Knife4j
<!-- @author DHJT 2020-07-08 -->
knife4j是为Java MVC框架集成Swagger生成Api文档的增强解决方案，项目前身为`swagger-bootstrap-ui`
`swagger-bootstrap-ui`的最后一个版本是`1.9.6`,已更名为`knife4j`
`2.0`版本主要是使用`Vue`+`Ant Design Vue`对前端`Ui`进行重写,该版本是真正的前后端分离版本，同时依赖于`Vue`的技术生态,以后会有更多有趣的功能实现,全方位满足开发者的需要.【knife4j-spring-ui】
[项目地址@gitee](https://gitee.com/xiaoym/knife4j)
[项目地址@github](https://github.com/xiaoymin/swagger-bootstrap-ui)
[knife4j文档](https://doc.xiaominfo.com)

## 使用

### 新版本引用
```xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-ui</artifactId>
    <version>${lastVersion}</version>
</dependency>
```
### Spring Boot项目单体架构使用增强功能
在Spring Boot单体架构下,knife4j提供了starter供开发者快速使用
```xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>${knife4j.version}</version>
</dependency>
```
该包会引用所有的knife4j提供的资源，包括前端Ui的jar包

### Spring Cloud微服务架构
在Spring Cloud的微服务架构下,每个微服务其实并不需要引入前端的Ui资源,因此在每个微服务的Spring Boot项目下,引入knife4j提供的微服务starter
```xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-micro-spring-boot-starter</artifactId>
    <version>${knife4j.version}</version>
</dependency>
```
在网关聚合文档服务下,可以再把前端的ui资源引入
```xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>${knife4j.version}</version>
</dependency>
```
```xml
<!-- 最低版本：1.9.6~2.0.0 -->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <!--在引用时请在maven中央仓库搜索最新版本号-->
    <version>2.0.4</version>
</dependency>
```
`swagger-bootstrap-ui`的最后一个版本
```xml
<dependency>
  <groupId>com.github.xiaoymin</groupId>
  <artifactId>swagger-bootstrap-ui</artifactId>
  <version>1.9.6</version>
</dependency>
```

```xml
<!-- 最低版本：2.0.2 -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.github.xiaoymin</groupId>
            <artifactId>knife4j-dependencies</artifactId>
            <version>${knife4j.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

### UI增强
同时，swagger-bootstrap-ui在满足以上功能的同时，还提供了文档的增强功能，这些功能是官方swagger-ui所没有的，每一个增强的功能都是贴合实际,考虑到开发者的实际开发需要,是比不可少的功能，主要包括：

- 个性化配置：通过个性化ui配置项，可自定义UI的相关显示信息
- 离线文档：根据标准规范，生成的在线markdown离线文档，开发者可以进行拷贝生成markdown接口文档，通过其他第三方markdown转换工具转换成html或pdf，这样也可以放弃swagger2markdown组件
- 接口排序：自1.8.5后，ui支持了接口排序功能，例如一个注册功能主要包含了多个步骤,可以根据swagger-bootstrap-ui提供的接口排序规则实现接口的排序，step化接口操作，方便其他开发者进行接口对接
- `2.0.0`版本开始，UI界面开始改变，使用了Vue

### 访问地址
`swagger-bootstrap-ui`默认访问地址是：`http://${host}:${port}/doc.html`

### 自定义文档
__注意__自定义文档说明必须以`.md`结尾的文件,其他格式文件会被忽略
```yaml
# swagger-bootstrap-ui中使用
swagger:
  markdowns: classpath:markdown/*
# knife4j中使用
knife4j:
  markdowns: classpath:markdown/*
```
### 增强功能
> WARNING
> 开发者要想使用knife4j提供的增强功能,必须在Swagger的配置文件中引入增强注解,各个版本的增强注解区别如下表:

| 软件                    | 版本      | 增强注解                   | 说明                 |
| :---------------------- | --------- | -------------------------- | -------------------- |
| swagger-bootstrap-ui    | <= 1.9.6  | @EnableSwaggerBootstrapUI  |                      |
| knife4j                 | <=2.0.0   | @EnableSwaggerBootstrapUi  |                      |
| knife4j                 | >=2.0.1   | @EnableKnife4j             | 后续版本不会再更改   |

SwaggerBootstrapUi自1.8.5版本以后,增加了后端Java代码的支持功能,主要目的是辅助Java开发者在使用Springfox-Swagger的同时,扩展一些增强功能，帮助开发者拥有更好的文档体验.

目前主要增强功能：

- tags分组标签排序
- api接口排序

注解@EnableSwaggerBootstrapUi、@ApiSort、@ApiOperationSort是本UI工具包提供的Java注解,排序功能的使用需要在启用原EnableSwagger2注解上增加@EnableSwaggerBootstrapUi注解方可生效

以上后台设置全部完成后,在UI的个性化设置中还需勾选开启增强功能,否则增强功能不生效.

功能目录：文档管理 -> 个性化设置
