# jxl
<!-- @author DHJT 2019-06-21 -->
jxl Excel表格设置外围边框
最近在做Excel报表模块，用的是韩国的JXL

设置了无网格显示 //sheet.getSettings().setShowGridLines(false);

有个表格最外围需要加个边框，查了资料说只能写个循环一个一个的设，那么多报表。。。。。。。

各位用过JXL的大虾们给点意见了。（需要的是可以设置一个表格边框可以包含一大片label）

//需求是:sheet.set(0,0,8,20,format); (0,0)到（8，20）区域内为一个Table 边框加粗

------解决方案--------------------
```java
WritableFont Bwf = new WritableFont(WritableFont.ARIAL, 12,WritableFont.NO_BOLD, false);
jxl.write.WritableCellFormat CBwcfF = new jxl.write.WritableCellFormat(Bwf);
CBwcfF.setAlignment(jxl.write.Alignment.CENTRE);
//设置垂直对齐为居中对齐
CBwcfF.setVerticalAlignment(VerticalAlignment.CENTRE);
//设置顶部边框线为实线(默认是黑色－－也可以设置其他颜色)
CBwcfF.setBorder(jxl.format.Border.TOP, BorderLineStyle.MEDIUM);
//设置右边框线为实线
CBwcfF.setBorder(jxl.format.Border.RIGHT, BorderLineStyle.MEDIUM);
```
你填充 (0,0)到（8，20） 值到这个区域的时候， 把单元格的格式设置成加粗
CBwcfF.setBorder(jxl.format.Border.TOP, BorderLineStyle.MEDIUM);
那么它填充数值的同时也会将你的单元格格式加上， 没有你说的通过循环来加入。