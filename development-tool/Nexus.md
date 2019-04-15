# Nexus
<!-- @author DHJT 2019-01-15 -->
Repository Manager 3.1.0 and newer can accept a Pro license installation and includes Pro features when activated.

Repository Manager 3.0.x  does not require a license to be installed, and does not include Pro features, however all existing licensed repository manager accounts are entitled to full technical support.

## install

### install with bundle
```sh
# ����������̨�������Ϣ
#  "Started Sonatype Nexus" �������Ϣ����ʾ��װ���
nexus.exe /run
# ��Ĭ����
nexus.exe run
# nexus-2-bundle����
nexus-2.14.11-01-bundle\nexus-2.14.11-01\bin\jsw\windows-x86-64\console-nexus.bat
```

### ʹ��
- `http://127.0.0.1:8081` ����Ĭ���û���`admin`��Ĭ������`admin123`��¼
- `http://127.0.0.1:8081/nexus`
``` properties
# ���Ķ˿�
# Jetty section
application-port=8081
```

[1]: https://www.cnblogs.com/kevingrace/p/6201984.html 'Maven˽��Nexus3.x��������������¼'
[2]: https://help.sonatype.com/repomanager2/release-notes 'release-notes'
[3]: https://sonatype-download.global.ssl.fastly.net/nexus/oss/nexus-2.14.11-01.war 'Repository Manager 2 nexus-2.14.11-01.war'
[4]: https://help.sonatype.com/repomanager3/upgrade-compatibility---repository-manager-2-to-3 '2-to-3'
[5]: https://help.sonatype.com/repomanager3/download/download-archives---repository-manager-3
[6]: https://sonatype-download.global.ssl.fastly.net/nexus/3/nexus-3.0.2-02-win64.zip
[7]: https://www.cnblogs.com/hujiapeng/p/7127213.html 'Maven˽���'
[8]: https://www.cnblogs.com/demingblog/p/3840174.html 'ʹ��nexus�maven�ֿ⣨����˽����'
[9]: https://download.sonatype.com/nexus/oss/nexus-2.14.11-01-bundle.zip
[10]: http://download.sonatype.com/nexus/3/nexus-3.15.0-01-win64.zip