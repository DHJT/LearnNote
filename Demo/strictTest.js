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
})();