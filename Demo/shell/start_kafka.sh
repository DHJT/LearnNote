#!/bin/sh
for host in node-1 node-2 node-3
do
        ssh $host"source/etc/profile;nohup /export/servers/kafka/binkafka-server-start.sh
        /export/servers/kafka/config/server.properties >/dev/null 2>&1" 

        echo "$host kafka is running"

done