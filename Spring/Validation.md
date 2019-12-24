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