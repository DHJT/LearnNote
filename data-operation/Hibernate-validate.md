# Hibernate Validate
<!-- @author DHJT 2019-08-13 -->

```java
@NotNull
@Column(nullable = false) // 用于DDL生成！
@Size(
    min = 2,
    max = 255,
    message = "Name is required, maximum 255 characters."
)
@Future
```