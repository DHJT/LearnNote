# JQuery EasyUI
<!-- @author DHJT 2017-06 -->
## 基础使用
``` html
<script src="jqueryeasyui/jquery.min.js"></script>
<script src="jqueryeasyui/jquery.easyui.min.js"></script>
<script src="jqueryeasyui/locale/easyui-lang-zh_CN.js"></script>
<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/default/easyui.css" />
<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/icon.css" />
<style>
/* 重写easyui的样式即可 */
.datagrid-cell {
    line-height: 25px;
}
</style>
```
- `datagrid`初始化不加载数据，也不每次重新渲染组件
``` js
$("#archiveTable").datagrid({
//    url: "queryByKeyword_PublicAction.action",
//    queryParams: {
//        luncenetext: value
//    },
    loader: function(param, success, error) {
        $.ajax({
            url: "queryByKeyword_PublicAction.action",
            data: {
                luncenetext: value
            },
            success: function(data) {
                data = eval("(" + data + ")");
                data = { // 数据转换
                    total: data.json.length,
                    rows: data.json
                };
                success(data);
            }
        })
    }
});
// datagrid如果再初始化的时候添加了url属性，就会自动从后台加载数据，要想解决这个问题，就
1.初始化是不加url属性
2.需要加载数据的时候通过以下代码加载数据：

$("#archiveTable").datagrid('options').url = teacherCourseUrl.teacherCourse;
$("#archiveTable").datagrid('load', {'tid': _tid, 'status':status});
```
- ` class="easyui-layout" data-options="fit:true" `这两个一起使用，不知道什么原因
- `textbox`获取<kbd>Enter</kbd>键盘事件
```js
$('#ss-yearCode').textbox({
    label: '年度：',
    labelAlign: 'right',
    width: 250,
    height: 35,
    prompt: '请输入年度...',
    inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
        keyup: function(event) {
            if (event.keyCode == 13) {
                // todo ....
            }
        }
    })
});
```
## 扩展

### 虚拟滚动视图显示海量数据
- [DataGrid Virtual Scroll View Demo](http://www.jeasyui.com/tutorial/datagrid/datagrid27_demo.html)
- [EasyUI 使用虚拟滚动视图显示海量数据](http://www.jeasyui.net/tutorial/46.html)
``` js
// 引入datagrid-scrollview.js
$("#ibox-tt").datagrid({
    rownumbers: false,
    singleSelect: true,
    fit: true,
    striped: true,
    autoRowHeight: true,
    showHeader: false,
    pageSize: 50,
    view: scrollview,
    nowrap: true,
    loadMsg: '数据加载中......',
    columns: [[
        {field:'id', title:'id', width:100, hidden:true},
        {field:'title', title:'title', width:'70%'},
        {field:'cretaeDate', title:'cretaeDate', width:'30%', align:'right'}
    ]],
    rowStyler: function() {return 'height: 50px;';},
    loadFilter: function(data) {
        data = {
            total: data.totalCount,
            rows: data.content
        }
        return data;
    },
    onDblClickRow: function(rowIndex, rowData) {
    }
});
```