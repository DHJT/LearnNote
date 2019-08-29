# MyBatis-Plus
<!-- @author DHJT 2019-06-18 -->
简称：MP
## 特性
无侵入
依赖少：仅仅依赖MyBatis和Spring
启动即注入基本的CURD

定义MyBatisPlus的全局配置
GlobalConfiguration 

[](http://mp.baomidou.com/#/?)

## 基础
集成mybatis-plus要把mybatis、mybatis-spring去掉，避免冲突；

### 集成

#### mybatis-config.xml
因为是与spring整合，所有mybatis-plus的大部分都写在spring的配置文件中，这里定义一个空的mybatis-config.xml即可。
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
</configuration>
```

### 方法使用
```java
// 插入
xxxMapper.insert(T);
xxxMapper.insertAllColumn(T);
// 更新
xxxMapper.updateById(T);
xxxMapper.updateAllColumnById(T);
```
