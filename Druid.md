# Druid
<!-- @author DHJT 2019-01-18 -->


### wall拦截器
java.sql.SQLException: sql injection violation, syntax error: syntax error, error in :'uble precisio
解决的办法是：
配置了druid连接池的 wall 拦截器，SQL防火墙拦截了你的SQL，解决办法：1.优化你的SQL；2.关闭wall拦截器

21. 我希望加密我的数据库密码怎么办？

## 问题
[spring boot 2.1.3 打开 druid 连接池监控报错 Sorry, you are not permitted to view this page.](https://blog.csdn.net/mxcai2005/article/details/89928806)

[^1]: [Druid 介绍及配置](https://www.cnblogs.com/niejunlei/p/5977895.html)