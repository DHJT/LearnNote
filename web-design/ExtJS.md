# ExtJS
<!-- [TOC] -->
enforceMaxLength: true,
this.getSelectionModel().getLastSelected().get("id");
ExtJs grid单选，多选
一、
selType : 'checkboxmodel',
singleSelect : true, // 单选
multiSelect : true, // 多选
singleSelects:['edit'] :表示只有选择一行记录时edit才可点击，其他情况被禁用，edit表示按钮的id
multiSelects:['delete'] : 表示当选择一条或多条记录时delete才可点击。delete为按钮id

二、
selModel : Ext.create('Ext.selection.CheckboxModel', {
            mode : 'SINGLE'
        }),
### TreePanel
- [Extjs tree树的方法和配置项](https://blog.csdn.net/yuan1013922969/article/details/51741336)
- 树节点合上展开显示不同图标
``` js
listeners: {
    beforeitemexpand: function (node, index, item, eOpts) {
        node.data.iconCls = 'folder_open';
    },
    beforeitemcollapse: function (node, index, item, eOpts) {
        node.data.iconCls = 'folder_close';
    }
}
.folder_close {
    background: url("/Image/tree/folder_close.ico") no-repeat center !important;
}
.folder_open {
    background: url("/Image/tree/folder_open.ico") no-repeat center !important;
}
```
``` json
{ // 树节点的字段信息
    "allowDrag": true,
    "allowDrop": true,
    "checked": null,
    "children": [],
    "click": false,
    "cls": "",
    "depth": 2,
    "expandable": true,
    "expanded": false,
    "glyph": "",
    "href": "",
    "hrefTarget": "",
    "icon": "",
    "iconCls": "",
    "id": "9000001",
    "index": 0,
    "isFirst": true,
    "isLast": false,
    "leaf": true,
    "loaded": false,
    "loading": false,
    "parentId": "Juannei",
    "qshowDelay": 0,
    "qtip": "",
    "qtitle": "",
    "root": false,
    "text": "同意消科所成立临时党支部的批复",
    "type": "I",
    "visible": true
}
```
- 回车键触发机制等（keyup、specialKey[...]）
```js
listeners : {
    specialKey : function(field, e) {
        if (e.getKey() == Ext.EventObject.ENTER) {
            var queryBtn  = this.up('gridpanel').query("[name='searchButton']");
            if (queryBtn) {
                queryBtn[0].click();
            }
        }
    }
}
```

- 鼠标悬浮时的提示消息
``` js
//鼠标悬浮时的提示消息。 需要先初始化Ext.tip.QuickTipManager。
// 例如actioncolumn的tooltip
Ext.onReady(function() {
    Ext.tip.QuickTipManager.init();
    })
```
## 获取grid的列表值
```js
getBorrowNo : function() {
    if (this.getSelectionModel().getSelection().length == 1) {
        return this.getSelectionModel().getSelection()[0].get("borrowNo");
    } else {
        return null;
    }
},
```
- `searchfield`的用法。
``` js
Ext.create('Ext.ux.form.SearchField', {
        store : grid.getStore(),
        emptyText : "一体化检索",
        name: 'query',
        onSearchClick: function() {//覆盖默认的`onSearchClick`方法
            grid.getStore().proxy.url = "queryByWord_ArchiveQuery.action";
            grid.getStore().proxy.extraParams = {
                modelType : _this.modelType
            };
            grid.getStore().load();
        },
    });
```
- 事件监听，以及store的重复添加监听的问题解决方案
``` js
store.load({
            callback: function(records, options, success){
            }
        }
'change' : function(_this_, newValue) {}
select : function(obj) {
            var newValue = obj.getValue();
        }
//回车键监听
listeners : {
        specialkey: function(field, e){ 
            if (e.getKey() == e.ENTER) {
                alert(field.getRawValue())
            }
        }
    }
```
- gridPanel中的双击修改。
``` js
this.plugins = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit : 2 // 点击几次可以修改
    });
_this.dockedItems = [{//可以生成两个toolbar
                        xtype : 'toolbar',
                        dock : 'top',
                        items : [modelCombo]
                    }, {
                        xtype : 'toolbar',
                        dock : 'top',
                        items : [{}]
                    }] 
//保存方法
save : function(store, modelType, archiveTypeLevel) {
                var modified = store.getModifiedRecords();
                // 将数据放到另外一个数组中
                var jsonArray = [];
                Ext.each(modified, function(m) {
                            // alert(m.data.IS_COLUMN);//读取当前被修改的是否列表
                            // m.data中保存的是当前Recored的所有字段的值json，不包含结构信息
                            jsonArray.push(m.data);
                        });
                if (jsonArray.length == 0) {
                    Ext.Msg.alert('提示', '未检测到任意修改项，请检查配置信息！')
                    return;
                }
                Ext.Ajax.request({
                            method : "post",// 最好不要用get请求
                            url : "saveButton_ButtonCustom.action",
                            params : {
                                data : Ext.util.JSON.encode(jsonArray),
                                modelType : modelType,
                                archiveTypeLevel : archiveTypeLevel
                            },
                            success : function(response, config) {
                                var json = Ext.util.JSON.decode(response.responseText);
                                if (json.success) {
                                    QR.Util.showSuccessToast("修改成功");
                                } else {
                                    QR.Util.showErrorToast("修改失败");
                                }
                                store.reload();
                            }
                        });
            },
```
- `initComponent : function() {this.callParent(arguments);}`
    + `listeners :{}`
- `query`查询器：`var nd = grid.query("numberfield[name='nd']")[0].getValue();`
- QR的`Window`
``` js
QR.Util.showSuccessToast("装盒成功!");
QR.Util.showErrorToast('装盒失败！请联系管理员');
QR.Util.submitFailure;
Ext.MessageBox.alert('提示', '你点了重置按钮!');
Ext.MessageBox.prompt('提示', '你点了重置按钮!');
Ext.Msg.alert('提示', '保存失败!');
Ext.Msg.confirm("提示", "确定完全删除选中卷？", function(btn) {
  if (btn == 'yes') {
    Ext.Ajax.request({
      url : 'delArchiveIdentifyById_ArchiveCommAction.action',
      params : {},
      success : function(response) {}
    });
  }
});
```
- `reader`翻译数据，使其被加载为 Model 实例或Store。
    + `type`包含的数据项与Reader配置的Model(s)中的相符合的属性名称
``` js
getGridJsonStore : function(url, fields, id) {
                return new Ext.data.JsonStore({
                            autoLoad : false,
                            id : id + "store",
                            pageSize : 20,
                            remoteSort : true,
                            proxy : {
                                type : 'ajax',
                                url : url,
                                reader : {
                                    // type : 'json',
                                    totalProperty : 'totalCount', // 数据条数
                                    root : 'content'
                                }
                            },
                            fields : fields
                        });
            },
```
- `ajax`覆盖原有的params值，然后load。
``` js
Ext.Ajax.request({
    url : 'findArchiveById_ArchiveCommAction.action',
    params : {
        type : grid.archiveTypeLevel
    },
    success : function(response) {
        var menu = Ext.decode(response.responseText);
        formPanel.down('form').getForm().setValues(QR.Util.convertBean(menu, 'map'));
        docPanel.enable();
        docPanel.UpLoadGrid.getStore().proxy.extraParams = {
            type : grid.archiveTypeLevel
        };
        docPanel.UpLoadGrid.getStore().load();
    }
});
```
- form提交
``` js
formPanel.down('form').getForm().submit({
    params : {
        type : type
    },
    success : function(form, action) {
        var resultId = action.result.json;
        formPanel.down('form').getForm().findField('map.id').setValue(resultId);
        grid.getStore().reload();
    },
    failure : function() {
        QR.Util.submitFailure;
    }
});
```
- 组件删除时的：先隐藏在禁用。(不必先`docPanel.enalbe()`)
``` js
Ext.Msg.confirm("提示", "确定保存数据？", function(btn) {
    if (btn == 'yes') {
        docPanel.hide();
        docPanel.disable();
    }
});
```
- `console.log`,`console.error`
- `eavl(html)`:js中将`String`的变量变成可运行的代码。
  eval()能运行任何的js脚本，所以解析json数据时不建议使用，有安全问题。
  eval()解析`json：eval("("+jsonString+")")`。
- `columns`中可以获得除本身字段外的列表中一整行数据
``` js
columns : [{
            header: '密码',
            dataIndex: 'password',
            xtype : "hiddenfield",//在列表中不显示，在配置列时也不会出现该项
            hidden: true
        }, {
            header : '借阅状态',
            dataIndex : "status",
            sortable : true,
            width : "15%",
            align : 'center',
            stripeRows : true,
            enableDragDrop : true,
            renderer : function(value, record, attributes) {
                var dt = new Date(attributes.data.keepDate);
                var dt2 = Ext.Date.add(dt, Ext.Date.DAY, attributes.data.keepDay);
                var str = Ext.Date.between(dt2, dt, new Date());
                if (value == '1') {
                    value = '<font color=blue>已归还</font>'
                }
                return value;
            }
        }]
```
- 右键菜单
``` js
'itemcontextmenu' : function(view, record, item, index, event, eOpts) {
    var rightClick = Ext.create('Ext.menu.Menu', {
        width: 10,
        plain: true,
        autoShow: true,
        renderTo: Ext.getBody(),
        items: [{
            text: '新增',
            scope : this,
            handler : function() {
                // to do ...
            }
        }]
    });
    rightClick.showAt(event.getXY());//设定菜单的显示位置
    event.preventDefault();//阻止浏览器的右键菜单
}
```
- `items`中`store`追加一两个数据
``` js
name : "bean.archiveTypeId",
xtype : "combo",
fieldLabel : "档案类型名称",
store : QR.Store.ArchiveTypeStore,
listeners : {
    beforerender : function() {
        this.store.add({ archiveTypeId: '0', name: '空节点'});
    }
},
```
- 重新加载当前的`store`。
    `items.getStore().reload();`
    + 在`initComponent`方法中，将创建的`var items = [],`中的`items`赋值给创建`grid`的`items`
    + 在外部方法，将items作为参数传给方法。
    + 在外部方法，`_this.down("westPanel").getStore().reload();`
- 列表，列表的某行被点击时触发事件。
``` js
_this.westPanel.on("itemclick", function(view, record, item, index, event, eOpts) {
    var pid  = record.get("id");
    var fondsOrg = record.get("fondsOrg");
});
```
- 解析后台传过来的`json`字符串。
``` js
var entityBorrow = Ext.decode(response.responseText);
entityBorrow = QR.Util.convertBean(entityBorrow);
_this.getForm().setValues(entityBorrow);
```
- **extend**:`grid`和`panel`，`form`的区别。
- 常量（用来根据屏幕分辨率不同做自适应）
    QR.Config.centerHeight
    QR.Config.centerWidth
- Store加载后再去执行函数：`store.on('load', function() {})` //避免数据还没有加载完就使用store
- URL查询时，添加传递参数而不重新定义。
    `this.getStore().getProxy().extraParams['className'] = className;`
- 获取一组单选框的值<kbd>RadioGroup</kbd>
``` js
var form = _this.down('form').getForm();
var value = form.findField("status").getGroupValue();//获得被选中的值（inputValue）
```
- 根据RawValue去设置Value
``` js
index = store.find("archiveTitle", newfname[0]);
str = store.getAt(index).get('archiveField');
```
- 获取字段的对象，然后设置value
    `_this.getForm().findField("bean.select"+i).select(str);`

### formpanel
```js
// 密码输入框
defaults : {
    labelAlign : 'right',
    msgTarget : 'side',
    xtype : 'textfield',
    inputType : 'password',
    allowBlank : false
},
// 自定义样式
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
items: [{
        xtype: 'textfield',
        id: 'nameText',
        name: 'nameText',
        fieldLabel: '用户名',
        allowBlank: false,
        tooltip: '请输入您的用户名',
        afterLabelTextTpl: required,
        blankText: '请输入您的用户名',
    }]

// 定义函数: 验证再次输入的密码是否一致
Ext.apply(Ext.form.VTypes, {
    confirmPwd: function (value, field) {
     // field 的 confirmPwd 属性
        if (field.confirmPwd) {
            var first = field.confirmPwd.first;
            var second = field.confirmPwd.second;

            this.firstField = Ext.getCmp('loginPassword');
            this.seconField = Ext.getCmp('rePassword');
            var firstPwd = this.firstField.getValue();
            var secondPwd = this.seconField.getValue();
            if (firstPwd == secondPwd) {
                return true;
            } else {
                return false;
            }
        }
    },
    confirmPwdText:'两次输入的密码不一致！',
});
```

[1]: https://www.cnblogs.com/wisdo/p/4896207.html 'EXTJS 密码确认与验证'