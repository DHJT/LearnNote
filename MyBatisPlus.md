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

### 方法使用
```java
// 插入
xxxMapper.insert(T);
xxxMapper.insertAllColumn(T);
// 更新
xxxMapper.updateById(T);
xxxMapper.updateAllColumnById(T);
```
