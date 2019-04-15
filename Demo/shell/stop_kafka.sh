# @Author: DHJT
# @Date:   2019-03-14 12:14:46
# @Last Modified by:   DHJT
# @Last Modified time: 2019-03-14 12:15:31
#!/bin/sh
for host in node-1 node-2 node-3
do
ssh $host "source /etc/profile;bash /export/servers/kafka/bin/kafka-server-stop.sh" 
echo "$host kafka is stopping"

done