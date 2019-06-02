# Neo4j
<!-- @author DHJT 2019-06-01 -->
## 基础
节点（Nodes）：通常用来表示一个实体和实体包含的属性（property）。
关系（Reationships）：具有方向性。
属性（Properties）：是名称（或键）为字符串的命名值。支持的属性值：字符串，数字，布尔值。
标签（Lables）：将节点分组为集合。一个节点可以标记为任意数量的标签。


```sh
# default:`neo4j:neo4j`
# --env=NEO4J_AUTH=none
# http://localhost:7474
docker run --publish=7474:7474 --publish=7687:7687 --volume=$HOME/neo4j/data:/data neo4j
```