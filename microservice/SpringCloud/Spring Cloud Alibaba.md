# Spring Cloud Alibaba
<!-- @author DHJT 2019-10-09 -->
Spring Cloud基于Spring Boot构建，而Spring Cloud Alibaba又基于Spring Cloud Common的规范实现。

| Spring Boot | Spring Cloud | Spring Cloud Starter Alibaba |
|-------------|--------------|------------------------------|
| 2.1.x       | Greenwich    | 0.9.x                        |
| 2.0.x       | Finchley     | 0.2.x                        |
| 1.5.x       | Edgware      | 0.1.x                        |
| 1.5.x       | Dalston      | 0.1.x                        |


单独的引入spring-cloud-alibaba-dependencies来管理Spring Cloud Alibaba下的组件版本。
```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Finchley.SR1</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>0.2.1.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```