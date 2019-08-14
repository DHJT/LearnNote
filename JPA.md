# JPA
<!-- @author DHJT 2018-12-11 -->

@PersistenceContext
private EntityManager em;
注入的是实体管理器，执行持久化操作的，需要配置文件persistence.xml。
注入一堆保存实体类状态的数据结构，针对实体类的不同状态(四种,managedh或detached等)可以做出不同的反应(merge,persist等等)，其实就是把数据从数据库里提出，然后在内存里处理的，再返回数据库的法则。

@Resource
是注入容器提供的资源对象，比如SessionContext MessageDrivenContext。或者你那个name指定的JNDI对象
可以理解为资源->数据源->也就是数据连接，基本上就是告诉程序数据库在哪里

[1]: https://github.com/longfeizheng/jpa-example 'jpa-example'