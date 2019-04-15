# @Author: DHJT
# @Date:   2019-03-14 12:14:12
# @Last Modified by:   DHJT
# @Last Modified time: 2019-03-14 12:14:31
#!/bin/sh
for host in node-1 node-2 node-3
do
ssh $host "source /etc/profile;/export/servers/zookeeper/bin/zkServer.sh start"
echo "$host zk is running"

done