# JPA
<!-- @author DHJT 2018-12-11 -->

@PersistenceContext
private EntityManager em;
注入的是实体管理器，执行持久化操作的，需要配置文件persistence.xml。
注入一堆保存实体类状态的数据结构，针对实体类的不同状态(四种,managedh或detached等)可以做出不同的反应(merge,persist等等)，其实就是把数据从数据库里提出，然后在内存里处理的，再返回数据库的法则。

@Resource
是注入容器提供的资源对象，比如SessionContext MessageDrivenContext。或者你那个name指定的JNDI对象
可以理解为资源->数据源->也就是数据连接，基本上就是告诉程序数据库在哪里

### JPA Audit
在Spring boot启动类增加注解 `@EnableJpaAuditing`启用JPA审计(自动填充默认值)
Jpa配置实体类创建时间更新时间自动赋值，@CreateDate，@LastModifiedDate
Springboot jpa提供了自动填充这两个字段的功能，简单配置一下即可。@CreatedDate、@LastModifiedDate、@CreatedBy、@LastModifiedBy前两个注解就是起这个作用的，后两个是设置修改人和创建人的，这里先不讨论。
然后还需要在启动类加上@EnableJpaAuditing注解。
@EntityListeners(AuditingEntityListener.class)
AuditingEntityListener标签开启后，下面的时间标签才会生效。

- JpaSpecificationExecutor接口不能够单独使用，需要和其他接口一块使用

`spring.jpa.properties.hibernate.default_schema`

### @Embeddable注解表示不会生成新的数据表，而它的属性会在其它表内部，比较容易实现代码复用.

### @EntityListeners
EntityListeners在jpa中使用，如果你是mybatis是不可以用的

#### 作用
对实体属性变化的跟踪，它提供了保存前，保存后，更新前，更新后，删除前，删除后等状态，就像是拦截器一样，你可以在拦截方法里重写你的个性化逻辑。

#### 使用
1. 定义某种功能类型
@Embeddable注解表示这个对象不是单独的数据表，它里面的字段会在其它实体中公用
```java
/**
 * 数据建立与更新.
 * Embeddable注解表示不会生成新的数据表，而它的属性会在其它表内部，比较容易实现代码复用.
 */
@Getter
@Setter
@Embeddable
public class Audit {

  @Column(name = "created_on")
  private LocalDateTime createdOn;

  @Column(name = "created_by")
  private String createdBy;

  @Column(name = "updated_on")
  private LocalDateTime updatedOn;

  @Column(name = "updated_by")
  private String updatedBy;
}
```
2. 定义接口，对上面类型进行读和写的行为
```java
/**
 * 数据建立与更新.
 */
public interface Auditable {

  Audit getAudit();

  void setAudit(Audit audit);
}
```
3. 定义跟踪器，接口参数会在具体实现类中传过来
```java
/**
 * Hibernate 事件监听器.
 * 实体监听@EntityListeners(AuditListener.class).
 */
@Slf4j
@Component
@Transactional
public class AuditListener {
  @PrePersist
  public void setCreatedOn(Auditable auditable) {
    Audit audit = auditable.getAudit();

    if (audit == null) {
      audit = new Audit();
      auditable.setAudit(audit);
    }

    audit.setCreatedOn(LocalDateTime.now());
    audit.setUpdatedOn(LocalDateTime.now());
  }

  @PreUpdate
  public void setUpdatedOn(Auditable auditable) {
    Audit audit = auditable.getAudit();
    audit.setUpdatedOn(LocalDateTime.now());
  }
}
```
4. 实体去实现这个对应的跟踪接口
@Embedded注解表示它是一个内嵌到当前实体里的对象，它自己不是实体，它只表示实体里某些字段。
```java
@EntityListeners(AuditListener.class)
public class Product implements Auditable {
  /**
   * 存储复杂对象内的元素.
   */
  @Embedded
  private Audit audit;

  @Override
  public Audit getAudit() {
    return audit;
  }

  @Override
  public void setAudit(Audit audit) {
    this.audit = audit;
  }
}
```
上面代码将实现在实体保存时对Audit实体里的createdOn，updateOn进行赋值，当实体进行更新时对updateOn进行重新赋值的操作。


[1]: https://github.com/longfeizheng/jpa-example 'jpa-example'