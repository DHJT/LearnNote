# Lucene全文检索
##  Lucene性能优化
- 同一个IndexWriterConfig的实例对象是不允许被同时调用2次的，因此我们这里应该另外再new一个IndexWriterConfig的实例
`IndexWriterConfig conf = new IndexWriterConfig(Version.LUCENE_36, analyzer);`

### 一些经验
- 关键词区分大小写
    + or AND TO等关键词是区分大小写的，lucene只认大写的，小写的当做普通单词。
- 读写互斥性
    + 同一时刻只能有一个对索引的写操作，在写的同时可以进行搜索
- 文件锁
    + 在写索引的过程中强行退出将在tmp目录留下一个lock文件，使以后的写操作无法进行，可以将其手工删除
- 时间格式
    + lucene只支持一种时间格式yyMMddHHmmss，所以你传一个yy-MM-dd HH:mm:ss的时间给lucene它是不会当作时间来处理的
- 设置boost
    + 有些时候在搜索时某个字段的权重需要大一些，例如你可能认为标题中出现关键词的文章比正文中出现关键词的文章更有价值，你可以把标题的boost设置的更大，那么搜索结果会优先显示标题中出现关键词的文章（没有使用排序的前题下）。
    + 使用方法：Field. setBoost(float boost);默认值是1.0，也就是说要增加权重的需要设置得比1大。