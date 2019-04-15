/**
 * @author slh 2017-12-12
 * @description 测试js
 * 使用js匿名函数进行各种的严格模式下的代码测试
 */
(function () {
    "use strict";
    // 测试js的闭包
    // for (let i = 0; i < 5; i++) {
    //     setTimeout(function() {
    //         console.log(i);
    //     }, 1000*i);
    // }

    // for (let i = 0; i < 5; i++) {
    //     (function(i) {
    //         setTimeout(function() {
    //             console.log(i);
    //         }, 1000*i);
    //     })(i);
    // }

    try {
        let person = prompt("请输入你的名字", "Harry Potter");
        if (person!=null && person!="") {
            let x = "你好 " + person + "! 今天感觉如何?";
            console.log(document.getElementById("demo"));
            // document.getElementById("demo").innerHTML = x;
        }
    } catch(err) {
        //在这里处理错误
        console.log(err);
    }
})();