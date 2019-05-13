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

## 使用
```sh
# 运行交互式的容器
docker run -i -t ubuntu:15.10 /bin/bash
# 启动容器（后台模式）
docker run -d ubuntu:15.10 /bin/sh -c "while true; do echo hello world; sleep 1; done"

docker run --name tomcat -p 8080:8080 -v $PWD/test:/usr/local/tomcat/webapps/test -d tomcat
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
docker stop name
```

### 配置镜像加速器
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


[1]: https://www.docker.com/ 'docker'
[2]: https://docs.docker.com/ 'docker-docs'
[3]: https://hub.docker.com/ 'docker-hub'
[4]: https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors '阿里云镜像加速'