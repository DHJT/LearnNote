# JQuery
## JQuery基础
### 使用
``` html
<script src="jqueryeasyui/jquery.min.js"></script>
<script type="text/javascript">
    $(document).ready(function() { /*code*/ });
    $().ready(function() { /*code*/ });
    $(function() { /*code*/ });
</script>
```
### 匿名函数
(function($){...})(jQuery)实际上是匿名函数
- jQuery(function(){});
用于存放操作DOM对象的代码，执行其中代码时DOM对象已存在。不可用于存放开发插件的代码，因为jQuery对象没有得到传递，外部通过jQuery.method也调用不了其中的方法（函数）。
- (function(){　})(jQuery);
用于存放开发插件的代码，执行其中代码时DOM不一定存在，所以直接自动执行DOM操作的代码请小心使用。
- 开发插件的格式如下：
```js
(function ($) {
    $.fn.test111 = function () {
        alert('test')
    }
})(jQuery);
// 调用插件
$("#elementid").test111();
```

### 监听
- on()方法在被选元素及子元素上添加一个或多个事件处理程序。
- 自jQuery版本``1.7``起，on()方法是bind()、live()和delegate()方法的新的替代品。该方法给API 带来很多便利，我们推荐使用该方法，它简化了jQuery代码库。
- 注意：使用 on() 方法添加的事件处理程序适用于当前及未来的元素（比如由脚本创建的新元素）。
- 提示：如需移除事件处理程序，请使用 off() 方法。
- 提示：如需添加只运行一次的事件然后移除，请使用 one() 方法。
``` js
// $(selector).on(event,childSelector,data,function,map)
$('#myModal').on('hide.bs.modal', function() {
    alert('嘿，我听说您喜欢模态框...');
});
$(function() {
    $("table[name='archiveTable'] tbody").on("click", "button", function(){
        $('#dialog').modal({});
    });
});
```

### jQuery的选择器
#### 基本选择器
#id、.class、element、*、（selector1，selector2，...，selectorN）
#### 层次选择器
$("ancestor descendant")
$("parent > child")
$("prev + next")下一个同辈元素
$("prev~siblings")后面的所有同辈元素

#### 过滤选择器
##### 基本过滤选择器
:first    单个元素
:last    单个元素
:not(selector)
:even    索引是偶数
:odd    索引是奇数
:eq(index)    单个元素
:gt(index)    大于
:lt(index)    小于
:header    选取所有的标题元素（h1）
:animated    选取当前正在执行动画的所有元素
:focus    选取当前获取焦点的元素
*索引从0开始

##### 内容过滤选择器
:contains(text)    选取含有文本内容为“text”的元素
:empty    选取不包含子元素或者文本的元素
:has(selector)    选取含有选择器所匹配的元素的元素
:parent    选取含有子元素或者文本的元素

##### 可见性过滤选择器
:hidden
:visible

##### 属性过滤选择器
[attribute]    含有此属性的
[attribute=value]
[attribute!=value]    
[attribute^=value]    以此开头
[attribute$=value]    值以此结束
[attribute*=value]    值含有此值
[attribute|=value]    选取属性等于给定字符串或以该字符串为前缀（该字符串后跟一个连字符“-“）的元素
[attribute~=value]    选取属性用空格分隔的值中包含一个给定值的元素
[attribute1][attribute2]...[attributeN]

##### 子元素过滤选择器（集合元素）
:nth-child(index/even/odd/equation)    index从1开始算起    :nth-child(3n+1)
:first-child    选择每一个父元素的第一个子元素
:last-child
:only-child    $("ul li:only-child")在<ul>中选取是唯一子元素的<li>元素

##### 表单对象属性过滤选择器
:enabled    所有可用元素
:disabled    不可用元素
:checked    被选中（单选，复选框）
:selected    （下拉列表）

表单选择器
:input
:text
:password
:radio
:checkbox
:submit
:image
:reset
:button
:file
:hidden

