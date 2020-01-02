# docker-maven-plugin
<!-- @author DHJT 2019-12-26 -->

### 使用
```sh
# 创建镜像
mvn clean package docker:build
# 推送镜像到Registry
mvn clean package docker:build -DpushImage
# 推送指定tag的镜像到Registry
mvn clean package docker:build -DpushImageTag
```

https://github.com/spotify/docker-maven-plugin
https://github.com/spotify/dockerfile-maven