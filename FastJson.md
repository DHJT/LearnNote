# FastJson
<!-- @author DHJT 2018-12-19 -->

### fastjson的@JsonField指定部分字段的序列化方式
```java
import lombok.*;

@Data
public class Demo implements Serializable {
    @JSONField(serializeUsing = HexValueSerializer.class, deserializeUsing = HexStringDeserializer.class)
    private String field1;
    private String field2;

    public static class HexValueSerializer implements ObjectSerializer {

        @Override
        public void write(JSONSerializer serializer, Object object, Object fieldName, Type fieldType, int features) {
            String field1 = (String) object;
            // todo 对field1做业务处理
            serializer.write(field1);
        }
    }

    public static class HexStringDeserializer implements ObjectDeserializer {

        @SneakyThrows
        @Override
        public String deserialze(DefaultJSONParser parser, Type type, Object fieldName) {
            String field1Orig = parser.getLexer().stringVal();
            // todo 对field1Orig做业务处理
            return field1Orig;
        }

        @Override
        public int getFastMatchToken() {
            return 0;
        }
    }
}
```
```java
    @JsonIgnoreProperties(ignoreUnknown = true)
    static class Student {
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

    // fastjson 少字段
    @Test
    public void testFastjson01() {
        String jsonStr = "{\"age\":18,\"name\":\"zhangsan\"}";
        Student stu = JSON.parseObject(jsonStr, Student.class);
        System.out.println(stu); // Student [name=zhangsan, sex=null, age=18]
    }

    // fastjson 多字段
    @Test
    public void testFastjson02() {
        String jsonStr = "{\"age\":20,\"name\":\"lisi\",\"sex\":\"男\",\"hobby\":\"basketball\"}";
        Student stu = JSON.parseObject(jsonStr, Student.class);
        System.out.println(stu); // Student [name=lisi, sex=男, age=20]
    }
```

## 过滤字段
1、在对象对应字段前面加`transient`，表示该字段不用序列化，即在生成json的时候就不会包含该字段了。
比如
  private transient String name;

2、在对象响应字段前加注解，这样生成的json也不包含该字段。
``` java
@JSONField(serialize = false)
private String name;
```

3.指定的字段才能显示出来
``` java
SimplePropertyPreFilter filter = new SimplePropertyPreFilter(MpBannerEntity.class, "title", "thumbUrl", "url");
JSONObject.toJSONString(要过滤的对象, filter);
```

4:过滤指定字段
``` java
final String[] arr = new String[] { "ticketNo", "status", "updateTime", "createTime" };
PropertyFilter propertyFilter = new PropertyFilter() {
    public boolean apply(Object object, String name, Object value) {
        for (String string : arr) {
            if (name.equalsIgnoreCase(string)) {
                return false;// 过滤掉
            }
        }
        return true;// 不过滤
    }
};
JSON.toJSONString(user, propertyFilter);
```


FastJson SerializerFeatures

WriteNullListAsEmpty  ：List字段如果为null,输出为[],而非null
WriteNullStringAsEmpty ： 字符类型字段如果为null,输出为"",而非null
DisableCircularReferenceDetect ：消除对同一对象循环引用的问题，默认为false（如果不配置有可能会进入死循环）
WriteNullBooleanAsFalse：Boolean字段如果为null,输出为false,而非null
WriteMapNullValue：是否输出值为null的字段,默认为false。

### 与 SpringMVC 集成
``` xml
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <version>${fastjson.version}</version>
    </dependency>

    <mvc:annotation-driven>
        <mvc:message-converters>
            <bean class="com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter" />
        </mvc:message-converters>
    </mvc:annotation-driven>

    <mvc:annotation-driven>
        <mvc:message-converters register-defaults="true">
            <bean class="com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter">
                <property name="supportedMediaTypes">
                    <list>
                        <!-- 避免IE出现下载JSON文件的情况 -->
                        <value>text/html;charset=UTF-8</value>
                        <value>application/json</value>
                        <value>application/xml;charset=UTF-8</value>
                        <value>application/x-www-form-urlencoded;charset=UTF-8</value>
                    </list>
                </property>
                <property name="features">
                    <list>
                        <!-- 默认的意思就是不配置这个属性，配置了就不是默认了 -->
                        <!-- 是否输出值为null的字段 ，默认是false-->
                        <value>WriteMapNullValue</value>
                        <value>WriteNullNumberAsZero</value>
                        <value>WriteNullListAsEmpty</value>
                        <value>WriteNullStringAsEmpty</value>
                        <value>WriteNullBooleanAsFalse</value>
                        <value>WriteDateUseDateFormat</value>
                    </list>
                </property>
            </bean>
        </mvc:message-converters>
    </mvc:annotation-driven>
```

[1]: https://github.com/alibaba/fastjson/wiki/在-Spring-中集成-Fastjson '在 Spring 中集成 Fastjson'
[2]: https://blog.csdn.net/zxygww/article/details/46516101 '在springmvc中解决FastJson循环引用的问题'