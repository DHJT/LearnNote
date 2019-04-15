/**
 * @author slh
 * @description 应用类
 */

/**
 * 获取文件后缀名
 * @param  {[type]} re [description]
 * @return {[type]}    [description]
 */
function getExt(filename) {
    var reg = /\.[^\\.\/]+/i;
    debugger;// 调试测试
    if(reg.test(filename)) {
        return RegExp.$1;
    } else {
        return null;
    }
}

/**
 * [下面的代码匹配指定扩展名]
 * @return {[type]} [description]
 */
function matchExts() {
    var reg = /\.(flv|3gp|rmvb|rm|swf)/i;
    var filename = "abc.flv";
    if(reg.test(filename)){
        var ext = RegExp.$1;
        if(ext.toLowerCase() == ".flv")
            flv=true;
    }
}

/**
 * 获取浏览器cookie
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for ( var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name)
            return arr[1];
    }
    return "";
}

/**
 * [是否为只包含字母数字]
 * @param  {[type]}  str [description]
 * @return {Boolean}     [description]
 */
function isLetterDigit(str) {
    var reg = "^[a-z0-9A-Z]+$";
    return reg.test(str)
}

/**
 * 页面显示用户数据，对数据进行转码
 * 防止XSS
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
function stringEncode(str) {
    var div = document.createElement('div');
    if (div.innerText) {
        // (ie支持)
        div.innerText = str;
    } else {
        // textContent(火狐，google支持)
        div.textContent = str;
    }
    return div.innerHTML;
}

// 其中g表示全文替换，i表示忽略大小写；
tblStr = tblStr.replace(/<script>/gi, stringEncode("<script>"));
// 替换字符串变量或者结束标签这样写
tblStr = tblStr.replace(new RegExp("</script>",'gi'), stringEncode("</script>"));
$('#search-result').append(tblStr);



var email = ^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$;
var domain = [a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?; //    域名
var url = [a-zA-z]+://[^\s]* 或 ^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$;
