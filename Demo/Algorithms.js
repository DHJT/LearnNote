

/**
 * Merge Sort 归并排序
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
function mergeSort(array) {

    function sort(array, first, last) {
        first = (first === undefined) ? 0 : first
        last = (last === undefined) ? array.length - 1 : last
        if (last - first < 1) {
            return;
        }
        var middle = Math.floor((first + last) / 2);
        sort(array, first, middle);
        sort(array, middle + 1, last);

        var f = first,
            m = middle,
            i,
            temp;

        while (f <= m && m + 1 <= last) {
            if (array[f] >= array[m + 1]) { // 这里使用了插入排序的思想
                temp = array[m + 1];
                for (i = m; i >= f; i--) {
                    array[i + 1] = array[i];
                }
                array[f] = temp;
                m++
            } else {
                f++
            }
        }
        return array;
    }
    return sort(array);
}

/*
* @array 将要排序的数组
*
* @step 划分桶的步长，比如 step = 5，表示每个桶存放的数字的范围是 5，像 -4~1、0~5、6~11
*/
function bucketSort(array, step) {
    var result = [],
        bucket = [],
        bucketCount,
        l = array.length,
        i,
        j,
        k,
        s,
        max = array[0],
        min = array[0],
        temp;

    for (i = 1; i < l; i++) {
        if (array[i] > max) {
            max = array[i]
        }
        if (array[i] < min) {
            min = array[i];
        }
    }
    min = min - 1;

    bucketCount = Math.ceil((max - min) / step); // 需要桶的数量

    for (i = 0; i < l; i++) {
        temp = array[i];
        for (j = 0; j < bucketCount; j++) {
            if (temp > (min + step * j) && temp <= (min + step * (j + 1))) { // 判断放入哪个桶
                if (!bucket[j]) {
                    bucket[j] = [];
                }
                // 通过插入排序将数字插入到桶中的合适位置
                s = bucket[j].length;
                if (s > 0) {
                    for (k = s - 1; k >= 0; k--) {
                        if (bucket[j][k] > temp) {
                            bucket[j][k + 1] = bucket[j][k];
                        } else {
                            break;
                        }
                    }
                    bucket[j][k + 1] = temp;
                } else {
                    bucket[j].push(temp);
                }
            }
        }
    }
    for (i = 0; i < bucketCount; i++) { // 循环取出桶中数据
        if (bucket[i]) {
            k = bucket[i].length;
            for (j = 0; j < k; j++) {
                result.push(bucket[i][j]);
            }
        }
    }
    return result;
}

/**
 * 选择排序（Selection Sort）
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
function selectionSort(array) {
  var length = array.length,
      i,
      j,
      minIndex,
      minValue,
      temp;
  for (i = 0; i < length - 1; i++) {
    minIndex = i;
    minValue = array[minIndex];
    for (j = i + 1; j < length; j++) {
      if (array[j] < minValue) {
        minIndex = j;
        minValue = array[minIndex];
      }
    }

    // 交换位置
    temp = array[i];
    array[i] = minValue;
    array[minIndex] = temp;
  }
  return array
}

/**
 * shellSort 希尔排序
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
function shellSort(array) {
    function swap(array, i, k) {
        var temp = array[i];
        array[i] = array[k];
        array[k] = temp;
    }

    var length = array.length,
        gap = Math.floor(length / 2);
    while (gap > 0) {
        for (var i = gap; i < length; i++) {
            for (var j = i; 0 < j; j -= gap) {
                if (array[j - gap] > array[j]) {
                    swap(array, j - gap, j);
                } else {
                    break;
                }
            }
        }
        gap = Math.floor(gap / 2);
    }
    return array;
}

var array = [80, 93, 0, 12, 42, 30, 68, 85, 10];
// console.error(shellSort(array));
// console.error(mergeSort(array));
// console.error(bucketSort(array, 5));
console.error(selectionSort(array));

var day1 = new Date("2017-09-17");
var day2 = new Date("2017-10-18");
console.log((day2 - day1) / (1000 * 60 * 60 * 24));

// json字符串处理
var data = "{root:[{name:'1',value:'0'},{name:'6101',value:'北京市'},{name:'6102',vlue:'上海市'}]}";

var dataObj = eval("(" + data + ")");
var dataObj1 = (new Function("", "return " + data))();
console.info(dataObj.root);
console.info(dataObj.root);
console.info(data.root);

// replace方法使用
var str ="<font color='red'>关于</font><font color='red'>物</font><font color='red'>联网中心</font><font color='red'>新招聘</font><font color='red'>产品</font><font color='red'>研发</font><font color='red'>人员工资</font><font color='red'>调整</font><font color='red'>的</font><font color='red'>请示</font>";
str = str.replace(new RegExp("<font color='red'>", "gm"), "");
str = str.replace(new RegExp("</font>", "gm"), "");
console.log(str);