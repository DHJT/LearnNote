# Java
<!-- @author DHJT 2018-02-24 -->
[TOC]

## Java学习
- [C语言：值传递，地址传递和引用传递（example：值交换）](https://www.cnblogs.com/chen-kh/p/6696305.html)
    + 如果一个函数出入一个对象Person person = new Person（"ZHANG San"）,而在函数体内进行这个操作：person = new Person（"LI Si"）;那么person的值并不能被改变，所以我们说java的函数传递都是值传递。
- java当中的`switch`
    + 注：在java中switch后的表达式的类型只能为以下几种：byte、short、char、int（在Java1.6中是这样），在java1.7后支持了对string的判断
- 静态引入，在程序运行是就加载包中所有静态方法和静态属性，可以不用包名直接调用方法
    + `Java5`增加的功能：`import static java.lang.Integer;`

### 自动资源管理(Automatic Resource Management)
资源会在`try`代码后自动关闭，原因就在于它们都实现了`AutoCloseable`接口。
```java
// 在JDK7之后，新增了尝试关闭资源 （try-with-resources）语法
public void copyFile(String fileInput, String fileOutput) {
    try (InputStream input = new FileInputStream(fileInput);
            OutputStream output = new FileOutputStream(fileOutput)) {
        byte[] byteArray = new byte[1024];
        int len = 0;
        while((len = input.read(byteArray)) != -1) {
            output.write(byteArray, 0, len);
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

### 4种引用类型
强引用、软引用(SoftReference)、弱引用（WeakReference）和幽灵引用（PhantomReference）;

### 按位与（&）、按位或（|）、异或（^）等运算符
按位与运算符`&`是双目运算符。
其功能是参与运算的两数各对应的二进位相与。只有对应的两个二进位都为1时，结果位才为1。参与运算的两个数均以补码出现。

### 文件操作
- 兼容Windows、Linux的换行输出：`System.getProperty("line.separator")`

### 字符串操作
```java
String str = "test1.PDF";
// 1. 以什么结尾
str.trim().toLowerCase().endsWith(".pdf");
// 2. 以什么开始
str.startsWith("");
// 3. 字符串最后出现的位置
str.lastIndexOf(".Pdf");
```

- JAVA查看内存使用情况。
    + 使用Java类库
        * 空闲内存：`Runtime.getRuntime().freeMemory()`;
        * 总内存：`Runtime.getRuntime().totalMemory()`;
        * 最大内存：`Runtime.getRuntime().maxMemory()`;
        * 已占用的内存：`Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()`;
    + 第三方开源jar包sigar.jar;
        * [java使用siger 获取服务器硬件信息（CPU 内存 网络 io等）](http://www.cnblogs.com/jifeng/archive/2012/05/16/2503519.html)
        * [sigar官方主页](http://support.hyperic.com/display/SIGAR/Home;jsessionid=D9A582CF35294BA1F39FCBD2CC3CF0DB#Home-download)
- 队列`Queue`
    + 线程安全队列 Queue
    + LinkedList 实现了`Queue`接口

### 泛型
- `？` 表示不确定的 java 类型
- `T` (type) 表示具体的一个java类型
-` K V (key value)` 分别代表java键值中的Key Value
- `E (element)` 代表Element
- 类型参数`<T>`和无界通配符`<?>`
- 有界通配符`<? extends XXX>`，`<? super XXX>`
    + [List<?>和List<T>的区别？][1]

```java
// public <T>这个T是个修饰符的功能，表示是个泛型方法，就像有static修饰的方法是个静态方法一样。
// <T> 不是返回值，表示传入参数有泛型
public static final <T> List<T> getBeans(Class<T> clazz) {};

List<T extends Number> list;
List<? super Student> list;// 只能接收Student及其父类的数据类型。
```

### 集合，数组，处理。
- 集合
    + [检查数组中是否包含特定值](http://www.importnew.com/10937.html)
    + [List集合序列排序的两种方法](https://blog.csdn.net/diweikang/article/details/80788467)
    + 迭代删除list中的节点
``` java
//List为空时，并不未null，应用size()方法处理。
//检查数组中是否包含特定值的四种不同方法
Arrays.asList(strs).contains(String.valueOf(Idtemp));
Set<String> set = new HashSet<String>(Arrays.asList(arr));
set.contains(targetValue);
int a = Arrays.binarySearch(arr, targetValue);
```

### List、Set互转
因为List和Set都实现了Collection接口，且addAll(Collection<? extends E> c);方法，因此可以采用addAll()方法将List和Set互相转换；另外，List和Set也提供了Collection<? extends E> c作为参数的构造函数，因此通常采用构造函数的形式完成互相转化。

#### Arrays.asList()陷阱
- `Arrays.asList()` 返回的list不能add,remove
    + `Arrays.asList()`返回的是List,而且是一个定长的List，所以不能转换为ArrayList，只能转换为AbstractList
```java
int[] data = {1, 2, 3, 4, 5}; //int 应该改为Integer，这样才能正确输出元素个数，int返回1
List list = Arrays.asList(data);
System.out.println("元素类型：" + list.get(0).getClass());
System.out.println("前后是否相等：" + data.equals(list.get(0)));
```
- 在迭代时移除List中的元素
``` java
public static void dealChild(List<Tree> list, Set<String> itemLookSet, boolean setting) {
    Iterator<Tree> iterator = list.iterator();
    while(iterator.hasNext()) {
        Tree tree = iterator.next();
        boolean isContains = itemLookSet.contains(tree.getId());
        if (setting) {
            tree.setChecked(isContains);
        } else if(!isContains) {
            iterator.remove();
        }
    }
}
```
- `FreeMaker` 循环ftl
    + `wordxml`
    + `excelxml`
`<#list dateMapList as dateList><#if dateList.entityId??>-${dateList.entityId}</#if></#list>`
`<#if entityBorrow.purpose == "2">√</#if>`
- sql查询后的对象处理。
``` java
String sql = "select b.BUTTONCH ,b.BUTTONEN FROM  T_QR_CUSTOM_BUTTON  b left join T_QR_CUSTOM_BUTTON_CODING c on b.ID = c.ID where c.MODEL_TYPE ='"
                + modelType + "' and c.TYPE_LEVEL='" + archiveTypeLevel + "'";
List<String[]> listStr = App.getJdbcDao().query(sql);
StringBuffer halders = new StringBuffer();
StringBuffer names = new StringBuffer();
HashMap<String, Object> map = new HashMap<String, Object>();
for (int i = 0; i < listStr.size(); i++) {
    String[] str = listStr.get(i);
    names.append("" + str[0] + ",");
    halders.append("" + str[1] + ",");
}
```
- `Web`服务获取参数
``` java
String idStr = getRequest().getParameter("ids");//字符串对象
String[] ids = getRequest().getParameterValues("ids");//数组对象
```
- 文件相关<kbd>待整理</kbd>
    + 文件上传
    + 文件下载
        * 超链接下载（可以识别的文件会直接打开，如图片。）
``` java
//获取WebRoot下的template文件夹的物理路径。
// 需要在上下文初始化之后使用
String templatePath = ServletActionContext.getServletContext().getRealPath("template/");
//获取本类的物理路径。例：`/E:/workspase/qrda_fy/WebRoot/WEB-INF/classes/`
// 静态代码中使用 App.class.getResource("/").getPath();
this.getClass().getResource("/").getPath();

if (!file.getParentFile().exists()) {
    file.getParentFile().mkdirs();
}

HttpServletResponse response = ServletActionContext.getResponse();
response.setHeader("Content-type", "text/html;charset=UTF-8");
response.getWriter().println(tempDocPath+tempDocName);
response.getWriter().flush();
```
- 文件复制
``` java
// PDF文件通道复制
public String fileChannelCopy(String inpath) {
    File f = new File(getClass().getResource("/").getPath());
    String file = f.getParent();
    f = new File(file);
    file = f.getParent();
    File s = new File(inpath);
    String copyPdf = "pdf_bak/" + App.generateId() + ".pdf";
    File t = new File(file + "\\PDF\\" + copyPdf);
    (new File(file + "\\PDF\\pdf_bak")).mkdirs(); // 没有文件夹则生成一个文件夹
    FileInputStream fi = null;
    FileOutputStream fo = null;
    FileChannel in = null;
    FileChannel out = null;
    try {
        fi = new FileInputStream(s);
        fo = new FileOutputStream(t);
        in = fi.getChannel();// 得到对应的文件通道
        out = fo.getChannel();// 得到对应的文件通道
        in.transferTo(0, in.size(), out);// 连接两个通道，并且从in通道读取，然后写入out通道
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            fi.close();
            in.close();
            fo.close();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    return copyPdf;
}
```
- 字符串的加解密`new String(str.getBytes())`
- `Action`中定义数组，可自动获得前台的数据。
``` java
private String[] archiveTypeItems;
private String[] split;
```
- return:`return`是可以往外返回的，不一定非要有变量去接收才可以继续往外层函数`return`.
- 类的实例变量有默认值，局部变量没有默认值。
- **反射机制**-获取类对象的函数，并调用。
``` java
Method method = o.getClass().getMethod("getPath", new Class[] {});
Object value = method.invoke(o, new Object[] {});
```
- 枚举中的`foreach`遍历

## 数据库链接
#### `JDBC`
- [完整java开发中JDBC连接数据库代码和步骤](http://www.cnblogs.com/hongten/archive/2011/03/29/1998311.html)
- jdbc使用max()查询时报错：要给max()起别名为`process_length`
    +  `String sql = "select max(process_length) as process_length from Process_condition where aggregate_name = 'S1 ' ";`

## CURL
``` shell
curl -X POST -H "AppKey: go9dnk49bkd9jd9vmel1kglw0803mgq3" -H "CurTime: 1443592222" -H "CheckSum: 9e9db3b6c9abb2e1962cf3e6f7316fcc55583f86" -H "Nonce: 4tgggergigwow323t23t" -H "charset: utf-8" -H "Content-Type: application/x-www-form-urlencoded" -d 'templateid=1007&mobiles=["13812345678"]&params=["hello"]' 'https://api.netease.im/sms/sendtemplate.action'
```
``` java
String appKey = "f897c57f2fec678375b4aa6d88349047";
  String appSecret = "c915496e6e5b";
  String nonce = "baoluo"; // 随机数（最大长度128个字符）
  String curTime = String.valueOf((new Date()).getTime() / 1000L); // 当前UTC时间戳
  System.out.println("curTime: " + curTime);

  String checkSum = getCheckSum(appSecret, nonce, curTime);
  System.out.println("checkSum: " + checkSum);

  PrintWriter out = null;
  BufferedReader in = null;
  String result = "";
    try {
      String url = "https://api.netease.im/sms/sendtemplate.action"; //网址可以不修改
      String encStr1 = URLEncoder.encode("Tom", "utf-8");
      String encStr2 = URLEncoder.encode("name", "utf-8"); // url编码；防止不识别中文
      String params = "templateid=3033519&mobiles=[\"17091959543\"]"
                      * "&params=" + "[\"" + encStr1 + "\",\""+ encStr2 + "\"]";
      System.out.println("params：" + params);

      URL realUrl = new URL(url);
      // 打开和URL之间的连接
      URLConnection conn = realUrl.openConnection();
      // 设置通用的请求属性
      conn.setRequestProperty("AppKey", appKey);
      conn.setRequestProperty("CheckSum", checkSum);
      conn.setRequestProperty("CurTime", curTime);
      conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
      conn.setRequestProperty("Nonce", nonce);

      // 发送POST请求必须设置如下两行
      conn.setDoOutput(true);
      conn.setDoInput(true);
      // 获取URLConnection对象对应的输出流
      out = new PrintWriter(conn.getOutputStream());
      // 发送请求参数
      out.print(params);
      // flush输出流的缓冲
      out.flush();
      // 定义BufferedReader输入流来读取URL的响应
      System.out.println(conn);
      in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      System.out.println("in"+in);
      String line;
      while ((line = in.readLine()) != null)
      {
          result += line;
      }
      System.out.println(result);
} catch (Exception e) {
  // TODO: handle exception
   System.out.println("发送 POST 请求出现异常！\n" + e);
  e.printStackTrace();
} finally {
    try {
        if (out != null) {
            out.close();
        }
        if (in != null) {
            in.close();
        }
    } catch (IOException ex) {
        ex.printStackTrace();
    }
}
```
``` java
DefaultHttpClient httpClient = new DefaultHttpClient();
String url = "https://api.netease.im/nimserver/user/create.action";
HttpPost httpPost = new HttpPost(url);

String appKey = "f897c57f2fec678375b4aa6d88349047";
String appSecret = "c915496e6e5b";
String nonce =  "12345";
String curTime = String.valueOf((new Date()).getTime() / 1000L);
String checkSum = getCheckSum(appSecret, nonce ,curTime);//参考 计算CheckSum的java代码

// 设置请求的header
httpPost.addHeader("AppKey", appKey);
httpPost.addHeader("Nonce", nonce);
httpPost.addHeader("CurTime", curTime);
httpPost.addHeader("CheckSum", checkSum);
httpPost.addHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

// 设置请求的参数
List<NameValuePair> nvps = new ArrayList<NameValuePair>();
nvps.add(new BasicNameValuePair("accid", "helloworld"));
httpPost.setEntity(new UrlEncodedFormEntity(nvps, "utf-8"));

// 执行请求
HttpResponse response = httpClient.execute(httpPost);

// 打印执行结果
System.out.println(EntityUtils.toString(response.getEntity(), "utf-8"));
```

## 线程池
```xml
<!--异步线程执行器-->
<bean id="taskExecutor" class="org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor">
    <property name="corePoolSize" value="10"/>
    <property name="maxPoolSize" value="30"/>
</bean>
```
``` java
// 使用了lambda表达式
// lambda表达式对值封闭，对变量开放的原文是：`lambda expressions close over values, not variables`
public static void doAsyncSendHtmlEmail(String headName, String sendHtml, String receiveUser) {
    ExecutorService executorService = Executors.newFixedThreadPool(3);
    try {
        executorService.submit(() -> doSendHtmlEmail(headName, sendHtml, receiveUser));
    } catch (Exception e) {
        System.out.println("提交任务时发生错误" + e);
    }
}
```

[1]: https://www.zhihu.com/question/31429113 'List<?>和List<T>的区别？'