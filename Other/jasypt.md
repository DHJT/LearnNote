# jasypt
<!-- @author DHJT 2019-02-20 -->
官方地址 : https://github.com/ulisesbocchio/jasypt-spring-boot

1、应用场景
针对properties和xml配置文件的敏感内容进行加密处理（比如数据库连接密码，通讯秘钥）
2、jasypt是一个java实现的安全框架

```xml
<dependency>
    <groupId>com.github.ulisesbocchio</groupId>
    <artifactId>jasypt-spring-boot-starter</artifactId>
    <version>2.0.0</version>
</dependency>
```

```yaml
# 加密所需的salt(盐)
jasypt.encryptor.password: G0CvDz7oJn6
# 默认加密方式PBEWithMD5AndDES,可以更改为PBEWithMD5AndTripleDES
jasypt.encryptor.algorithm: PBEWithMD5AndDES
spring.datasource.username: ENC(6eaMh/RX5oXUVca9ignvtg==)
spring.datasource.password: ENC(6eaMh/RX5oXUVca9ignvtg==)

```

## 生成要加密的字符串
```java
public static void main(String[] args) {
    BasicTextEncryptor textEncryptor = new BasicTextEncryptor();
    //加密所需的salt(盐)
    textEncryptor.setPassword("G0CvDz7oJn6");
    //要加密的数据（数据库的用户名或密码）
    String username = textEncryptor.encrypt("root");
    String password = textEncryptor.encrypt("root123");
    System.out.println("username:"+username);
    System.out.println("password:"+password);
}
```
或者使用Maven下载好的jar包加密`\Maven\org\jasypt\jasypt\1.9.2\jasypt-1.9.2.jar`
```sh
java -cp jasypt-1.9.2.jar org.jasypt.intf.cli.JasyptPBEStringEncryptionCLI password=G0CvDz7oJn6 algorithm=PBEWithMD5AndDES input=root
```

## 部署时配置salt(盐)值

为了防止salt(盐)泄露,反解出密码.可以在项目部署的时候使用命令传入salt(盐)值
```sh
java -jar -Djasypt.encryptor.password=G0CvDz7oJn6 xxx.jar
```
或者在服务器的环境变量里配置,进一步提高安全性
```sh
# 打开`/etc/profile`文件
vim /etc/profile
# 文件末尾插入
export JASYPT_PASSWORD = G0CvDz7oJn6
# 编译
source /etc/profile
# 运行
java -jar -Djasypt.encryptor.password=${JASYPT_PASSWORD} xxx.jar
```

[使用Jasypt对SpringBoot配置文件加密](https://www.jianshu.com/p/323ec96c46d2)

[1]: https://blog.csdn.net/u014421556/article/details/78832427 'jasypt 集成spring、spring boot 加密'