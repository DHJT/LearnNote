# MySQL
<!-- @author DHJT 2019-10-16 -->

### 查询更新
```sql
-- 如果是查询更新同一张表，MySql是不允许的，所以这里用INNER JOIN 引入内部关联表即可完后查询更新
UPDATE message_process2 mp
    INNER JOIN ( SELECT ICPN FROM message_process2 mp WHERE failture LIKE '%Connection refused%' AND status = 100 
    UNION 
    SELECT ICPN FROM message_process2 mp WHERE failture LIKE '%Read timed out%' AND status = 100  ) mp2
SET status = 1
WHERE mp.ICPN=mp2.ICPN AND status = 100

# update select 语句(注意:必须使用inner join)
# 语法 update a inner join (select yy from b) c on a.id =c.id set a.xx = c.yy
#SELECT knowledge_id,COUNT(0) nums FROM pro_base_timu_knowledge GROUP BY knowledge_id;
UPDATE pro_base_knowledge
INNER JOIN (
SELECT
knowledge_id,
COUNT(0) nums
FROM
pro_base_timu_knowledge
GROUP BY
knowledge_id
) b ON pro_base_knowledge.id = b.knowledge_id
SET pro_base_knowledge.timu_num = b.nums        
```

### 错误
- `[Err] 1093 - You can't specify target table 'bbb_copy' for update in FROM clause`[^1]

[^1]: [sql异常及解决方法[Err] 1093 - You can't specify target table 'bbb_copy' for update in FROM clause](https://blog.csdn.net/qq_35216516/article/details/80524652)