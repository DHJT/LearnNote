# Hibernate
## 基础
- `hibernate`的6种查询方式：
    - `HQL`查询
    - 对象化查询`Criteria`
    - 动态查询`DetachedCriteria`
    - 例子查询
    - `sql`查询
    - 命名查询
- `OneToMany`、`ManyToOne`中含有子表，传递对象到前台页面。
``` java
ArchiveTypeRule archiveTypeRule = getBo().queryByOwnerId(ownerId);
setJson(JsonUtil.toString(archiveTypeRule,new String[]{"archiveTypeRule"}));
```
- 分页注意： 
``` java
List<Order> list = new ArrayList<Order>();
list.add(Order.desc("operaTingDate"));
Page page = App.getHibernateDao().queryPage(query, list, getLimit(), getPage() - 1);
```
- **Hibernate**的保存方法：
``` java
DetachedCriteria query = DetachedCriteria.forClass(EntityBorrow.class);
List<EntityBorrow> list = App.getHibernateDao().findByCriteria(query);
```
- 对象查询、修改、新增、删除。
- Hibernate在表中新增列时，如果列的类型为`boolean`，数据库中的现有数据值为`null`，只有新插入数据时默认值才为0。
- 查询返回的是`List`还是一个对象;页面解析一个对象还是包含几个对象的数组：
``` java
String hql ="select id from GeneralArchiveRaletion where fondsId='root'";
List gar = App.getHibernateDao().find(hql);
String preId = gar.get(0).toString();

String hql ="from GeneralArchiveRaletion where fondsId='root'";
List<GeneralArchiveRaletion> gar = App.getHibernateDao().find(hql);
String preId = gar.get(0).getId();
```
### 注意
- 属性名的第一个单词小写，大写的话在查询该字段时匹配不上，但可以可以在结果集中获取该值。
- 模糊查询：`Restrictions.like("actid", borrowId.trim(), MatchMode.ANYWHERE)`
- MatchMode.EXACT --> 字符串精确匹配.相当于"like 'value'"
MatchMode.ANYWHERE --> 字符串在中间匹配.相当于"like '%value%'"
MatchMode.START --> 字符串在最前面的位置.相当于"like 'value%'"
MatchMode.END --> 字符串在最后面的位置.相当于"like '%value'"

### hibernate映射视图的两种方式
- 数据库已经建立视图，hibernate只是把视图当作普通的表来映射。
视图VIEW_MER_INST_POS:
```sql
select MER.DAYS_MERCHT_ID MER_ID,  
       INST.DAYS_MERCHT_ID INST_ID,  
       POS.POS_ID POS_ID  
from tbl_days_mercht_attr MER,  
     tbl_days_mercht_info INST,  
     tbl_days_mercht_pos_info POS  
where MER.days_mercht_id = INST.up_days_mercht_id  
  and INST.days_mercht_id = POS.days_mercht_id   
```
 hbm.xml配置：
```xml
<class name="db.po.ViewMerInstPos" table="VIEW_MER_INST_POS">   
    <composite-id>  
        <key-property  name="merId" column="MER_ID" type="java.lang.String" length="8"/>  
        <key-property  name="instId" column="INST_ID" type="java.lang.String" length="8"/>  
        <key-property  name="posId"  column="POS_ID" type="java.lang.String" length="8"/>  
    </composite-id>  
</class>  
```
- 数据库没有视图，用hibernate自己做视图映射：
hbm配置如下：
```xml
<hibernate-mapping package="huntersxp.db.pojo">  
<class name="ViewMerInstPos">  
<meta attribute="sync-DAO">false</meta>  
<subselect>  
select  
MER.DAYS_MERCHT_ID MER_ID,INST.SHOP_NM SHOP_NM,POS.POS_ID POS_ID  
from tbl_days_mercht_attr MER,  
tbl_days_mercht_info INST,  
tbl_days_mercht_pos_info POS  
where MER.days_mercht_id = INST.up_days_mercht_id and INST.days_mercht_id = POS.days_mercht_id  
</subselect>  
<synchronize table="tbl_days_mercht_attr"/>  
<synchronize table="tbl_days_mercht_info"/>  
<synchronize table="tbl_days_mercht_pos_info"/>  
<composite-id>  
    <key-property name="merId" column="MER_ID" type="java.lang.String" length="8"/>  
    <key-property name="shopNm" column="SHOP_NM" type="java.lang.String" length="40" />  
    <key-property name="posId" column="POS_ID" type="java.lang.String" length="40"/>  
</composite-id>  
</class>  
</hibernate-mapping>  
```
其中synchronize表示当表的数据发生变化的时候，视图的数据也会发生变化。

## hibernate缓存
hibernate中的二级缓存，二级缓存是属于SessionFactory级别的缓存机制。第一级别的缓存是Session级别的缓存，是属于事务范围的缓存，由Hibernate管理，一般无需进行干预。第二级别的缓存是SessionFactory级别的缓存，是属于进程范围的缓存
### 二级缓存
- [详解Hibernate中的二级缓存](http://blog.csdn.net/luckyzhoustar/article/details/47748179)
- 适合放入二级缓存中数据
    + 很少被修改
    + 不是很重要的数据，允许出现偶尔的并发问题
- 不适合放入二级缓存中的数据
    + 经常被修改
    + 财务数据，绝对不允许出现并发问题
    + 与其他应用数据共享的数据
#### 内置缓存
Hibernate自带的，不可卸载，通常在Hibernate的初始化阶段，Hibernate会把映射元数据和预定义的SQL语句放置到SessionFactory的缓存中。该内置缓存是只读的。
#### 外置缓存中的数据是数据库数据的复制，外置缓存的物理介质可以是内存或者硬盘。
- EHCache: 可作为进程范围内的缓存,存放数据的物理介质可以是内存或硬盘,对Hibernate的查询缓存提供了支持
- OpenSymphony`:可作为进程范围内的缓存,存放数据的物理介质可以是内存或硬盘,提供了丰富的缓存数据过期策略,对Hibernate的查询缓存提供了支持
- SwarmCache:可作为集群范围内的缓存,但不支持Hibernate的查询缓存
- JBossCache:可作为集群范围内的缓存,支持Hibernate的查询缓存
### 三级缓存