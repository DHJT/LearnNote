# LDAP(Lightweight Directory Access Protocol)
<!-- @author DHJT 2019-10-12 -->
轻量目录访问协议,基于X.500标准的，但是简单多了并且可以根据需要定制。与X.500不同，LDAP支持TCP/IP。
DAP目录记录的标识名（Distinguished Name，简称DN）是用来读取单个记录，以及回溯到树的顶部。
一个为查询、浏览和搜索而优化的专业分布式数据库，它呈树状结构组织数据，和关系数据库不同，它有优异的读性能，但写性能差，并且没有事务处理、回滚等复杂功能，不适于存储修改频繁的数据，所以大多数是用来查询的。

1. LDAP的结构用树来表示，而不是用表格。正因为这样，就不能用SQL语句了。
2. LDAP可以很快地得到查询结果，不过在写方面，就慢得多。
3. LDAP提供了静态数据的快速查询方式。
4. Client/server模型，Server 用于存储数据，Client提供操作目录信息树的工具。
5. LDAP是一种开放Internet标准，LDAP协议是跨平台的 Interent 协议。

