# Starter

## spring-boot-starter-actuator（健康监控）配置和使用
指定监控的HTTP端口（如果不指定，则使用和Server相同的端口）；指定去掉某项的检查（比如不监控health.mail）：
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<!-- 如果使用HTTP调用的方式，还需要这个依赖： -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```
```yaml
# application.yml
server:
  port: 8082

# 查看应用信息，需要自己添加信息
info:
  contact:
    email: 11@163.com
management:
  port: 54001
  health:
    mail:
      enabled: false
```

| HTTP方法 | 路径            | 描述                                                                   | 鉴权  |
| :-----:  | :------------   | :--------------                                                        | :-:   |
| GET      | /autoconfig     | 查看自动配置的使用情况                                                 | true  |
| GET      | /configprops    | 查看配置属性，包括默认配置                                             | true  |
| GET      | /beans          | 查看bean及其关系列表                                                   | true  |
| GET      | /dump           | 打印线程栈                                                             | true  |
| GET      | /env            | 查看所有环境变量                                                       | true  |
| GET      | /env/{name}     | 查看具体变量值                                                         | true  |
| GET      | /health         | 查看应用健康指标                                                       | false |
| GET      | /info           | 查看应用信息                                                           | false |
| GET      | /mappings       | 查看所有url映射                                                        | true  |
| GET      | /metrics        | 查看应用基本指标                                                       | true  |
| GET      | /metrics/{name} | 查看具体指标                                                           | true  |
| POST     | /shutdown       | 关闭应用（要真正生效，得配置文件开启endpoints.shutdown.enabled: true） | true  |
| GET      | /trace          | 查看基本追踪信息                                                       | true  |
