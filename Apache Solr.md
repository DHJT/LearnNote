# Apache Solr
<!-- @author DHJT 2017-12-28 @description 本文档基于solr 7.2.0版本
 -->
## 基础以及与`Elasticsearch`的区别
- `Solr`和`Elasticsearch`的区别：
    + `Solr`建立索引时候，搜索效率下降，实时搜索效率不高，`es`实时搜索效率高
    + `Solr`利用`Zookeeper`进行分布式管理，而`Elasticsearch`自身带有分布式协调管理功能。
    + `Solr`支持更多格式的数据，比如`JSON`、`XML`、`CSV`，而`Elasticsearch`仅支持`json`文件格式。
    + `Solr`官方提供的功能更多，而Elasticsearch本身更注重于核心功能，高级功能多有第三方插件提供
    + `Solr`在传统的搜索应用中表现好于`Elasticsearch`，但在处理实时搜索应用时效率明显低于`Elasticsearch`。
    + `Solr`是传统搜索应用的有力解决方案，但`Elasticsearch`更适用于新兴的实时搜索应用。
- 补充说明：
    + Solr有一个更大、更成熟的用户、开发和贡献者社区
    + Solr支持多种数据格式的索引，比如：JSON、XML、CSV等多种数据格式
    + Solr搜索海量历史数据，速度非常快，毫秒级返回数据
    + es支持分布式，节点对外表现对等，加入节点自动均衡
    + es完全支持Apache Lucene的接近实时的搜索
    + es处理多租户multitenancy不需要特殊配置，而Solr需要更多的高级设置
    + es采用Gateway的概念，使得数据持久化更简单
    + es各节点组成对等的网络结构，某些节点出现故障时会自动分配其他节点代替其进行工作
- 使用方式：
    + solr一般要部署到web服务器上，比如tomcat，启动tomcat，配置solr和tomcat的关联
    + es一般可以单独启动，然后es和spring整合，调用SpringDataElasticSearch里面提供的方法

### 查询待整理
- dismax:排序、权重
- edismax:排序、权重;edismax是它的加强版
- facing：构面
- spellcheck:拼写检查、错误矫正查询
- `spatial`:空间查询

