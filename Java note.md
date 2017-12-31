[TOC]
## Java学习
一、java当中的switch

　注：在java中switch后的表达式的类型只能为以下几种：byte、short、char、int（在Java1.6中是这样），
  在java1.7后支持了对string的判断
### 字符串操作
```java
String str = "test1234dasdf.PDF";
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
    + 第三方开源jar包sigar.ja;
        * [java使用siger 获取服务器硬件信息（CPU 内存 网络 io等）](http://www.cnblogs.com/jifeng/archive/2012/05/16/2503519.html)
        * [sigar官方主页](http://support.hyperic.com/display/SIGAR/Home;jsessionid=D9A582CF35294BA1F39FCBD2CC3CF0DB#Home-download)
- 队列`Queue`
    + 线程安全队列Queue
- `org.apache.commons.io.FileUtils`
### 集合，数组，处理。
    + [检查数组中是否包含特定值](http://www.importnew.com/10937.html)
    + 迭代删除list中的节点
``` java
//List为空时，并不未null，应用size()方法处理。
//检查数组中是否包含特定值的四种不同方法
Arrays.asList(strs).contains(String.valueOf(Idtemp);

Set<String> set = new HashSet<String>(Arrays.asList(arr));
set.contains(targetValue);

int a =  Arrays.binarySearch(arr, targetValue);
```
#### Arrays.asList()陷阱
- `Arrays.asList()` 返回的list不能add,remove
    + `Arrays.asList()`返回的是List,而且是一个定长的List，所以不能转换为ArrayList，只能转换为AbstractList
```java
int[] data = {1,2,3,4,5}; //int 应该改为Integer，这样才能正确输出元素个数，int返回1
List list = Arrays.asList(data);
System.out.println("元素类型：" + list.get(0).getClass());
System.out.println("前后是否相等："+data.equals(list.get(0)));
```
- 在迭代时移除List中的元素
``` java
  /**
   * 获取卷内设置的树
   * @param list
   * @param itemLookSet
   * @param setting 设置权限树还是获得树
   */
  public static void dealChild(List<Tree> list, Set<String> itemLookSet, boolean setting) {
    Iterator<Tree> iterator = list.iterator();
    while(iterator.hasNext()){
      Tree tree = iterator.next();
      if (Util.notNull(tree.getChildren()) && tree.getChildren().size() > 0) {
        dealChild(tree.getChildren(), itemLookSet, setting);
      } else {
        boolean isContains = itemLookSet.contains(tree.getId());
        if (setting) {
          tree.setChecked(isContains);
        } else {
          if(!isContains){
            iterator.remove();
          }
        }
      }
    }
  }
```
- 获取web下面的配置文件参数
``` java
//java实现，还有其他的spring实现。
private static Properties prop = null;
public static String getConfigValue(String key) {
  try {
    if (App.isNull(prop)) {
      prop = new Properties();
      prop.load(new FileInputStream(App.class.getClassLoader().getResource("system.properties").getPath()));
    }
    System.out.println("12341"+key+"----"+new String(prop.getProperty(key).getBytes("ISO-8859-1"), "UTF-8"));
    return new String(prop.getProperty(key).getBytes("ISO-8859-1"), "UTF-8");
  } catch (Exception e) {
    e.printStackTrace();
  }
  return "";
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
- 角色判断
``` java
/**
 * 判断是否有系统配置平台的权限
 */
public static boolean isSystemFunction(User user) {
    for (Role role : user.getRoles()) {
        for (Function function : role.getFunctions()) {
            if ("system".equals(function.getType())) return true;
        }
    }
    return false;
}
```
- `Web`服务获取参数
``` java 
String entityId = getRequest().getParameter("entityId");//字符串对象
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
- Pdf复制
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
    waterMark(copyPdf);//水印添加方法
    return copyPdf;
}
public String waterMark(String inpath) {//itext7.0.1
    try {
      inputFile = "D:\\itext.pdf";
      PdfReader reader = new PdfReader(inputFile);
      PdfWriter writer = new PdfWriter("D:\\temp.pdf");
      PdfDocument doc = new PdfDocument(reader, writer);
     // PdfStream pdfStream = new PdfStream(doc, reader);
      PdfCanvas pdfCanvas = new PdfCanvas(doc, 1);
      Rectangle rect = new Rectangle(PageSize.A4);
      Canvas canvas = new Canvas(pdfCanvas, doc, rect);
      PdfExtGState tranState = new PdfExtGState();
      tranState.setFillOpacity(0.5f);
      //Second, get your image:

      //Get your image somehow
      ImageData myImageData = ImageDataFactory.create("D:\\temp.jpg", false);
      Image myImage = new Image(myImageData);
      //Third (and optional), change your image if needed:

      //Position, rotate and scale it as needed
      myImage.setFixedPosition(100, 100);
      myImage.setRotationAngle(45);
      myImage.scaleAbsolute(200, 200);
      //Fourth, save the pdfCanvas (from the tutorial) state and set a new one:

      pdfCanvas.saveState().setExtGState(tranState);
      //Fifth, add your image to the higher level canvas (once again, from the tutorial):

      canvas.add(myImage);
      //And sixth, reset the pdfCanvas state:

      pdfCanvas.restoreState();
      doc.close();
    } catch (Exception e) {
        e.printStackTrace();
    }
}
HttpServletRequest request = ServletActionContext.getRequest();
    PdfReader reader = new PdfReader(input);
    
    PdfStamper stamper = new PdfStamper(reader, new FileOutputStream(outputFile));
    // 权限设置true 这可以打印
    // String
    // roleId=(String)ServletActionContext.getRequest().getSession().getAttribute("ROLEID");
    // stamper.setEncryption(null, null, PdfWriter.ALLOW_ASSEMBLY
    // | PdfWriter.ALLOW_FILL_IN | PdfWriter.ALLOW_SCREENREADERS
    // | PdfWriter.ALLOW_PRINTING, true);
    // stamper.setEncryption(null, null, PdfWriter.AllowAssembly
    // | PdfWriter.AllowFillIn | PdfWriter.AllowScreenReaders, true);
    int total = reader.getNumberOfPages() + 1;
    PdfContentByte content;
    BaseFont base = BaseFont.createFont(App.getConfigValue("iText_Windows_Font"), BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
    PdfGState gs = new PdfGState();
    com.itextpdf.text.Document document = new com.itextpdf.text.Document(reader.getPageSize(1));
    int width = (int) document.getPageSize().getWidth();
    int height = (int) document.getPageSize().getHeight();
    int fontSize = 30;
    if ((width + height) > 2000)
        fontSize = 120;
    for (int i = 1; i < total; i++) {
        content = stamper.getOverContent(i);// 在内容上方加水印
        // content = stamper.getUnderContent(i);//在内容下方加水印
        gs.setFillOpacity(0.2f);
        content.setGState(gs);// 透明
        content.beginText();
        content.setGrayFill(0.5f);
        content.setFontAndSize(base, fontSize);
        content.setTextMatrix(70, 200);
        content.showTextAligned(Element.ALIGN_CENTER, waterMarkName, width / 2f, height / 2f, 55);
        User user = (User) request.getSession().getAttribute("USER");
        String forUserName = "提供给:" + user.getName();
        content.showTextAligned(Element.ALIGN_CENTER, forUserName, width / 1.7f, height / 2f, 55);
        content.setColorFill(BaseColor.BLACK);
        content.setFontAndSize(base, 8);
        // content.showTextAligned(Element.ALIGN_CENTER, "下载时间："
        // + waterMarkName + "", 300, 10, 0);
        content.endText();
    }
    stamper.close();
    return "over";
}
```
- 字符串的加解密`new String(str.getBytes())`
- `Action`中定义数组，可自动获得前台的数据。
``` java
private String[] archiveTypeItems;
private String[] split;
getRequest().getParameter("ownerId");//接受的是字符串
```
- return:`return`是可以往外返回的，不一定非要有变量去接收才可以继续往外层函数`return`.
- 类的实例变量有默认值，局部变量没有默认值。
- `StringUtils`方法
``` java
import org.apache.commons.lang.StringUtils;
StringUtils.isBlank(roleStrs);
StringUtils.isNotEmpty(name);
StringUtils.equals(role.getName(), roleName);
list.isEmpty();//list时List类型
```
- **反射机制**-获取类对象的函数，并调用。
``` java
Method method = o.getClass().getMethod("getPath", new Class[] {});
Object value = method.invoke(o, new Object[] {});
```
- 枚举中的`foreach`遍历
``` java
    for (ArchiveQueryEnum s : ArchiveQueryEnum.values())  {
        if((s.toString()).equals(key)){
            operatCnStr += s.getName()+":"+o[0]+",";
        }
    }
```
``` javascript
for (s in array) {
  //code
}
```
## 数据库链接
#### `JDBC`
- [完整java开发中JDBC连接数据库代码和步骤](http://www.cnblogs.com/hongten/archive/2011/03/29/1998311.html)
- jdbc使用max()查询时报错：要给max()起别名为process_length 
    +  `String sql = "select max(process_length) as process_length from Process_condition where aggregate_name = 'S1 ' ";`
## 日志
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
## 数据库连接池
### `C3P0`连接池
### `DBCP`连接池

## 线程池
<!--异步线程执行器-->
  <bean id="taskExecutor" class="org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor">
      <property name="corePoolSize" value="10"/>
      <property name="maxPoolSize" value="30"/>
  </bean>
``` java

```
public static void doAsyncSendHtmlEmail(String headName, String sendHtml, String receiveUser) {
  ExecutorService executorService = Executors.newFixedThreadPool(3);
  try {
    executorService.submit(() -> doSendHtmlEmail(headName, sendHtml, receiveUser));
  } catch (Exception e) {
    System.out.println("提交任务时发生错误" + e);
  }
}
## `XML`生成/解析
### DOM4J生成和解析XML文档
### SAX生成和解析XML文档

## `Json`生成/解析
## 随机码生成
``` java
//定义一个包含数字，大小写字母的字符串
String strAll = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//定义一个结果
String result = "";
Random random = new Random();
for (int i = 0; i < 11; i++) {
  //返回一个小于62的int类型的随机数
  int rd = Math.abs(random.nextInt(62));
  //随机从指定的位置开始获取一个字符
  String oneChar = strAll.substring(rd, rd + 1);
  result += oneChar;
}
```
### 验证码

## 压缩/解压缩
- `zip`
- `rar`

## 文件上传下载
- [Servlet实现文件上传，可多文件上传](http://blog.csdn.net/hzc543806053/article/details/7524491)
``` java
DiskFileItemFactory factory = new DiskFileItemFactory();
String path = request.getRealPath("/upload/temp");
String downnZip = null;
App.createDir(path);
//设置 缓存的大小，当上传文件的容量超过该缓存时，直接放到 暂时存储室
factory.setRepository(new File(path));
factory.setSizeThreshold(1024*1024) ;//高水平的API文件上传处理
ServletFileUpload upload = new ServletFileUpload(factory);
try {
    List<FileItem> list = upload.parseRequest(request);//可以上传多个文件
    for(FileItem item : list) {
        String name = item.getFieldName();
        if(item.isFormField()) {
            String value = item.getString() ;
            request.setAttribute(name, value);
        } else {
            //获取路径名
            String value = item.getName();
            //索引到最后一个反斜杠
            int start = value.lastIndexOf("\\");
            String filename = value.substring(start+1);
            request.setAttribute(name, filename);
            OutputStream out = new FileOutputStream(new File(path,filename));
            InputStream in = item.getInputStream();
            int length = 0;
            byte [] buf = new byte[1024];
            while( (length = in.read(buf) ) != -1) {
                out.write(buf, 0, length);
            }
            in.close();
            out.close();
            String password = (String)request.getAttribute("password");
            File[] unzipFile = null;
      if (filename.indexOf(".zip") >= 0) {
        unzipFile = ZipUtil.unzip(path + "\\" + filename, password);
      }
      String downFilePath = request.getRealPath("tempFile/downFile/");
      String downFiles = downFilePath + DateUtil.getCurrentDateForFile() + "-审批完成" + "\\";
      for (File file : unzipFile) {
        if (file.getName().indexOf(".xml") == -1) continue;
        DocumentBuilderFactory DBfactory = DocumentBuilderFactory.newInstance();
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();
        Document document = db.parse(file);
        NodeList nodeList = document.getElementsByTagName("Borrow");
        List<String> refList = new ArrayList<String>();
        for (int i = 0; i < nodeList.getLength(); ++i) {
          Element element = (Element) nodeList.item(i);
          refList.add(element.getAttribute("refs"));
        }
        System.out.println(refList.toString());
        refList.add("000-S1984-永久-0001-Z01");
        copyExportPDF(refList, downFiles);
      }
      if (new File(downFiles).exists()) {
        downnZip = ZipUtil.zip(downFiles, (String)request.getAttribute("password"));
      };
        }
    }
} catch (Exception e) {
  System.out.println("文件操作错误-------------" + new Date().getTimezoneOffset());
}
File f = new File(downnZip);
    if(f.exists()){
        FileInputStream  fis = new FileInputStream(f);
        String filename=URLEncoder.encode(f.getName(),"utf-8"); //解决中文文件名下载后乱码的问题
        byte[] b = new byte[fis.available()];
        fis.read(b);
        response.setCharacterEncoding("utf-8");
        response.setHeader("Content-Disposition","attachment; filename="+filename+"");
        //获取响应报文输出流对象
        ServletOutputStream  out = response.getOutputStream();
        //输出
        out.write(b);
        out.flush();
        out.close();
    } else {
      PrintWriter out2 = response.getWriter();
      out2.println("生成zip下载包失败！");
}
```
## `Java Mail`发送邮件
``` java
//使用ssl发送邮件
import java.security.GeneralSecurityException;
import java.util.Properties;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import com.sun.mail.util.MailSSLSocketFactory;
public class MailUtil {
    // 设置服务器
    private static String KEY_SMTP = "mail.smtp.host";
    private static String VALUE_SMTP = "smtp.163.com";
//    private static String VALUE_SMTP = "smtp.qq.com";
    // 服务器验证
    private static String KEY_PROPS = "mail.smtp.auth";
    private static boolean VALUE_PROPS = true;
    // 发件人用户名、密码
    private static String SEND_USER = "a1914303238@163.com";
    private static String SEND_UNAME = "a1914303238";
    private static String SEND_PWD = "*";
//    // 发件人用户名、密码
//    private static String SEND_USER = "1914303238@qq.com";
//    private static String SEND_UNAME = "1914303238";
//    private static String SEND_PWD = "fyftiocvpbpcdcfi";//qq客户端授权码
    // 建立会话
    private static MimeMessage message;
    private static Session s;
 
    /*
     * 初始化方法
     */
    public MailUtil() {
        Properties props = System.getProperties();
        props.setProperty("mail.debug", "true");//部署时去除
        props.setProperty(KEY_SMTP, VALUE_SMTP);
        props.put(KEY_PROPS, "true");
        props.put("mail.smtp.port", "465");
//        props.put("mail.smtp.socketFactory.port", "465");
        MailSSLSocketFactory sf = null;
      try {
      sf = new MailSSLSocketFactory();
      // 设置信任所有的主机
        sf.setTrustAllHosts(true);
        props.put("mail.smtp.ssl.enable", "true");
        props.put("mail.smtp.ssl.socketFactory", sf);
    } catch (GeneralSecurityException e) {
      e.printStackTrace();
    }
      // 设置信任所有的主机
        s =  Session.getDefaultInstance(props, new Authenticator(){
              protected PasswordAuthentication getPasswordAuthentication() {
                  return new PasswordAuthentication(SEND_UNAME, SEND_PWD);
              }});
        s.setDebug(true);
        message = new MimeMessage(s);
    }
 
    /**
     * 发送邮件
     * 
     * @param headName
     *            邮件头文件名
     * @param sendHtml
     *            邮件内容
     * @param receiveUser
     *            收件人地址
     */
    public static void doSendHtmlEmail(String headName, String sendHtml,
            String receiveUser) {
        try {
            // 发件人
            InternetAddress from = new InternetAddress(SEND_USER);
            message.setFrom(from);
            // 收件人
            InternetAddress to = new InternetAddress(receiveUser);
            message.setRecipient(Message.RecipientType.TO, to);
            // 邮件标题
            message.setSubject(headName);
            String content = sendHtml.toString();
            // 邮件内容,也可以使纯文本"text/plain"
            message.setContent(content, "text/html;charset=GBK");
            message.saveChanges();
            Transport transport = s.getTransport("smtp");
            // smtp验证，就是你用来发邮件的邮箱用户名密码
            transport.connect(VALUE_SMTP, SEND_UNAME, SEND_PWD);
            // 发送
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();
            System.out.println("send success!");
        } catch (AddressException e) {
            e.printStackTrace();
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
 
    public static void main(String[] args) {
        MailUtil se = new MailUtil();
        se.doSendHtmlEmail("邮件头文件名", "邮件内容1231231", "dhjt11@qq.com");
    }
}
```