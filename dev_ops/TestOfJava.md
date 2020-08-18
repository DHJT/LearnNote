# Test of Java
<!-- @author DHJT 2020-08-10 -->

SpringRunner和SpringJUnit4ClassRunner有什么区别？
SpringRunner is an alias for the SpringJUnit4ClassRunner.
To use this class, simply annotate a JUnit 4 based test class with @RunWith(SpringRunner.class).

----------------------

SpringRunner 继承了SpringJUnit4ClassRunner，没有扩展任何功能；使用前者，名字简短而已。

测试框架
JUnit、TestNG、Mockito

```java
// 让junit与spring环境进行整合
@RunWith(SpringRunner.class)
@RunWith(SpringJUnit4ClassRunner.class)
// SpringBoot微服务框架需要引入注解 需要结合 @RunWith(SpringRunner.class) 一起进行测试
@SpringBootTest // 加载springboot启动类，启动springboot 如果有多个启动类 @SpringBootTest(classes=[App1.class,App2.class]) 用逗号隔开
// JPA 测试时需要导入的Entity管理器；
@DataJpaTest
@Autowired
private TestEntityManager entityManager;
// @WebAppConfiguration
// @ContextConfiguration
```

### MyBatis-Spring-Boot-Starter-Test
[mybatis-spring-boot-test-autoconfigure/](http://mybatis.org/spring-boot-starter/mybatis-spring-boot-test-autoconfigure/)
```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter-test</artifactId>
    <version>2.1.3</version>
    <scope>test</scope>
</dependency>
```
```java
import static org.assertj.core.api.Assertions.assertThat;
@RunWith(SpringRunner.class)
@MybatisTest
public class CityMapperTest {
    @Autowired
    private CityMapper cityMapper;
    @Test
    public void findByStateTest() {
        City city = cityMapper.findByState("CA");
        assertThat(city.getName()).isEqualTo("San Francisco");
        assertThat(city.getState()).isEqualTo("CA");
        assertThat(city.getCountry()).isEqualTo("US");
    }
}
// 与WebMv一起使用需要使用@AutoConfigureMybatis
@RunWith(SpringRunner.class)
@WebMvcTest
@AutoConfigureMybatis // Specify instead of @MybatisTest
public class PingTests {
    @Autowired
    private MockMvc mvc;
    @Test
    public void ping() throws Exception {
        this.mvc.perform(get("/ping"))
            .andExpect(status().isOk())
            .andExpect(content().string("OK"));
    }
}
```

Mockito是一个针对Java的mocking框架。它与EasyMock和jMock很相似，但是通过在执行后校验什么已经被调用，它消除了对期望行为（expectations）的需要。其它的mocking库需要你在执行前记录期望行为（expectations），而这导致了丑陋的初始化代码。