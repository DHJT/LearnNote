# Go Basic
<!-- @author DHJT 2019-11-20 -->

- 使用场景：区块链、云计算、容器Docker
- [Golang标准库文档](https://studygolang.com/pkgdoc)
- 安装包下载地址为：https://golang.org/dl/。
- 如果打不开可以使用这个地址：https://golang.google.cn/dl/
- [Downloads](https://golang.google.cn/dl/)
- [IDEsAndTextEditorPlugins](https://github.com/golang/go/wiki/IDEsAndTextEditorPlugins)
    + [GoSublime](https://github.com/DisposaBoy/GoSublime)
    + [Sublime-build](https://github.com/golang/sublime-build)
        * 运行代码：<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>b</kbd>
        * 运行代码(按上一次运行命令直接执行)：<kbd>Ctrl</kbd>+<kbd>b</kbd>
- `2006-01-02 15:04:05`

## install
[golang 在windows中设置环境变量](https://blog.csdn.net/keepd/article/details/79430254)

```sh
go env # 可以查看环境变量。
# 编译源码生成可执行文件
go build mian.go
# 编译并执行得出结果
go run main.go
```

### go get
- 借助代码管理工具通过远程拉取或更新代码包及其依赖包，并自动完成编译和安装。
- 可以动态获取远程代码包，目前支持的有 BitBucket、GitHub、Google Code 和 Launchpad。在使用 go get 命令前，需要安装与远程包匹配的代码管理工具，如 Git、SVN、HG 等，参数中需要提供一个包名。
- 这个命令在内部实际上分成了两步操作：第一步是下载源码包，第二步是执行 go install。
- 获取前，请确保 GOPATH 已经设置。Go 1.8 版本之后，GOPATH 默认在用户目录的 go 文件夹下。

参数介绍：
    -d 只下载不安装
    -f 只有在你包含了 -u 参数的时候才有效，不让 -u 去验证 import 中的每一个都已经获取了，这对于本地 fork 的包特别有用
    -fix 在获取源码之后先运行fix，然后再去做其他的事情
    -t 同时也下载需要为运行测试所需要的包
    -u 强制使用网络去更新包和它的依赖包
    -v 显示执行的命令

```sh
# 从互联网上下载或更新指定的代码包及其依赖包，并对它们进行编译和安装。
go get github.com/denisenkom/go-mssqldb
# 安装MySQL启动包 强行更新代码包，可以在执行go get命令时加入-u标记
go get -u github.com/go-sql-driver/mysql # github.com/denisenkom/go-mssqldb
go get -u github.com/garyburd/redigo/redis
```

### 基本知识
- Golang中是没有引用传递的，引用类型与引用传递是不一样的概念，基本上引用传递只有 C++ 实现了；2019-11-30
- 字符串不可变，底层是`byte数组`实现，可进行切片；
- 数组声明之后会分配内存空间；
- map映射声明并不会分配内存空间，需要使用 make 方法来分配，直接使用会报错；
    + map中是无序存储的；
- 常量在声明的时候必须赋值，常量不能修改
    + 只能修饰bool、string、数值类型（int、float系列）
    + `const tax int = 12`
    + 首字母大小写控制访问范围
```go
// 常量
const (
    a = iota // 0 一行递增一次
    b // 1
    c, d = iota, iota // 2 2
)

// 基本数据类型
int, int64、int32、float32/float64
string
fallthrough

var intArr = [...]int {1,2,3}
[]rune // 切片，兼容中文
slice := arr[0:4] // 切片
defer 
// 穿透
fallthrough

goto
// 内建函数
make() len()

var a map[string]string
a = make(map[string]string, 10)
```
基本类型：string、int（int32、int64）数组、指针、结构体
引用类型：指针、切片、map
默认零值：`nil`

golang 中string和int类型相互转换
原创 置顶 排骨瘦肉丁 发布于2018-03-14 10:26:56 阅读数 83195 收藏
展开

总结了golang中字符串和各种int类型之间的相互转换方式：
    string转成int：
        int, err := strconv.Atoi(string)
    string转成int64：
        int64, err := strconv.ParseInt(string, 10, 64) 
    int转成string：
        string := strconv.Itoa(int)
    int64转成string：
        string := strconv.FormatInt(int64,10) 



### 切片 slice
```go
切片需要分配空间使用
// 切片扩容
monsters = append(monsters, newMonster)
```

### map 映射
```go
mapDemo["no1"] = "mary" // 添加或更新
delete(mapDemo, "no1") // 内置方法：map删除
// map 查找
val, ok := mapDemo["no1"]
// 遍历 for-range

len(mapDemo) // 获取 mapDemo 大小
// slice of map map切片
var monsters []map[string]string = make([]map[string]string, 2)
monsters = append(monsters, newMonster)
```

## 面向对象特性
构造函数、析构函数、没有方法重载

### 结构体
自定义数据类型，__值类型而非引用类型__；

- 在内存中是连续的空间；
- 两个结构体转换：要求结构体字段完全一样（名字、个数、类型）
- `type stu Student`:新的数据类型，可以强转；
- `type integer int`:起别名；也是不同的类型；可以强转；
```go
type Cat struct {
    Name string `json:"cat_name"`// tag 标签，反射机制，序列化至json串中
    Age int
    Color string
}
var cat1 Cat
cat1.Name = "小白"
var cat2 = Cat{}
var cat3 = Cat{"mary", 20, ""}
// 3. 使用指针
var cat4 *Cat = new(Cat)
(*cat4).Name = "cat4" // cat.Name = "cat4" 使用优化，底层处理
// 4.
var cat5 *Cat = &Cat{}
(*cat5).Name = "cat5"// cat.Name = "cat5"; . 的优先级比 * 高
```

### 函数
```go
func test() {
    // 使用匿名函数与 defer + recover 来处理异常
    defer func() {
        if err := recover(); err != nil {
            fmt.Println("test() 发生错误")
        }
    }()
    // 以下就是代码的具体执行逻辑 省略
}
```


### 方法
- 作用在指定的数据类型上的，跟数据类型绑定在一起的；

```go
type A struct {
    Num int
}
func (a A) test() {
    fmt.Println(a.Num)
}
var a A
a.test() // 只能通过A类型的变量调用
```

### 接口
任何变量都实现空接口

- 类型断言
```go
type Cat struct {
    Name string
}
var a interface{} // 定义一个空接口
// a.(type)
newCat.(Cat)
```

### 继承与多继承

全局变量、全局函数
私有变量、私有函数
匿名函数、闭包

### 序列化与反序列化
```go
import "encoding/json"
json.Marshal(v interface{}) ([]byte, error)// 会使用到反射
json.Unmarshal()
```

### 文件操作
```go
import (
    "io/ioutil"
    "io"
)
data, err := ioutil.ReadFile("文件路径")
ioutil.WriteFile(filePath, data, 0666)
```

### 稀疏数组`Sparse Array`

### 单元测试
- 测试文件名：`xxx_test.go`强制要求；
- 测试方法命名：`TestXxx(t *testing.T)`强制要求；
    + t.Logf()/
```sh
go test # 全部测试、通过无输出，错误输出错误
go test -v # 输出日志，包含正确与错误的
go test -v xxx_test.go # 测试指定文件
go test -v -test.run TestXxxx # 测试指定方法
```

### 协程(goroutine)&管道(channel)
`Golang`天然支持高并发

- Go协程的特点
    + 独立的栈空间
    + 共享程序堆空间
    + 调度由用户控制
    + 协程是轻量级的线程【编译器做优化】
- 主线程退出，没有执行完毕的协程也要被关闭退出
- 协程是从主线程开启的，是逻辑态
- goroutine的调度模型：MPG模式
    + M：操作系统的主线程（是物理线程）
    + P：协程执行需要的上下文
    + G：协程
- 并发：作用在同一个CPU核心；并行：作用在不同CPU核心。
- `go build -race mian.go`：输出有资源竞争问题的信息
- Go1.8之前需要设置核心数，才能充分利用CPU的多核心；
- 锁：互斥锁`import "sync"`
- 管道
    + 本质是一个数据结构——队列
    + FIFO：先进先出
    + 线程安全，不需要加锁
    + 管道是有类型：string类型的管道只能存储string类型
    + 引用类型；必须初始化才能写入数据（make）
- 管道关闭后只能读取而不能写入数据；
- 使用`select`可以解决从管道读取数据的阻塞问题
```go
// 协程与全局变量加锁——同步问题
import (
    "time"
    "fmt"
    _ "runtime"
    "sync"
)
var (
    myMap = mak(map[int]int, 10)
    lock sync.Mutex // 声明一个全局互斥锁
)
func test() {
    lock.Lock()
    fmt.Println("------")
    time.Sleep(time.Second)
    lock.Unlock()
}
func main() (
    go test() // 开启一个协程

    fmt.Println("------")
    time.Sleep(time.Second)
)

// 管道
var mapChan chan map[int]string
var intChan chan int = make(chan int, 10)// 容量10，只能加入10个，不能超过这个数量，即容量不是动态增长的
// 向管道写入数据
intChan<- 10
num := 50
intChan<- num
// 管道的长度、容量 len(intChan),cap(intChan)
// 从管道读取数据
var num2 int = <-intChan // 取出可以不接受 <-intChan
// 在没有使用协程的情况下，管道数据已经全部取出，再取会报告 deadlock
close(intChan) // 管道的关闭
// 管道的遍历 支持for-range循环 不关闭管道进行遍历，最后会报告deadlock错误
for v := intChan {
}

// select
for {
    select {
    case v:= <-intChan :
        fmt.Printf("%d", v)
    default :
        fmt.Printf("--")
        // 此处使用break只能跳出select
    }
}
```

### 反射
- 应用场景
    + 结构体的标签
    + 编写函数的适配器
- reflect.Type reflect.Value
- 变量、interfa{}、reflect.Value是可以相互转化的
- Kind：类别，是一个常量 struct,int.etc
- Type：类型 pkg.Strudent
```go
import (
    "reflect" // “reflect”包实现了运行时反射
)
type A struct {

}
func test(b interface{}) {
    rType := reflect.TypeOf(b) // reflect.Type
    rVal := reflect.ValueOf(b) // 获取到的是reflect.Value,值可以打印出来
    rType.Kind() // 获取变量对应的Kind，为常量
    rVal.Kind() //
    iV := rVal.Interface()
}
```

[1]: https://www.cnblogs.com/fanbi/p/10019316.html 'sublime text3 golang插件(golang build)'
[2]: http://wiki.jikexueyuan.com/project/go-command-tutorial/0.3.html 'GO 命令教程'