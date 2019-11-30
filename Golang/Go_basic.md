# Go Basic
<!-- @author DHJT 2019-11-20 -->

使用场景
    区块链、云计算、容器Docker

## install
[golang 在windows中设置环境变量](https://blog.csdn.net/keepd/article/details/79430254)

```sh
# 编译源码生成可执行文件
go build mian.go
# 编译并执行得出结果
go run main.go
```

```go
package main
import "fmt"
var (
    n = 12
    m = "tomcat"
)
func main() {
    i := 0
    fmt.Println("i=", i)
}
```

安装包下载地址为：https://golang.org/dl/。
如果打不开可以使用这个地址：https://golang.google.cn/dl/
[Downloads](https://golang.google.cn/dl/)
[IDEsAndTextEditorPlugins](https://github.com/golang/go/wiki/IDEsAndTextEditorPlugins)
    - [GoSublime](https://github.com/DisposaBoy/GoSublime)
    - [Sublime-build](https://github.com/golang/sublime-build)


### 基本知识
```go
// 基本数据类型
int, int64、int32、float32/float64
string
fallthrough

var intArr = [...]int {1,2,3}
[]rune
slice := arr[0:4]
defer 
// 穿透
fallthrough

goto
// 内建函数
make() len()
```
数组、切片、指针、结构体

多继承

全局变量、全局函数
私有变量、私有函数
匿名函数、闭包

