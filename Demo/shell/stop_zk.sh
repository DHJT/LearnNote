# @Author: DHJT
# @Date:   2019-03-14 12:15:55
# @Last Modified by:   DHJT
# @Last Modified time: 2019-03-14 12:16:07
#!/bin/sh
for host in node-1 node-2 node-3
do
echo "$host zk is stopping"
ssh $host "source /etc/profile;/export/servers/zookeeper/bin/zkServer.sh stop"

done