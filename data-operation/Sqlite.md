# Sqlite
<!-- @author DHJT 2018-11-02 -->

- 截止目前为止已经数据库版本已经达到3.0
- `Hibernate`暂时不支持`SQLite`数据库

## JavaWeb项目使用SQLite数据库，数据文件相对路径
- 在配置数据库连接池的时候，SQLite数据文件相对路径设置。
```ini
dbType=sqlite
validationQuery=SELECT 'x'
 
sqlServer.driverClassName=org.sqlite.JDBC
sqlServer.url=jdbc:sqlite::resource:data/sql.db
sqlServer.username=
sqlServer.password=
```

- [hibernate4-sqlite-dialect](https://github.com/EnigmaBridge/hibernate4-sqlite-dialect)
- [springmvc+hibernate+sqlite](https://blog.csdn.net/u012195899/article/details/52485853)
