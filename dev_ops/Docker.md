# Docker
<!-- @author DHJT 2019-05-04 -->

## Basic
Docker 本身并不是容器，它是创建容器的工具，是应用容器引擎。
容器技术
虚拟机技术的代表，是VMWare和OpenStack。

三大核心概念，分别是：
镜像（Image）
容器（Container）
仓库（Repository）
K8S，就是基于容器的集群管理平台，它的全称，是kubernetes。

镜像位置vm-data

## 安装[^1]
```sh
# 获取最新版本的 Docker 安装包
wget -qO- https://get.docker.com/ | sh
# 移除旧的版本：
sudo yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-selinux \
                docker-engine-selinux \
                docker-engine
# 安装一些必要的系统工具：
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# 添加软件源信息：
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# 更新 yum 缓存：
sudo yum makecache fast
# 安装 Docker-ce：
sudo yum -y install docker-ce
# 启动 Docker 后台服务
sudo systemctl start docker

# 确保 yum 包更新到最新。
sudo yum update
# 执行 Docker 安装脚本。
# 执行这个脚本会添加 docker.repo 源并安装 Docker。
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### 卸载
```sh
# 删除 Docker CE
# 执行以下命令来删除 Docker CE：
sudo yum remove docker-ce
sudo rm -rf /var/lib/docker
```

## 使用
```sh
# 运行交互式的容器
docker run -i -t ubuntu:15.10 /bin/bash
# 启动容器（后台模式）
docker run -d ubuntu:15.10 /bin/sh -c "while true; do echo hello world; sleep 1; done"
# 运行tomcat
docker run --name tomcat -p 8080:8080 -v $PWD/test:/usr/local/tomcat/webapps/test -d tomcat
docker exec -it tomcat /bin/bash
# 退出交互模式 Ctrl-D， 这种方式会停止容器
# 正常退出不关闭容器，请按 Ctrl+P+Q 进行退出容器
exit
docker run --name runoob-nginx-test -p 8081:80 -d nginx
# --rm 在容器退出时就能够自动清理容器内部的文件系统
# --rm选项不能与-d同时使用，即只能自动清理foreground容器，不能自动清理detached容器
# 注意，--rm选项也会清理容器的匿名data volumes。
# 所以，执行docker run命令带--rm命令选项，等价于在容器退出后，执行docker rm -v。
#通过 -e TZ="Asia/Shanghai" 设置时区
docker run --rm=true -e TZ="Asia/Shanghai" busybox
# 查看容器日志
docker logs -tf --tail 10 `CONTAINER ID`

