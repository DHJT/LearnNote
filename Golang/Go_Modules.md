# Go Modules
<!-- @author DHJT 2020-01-07 -->
Golang包管理工具,从 Go1.11 开始.
```sh
# 'go list'命令提供有关主模块和构建列表的信息。例如：
go list -m＃主模块的打印路径
go list -m -f = {{.dir}} #print主模块的根目录
go list -m all #print build list

go mod download #: 下载依赖的 module 到本地 cache
go mod edit #: 编辑 go.mod
go mod graph #: 打印模块依赖图
go mod init #: 在当前目录下初始化 go.mod(就是会新建一个 go.mod 文件)
go mod tidy #: 整理依赖关系，会添加丢失的 module，删除不需要的 module
go mod vendor #: 将依赖复制到 vendor 下
go mod verify #: 校验依赖
go mod why #: 解释为什么需要依赖
```

src：目录包含源代码。src下面的路径确定导入路径或可执行文件名。
pkg：目录包含已安装的包对象。每个目标操作系统和体系结构对都有自己的子目录pkg（pkg / GOOS_GOARCH）。
bin目录保存已编译的命令。每个命令都以其源目录命名，但仅以最终元素命名，而不是整个路径。

### vendor
Go 1.5 推出了 vendor 机制，go mod 也可以支持 vendor 机制，将依赖包拷贝到 vendor 目录。但是像一些 test case 里面的依赖包并不会拷贝的 vendor 目录中。

### mod中的文件版本
go.mod文件和go命令通常使用语义版本作为描述模块版本的标准形式，因此可以比较版本以确定哪个版本应该比其他版本更早或更晚。通过在底层源存储库中标记修订版来引入类似v1.2.3的模块版本。可以使用像v0.0.0-yyyymmddhhmmss-abcdefabcdef这样的“伪版本”来引用未标记的修订，其中时间是UTC的提交时间，最后的后缀是提交哈希的前缀。时间部分确保可以比较两个伪版本以确定稍后发生的版本，提交哈希标识基础提交，并且前缀（在此示例中为v0.0.0-）是从提交图中的最新标记版本派生的在此提交之前。

有三种伪版本形式：

- 当目标提交之前没有具有适当主要版本的早期版本化提交时，将使用`vX.0.0-yyyymmddhhmmss-abcdefabcdef`。（这最初是唯一的形式，所以一些较旧的go.mod文件使用这种形式，即使对于跟随标签的提交也是如此。）
- 当目标提交之前的最新版本化提交是`vX.YZ-pre`时，使用`vX.YZ-pre.0.yyyymmddhhmmss-abcdefabcdef`。
- 当目标提交之前的最新版本化提交是`vX.YZ`时，使用`vX.Y.（Z + 1）-0.yyyymmddhhmmss-abcdefabcdef`。

伪版本永远不需要手动输入：go命令将接受普通提交哈希并自动将其转换为伪版本（或标记版本，如果可用）。此转换是模块查询的示例。

这种版本是和已标记的版本相对的，已标记的版本很明确的指出,v1.2.3但未标明的就要用上面这种形式的版本。

### 模块验证和下载
go命令和go.mod一起维护一个名为go.sum的文件。
其中包含特定模块版本内容的预期加密校验和。每次使用依赖项时，如果缺少，则将其校验和添加到go.sum，或者需要匹配go.sum中的现有条目。

### go.mod
```go.mod
module github.com/gaoyoubo/xxx

go 1.12

require (
    github.com/go-sql-driver/mysql v1.4.1
    github.com/cosiner/argv v0.0.1 // indirect
    github.com/devopsfaith/krakend v0.0.0-20190930092458-9e6fc3784eca // indirect
    .... 你的依赖类似这样，添加到这里，一行一条。
)
```
go.mod文件是程序员和工具可读和可编辑的。go命令本身会自动更新go.mod文件，以维护标准格式和require语句的准确性。

#### `// indirect`是非主mod直接引用的包，由其他mod间接引用的包。由这个标记的时候，如果之后新增了直接引用的该mod，会删除上面的间接引用。

原文 Indirect requirements only arise when using modules that fail to state some of their own dependencies or when explicitly upgrading a module's dependencies ahead of its own stated requirements. 不太明白。


## 在新项目中使用
使用 go mod 并不要求你的项目源码放到 $GOPATH 下，所以你的新项目可以放到任意你喜欢的路径。在项目根目录下执行go mod init，会生成一个 go.mod 文件。然后你可以在其中增加你的依赖，如下：
```go.mod
module github.com/gaoyoubo/xxx

go 1.12

require (
    github.com/go-sql-driver/mysql v1.4.1
    .... 你的依赖类似这样，添加到这里，一行一条。
)
```
然后执行`go mod download`，将依赖下载到本地。这些依赖并不是下载到你的项目目录下，而是会下载到$GOPATH/pkg/mod目录下，这样所有使用 go mod 的项目都可以共用。
在旧项目中使用

在旧项目中使用非常简单，只需要一下两个步骤：

    go mod init: 在项目根目录下执行该命令，会在项目根目录下生成一个go.mod文件。
    go mod tidy: 在项目根目录下执行该命令，go mod 会自动分析你当前项目所需要的依赖，并且将他们下载下来。

如何升级依赖

运行 `go get -u` 将会升级到最新的次要版本或者修订版本 (x.y.z, z 是修订版本号 y 是次要版本号) 运行 `go get -u=patch` 将会升级到最新的修订版本 运行 `go get package@version` 将会升级到指定的版本