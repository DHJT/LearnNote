# Tomcat
<!-- @author DHJT 2018-11-28 -->
tomcat�ֲ᣺ [http://tomcat.apache.org/tomcat-9.0-doc/index.html](http://tomcat.apache.org/tomcat-9.0-doc/index.html)

## Tomcat
- `tomcat`��Ӳ����(apache-tomcat-6.0.45\conf)
`MyEclipse`�Դ���`tomcat`���ܽ�Ӳ�����������ַ����ĵ�ַɾ��������ʹ��ԭʼ��`Tomcat`
`<Host><Context path="/qrda_fy" docBase="F:\project\qrda_fy\WebRoot" /></Host>`
- ������
    - `apache-tomcat-8.0.43\work\Catalina\localhost`
    - `apache-tomcat-8.0.43\temp`

## tomcatע��ΪWindowsϵͳ����
1. ���ȣ��л���`tomcat\bin`Ŀ¼�£������ҵ�`service.bat`��
2. ��������"service install tomcat6"���ɰ�װ���񣬶�����������`tomcat6`��
3. ����Ҳ��ɣ�������Windows�ķ����������ֱ�������ˡ�
4. ���⣬Ҳ������TOMCAT�����ṩ��TOMCAT������ȥ����������TOMCAT�ˣ�ֻ��ҪΪtomcat6w.exe����һ����ݷ�ʽ��Ŀ��дΪ`D:\tomcat6\bin\tomcat6w.exe //MS//Tomcat6`��
5. ����ж�أ�`service.bat remove tomcat6`

### Tomcat ����ҳ��
```xml
<!-- ����������棬��tomcat-users.xml������ -->
<!-- http://127.0.0.1:8080/manager -->
<role rolename="manager-gui"/>
<user username="admin" password="admin" roles="manager-gui"/>
```
`http://127.0.0.1:8080/manager/status`

## Tomcat ���ô������
- [Tomcat ���ô������][1]

### �����Ż�[^1]
�༭`tomcat/bin/catalina.bat`�ļ����������һ�Σ�����Ҫ�����ֳ��������в�������
```sh
@echo off
SET JAVA_OPTS=-server -Xms13312m -Xmx13312m -XX:NewSize=3072m -XX:MaxNewSize=4096m -XX:PermSize=512m -XX:MaxPermSize=512m -XX:MaxTenuringThreshold=10 -XX:NewRatio=2 -XX:+DisableExplicitGC
```

### ����`JMX`Զ������(Enabling JMX Remote)[^2]
```sh
set CATALINA_OPTS=-Dcom.sun.management.jmxremote
  -Dcom.sun.management.jmxremote.port=%my.jmx.port%
  -Dcom.sun.management.jmxremote.ssl=false
  -Dcom.sun.management.jmxremote.authenticate=false
```

## tomcat���������Ȩ��֤

Solr��������Ϳ�������ʹ�û�����Ȩ���ʹ��tomcat�������֤



[1]: https://blog.csdn.net/qq_35959573/article/details/80597164 'Tomcat ���ô������'

[^1]: [Tomcat �����ܽ�](https://www.cnblogs.com/onmyway20xx/p/3626449.html)
[^2]: [Enabling_JMX_Remote](http://tomcat.apache.org/tomcat-9.0-doc/monitoring.html#Enabling_JMX_Remote)