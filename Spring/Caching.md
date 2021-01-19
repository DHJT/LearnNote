# Caching.md

```java
@EnableCaching
@Configuration
public class CacheConfig {
    @Bean
    public CacheManager caffeineCacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();
        List<CaffeineCache> caffeineCaches = new ArrayList<>();
        for (CacheType cacheType : CacheType.values()) {
            caffeineCaches.add(new CaffeineCache(cacheType.name(),
                    Caffeine.newBuilder()
                            .expireAfterWrite(cacheType.getExpires(), TimeUnit.SECONDS)
                            .build()));
        }
        cacheManager.setCaches(caffeineCaches);
        return cacheManager;
    }
}
public enum CacheType {
    IZUUL(10),
    MUMU(5);
    private int expires;
    CacheType(int expires) {
        this.expires = expires;
    }
    public int getExpires() {
        return expires;
    }
}
```

## Caffeine
Caffeine 是个高性能的开源 Java 内存缓存库，具有较高的命中率和出色的并发能力
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
</dependency>
```
```yaml
spring.cache:
    cache-names: IZUUL
    caffeine.spec: initialCapacity=50,maximumSize=500,expireAfterWrite=5s
    type: caffeine
```

### Caffeine配置说明：
- initialCapacity=[integer]: 初始的缓存空间大小
- maximumSize=[long]: 缓存的最大条数
- maximumWeight=[long]: 缓存的最大权重
- expireAfterAccess=[duration]: 最后一次写入或访问后经过固定时间过期
- expireAfterWrite=[duration]: 最后一次写入后经过固定时间过期
- refreshAfterWrite=[duration]: 创建缓存或者最近一次更新缓存后经过固定的时间间隔，刷新缓存
- weakKeys: 打开key的弱引用
- weakValues：打开value的弱引用
- softValues：打开value的软引用
- recordStats：开发统计功能
- 注意：
    + expireAfterWrite和expireAfterAccess同事存在时，以expireAfterWrite为准。
    + maximumSize和maximumWeight不可以同时使用
    + weakValues和softValues不可以同时使用

[SpringBoot高级（一）SpringBoot与缓存](https://www.cnblogs.com/gengmf/articles/10748690.html)
