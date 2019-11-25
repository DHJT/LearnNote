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

## 安装
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

docker run --name runoob-nginx-test -p 8081:80 -d nginx
# 查看容器日志
docker logs -tf --tail 10 `CONTAINER ID`

docker cp mysolr:/opt/solr/ /usr/local/ # 容器拷贝宿主机
# mysql
docker run -p 3306:3306 --name d_dh_mysql5 -v $PWD/conf5:/etc/mysql/conf.d -v $PWD/logs5:/logs -v $PWD/data5:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7.26
# elasticsearch
docker network create somenetwork
docker run -d --name elasticsearch --net somenetwork -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:tag
# rabbitmq
# PostgreSQL
docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=123456 -d postgres
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
docker stop name
# 重启之前停掉的 docker 容器或者正在运行的容器 name/CONTAINER ID
docker restart name/`CONTAINER ID`
systemctl daemon-reload
```

### 配置镜像加速器
windows下的配置文件：`%programdata%\docker\config\daemon.json`
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

[1]: https://www.docker.com/ 'docker'
[2]: https://docs.docker.com/ 'docker-docs'
[3]: https://hub.docker.com/ 'docker-hub'
[4]: https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors '阿里云镜像加速'
[5]: https://www.cnblogs.com/hailun1987/p/7518306.html 'docker端口映射或启动容器时报错Error response from daemon: driver failed programming external connectivity on endpoint quirky_allen'
[6]: https://www.cnblogs.com/lonquanzj/p/8911977.html 'windows10 彻底卸载 Docker 和 DockerNAT'
[7]: https://www.jianshu.com/p/c32175d04d69 '解决Windows10卸载Docker不干净导致无法重装'