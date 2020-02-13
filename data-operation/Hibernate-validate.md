# Hibernate Validate
<!-- @author DHJT 2019-08-13 -->

可以配合`@Valid`注解使用
```java
@Null
@NotNull
@Email
@Column(nullable = false) // 用于DDL生成！
@Size(
    min = 2,
    max = 255,
    message = "Name is required, maximum 255 characters."
)
@Future
```