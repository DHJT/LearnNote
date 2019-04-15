/**
 * 获取浏览器类型名称以及版本
 * @author slh
 * @date 2017-11-13
 */
/*	if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0") 
	{ 
	alert("IE 6.0"); 
	} 
	else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0") 
	{ 
	alert("IE 7.0"); 
	} 
	else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0") 
	{ */
/*	isAcrobatPluginInstall();*/

function getBrowserName() {
	var userAgent = navigator ? navigator.userAgent.toLowerCase() : "other";
	if (userAgent.indexOf("chrome") > -1)
		return "chrome";
	else if (userAgent.indexOf("safari") > -1)
		return "safari";
	else if (userAgent.indexOf("msie") > -1 || userAgent.indexOf("trident") > -1)
		return "ie";
	else if (userAgent.indexOf("firefox") > -1)
		return "firefox";
	return userAgent;
}

//针对IE返回ActiveXObject　　
function getActiveXObject(name) {
	try {
		return new ActiveXObject(name);
	} catch (e) {
	}
}

//针对除了IE之外浏览器　　
function getNavigatorPlugin(name) {
	for (key in navigator.plugins) {
		var plugin = navigator.plugins[key];
		if (plugin.name == name)
			return plugin;
	}
}

//获取Adobe Reader插件信息　　
function getPDFPlugin() {
	if (getBrowserName() == 'ie') {
		// load the activeX control　　
		//AcroPDF.PDF is used by version 7 and later　　
		// PDF.PdfCtrl is used by version 6 and earlier　　
		return getActiveXObject('AcroPDF.PDF')
		|| getActiveXObject('PDF.PdfCtrl');

	} else {
		return getNavigatorPlugin('Adobe Acrobat')
				|| getNavigatorPlugin('Chrome PDF Viewer')
				|| getNavigatorPlugin('WebKit built-in PDF');
	}
}

//判断插件是否安装　　
function isAcrobatInstalled() {
	return !!getPDFPlugin();
}

//获取Adobe Reader版本　　
function getAcrobatVersion() {
	try {
		var plugin = getPDFPlugin();
		if (getBrowserName() == 'ie') {
			var versions = plugin.GetVersions().split(',');
			var latest = versions[0].split('=');
			return parseFloat(latest[1]);
		}

		if (plugin.version)
			return parseInt(plugin.version);
		return plugin.name;
	} catch (e) {
		return null;
	}
}

function getActiveXObject(name) {
	try {
		return new ActiveXObject(name);
	} catch (e) {
	}
}