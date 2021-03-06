# Data Structure(数据结构)
<!-- @author DHJT 2019-08-27 -->

### SkipList(跳表)
“空间换时间”的算法，通过向上提取索引增加了查找的效率。

（1）跳表是可以实现二分查找的有序链表；
（2）每个元素插入时随机生成它的level；
（3）最低层包含所有的元素；
（4）如果一个元素出现在level(x)，那么它肯定出现在x以下的level中；
（5）每个索引节点包含两个指针，一个向下，一个向右；
（6）跳表查询、插入、删除的时间复杂度为O(log n)，与平衡二叉树接近；

时间复杂度O(log n)。
空间复杂度是O(n)。

为什么Redis选择使用跳表而不是红黑树来实现有序集合？
首先，我们来分析下Redis的有序集合支持的操作：
1）插入元素
2）删除元素
3）查找元素
4）有序输出所有元素
5）查找区间内所有元素
其中，前4项红黑树都可以完成，且时间复杂度与跳表一致。
但是，最后一项，红黑树的效率就没有跳表高了。
在跳表中，要查找区间的元素，我们只要定位到两个区间端点在最低层级的位置，然后按顺序遍历元素就可以了，非常高效。
而红黑树只能定位到端点后，再从首位置开始每次都要查找后继节点，相对来说是比较耗时的。
此外，跳表实现起来很容易且易读，红黑树实现起来相对困难，所以Redis选择使用跳表来实现有序集合。

### 红黑树


[数据结构](https://www.jianshu.com/p/d08d72b79f36)