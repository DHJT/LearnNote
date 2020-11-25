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


```xml
<build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-deploy-plugin</artifactId>
                <configuration>
                    <skip>true</skip>
                </configuration>
            </plugin>
            <plugin>
                <groupId>com.spotify</groupId>
                <artifactId>dockerfile-maven-plugin</artifactId>
                <version>1.4.10</version>
                <!--放开这块注释，则运行mvn deploy命令就会打包镜像-->
                <executions>
                    <execution>
                        <id>default</id>
                        <goals>
                            <!--如果package时不想docker打包,就注释掉这个goal-->
                            <goal>build</goal>
                            <goal>push</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
<!--                    <contextDirectory>src/main/resources/</contextDirectory> -->
<!--                    <dockerConfigFile>src/main/resources/Dockerfile</dockerConfigFile> -->
<!--                     <repository>${docker.repostory}/${project.artifactId}</repository> -->
<!-- 代表着生成镜像的名称 -->
                    <repository>${docker.image.prefix}/${project.artifactId}</repository>
                    <tag>${project.version}</tag>
<!--                     <buildDirectory>D:/Workspaces/tmp/demo/</buildDirectory> -->
                    <buildDirectory>./target/</buildDirectory>
                    <buildArgs>
                        <!--提供参数向Dockerfile传递-->
                        <JAR_FILE>target/${project.build.finalName}.jar</JAR_FILE>
                    </buildArgs>
                </configuration>
            </plugin>
        </plugins>
        <finalName>demo</finalName>
    </build>
```