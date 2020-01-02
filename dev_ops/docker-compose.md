# docker-compose
<!-- @author DHJT 2019-12-26 -->

Docker Compose 是一个用来定义和运行复杂应用的 Docker 工具。
使用 Docker Compose 不再需要使用 shell 脚本来启动容器。(通过 docker-compose.yml 配置)

### 安装
https://docs.docker.com/v18.09/compose/install/
Docker Desktop for Windows and Docker Toolbox already include Compose along with other Docker apps, so most Windows users do not need to install Compose separately.

```sh
docker-compose.exe -v
# 首先进入到你docker-compose.yml文件所存放的目录
docker-compose up -d

Up :启动

Down:停止

-d:后台运行
```

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