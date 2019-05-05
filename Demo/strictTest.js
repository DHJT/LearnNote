/**
 * @author slh 2017-12-12
 * @description ����js
 * ʹ��js�����������и��ֵ��ϸ�ģʽ�µĴ������
 */
(function () {
    "use strict";
    // ����js�ıհ�
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
        let person = prompt("�������������", "Harry Potter");
        if (person!=null && person!="") {
            let x = "��� " + person + "! ����о����?";
            console.log(document.getElementById("demo"));
            // document.getElementById("demo").innerHTML = x;
        }
    } catch(err) {
        //�����ﴦ�����
        console.log(err);
    }

    /**
     * ʹ��Promise����������
     * [url description]
     * @type {String}
     */
    var url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';

    // ��װһ��get����ķ���
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
        // ��������������п��������valueֵ
        console.log(value);
    })

    function renderRace() {
        return Promise.race([getJSON(url), getJSON(url1)]);
    }

    renderRace().then(function(value) {
        console.log(value);
    })
})();