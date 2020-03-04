# docker-compose
<!-- @author DHJT 2019-12-26 -->
Docker Compose 是一个用来定义和运行复杂应用的 Docker 工具。
使用 Docker Compose 不再需要使用 shell 脚本来启动容器。(通过 docker-compose.yml 配置)

下载地址：https://github.com/docker/compose/releases
https://docs.docker.com/compose/completion/

### 安装
https://docs.docker.com/v18.09/compose/install/
Docker Desktop for Windows and Docker Toolbox already include Compose along with other Docker apps, so most Windows users do not need to install Compose separately.

```sh
# CentOS7安装docker和docker-compose
# 1.安装docker 使用yum安装docker
yum -y install docker
# 启动
systemctl start docker.service
# 设置为开机自启动
systemctl enable docker.service
# 2.安装docker-compose
# 下载docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# 添加可执行权限(这里不懂可以看一下菜鸟教程-linux教程-文件权限)
sudo chmod +x /usr/local/bin/docker-compose
# 查看docker-compose版本
docker-compose --version

docker-compose.exe -v
# 首先进入到你docker-compose.yml文件所存放的目录
docker-compose up -d

Up :启动
Down:停止
-d:后台运行

# 构建镜像
docker-compose build
# 重新构建镜像并启动
docker-compose up --build
docker-compose.exe -f docker-compose-eureka.yml down
```
### 用法
Usage:
  docker-compose [-f <arg>...] [options] [COMMAND] [ARGS...]
  docker-compose -h|--help

Options:
  -f, --file FILE             使用特定的 compose 模板文件，默认为 docker-compose.yml
  -p, --project-name NAME     指定项目名称，默认使用目录名称
  --verbose                  输出更多调试信息
  -v, --version               打印版本并退出

Commands:
  build              构建或重新构建服务
  down               停止服务并且移除容器，网络配置
  events             从容器中接收实时事件
  exec               在运行的容器中执行命令
  kill               强行关闭容器
  logs               查看服务的输出
  pause              Pause services
  port               打印绑定的公共端口 # docker-compose port nginx 80
  ps                 列出所有容器
  pull               拉取服务镜像
  push               上传服务镜像
  restart            重启容器
  rm                 移除停止的容器
  run                启动一个容器并执行命令，默认情况下，所有关联的服务将会自动被启动。如果不希望自动启动关联的容器，可以使用 --no-deps 选项
  scale              设置同一个服务运行的容器个数
  start              启动一个已经存在的服务容器
  stop               停止一个已经运行的容器，但不删除它
  up                 构建，（重新）创建，启动，链接一个服务相关的容器。默认情况，如果该服务的容器已经存在， 
                     docker-compose up 将会停止并尝试重新创建他们。如果不想容器被停止并重新创建
                     可以使用 docker-compose up --no-recreate

## Docker，Docker Compose，Docker Swarm，Kubernetes之间的区别。
- Dcoker Docker 这个东西所扮演的角色，容易理解，它是一个容器引擎，也就是说实际上我们的容器最终是由Docker创建，运行在Docker中，其他相关的容器技术都是以Docker为基础，它是我们使用其他容器技术的核心。
- Docker-Compose Docker-Compose 是用米管理你的容器的，有点像一个容器的管家，想象一下当你的Docker中有成百上千的容器需要启动，如果一个一个的启动那得多费时间，有了Docker-Compose你只需要编写一个文件，在这个文件里面声明好要启动的容器，配置一些参数，执行一下这个文件，Docker就会按照你西明的配置去把所有的容器启动起来，但是Docker-
Compose只能管理当前主机上的Docker，也就是说不能去启动其他主机上的Docker容器Docker
- Swarm Docker Swarm是一款用来管理多主机上的Docker容器的工具，可以负责帮你启动容器，监控容器状态，如果容器的状态不正常它会帮你重新帮你启动一个新的容器，来提供服务，同时也提供服务之间的负载均衡，而这些东西Docker-
Compose 是做不到的
- Kubernetes Kubernetes它本身的角色定位是和Docker Swarm是一样的，也就是说他们负责的工作在容器领域米说是相同的部分，当然也有自己一些不一样的特点。这个就像是Eclipse和IDEA一样，也是一个跨主机的容器管理平台。它是谷歇公司根据自身的多年的运维经验研发的一款容器管理平台。而Docker Swarm则是由Docker公司研发的。

### 基础命令

需要在 docker-compose.yml 所在文件夹中执行命令

使用 docker-compose 部署项目的简单步骤

    停止现有 docker-compose 中的容器：docker-compose down
    重新拉取镜像：docker-compose pull
    后台启动 docker-compose 中的容器：docker-compose up -d

### Docker Compose 常用命令与配置
```sh
# ps：列出所有运行容器
docker-compose ps
# logs：查看服务日志输出
docker-compose logs
# port：打印绑定的公共端口，下面命令可以输出 eureka 服务 8761 端口所绑定的公共端口
docker-compose port eureka 8761
# build：构建或者重新构建服务
docker-compose build
# start：启动指定服务已存在的容器
docker-compose start eureka
# stop：停止已运行的服务的容器
docker-compose stop eureka
# rm：删除指定服务的容器
docker-compose rm eureka
# up：构建、启动容器
docker-compose up
# kill：通过发送 SIGKILL 信号来停止指定服务的容器
docker-compose kill eureka
# pull：下载服务镜像
# scale：设置指定服务运气容器的个数，以 service=num 形式指定
docker-compose scale user=3 movie=3
# run：在一个服务上执行一个命令
docker-compose run web bash
```

### 通过 docker-compose.yml 部署应用

我将上面所创建的镜像推送到了阿里云，在此使用它
1.新建 docker-compose.yml 文件

通过以下配置，在运行后可以创建两个站点(只为演示)
```yaml
version: "3"
services:
  web1:
    image: registry.cn-hangzhou.aliyuncs.com/yimo_public/docker-nginx-test:latest
    ports:
      - "4466:80"
  web2:
    image: registry.cn-hangzhou.aliyuncs.com/yimo_public/docker-nginx-test:latest
    ports:
      - "4477:80"
```

此处只是简单演示写法，说明 docker-compose 的方便
2.构建完成，后台运行镜像
```sh
docker-compose up -d
```
运行后就可以使用 ip+port 访问这两个站点了
3.镜像更新重新部署
```sh
docker-compose down
docker-compose pull
docker-compose up -d
```

### 容器便不会自动退出
使用 docker 容器的 interactive 和 tty 参数来将 sh/bash （*nix 系统必有）命令作为前置命令开启常驻运行，如此容器便不会自动退出了。

# -i interactive=true 开启 stdin# -t tty=true 分配会话终端
```yaml
version: '2' # 表示该 Docker-Compose 文件使用的是 Version 2 file
services:
  docker-demo:  # 指定服务名称
    build: .  # 指定 Dockerfile 所在路径
    ports:    # 指定端口映射
      - "9000:8761"
    tty: true
    stdin_open: true
```

## 相关案例
- [docker-compose部署zk集群、kafka集群以及kafka-manager，及其遇到的问题和解决](https://www.cnblogs.com/jay763190097/p/10292227.html)
- [docker-compose 部署kafka](https://blog.csdn.net/Crystalqy/article/details/94006936)
- [docker安装kafka（wurstmeister）](https://blog.csdn.net/C1041067258/article/details/97616574)