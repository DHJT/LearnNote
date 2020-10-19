# Jackson
<!-- @author DHJT 2020-05-09 -->

使用@JsonProperty 可以对任意属性序列化与反序列化，而不用关注他们名字是否匹配。

### 反序列化

#### @JsonCreator
当json在反序列化时，默认选择类的无参构造函数创建类对象，当没有无参构造函数时会报错，@JsonCreator作用就是指定反序列化时用的无参构造函数。构造方法的参数前面需要加上@JsonProperty,否则会报错。
```java
@JsonCreator
public Person(@JsonProperty("id") String id) {
    this.id = id;
}
```
json反序列化时调用此构造函数

#### @JsonValue
可以用在get方法或者属性字段上，一个类只能用一个，当加上@JsonValue注解时，该类的json化结果，只有这个get方法的返回值，而不是这个类的属性键值对.


#### @JsonIgnore
反序列化时忽略不需要的字段

#### 反序列化时，多余字段的忽略处理
当字段少于实体类字段：正常通过，没有的字段会被赋予默认值
当字段多于实体类字段：报错`com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException: Unrecognized field "hobby" (class com.cyj.demo03.Student), not marked as ignorable (3 known properties: "name", "sex", "age"])`

在默认情况下，jackson是不支持json串的字段多于实体类字段的，但是，jackson也提供了解决方案，我们在实体类上，添加注解`@JsonIgnoreProperties`，这个注解有一个`ignoreUnknown`属性，默认值为false，我们可以将它改为true,这样jackson在反序列化的时候，就会忽略掉不存在的属性了。
`@JsonIgnoreProperties(ignoreUnknown = true)`
objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

```java
public class Student {
    private String name;
    private String sex;
    private Integer age;
    public String getName() {
        return name;
    }
    public String getSex() {
        return sex;
    }
    public Integer getAge() {
        return age;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setSex(String sex) {
        this.sex = sex;
    }
    public void setAge(Integer age) {
        this.age = age;
    }
    @Override
    public String toString() {
        return "Student [name=" + name + ", sex=" + sex + ", age=" + age + "]";
    }
}

//jackson 多字段
@Test
public void testJackson() throws Exception{
    String jsonStr = "{\"age\":20,\"name\":\"lisi\",\"sex\":\"男\",\"hobby\":\"basketball\"}";
    ObjectMapper om = new ObjectMapper();
    // objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    Student stu = om.readValue(jsonStr, Student.class);
    System.out.println(stu);
}

public testJackson(String[] args) {
        String jsonStr = "{\"firstName\":\"laowang\"}";
        //默认开启注解模式，也就是下面UserBean中的@JsonProperty("firstName")是起效果的
        ObjectMapper mapper = new ObjectMapper();
        try {
            //成功的将json 转化为了 userBean
            UserBean userBean = mapper.readValue(jsonStr, UserBean.class);

            //忽略注解，使得原来业务中的字段不变，也就还是：{first_name:laowang}，如果不设置，则返回{firstName:laowang}
            mapper.configure(MapperFeature.USE_ANNOTATIONS, false);
            System.out.println(mapper.writeValueAsString(userBean));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
```

## 问题

### TypeReference 进行字符串转为List时遇到的问题
[如何使用Jackson的TypeReference和泛型？(How to use Jackson&#39;s TypeReference with generics?)](https://www.it1352.com/788119.html)
[Java: 泛型与TypeReference](https://segmentfault.com/q/1010000019170109)
[jackson的泛型之坑](https://blog.csdn.net/cy921107/article/details/94559190)
```java
public static <T> List<T> json2BeanList(String jsonStr, Class<T> clazz)
            throws JsonMappingException, JsonProcessingException {
//  return mapper.readValue(jsonStr, new TypeReference<List<T>>() {});
    return mapper.readValue(jsonStr, mapper.getTypeFactory().constructParametricType(List.class, clazz));
}
```