## 启动
- [Solr学习笔记1(V7.2)](https://www.cnblogs.com/brainthink/p/8109038.html)
- > http://localhost:8983/solr/
- 部署在tomcat中的单个solr 服务可以删除页面，功能依旧可用，知识不能通过页面对solr进行管理。

### 学习连接
- [Java实现Slor实体bean数据的索引创建](http://blog.csdn.net/boonya/article/details/57420823)
    + [BSolrs](https://github.com/SunflowersOfJava/BSolrs)
- [solr query](http://blog.csdn.net/qq_19244423/article/details/48159945)
- [Solr之spring集成](http://blog.csdn.net/zhu_tianwei/article/details/46731811)
- [solr6.3.0升级与IK动态词库自动加载](http://www.cnblogs.com/liang1101/articles/6395016.html)
- [solr简介、学习详细过程！（超详细~）](http://blog.csdn.net/shao_zhiqiang/article/details/51879763)
- [eclipse下将solr发布为web项目](http://blog.csdn.net/hll814/article/details/51388555)

### 配置
`schema.xml`，在SolrCore的conf目录下，它是Solr数据表配置文件，它定义了加入索引的数据的数据类型的。主要包括FieldTypes、Fields和其他的一些缺省设置。
FieldType域类型定义
下边“text_general”是Solr默认提供的FieldType，通过它说明FieldType定义的内容
text_general导致不能使用QueryResponse response = solr.query(query);
        List<LuceneBean> list = response.getBeans(LuceneBean.class);
主要原因是multiValued="true"；

### 中文分词器

目前可用的分词器有smartcn，IK，Jeasy，庖丁。其实主要是两种，一种是基于中科院ICTCLAS的隐式马尔科夫HMM算法的中文分词器，如smartcn，ictclas4j，优点是分词准确度高，缺点是不能使用用户自定义词库；另一种是基于最大匹配的分词器，如IK ，Jeasy，庖丁，优点是可以自定义词库，增加新词，缺点是分出来的垃圾词较多。各有优缺点。

### 富文本索引

### 高亮检索词
- [项目中如何使用solr(续)--高亮](http://blog.csdn.net/frankcheng5143/article/details/71374403)

### `SolrJ`使用:
```batch
solr.cmd start -e cloud
```
- solr是基于 lucence开发的应用，如果query中带有非法字符串，结果很可能是检索出所有内容或者直接报错，所以你对用户的输入必须要先做处理。输入星号，能够检索出所有内容；输入加号，则会报错。
```java 
public static String escapeQueryChars(String s) {
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < s.length(); i++) {
        char c = s.charAt(i);
        // These characters are part of the query syntax and must be escaped
        if (c == '\\' || c == '+' || c == '-' || c == '!'  || c == '(' || c == ')' || c == ':' || c == '^' || c == '[' || c == ']' || c == '\"' || c == '{' || c == '}' || c == '~' || c == '*' || c == '?' || c == '|' || c == '&' || c == ';' || c == '/' || Character.isWhitespace(c)) {
            sb.append('\\');
        }
        sb.append(c);
    }
    return sb.toString();
}
```

### 查询
- `*:*`:代表所有属性、所有值
- `字段:str`
``` java
// 查询参数太长导致异常发生
// QueryResponse这个对象创建的时候，默认用的是“get”请求方式
SolrQuery query = new SolrQuery();
QueryResponse qr = solr.query(query, METHOD.POST);
```

```sh
#  solr服务查看、启动、停止
#查看 状态命令：
/etc/init.d/solr status
# 重启命令：
/etc/init.d/solr restart
#停止命令：
/etc/init.d/solr stop
#停止命令：
/etc/init.d/solr stop -all
```
- [Solr -- 查询语法/参数](https://blog.csdn.net/zhufenglonglove/article/details/51518846)

|  参数 |                                     描述                                    |
|-------|-----------------------------------------------------------------------------|
| q     | 这是Apache Solr的主要查询参数，文档根据它们与此参数中的术语的相似性来评分。 |
| fq    | 这个参数表示Apache Solr的过滤器查询，将结果集限制为与此过滤器匹配的文档。   |
| start | start参数表示页面的起始偏移量，此参数的默认值为0。                          |
| rows  | 这个参数表示每页要检索的文档的数量。此参数的默认值为10。                    |
| sort  | 这个参数指定由逗号分隔的字段列表，根据该列表对查询的结果进行排序。          |
| fl    | 这个参数为结果集中的每个文档指定返回的字段列表。                            |
| wt    | 这个参数表示要查看响应结果的写入程序的类型。 (json,xml,csv,php,python.etc)  |

- hl.fl: 用空格或逗号隔开的字段列表。要启用某个字段的highlight功能，就得保证该字段在schema中是stored。如果该参数未被给出，那么就会高 亮默认字段 standard handler会用df参数，dismax字段用qf参数。你可以使用星号去方便的高亮所有字段。如果你使用了通配符，那么要考虑启用 hl.requiredFieldMatch选项。
- hl.requireFieldMatch: 
如果置为true，除非该字段的查 询结果不为空才会被高亮。它的默认值是false，意味着它可能匹配某个字段却高亮一个不同的字段。如果hl.fl使用了通配符，那么就要启用该参数。尽 管如此，如果你的查询是all字段（可能是使用copy-field 指令），那么还是把它设为false，这样搜索结果能表明哪个字段的查询文本未被找到
- hl.usePhraseHighlighter: 
如果一个查询中含有短语（引号框起来的）那么会保证一定要完全匹配短语的才会被高亮。
- hl.highlightMultiTerm 
如果使用通配符和模糊搜索，那么会确保与通配符匹配的term会高亮。默认为false，同时hl.usePhraseHighlighter要为true。
- hl.snippets： 这是highlighted片段的最大数。默认值为1，也几乎不会修改。如果某个特定的字段的该值被置为0（如f.allText.hl.snippets=0），这就表明该字段被禁用高亮了。你可能在hl.fl=*时会这么用。
- hl.fragsize: 每个snippet返回的最大字符数。默认是100.如果为0，那么该字段不会被fragmented且整个字段的值会被返回。大字段时不会这么做。
- hl.mergeContiguous: 
如果被置为true，当snippet重叠时会merge起来。
- hl.maxAnalyzedChars: 
会搜索高亮的最大字符，默认值为51200，如果你想禁用，设为-1
- hl.alternateField: 
如果没有生成snippet（没有terms 匹配），那么使用另一个字段值作为返回。
- hl.maxAlternateFieldLength: 
如果hl.alternateField启用，则有时需要制定alternateField的最大字符长度，默认0是即没有限制。所以合理的值是应该为
- hl.snippets * hl.fragsize这样返回结果的大小就能保持一致。
- hl.formatter: 一个提供可替换的formatting算法的扩展点。默认值是simple，这是目前仅有的选项。显然这不够用，你可以看看 org.apache.solr.highlight.HtmlFormatter.java 和 solrconfig.xml中highlighting元素是如何配置的。 
注意在不论原文中被高亮了什么值的情况下，如预先已存在的em tags，也不会被转义，所以在有时会导致假的高亮。
- hl.fragmenter: 
这 个是solr制定fragment算法的扩展点。gap是默认值。regex是另一种选项，这种选项指明highlight的边界由一个正则表达式确定。 这是一种非典型的高级选项。为了知道默认设置和fragmenters (and formatters)是如何配置的，可以看看solrconfig.xml中的highlight段。 
regex 的fragmenter有如下选项：
- hl.regex.pattern:正则表达式的pattern
- hl.regex.slop: 这是hl.fragsize能变化以适应正则表达式的因子。默认值是0.6，意思是如果hl.fragsize=100那么fragment的大小会从40-160.

3、查询参数

常用

q - 查询字符串，必须的。
fl - 指定返回那些字段内容，用逗号或空格分隔多个。
start - 返回第一条记录在完整找到结果中的偏移位置，0开始，一般分页用。
rows - 指定返回结果最多有多少条记录，配合start来实现分页。
sort - 排序，格式：sort=<field name>+<desc|asc>[,<field name>+<desc|asc>]… 。示例：（inStock desc, price asc）表示先 “inStock” 降序, 再 “price” 升序，默认是相关性降序。
wt - (writer type)指定输出格式，可以有 xml, json, php, phps, 后面 solr 1.3增加的，要用通知我们，因为默认没有打开。
fq - （filter query）过虑查询，作用：在q查询符合结果中同时是fq查询符合的，例如：q=mm&fq=date_time:[20081001 TO 20091031]，找关键字mm，并且date_time是20081001到20091031之间的。官方文档：http://wiki.apache.org/solr/CommonQueryParameters
不常用

q.op - 覆盖schema.xml的defaultOperator（有空格时用"AND"还是用"OR"操作逻辑），一般默认指定
df - 默认的查询字段，一般默认指定
qt - （query type）指定那个类型来处理查询请求，一般不用指定，默认是standard。
其它

indent - 返回的结果是否缩进，默认关闭，用 indent=true|on 开启，一般调试json,php,phps,ruby输出才有必要用这个参数。
version - 查询语法的版本，建议不使用它，由服务器指定默认值。
[Solr的检索运算符]
 “:” 指定字段查指定值，如返回所有值*:*
 “?” 表示单个任意字符的通配
 “*” 表示多个任意字符的通配（不能在检索的项开始使用*或者?符号）
 “~” 表示模糊检索，如检索拼写类似于”roam”的项这样写：roam~将找到形如foam和roams的单词；roam~0.8，检索返回相似度在0.8以上的记录。
邻近检索，如检索相隔10个单词的”apache”和”jakarta”，”jakarta apache”~10
 “^” 控制相关度检索，如检索jakarta apache，同时希望去让”jakarta”的相关度更加好，那么在其后加上”^”符号和增量值，即jakarta^4 apache
 布尔操作符AND、||
 布尔操作符OR、²&&
 布尔操作符NOT、!、-（排除操作符不能单独与项使用构成查询）
 “+” 存在操作符，要求符号”+”后的项必须在文档相应的域中存在
 ( ) 用于构成子查询
² [] 包含范围检索，如检索某时间段记录，包含头尾，date:[200707 TO 200710]
 {}²不包含范围检索，如检索某时间段记录，不包含头尾
date:{200707 TO 200710}
 " 转义操作符，特殊字符包括+ - && || ! ( ) { } [ ] ^ ” ~ * ? : "



## `Solr dataimport`
### Solr dataimport - 从SQLServer导入数据建立索引
- [Solr7 安装部署 管理界面介绍][3]
    + 尝试可行，笔记待整理 2018-11-17

### 访问权限
应该是使用基本的tomcat设置用户然后根据tomcat的登录用户以及其配置的角色来控制其访问solr的页面
不知道对SolrJ是否有影响啊，登录测试效果还可以

- [Solr-----2、Solr后台管理配置登录权限] [1]
- [solr-web界面增加登录认证] [2]


[1]: https://blog.csdn.net/hekewangzi/article/details/52950368  "配置登录权限"
[2]: http://www.bubuko.com/infodetail-1608479.html  "登录认证"
[3]: https://segmentfault.com/a/1190000012315173  "Dataimport"