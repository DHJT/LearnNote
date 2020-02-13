# Validation
<!-- @author DHJT 2019-12-17 -->
springboot默认只会验证 controller 方法上的 validator 注解，而不会验证 controller 层以外的。所以，如果要在其他层使用 validator 验证的话，需要单独配置拦截器

- JSR和Hibernate validator的校验只能对Object的属性进行校验，不能对单个的参数进行校验，但Spring 在此基础上进行了扩展，添加了MethodValidationPostProcessor拦截器，可以实现对方法参数的校验。

### 使用
```java
// 需要创建一个Bean
@Bean
public MethodValidationPostProcessor methodValidationPostProcessor() {
    return new MethodValidationPostProcessor();
}

//然后在类方法上面加上注解
@Validated
// 方法上或者参数声明前
@Pattern(regexp="^1[3|4|5|7|8][0-9]{9}$",message="请填写合法的手机号")
```

@Validated和@Valid区别：Spring validation验证框架对入参实体进行嵌套验证必须在相应属性（字段）加上@Valid而不是@Validated
原创 花郎徒结 最后发布于2018-04-17 10:57:15 阅读数 39449 收藏
展开

Spring Validation验证框架对参数的验证机制提供了@Validated（Spring's JSR-303规范，是标准JSR-303的一个变种），javax提供了@Valid（标准JSR-303规范），配合BindingResult可以直接提供参数验证结果。其中对于字段的特定验证注解比如@NotNull等网上到处都有，这里不详述

在检验Controller的入参是否符合规范时，使用@Validated或者@Valid在基本验证功能上没有太多区别。但是在分组、注解地方、嵌套验证等功能上两个有所不同：

1. 分组

@Validated：提供了一个分组功能，可以在入参验证时，根据不同的分组采用不同的验证机制，这个网上也有资料，不详述。@Valid：作为标准JSR-303规范，还没有吸收分组的功能。

2. 注解地方

@Validated：可以用在类型、方法和方法参数上。但是不能用在成员属性（字段）上
@Valid：可以用在方法、构造函数、方法参数和成员属性（字段）上

两者是否能用于成员属性（字段）上直接影响能否提供嵌套验证的功能。


3. 嵌套验证

在比较两者嵌套验证时，先说明下什么叫做嵌套验证。比如我们现在有个实体叫做Item：
```java
public class Item {

    @NotNull(message = "id不能为空")
    @Min(value = 1, message = "id必须为正整数")
    private Long id;

    @NotNull(message = "props不能为空")
    @Size(min = 1, message = "至少要有一个属性")
    private List<Prop> props;
}
```
Item带有很多属性，属性里面有属性id，属性值id，属性名和属性值，如下所示：
```java
public class Prop {

    @NotNull(message = "pid不能为空")
    @Min(value = 1, message = "pid必须为正整数")
    private Long pid;

    @NotNull(message = "vid不能为空")
    @Min(value = 1, message = "vid必须为正整数")
    private Long vid;

    @NotBlank(message = "pidName不能为空")
    private String pidName;

    @NotBlank(message = "vidName不能为空")
    private String vidName;
}
```
属性这个实体也有自己的验证机制，比如属性和属性值id不能为空，属性名和属性值不能为空等。

现在我们有个ItemController接受一个Item的入参，想要对Item进行验证，如下所示：
```java
@RestController
public class ItemController {

    @RequestMapping("/item/add")
    public void addItem(@Validated Item item, BindingResult bindingResult) {
        doSomething();
    }
}
```
在上图中，如果Item实体的props属性不额外加注释，只有@NotNull和@Size，无论入参采用@Validated还是@Valid验证，Spring Validation框架只会对Item的id和props做非空和数量验证，不会对props字段里的Prop实体进行字段验证，也就是@Validated和@Valid加在方法参数前，都不会自动对参数进行嵌套验证。也就是说如果传的List<Prop>中有Prop的pid为空或者是负数，入参验证不会检测出来。

为了能够进行嵌套验证，必须手动在Item实体的props字段上明确指出这个字段里面的实体也要进行验证。由于@Validated不能用在成员属性（字段）上，但是@Valid能加在成员属性（字段）上，而且@Valid类注解上也说明了它支持嵌套验证功能，那么我们能够推断出：@Valid加在方法参数时并不能够自动进行嵌套验证，而是用在需要嵌套验证类的相应字段上，来配合方法参数上@Validated或@Valid来进行嵌套验证。

