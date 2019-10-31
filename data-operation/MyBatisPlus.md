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

```java
@TableName(value = "tb_employee")//指定表名
//value与数据库主键列名一致，若实体类属性名与表主键列名一致可省略value
@TableId(value = "id", type = IdType.AUTO)//指定自增策略
//若没有开启驼峰命名，或者表中列名不符合驼峰规则，可通过该注解指定数据库表中的列名，exist标明数据表中有没有对应列
@TableField(value = "last_name", exist = true)

#逻辑删除配置
mybatis-plus.global-config.sql-injector=com.baomidou.mybatisplus.mapper.LogicSqlInjector
mybatis-plus.global-config.logic-delete-value=1
mybatis-plus.global-config.logic-not-delete-value=0
@TableLogic

// 测试时适用
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml"})

```
## 基础
集成mybatis-plus要把mybatis、mybatis-spring去掉，避免冲突；

### 集成
```yaml
mybatis-plus:
  mapper-locations: classpath*:/mapper/*.xml
  type-aliases-package: com.hoperun.entity
  type-aliases-super-type: java.lang.Object
  type-handlers-package: com.hoperun.typeHandler
  type-enums-package: com.hoperun.enums
  global-config:
    db-config:
      logic-delete-value: 1
      logic-not-delete-value: 0
```

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

Wrappers.emptyWrapper() // 空的查询器
```

### 活动记录(ActiveRecord)
```java
User user = new User();
user.selectById(1);
user.setId(1);
user.selectById();
```

### 查询器
```java
QueryWrapper<ScheduleJob> queryWrapper = new QueryWrapper<>();
queryWrapper.ge("job_name", key);
```
