# MyBatis
<!-- @author DHJT 2019-03-07 -->

### `mybatis-config.xml`
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <settings>
        <!-- 打印查询语句 -->
        <setting name="logImpl" value="STDOUT_LOGGING" />
    </settings>
    <!-- 实体类,简称 -设置别名 -->
    <typeAliases>
        <typeAlias alias="User" type="com.app.entity.User" />
    </typeAliases>
    <!-- 实体接口映射资源 -->
    <!-- 说明：如果xxMapper.xml配置文件放在和xxMapper.java统一目录下，mappers也可以省略，因为org.mybatis.spring.mapper.MapperFactoryBean默认会去查找与xxMapper.java相同目录和名称的xxMapper.xml -->
    <mappers>
        <mapper resource="com/app/mapper/UserMapper.xml" />
    </mappers>
</configuration>
```
### `*Mapper.xml`
- `insert`:
    + 插入一条数据
    + 支持Oracle序列,UUID,类似MySQL的INDENTITY自动增长(自动回写)
    + 优先使用传入的参数值,参数值空时,才会使用序列、UUID,自动增长
- `InsertSelective`
    + 插入一条数据,只插入不为null的字段,不会影响有默认值的字段
    + 支持oracle序列,UUID,类似mysql的INDENTITY自动增长(自动回写)
    + 优先使用传入的参数值,参数值空时,才会使用序列、UUID,自动增长
- `updateByPrimaryKey`:
    + 会将为空的字段在数据库中置为NULL。
- `updateByPrimaryKeySelective`
    + 只是更新新的model中不为空的字段

### 插件
实现Interceptor接口

#### PageHelper

### MyBatis一次执行多条SQL语句
1、多条sql分批执行；2、存储过程或函数调用；3、sql批量执行。

MyBatis中如何一次执行多条语句（使用mysql数据库）。
1、修改数据库连接参数加上allowMultiQueries=true，如：
```yml
hikariConfig:
    security: 
        jdbcUrl: jdbc:mysql://xx.xx.xx:3306/xxxxx?characterEncoding=utf-8&autoReconnect=true&failOverReadOnly=false&allowMultiQueries=true
```
2、直接写多条语句，用“；”隔开即可
```xml
<delete id="deleteUserById" parameterType="String">
    delete from sec_user_role where userId=#{id};
    delete from sec_user where id=#{id};
</delete>
```