我们修改Item类如下所示：
```java
public class Item {

    @NotNull(message = "id不能为空")
    @Min(value = 1, message = "id必须为正整数")
    private Long id;

    @Valid // 嵌套验证必须用@Valid
    @NotNull(message = "props不能为空")
    @Size(min = 1, message = "props至少要有一个自定义属性")
    private List<Prop> props;
}
```
然后我们在ItemController的addItem函数上再使用@Validated或者@Valid，就能对Item的入参进行嵌套验证。此时Item里面的props如果含有Prop的相应字段为空的情况，Spring Validation框架就会检测出来，bindingResult就会记录相应的错误。

总结一下@Validated和@Valid在嵌套验证功能上的区别：

@Validated：用在方法入参上无法单独提供嵌套验证功能。不能用在成员属性（字段）上，也无法提示框架进行嵌套验证。能配合嵌套验证注解@Valid进行嵌套验证。

@Valid：用在方法入参上无法单独提供嵌套验证功能。能够用在成员属性（字段）上，提示验证框架进行嵌套验证。能配合嵌套验证注解@Valid进行嵌套验证。



### 附上常用标签及含义

|            标签           |    说明             |
|---------------------------|--------------------|
| @Null                     | 限制只能为null     |
| @NotNull                  | 限制必须不为null      |
| @AssertFalse              | 限制必须为false      |
| @AssertTrue               | 限制必须为true  |
| @DecimalMax(value)        | 限制必须为一个不大于指定值的数字  |
| @Digits(integer,fraction) | 限制必须为一个小数，且整数部分的位数不能超过integer，小数部分的位数不能超过fraction    |
| @Future                   | 限制必须是一个将来的日期 |
| @Past                     | 限制必须是一个过去的日期，验证注解的元素值（日期类型）比当前时间早 |
| @Max(value)               | 限制必须为一个不大于指定值的数字  |
| @Min(value)               | 限制必须为一个不小于指定值的数字  |
| @Pattern(value)           | 限制必须符合指定的正则表达式  |
| @Size(max,min)            | 限制字符长度必须在min到max之间    |
| @NotEmpty                 | 验证注解的元素值不为null且不为空（字符串长度不为0、集合大小不为0） |
| @NotBlank                 | 验证注解的元素值不为空（不为null、去除首位空格后长度为0），不同于@NotEmpty，@NotBlank只应用于字符串且在比较时会去除字符串的空格 |
| @Email                    | 验证注解的元素值是Email，也可以通过正则表达式和flag指定自定义的email格式  |


```java
@Null   // 必须为null
@NotNull    // 必须不为 null
@AssertTrue // 必须为 true ，支持boolean、Boolean
@AssertFalse    // 必须为 false ，支持boolean、Boolean
@Min(value) // 值必须小于value，支持BigDecimal、BigInteger，byte、shot、int、long及其包装类
@Max(value) // 值必须大于value，支持BigDecimal、BigInteger，byte、shot、int、long及其包装类
@DecimalMin(value) // 值必须小于value，支持BigDecimal、BigInteger、CharSequence，byte、shot、int、long及其包装类
@DecimalMax(value) // 值必须大于value，支持BigDecimal、BigInteger、CharSequence，byte、shot、int、long及其包装类
@Size(max=, min=)  // 支持CharSequence、Collection、Map、Array
@Digits(integer, fraction) // 必须是一个数字
@Negative   // 必须是一个负数
@NegativeOrZero // 必须是一个负数或0
@Positive   // 必须是一个正数
@PositiveOrZero // 必须是个正数或0
@Past   // 必须是一个过去的日期
@PastOrPresent  // 必须是一个过去的或当前的日期
@Future // 必须是一个将来的日期
@FutureOrPresent    // 必须是一个未来的或当前的日期
@Pattern(regex=,flag=) // 必须符合指定的正则表达式
@NotBlank(message =)   // 必须是一个非空字符串
@Email // 必须是电子邮箱地址
@NotEmpty  // 被注释的字符串的必须非空 被注释的字符串、集合、Map、数组必须非空
@Length // 被注释的字符串的大小必须在指定的范围内
@Range // 被注释的元素必须在合适的范围内
@SafeHtml  // 被注释的元素必须是安全Html
@URL   // 被注释的元素必须是有效URL
```



[1]: https://blog.csdn.net/justry_deng/article/details/86571671 'SpringBoot使用Validation校验参数'
[2]: https://blog.csdn.net/weixin_38118016/article/details/80977207 '@Valid注解是什么'
[3]: https://www.jianshu.com/p/89a800eda155 '@validated注解实现'
[4]: https://www.imooc.com/article/48621 '补习系列(4)-springboot 参数校验详解'