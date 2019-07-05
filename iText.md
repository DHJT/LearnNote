# iText
<!-- @author DHJT 2019-06-21 -->

ttf、otf字体文件
缺失字体原因，字体版本很多，你要求对方提供给你他机器上的缺失字体，或让对方在转PDF时直接给你将文字转曲（因为使用软件不同名称叫的也不同，“文字打散，创建外文廓，文字转曲”）
无法找到或创建字体“PCKJOX+NSimSun”。某些字符可能无法正确显示或打印。
- simsun.ttc 新宋体 常规
- simsun.ttc 宋体 常规
- simhei.ttf 黑体 常规
```java
1、使用iTextAsian.jar (itext-asian.jar)中的字体
BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);

2、使用Windows系统字体(TrueType)
BaseFont.createFont("C:/WINDOWS/Fonts/SIMYOU.TTF", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);

3、使用资源字体(ClassPath)
BaseFont.createFont("/SIMYOU.TTF", BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
```