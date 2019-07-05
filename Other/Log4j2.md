# Log4j2
<!-- @author DHJT 2019-07-05 -->


日志级别从低到高分为 TRACE < DEBUG < INFO < WARN < ERROR < FATAL
Log4j will inspect the "log4j.configurationFile" system property and, if set, will attempt to load the configuration using the ConfigurationFactory that matches the file extension.

1. log4j.configurationFile
2. log4j2-test.properties
3. log4j2-test.yaml 或者 log4j2-test.yml
4. log4j2-test.json 或者 log4j2-test.jsn
5. log4j2-test.xml
6. log4j2.properties
7. log4j2.yaml 或者 log4j2.yml
8. log4j2.json 或者 log4j2.jsn
9. log4j2.xml
10. DefaultConfiguration