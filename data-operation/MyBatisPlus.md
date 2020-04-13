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
// 一般会更新操作都会判断null值，为null就不更新对应的字段。但是有时候需要把特定的字段更新为null，使用mybatis-plus时可以在实体类特定属性上面加注解@TableField(strategy=FieldStrategy.IGNORED)，就会忽略null值判断，将null更新进数据库。
// public enum FieldStrategy
// IGNORED(0, "忽略判断"), NOT_NULL(1, "非NULL判断"), NOT_EMPTY(2, "非空判断")
@TableField(strategy=FieldStrategy.IGNORED)

#逻辑删除配置
#3.1.1开始不再需要这一步
mybatis-plus.global-config.sql-injector=com.baomidou.mybatisplus.mapper.LogicSqlInjector
#配置逻辑删除字段为1是删除
mybatis-plus.global-config.logic-delete-value=1
#配置逻辑删除字段为0是未删除
mybatis-plus.global-config.logic-not-delete-value=0
@TableLogic

// 测试时适用
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/spring-dao.xml"})

```
## 基础
集成mybatis-plus要把mybatis、mybatis-spring去掉，避免冲突；

### 集成
``` yaml
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

# Mybatis 配置
mybatis-plus:
    # 如果是放在src/main/java目录下
    mapper-locations: classpath*:/com/chilin/*/dao/mapper/*Mapper.xml
    # 实体扫描，多个package用逗号或者分号分隔
    typeAliasesPackage: com.chilin.*.entity
    global-config:
        db-config:
            # 主键类型  0:"数据库ID自增", 1:"用户输入ID",2:"全局唯一ID (ID_WORKER,数字类型唯一ID)", 3:"全局唯一ID UUID";
            id-type: 2
            # 字段策略 0:"忽略判断",1:"非 NULL 判断"),2:"非空判断"
            field-strategy: 2
            # mp2.3+ 全局表前缀 mp_
            # table-prefix: mp_
            #驼峰下划线转换
            db-column-underline: true
            #刷新mapper 调试神器
            #refresh-dao: true
            #数据库大写下划线转换
            #capital-mode: true
            # oracle主键策略配置Sequence 序列接口实现类配置
            # key-generator: com.baomidou.mybatisplus.incrementer.OracleKeyGenerator
            #逻辑删除配置
            logic-delete-value: 1                                            # 设置字段值为1，标识已经删除
            logic-not-delete-value: 0                                        # 默认状态，表示该数据项状态正常
            sql-injector: com.baomidou.mybatisplus.mapper.LogicSqlInjector   # 自定义 SQL 注入器
            # 自定义 公共字段 自动填充策略接口实现，参考：http://mp.baomidou.com/#/auto-fill
            meta-object-handler: com.chilin.common.config.mybatisplus.MyMetaObjectHandler
    configuration:
        #配置返回数据库(column下划线命名&&返回java实体是驼峰命名)，自动匹配无需as（没开启这个，SQL需要写as： select user_id as userId）
        map-underscore-to-camel-case: true
        cache-enabled: false
        #配置JdbcTypeForNull, oracle数据库必须配置
        jdbc-type-for-null: 'null'

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

#### 使用 Wrapper 自定义SQL
在使用了mybatis-plus之后, 自定义SQL的同时也想使用Wrapper的便利应该怎么办？ 在mybatis-plus版本3.0.7得到了完美解决 版本需要大于或等于3.0.7, 以下两种方案取其一即可

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
QueryWrapper<ScheduleJob> wrapper = new QueryWrapper<>();
wrapper.ge("job_name", key)
    .likeRight("point_name", "B1-02 REX").or().likeRight("point_name", "B1-17 Door 1 REX")
wrapper.and(
    i -> i.isNotNull("last_name").ne("last_name", "").
        or(j -> j.isNotNull("first_name").ne("first_name", "")));
Condition.create()
    .setSqlSelect("sum(quantity)")
    .isNull("order_id")
    .eq("user_id", 1)
    .in("status", new Integer[]{0, 1})
    .eq("product_id", 1)
    .between("created_time", startDate, currentDate);
```

```java
// 分页查询
public Page<T> selectPage(Page<T> page, EntityWrapper<T> entityWrapper) {
  if (null != entityWrapper) {
      entityWrapper.orderBy(page.getOrderByField(), page.isAsc());
  }
  page.setRecords(baseMapper.selectPage(page, entityWrapper));
  return page;
}

/**
 * 通过注解进行了sql查询，你也可以通过mapper.xml进行，这里无需设置分页条件，会自动进行sql拼接，这里要注意sql的结尾不要用；否自自动拼接limit无法完成 可能需要开启分页插件 PaginationInterceptor
 * @param  pagination [description]
 * @return            [description]
 */
@Select("SELECT * FROM fy_user u LEFT JOIN fy_role r ON u.role = r.id")
List<UserRoleVo> selectUserListPage(Page<UserRoleVo> pagination);

/*
 * 实体带查询使用方法  输出看结果
 */
EntityWrapper<User> ew = new EntityWrapper<User>();
ew.setEntity(new User(1));
ew.where("user_name={0}", "'zhangsan'").and("id=1")
        .orNew("user_status={0}", "0").or("status=1")
        .notLike("user_nickname", "notvalue")
        .andNew("new=xx").like("hhh", "ddd")
        .andNew("pwd=11").isNotNull("n1,n2").isNull("n3")
        .groupBy("x1").groupBy("x2,x3")
        .having("x1=11").having("x3=433")
        .orderBy("dd").orderBy("d1,d2");
System.out.println(ew.getSqlSegment());

// mapper java 接口方法
List<User> selectMyPage(RowBounds rowBounds, @Param("ew") Wrapper<T> wrapper);

public List<User>vip(Page page) {
    return session.selectList("user.vip", null, new RowBounds(page.getOffset(), page.getLimit()));
}
```

### 逻辑乐观锁
更新时需要Version不为空，否则 MyBatis-Plus 更新时会忽略该字段，直接更新数据

### 逻辑删除


### 通用枚举[^1]

[^1]: [通用枚举](https://mp.baomidou.com/guide/enum.html)


[Mybatis-Plus 官方指导文档](https://mybatis.plus/guide/page.html)