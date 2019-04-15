# Spring Data
<!-- @author DHJT 2019-01-25 -->

旨在统一和简化对各类型持久化存储， 而不拘泥于是关系型数据库还是NoSQL 数据存储。
提供了基于这些层面的统一接口（CrudRepository，PagingAndSortingRepository）以及对持久化存储的实现。

Spring Data 包含多个子项目：

- Commons - 提供共享的基础框架，适合各个子项目使用，支持跨数据库持久化
- Hadoop - 基于 Spring 的 Hadoop 作业配置和一个 POJO 编程模型的 MapReduce 作业
- Key-Value  - 集成了 Redis 和 Riak ，提供多个常用场景下的简单封装
- Document - 集成文档数据库：CouchDB 和 MongoDB 并提供基本的配置映射和资料库支持
- Graph - 集成 Neo4j 提供强大的基于 POJO 的编程模型
- Graph Roo AddOn - Roo support for Neo4j
- JDBC Extensions - 支持 Oracle RAD、高级队列和高级数据类型
- JPA - 简化创建 JPA 数据访问层和跨存储的持久层功能
- Mapping - 基于 Grails 的提供对象映射框架，支持不同的数据库
- Examples - 示例程序、文档和图数据库
- Guidance - 高级文档