### 选择器注意
1. 特殊字符：.    #    (    ]    等
转义字符转义：“\\”
2. @问题，jQuery1.3版本中已经解决
$("div[@title='test']");
3. 选择器中含有空格
后代选择器与过滤选择器的不同
$(".test :hidden")带空格：选取class为“test”的元素里面的隐藏元素
$(".test:hidden")不带空格：选取隐藏的class为“test”的元素
- 通过jQuery选择器得到的都是数组：`$('#formName')[0].reset();`
- 这种方式虽然可以重置表单，但是不能重置隐藏字段。隐藏字段要单独处理。
- $('#id').get(0)得到的是DOM对象。 
4. js与jquery对象互相转换 
```js
var aa = $("#mm").get(0); // jquery 对象转成 js 对象 
var bb = $(aa); //js 对象转成 jquery 对象 
```

### checked比较特殊，只要设置了属性checked，不管何值都是checked的。例如：
<input type="checkbox" checked>不过一般为了符合规范我们都会给checked一个值
<input type="checkbox" checked="checked">
这样的属性还有如readonly,disabled,selected
如果要通过attr设置的话，你只需要移除这些属性：
`$("input[name='"+_checkBoxName+"']").removeAttr("checked");`

### `JSONP`
``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>JSONP 实例</title>
    <script src="http://cdn.static.runoob.com/libs/jquery/1.8.3/jquery.js"></script>
</head>
<body>
<div id="divCustomers"></div>
<hr/>
<div id="divCustomers2"></div>
<script>
$.getJSON("http://www.runoob.com/try/ajax/jsonp.php?jsoncallback=?", function(data) {
    var html = '<ul>';
    for(var i = 0; i < data.length; i++) {
        html += '<li>' + data[i] + '</li>';
    }
    html += '</ul>';
    $('#divCustomers').html(html);
});
$.ajax({
    dataType: 'jsonp',
    jsonp: 'onJsonPLoad',
    // data: {username:$("#username").val(), content:$("#content").val()},
    url: 'http://www.runoob.com/try/ajax/jsonp.php?jsoncallback=?',
    success: function(data){
        var html = '<ul>';
        for(var i = 0; i < data.length; i++) {
            html += '<li>' + data[i] + '</li>';
        }
        $.each(data, function(commentIndex, comment){
            html += '<li>' + comment + '</li>';
        })
        html += '</ul>';
        $('#divCustomers2').html(html);
    },
});
</script>
</body>
</html>
```
### each的break和continue
```js
$("option").each(function(){
    if($(this).val() == 11){
        return false; // false时相当于break, 如果return true 就相当于continue。  
    }
    alert($(this).val());
}); 
```

## 插件
### 分页插件：`jquery.timeago.js`
### 分页插件：`mricode.pagination`
### 打印分页插件:`jquery.PrintArea.js`
### 翻页插件:`jquery.fullPage.min.js`
- [query.fullPage](https://github.com/alvarotrigo/fullPage.js)
``` js

```
### jquery通知插件:`toastr.js`
- 在页面引入对应的`toastr.css`和`toastr.js`,先配置后使用
``` js
//消息提示全局配置
toastr.options = {
    "closeButton": false,//是否配置关闭按钮
    "debug": false,//是否开启debug模式
    "newestOnTop": false,//新消息是否排在最上层
    "progressBar": false,//是否显示进度条
    "positionClass": "toast-top-center",//消息框的显示位置
    "preventDuplicates": false,//是否阻止弹出多个消息框
    "onclick": null,//点击回调函数
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "1500",//1.5s后关闭消息框
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}
//成功提示绑定
toastr.success("祝贺你成功了");
//信息提示绑定
toastr.info("这是一个提示信息");
//敬告提示绑定
toastr.warning("警告你别来烦我了");
//错语提示绑定
toastr.error("出现错误，请更改");
//清除窗口绑定
toastr.clear();
```
