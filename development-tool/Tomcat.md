# Tomcat
<!-- @author DHJT 2018-11-28 -->

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

## tomcat���������Ȩ��֤

Solr��������Ϳ�������ʹ�û�����Ȩ���ʹ��tomcat�������֤

[1]: https://blog.csdn.net/qq_35959573/article/details/80597164 'Tomcat ���ô������'