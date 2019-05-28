# @Author: DHJT
# @Date:   2019-05-18 19:35:34
# @Last Modified by:   DHJT
# @Last Modified time: 2019-05-18 19:40:10
mkdir -p /var/data/solr/vol_my-solr
chmod 777 /var/data/solr/vol_my-solr/
docker run --name my-solr -p 8983:8983 -v /var/data/solr/vol_my-solr:/var/solr/data/ -d -t solr
docker logs -tf --tail 10 my-solr

docker exec -it --user=solr my-solr bin/solr create_core -c dhjt
ll /var/data/solr/vol_my-solr/