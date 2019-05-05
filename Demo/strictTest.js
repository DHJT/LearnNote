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

    /**
     * 使用Promise来发送请求
     * [url description]
     * @type {String}
     */
    var url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';

    // 封装一个get请求的方法
    function getJSON(url) {
        return new Promise(function(resolve, reject) {
            var XHR = new XMLHttpRequest();
            XHR.open('GET', url, true);
            XHR.send();

            XHR.onreadystatechange = function() {
                if (XHR.readyState == 4) {
                    if (XHR.status == 200) {
                        try {
                            var response = JSON.parse(XHR.responseText);
                            resolve(response);
                        } catch (e) {
                            reject(e);
                        }
                    } else {
                        reject(new Error(XHR.statusText));
                    }
                }
            }
        })
    }

    getJSON(url).then(resp => console.log(resp));
    var url1 = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-03-26/2017-06-10';

    function renderAll() {
        return Promise.all([getJSON(url), getJSON(url1)]);
    }

    renderAll().then(function(value) {
        // 建议大家在浏览器中看看这里的value值
        console.log(value);
    })

    function renderRace() {
        return Promise.race([getJSON(url), getJSON(url1)]);
    }

    renderRace().then(function(value) {
        console.log(value);
    })
})();