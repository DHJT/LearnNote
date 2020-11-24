# 禅道（zentao）
<!-- @author DHJT 2020-11-08 -->
```yaml
# cat > docker-compose.yml <-EOF
version: "3.5"
services:
  pms:
    image: idoop/zentao:latest
    container_name: pms
    hostname: pms
    privileged: true
    user: root
    ports:
      - 8080:80
      - 3386:3306
    environment:
      - ADMINER_USER=root
      - ADMINER_PASSWD=123456
      - BIND_ADDRESS=false
      - SET_CONTAINER_TIMEZONE=true
      - CONTAINER_TIMEZONE=Asia/Shanghai
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /data/pms/:/opt/zbox/
    restart: always
    extra_hosts:    # 增加此行与如下一行
      - "smtp.exmail.qq.com:113.96.208.92"
    tty: true
EOF
```

### 远程连接禅道数据库
（1）授权远程登录账号
```sh
docker exec -it zentao bash
/opt/zbox/bin/mysql -uroot -ptemp@pass
# grant all privileges on *.* to [数据库账号]@'%' identified by '[数据库密码]';
grant all privileges on *.* to root@'%' identified by 'temp@pass';
```

[idoop/zentao](https://github.com/idoop/zentao)
[https://hub.docker.com/r/idoop/zentao](https://hub.docker.com/r/idoop/zentao)
[02-08 docker部署禅道](https://blog.csdn.net/weixin_39305029/article/details/105080660)
[使用禅道Docker安装包安装](https://www.zentao.net/book/zentaopmshelp/303.html)