# docker cp 要拷贝的文件路径 容器名：要拷贝到容器里面对应的路径
docker cp /root/hadoop-mapreduce-examples-2.6.0.jar b7d7f88574fb:/usr/local/hadoop-2.6.0
docker cp mysolr:/opt/solr/ /usr/local/ # 容器拷贝宿主机
```

## 常用命令
```sh
docker images
docker images|grep tomcat
docker ps
docker ps -a
docker ps -aq
# 拉取官方的镜像,标签为3.2
docker pull  redis:3.2
# 查看容器的详细信息
docker inspect name/`CONTAINER ID`
# 启动容器并进入交互模式
docker start -i engine-web-uaa
docker stop name
# 重启之前停掉的 docker 容器或者正在运行的容器 name/CONTAINER ID
docker restart name/`CONTAINER ID`
systemctl daemon-reload
```

### 配置镜像加速器
windows下的配置文件：`%programdata%\docker\config\daemon.json`
- windows10下的默认镜像位置：`C:\ProgramData\DockerDesktop\vm-data\DockerDesktop.vhdx`;2019-11-30
```sh
# 针对Docker客户端版本大于 1.10.0 的用户
# 您可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器
sudo mkdir -p /etc/docker
# https://9p3414y5.mirror.aliyuncs.com
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://9p3414y5.mirror.aliyuncs.com"]
}
EOF
systemctl daemon-reload
systemctl restart docker
ps -ef|grep docker
```
```json
// Daemon Windows下设置，高级
{
    "registry-mirrors":[],
    "insecure-registries":[],
    "debug":true,
    "exnerimental":false,
    "graph":"D:\\docker\\images"
}
```

### 清理镜像
我们在使用 Docker 一段时间后，系统一般都会残存一些临时的、没有被使用的镜像文件，可以通过以下命令进行清理：
`docker image prune`
它支持的子命令有：
`-a, --all`: 删除所有没有用的镜像，而不仅仅是临时文件；
`-f, --force`：强制删除镜像文件，无需弹出提示确认；
另外，执行完`docker image prune`命令后，还是告诉我们释放了多少存储空间！

### 快速批量删除 docker 镜像或容器
docker 本身并没有提供批量删除的功能，当有大量的镜像或者容器需要删除的时候，手动的一个一个删就比较麻烦了。
```sh
# 直接删除所有镜像
docker rmi `docker images -q`
# 直接删除所有容器
docker rm `docker ps -aq`
# 按条件筛选之后删除镜像
docker rmi `docker images | grep xxxxx | awk '{print $3}'`
# 按条件筛选之后删除容器
docker rm `docker ps -a | grep xxxxx | awk '{print $1}'`
```

## 容器数据卷
卷就是目录或文件，存在于一个或多个容器中，由docker挂载到容器，但不属于联合文件系统，因此能够绕过Union File System提供一些用于持续存储或共享数据的特性：

卷的设计目的就是数据的持久化，完全独立于容器的生存周期，因此Docker不会在容器删除时删除其挂载的数据卷
特点；
1：数据卷可在容器之间共享或重用数据
2：卷中的更改可以直接生效
3：数据卷中的更改不会包含在镜像的更新中
4：数据卷的生命周期一直持续到没有容器使用它为止

持久化到宿主机，如果没有显示指定映射地址，则有docker虚拟机进行管理，映射到宿主机上的磁盘上。

docker rm -f 容器id/容器名
docker run -it --name dc04 --volumes-from dc03 zzyy/centos

### 数据卷容器
--volumes-from
容器之间配置信息的传递，数据卷的生命周期一直持续到没有容器使用它为止。
可以做到容器间共享数据、文件夹、文件等；
[利用 Docker 备份、迁移数据库](https://www.cnblogs.com/JacZhu/p/7835237.html)

## 网络
```sh
# 显示docker中已经存在的网络
docker network ls
# 创建网络 somenetwork
docker network create somenetwork
```
## 时区不一致

1、【镜像未生产前】基础镜像 在 Dockerfile 中设置时区:
```Dockerfile
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
```
2、【镜像生成后 && 容器未创建】 创建并启动容器时：
```sh
# 共享主机时间
docker run --name <name> -v /etc/localtime:/etc/localtime:ro ...
```
3、【镜像生成后 && 容器启动】  容器外，宿主机中修改：
```sh
docker cp /etc/localtime [容器ID或者NAME]:/etc/localtime
```
4、【镜像生成后 && 容器启动】  容器中
```sh
apk add tzdata
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime echo "Asia/Shanghai" > /etc/timezone
```

## Dockerfile
```sh
# -t：指定新镜像名 v1是标签TAG
# .：表示Dockfile在当前路径
docker build -t admin:v1 .
```
```dockfie
# 基于Java 9
FROM java:9
# 设置工作目录
WORKDIR /app
# 复制文件到工作目录
COPY . /app
# 设置Java环境变量
ENV PATH=$PATH:$JAVA_HOME/bin
ENV JRE_HOME=${JAVA_HOME}/jre
ENV CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# 编译
RUN ["/usr/lib/jvm/java-9-openjdk-amd64/bin/javac","Hello.java"]
# 运行
ENTRYPOINT ["/usr/lib/jvm/java-9-openjdk-amd64/bin/java", "Hello"]
```
### 容器启动后即退出
一般来说，使用`java -jar ***.jar`就可以了，但是如果项目没有配置日志输出，导致控制台在一段时间后没有任何输出，在此种情况下是可能导致容器退出的。

### 容器访问宿主机
使用默认的网络模式下（即桥接模式），通过宿主机在docker0或者dockerNat下的ip，是可以访问宿主机的服务的，但是这种情况下的访问会受到防火墙的拦截影响，在连接不到宿主机的情况下可以尝试关闭宿主机的防火墙再试一次看看（仅限自己的机器，生产环境不建议）。

## 优雅的容器调试方式[^2]
与目标容器共享命名空间，即通过`--ipc --net --pid`三个参数来共享资源，以此注入排查工具。
借鉴之 Itio 的 istio-proxy ：将Pod中的流量都代理到自己的容器中。

可以使用`alpine linux`作为基础镜像，经过特别优化，体积比较小，拥有完全的包管理工具`apk`，可以随意添加工具或功能；
`busybox`已经集成了多个常见的UNIX工具，非常小巧且适配广泛，但问题在于不能方便地动态添加新的功能或者工具；
```sh
docker run -it --rm --net=container:<container_id> --pid=container:<container_id> --ipc=container:<container_id> --name=t_busybox busybox
# 以下是例子 b9c8ab7ed577是容器id
docker run -it --rm --net=container:b9c8ab7ed577 --pid=container:b9c8ab7ed577 --ipc=container:b9c8ab7ed577 --name=t_busybox busybox
```

## windows10 启动zookeeper，报端口被占用，但是查询没有占用
- 启动zookeeper，但是报`Unexpected exception, exiting abnormally java.net.BindException: Address already in use: bind`解决之路
- 使用命令`netstat -ano|findstr 2181`，但是提示为空。说明端口没有被占用；
- 使用命令`netsh interface ipv4 show excludedportrange protocol=tcp`,这个是查询windows10下面的Hyper-V的端口保留的TCP范围
- 从命令的结果可以看出，端口2181被Hyper-V给保留了。
- 解决方案：配置文件将zookeeper的端口改为高位端口，即可解决。

## Docker 镜像仓库为什么要分库分权限？[^3]

[1]: https://www.docker.com/ 'docker'
[2]: https://docs.docker.com/ 'docker-docs'
[3]: https://hub.docker.com/ 'docker-hub'
[4]: https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors '阿里云镜像加速'
[5]: https://www.cnblogs.com/hailun1987/p/7518306.html 'docker端口映射或启动容器时报错Error response from daemon: driver failed programming external connectivity on endpoint quirky_allen'
[6]: https://www.cnblogs.com/lonquanzj/p/8911977.html 'windows10 彻底卸载 Docker 和 DockerNAT'
[7]: https://www.jianshu.com/p/c32175d04d69 '解决Windows10卸载Docker不干净导致无法重装'
[8]: https://blog.csdn.net/weixin_30764883/article/details/101610771 'Docker 安装报错：没有找到installationmanifest.json文件'
[9]: https://www.cnblogs.com/boazy/p/11661277.html 'Docker Desktop: Error response from daemon: driver failed programming external connectivity on endpoint xxx 问题'
[10]: https://blog.csdn.net/SIMBA1949/article/details/82915638 'Docker常用镜像'
[11]: https://blog.csdn.net/newtelcom/article/details/79548152 'docker0: iptables: No chain/target/match by that name'


[^1]: [Get Docker Engine - Community for CentOS](https://docs.docker.com/install/linux/docker-ce/centos/)
[^2]: [如何从单独的容器调试运行中的Docker容器](https://segmentfault.com/a/1190000020740899)
[^3]: [Docker 镜像仓库为什么要分库分权限？](https://www.jianshu.com/p/6cb357eaf556)



## 样例

### Sqlserver
```sh
docker pull exoplatform/sqlserver
# 注意问题： 密码需要符合sql server 的安全策略，非1433 端口的连接配置
# Microsoft SQL Server Management Studio 连接配置 服务器名称(s):ip,port 例：localhost,1444
docker run -d -e SA_PASSWORD=<passord> -e SQLSERVER_DATABASE=<db name> -e      SQLSERVER_USER=<user> -e SQLSERVER_PASSWORD=<password> -p <local port>:1433 exoplatform/sqlserver:ctp2-1-1
```
### mysql
```sh
docker run -p 3306:3306 --name d_dh_mysql5 -v $PWD/conf5:/etc/mysql/conf.d -v $PWD/logs5:/logs -v $PWD/data5:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7.26
```
### elasticsearch
```sh
docker network create somenetwork
docker run -d --name elasticsearch --net somenetwork -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:tag
```
### rabbitmq
### PostgreSQL
```sh
docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=123456 -d postgres
```
### nodejs
```sh

```