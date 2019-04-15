require.config({
    baseUrl: './resource/app',
    paths: {
        'hd': 'hd',
        'css': '../lib/css.min',
        'jquery': '../lib/jquery.min',
        'angular': '../lib/angular.min',
        'bootstrap': '../lib/bootstrap.min',
        'toastr': '../lib/toastr/toastr.min',
        'md5': '../plugins/jQuery.md5',
        'message1': '../lib/toastr/message',
        'easyui': '../lib/jqueryeasyui/jquery.easyui.min',
        'easyui-lang-zh_CN': '../lib/jqueryeasyui/locale/easyui-lang-zh_CN',
        'pdf' : '../lib/PDF/viewer'
    },
    shim: {
        'hd': {
            // exports: 'modal',
            init: function () {
                return {
                    modal: modal,
                    success: success,
                }
            }
        },
        'message1': {
            // exports: 'modal',
            init: function () {
                return {
                    showSuccessToast: showSuccessToast,
                    showErrorToast: showErrorToast
                }
            },
            'deps': ['toastr']
        },
        //houdunren.com
        'bootstrap': {
            'deps': ['jquery', 'css!../css/bootstrap.min.css', 'css!../css/font-awesome.min.css']
        },
        'md5': {
            'deps': ['jquery']
        },
        'easyui': {
            'deps': ['jquery', 'easyui-lang-zh_CN', 'css!../lib/jqueryeasyui/themes/default/easyui.css', 'css!../lib/jqueryeasyui/themes/icon.css']
        },
        'toastr': {
            'deps': ['jquery', 'css!../lib/toastr/toastr.min.css']
        },
        'pdf': {
            'deps': ['jquery', 'css!../lib/PDF/viewer.css', '../lib/PDF/pdf.js', '../lib/PDF/pdf.worker.js']
        }
    }
});
// require(['jquery', 'angular'], function ($, angular) {
//     $('body').css({'backgroundColor': 'red'});
// })