# Turbine
<!-- @DHJT 2020-04-11 -->

```yaml
server:
  port: 8181 # 端口

spring:
  application:
    name: hystrix-turbine # 应用名称

# 配置 Eureka Server 注册中心
eureka:
  instance:
    prefer-ip-address: true       # 是否使用 ip 地址注册
    instance-id: ${spring.cloud.client.ip-address}:${server.port} # ip:port
  client:
    service-url:                  # 设置服务注册中心地址
      defaultZone: http://localhost:8761/eureka/,http://localhost:8762/eureka/

# 聚合监控
turbine:
  # 要监控的服务列表，多个用逗号分隔
  app-config: order-service-rest,order-service-feign
  # 指定集群名称
  cluster-name-expression: "'default'"
```
在配置文件中开启 hystrix.stream 端点。如果希望所有端点暴露，配置为 '*'。
```yaml
# 度量指标监控与健康检查
management:
  endpoints:
    web:
      exposure:
        include: hystrix.stream
```

http://localhost:8181/turbine.stream