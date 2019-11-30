# @Author: DHJT
# @Date:   2019-05-18 19:35:34
# @Last Modified by:   DHJT
# @Last Modified time: 2019-11-30 14:59:48
mkdir -p /var/data/solr/vol_my-solr
chmod 777 /var/data/solr/vol_my-solr/
docker run --name my-solr -p 8983:8983 -v /var/data/solr/vol_my-solr:/var/solr/data/ -d -t solr
docker logs -tf --tail 10 my-solr

docker exec -it --user=solr my-solr bin/solr create_core -c dhjt
ll /var/data/solr/vol_my-solr/

docker run -p 6379:6379 -v $PWD/data:/data  -d redis:3.2 redis-server --appendonly yes
docker run -p 6379:6379 -v D:\\Workspaces\\TestTemp\\docker_temp\\redis\\data:/data  -d redis:3.2 redis-server --appendonly yes
#命令说明：
#-p 6379:6379 : 将容器的6379端口映射到主机的6379端口
#-v $PWD/data:/data : 将主机中当前目录下的data挂载到容器的/data D:\Workspaces\TestTemp\docker_temp
#redis-server --appendonly yes : 在容器执行redis-server启动命令，并打开redis持久化配置
# --requirepass "mypassword" 启用密码