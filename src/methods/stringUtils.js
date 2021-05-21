/**
 * 字符串工具类
 */
const /**
   * 描述：金额格式化显示，如：6123432.24 -> 6,123,432.24
   *
   * @param money: 金额
   * @param num: 保留的小数位
   */
  moneyFormat = (money, num) => {
    // 去掉字符串中除数字、点号、负号外的其他字符
    money = cusParseFloat((money + "").replace(/[^\d.-]/g, ""));
    if (num || num === 0) {
      money = money.toFixed(num);
    }
    else {
      money = money.toFixed(2);
    }
    let re = /^(-?\d+)(\d{3})(\.?\d*)/;
    
    while (re.test(money)) {
      money = money.replace(re, "$1,$2$3");
    }
    
    return money;
  },
  
  /**
   * 描述：还原金额格式，如：6,123,432.24 -> 6123432.24
   *
   * @param money: 待还原的金额字符串
   */
  restoreMoney = (money) => {
    if (money) {
      return parseFloat(money.replace(/[^\d.-]/g, ""));
    }
    return money;
  },
  
  
  /**
   * 描述：重写 javascript parseInt 方法
   *
   * @param str: 待转换的字符串，
   * @param dftVal: 如果str为空或者parseInt解析结果为NaN时 返回的默认值 ，不传默认返回0
   * @returns
   */
  cusParseInt = (str, dftVal) => {
    dftVal = dftVal || 0;
    let result = dftVal;
    if (str) {
      result = parseInt(str) || dftVal; // 使用十进制进行转换
    }
    return result;
  },
  
  /**
   * 描述：重写 javascript parseFloat 方法
   *
   * @param str: 待转换的字符串，
   * @param dftVal: 如果str为空或者parseFloat解析结果为NaN时 返回的默认值 ，不传默认返回0
   * @returns
   */
  cusParseFloat = (str, dftVal) => {
    dftVal = dftVal || 0;
    let result = dftVal;
    if (str) {
      result = parseFloat(str) || dftVal; // 使用十进制进行转换
    }
    return result;
  },
  
  /**
   * 描述： 数字大于一万时，以万为单位显示 如： 12345623 -> 1,234.56万
   * @param num: 数字字符串
   * @param dft: 字符串为空时默认显示值
   * @param isMillions: 是否展示成亿元(0：不展示；1：展示)
   */
  dealBigNumber = (num, dft, isMillions) => {
    if (num) {
      num = cusParseFloat(num);
      if (isMillions == "1") {
        num = (num / 100000000);
        num = cusParseFloat(num).toLocaleString();
      }
      else if (num >= 1000 && num < 10000) {
        num = cusParseFloat(num).toLocaleString();
      }
      else if (num >= 10000) {
        num = (num / 10000);
        num = cusParseFloat(num).toLocaleString();
        num = num + "万";
      }
      else {
        num = num.toLocaleString();
      }
    }
    else {
      num = dft || "--";
    }
    return num;
  },
  
  /**
   * 描述：去掉字符串所有空格
   * @param str: 字符串
   */
  trimAll = (str) => {
    if (str) {
      return str.replaceAll(" ", "");
    }
    return str;
  },
  
  /**
   * 数字转中文
   */
  chinaNum = (num) => {
    num = num + "";
    let china = [
      '零',
      '一',
      '二',
      '三',
      '四',
      '五',
      '六',
      '七',
      '八',
      '九'
    ];
    let arr = [];
    let english = num.split("");
    for (let i = 0; i < english.length; i++) {
      arr[i] = china[english[i]];
    }
    return arr.join("");
  },
  
  /**
   *    保留几位小数，不足补0
   */
  formatNumber = (value, num) => {
    let a, b, c, i;
    a = value.toString();
    b = a.indexOf(".");
    c = a.length;
    if (num === 0) {
      if (b !== -1) {
        a = a.substring(0, b);
      }
    }
    else {// 如果没有小数点
      if (b === -1) {
        a = a + ".";
        for (i = 1; i <= num; i++) {
          a = a + "0";
        }
      }
      else {// 有小数点，超出位数自动截取，否则补0
        a = a.substring(0, b + num + 1);
        for (i = c; i <= b + num; i++) {
          a = a + "0";
        }
      }
    }
    return a;
  },
  
  /*
   * 对变量进行空值处理，boolean、function、error、regexp除外
   * @param value 变量
   * @param defaultValue 默认值
   * */
  formatEmpty = (value, defaultValue) => {
    // 1、获得格式化的数据类型，boolean除外
    let valueType = null;
    switch (typeof (value)) {
      case "undefined":
      case "null":
      case "string":
        valueType = "string";
        break;
      case "number":
        valueType = "number";
        break;
      case "array":
        valueType = "array";
        break;
      case "date":
        valueType = "date";
        break;
      case "object":
        valueType = "object";
        break;
      default:
        valueType = "string";
        break;
    }
    // 2、根据数据类型校验，返回对应的空值数据
    if (!value && valueType === "string") {
      value = defaultValue || "";
    }
    else if (!value && valueType === "number") {
      value = defaultValue || 0;
    }
    else if (valueType === "array" && value.length === 0) {
      value = defaultValue || [];
    }
    else if (valueType === "date" && value == "Invalid Date") {
      value = defaultValue || new Date();
    }
    else if (valueType === "object" && value === {}) {
      value = defaultValue || {};
    }
    
    return value;
  },
  
  //通过url字符串获取json参数
  parseQueryString = (url) => {
    let reg_url = /^[^?]+([\w\W]+)$/, reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g, arr_url = reg_url.exec(url), ret = {};
    if (arr_url && arr_url[1]) {
      let str_para = arr_url[1], result;
      while ((result = reg_para.exec(str_para)) != null) {
        ret[result[1]] = result[2];
      }
    }
    return ret;
  },
  
  //根据json拼接URL参数
  parseQueryUrl = (param) => {
    let paramStr = "";
    if (param) {
      for (let key in param) {
        paramStr += (key + "=" + param[key] + "&");
      }
    }
    if (paramStr.length > 0) {
      paramStr = paramStr.substring(0, paramStr.length - 1);
    }
    return paramStr;
  },
  
  /**
   ** 除法函数，用来得到精确的除法结果
   ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
   ** 调用：accDiv(arg1,arg2)
   ** 返回值：arg1除以arg2的精确结果
   **/
  accDiv = (arg1, arg2) => {
    if (isNaN(arg1)) {
      arg1 = 0;
    }
    if (isNaN(arg2)) {
      arg2 = 0;
    }
    arg1 = Number(arg1);
    arg2 = Number(arg2);
    
    let t1 = 0, t2 = 0, r1, r2;
    try {
      t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
      console.log(e)
    }
    try {
      t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
      console.log(e)
    }
    /*JS严格模式下不支持with语句*/
    /*with (Math) {
     r1 = Number(arg1.toString().replace(".", ""));
     r2 = Number(arg2.toString().replace(".", ""));
     return (r1 / r2) * pow(10, t2 - t1);
     }*/
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
  },
  
  /**
   ** 乘法函数，用来得到精确的乘法结果
   ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
   ** 调用：accMul(arg1,arg2)
   ** 返回值：arg1乘以 arg2的精确结果
   **/
  accMul = (arg1, arg2) => {
    if (isNaN(arg1)) {
      arg1 = 0;
    }
    if (isNaN(arg2)) {
      arg2 = 0;
    }
    arg1 = Number(arg1);
    arg2 = Number(arg2);
    
    let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
    }
    catch (e) {
      console.log(e)
    }
    try {
      m += s2.split(".")[1].length;
    }
    catch (e) {
      console.log(e)
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  },
  
  /**
   * 描述：重写 javascript parseFloat 方法
   *
   * @param str: 待转换的字符串，
   * @param dftVal: 如果str为空或者parseFloat解析结果为NaN时 返回的默认值 ，不传默认返回0
   * @param num: 保留几位小数 不传默认保留2位
   * @param actNum: 结果需要乘以的数字
   * @param endStr: 结尾需要拼接的字符串
   * @returns
   */
  parseFloatFormat = (str, dftVal, num, actNum, endStr) => {
    dftVal = dftVal || 0;
    num = num || 2;
    let result = dftVal;
    if (str || str == "0") {
      result = parseFloat(str); // 使用十进制进行转换
      if (!isNaN(result)) {
        if (!isNaN(actNum)) {
          result = (result * actNum).toFixed(num);
        }
        else {
          result = result.toFixed(num);
        }
        if (endStr && endStr.length > 0) {
          result = result + endStr;
        }
      }
      else {
        result = dftVal;
      }
    }
    return result;
  },
  
  /** 将text中的html字符转义， 仅转义  ', ", <, > 四个字符
   * @param  { String } str 需要转义的字符串
   * @returns { String }     转义后的字符串
   */
  unspcHtml = (str) => {
    return str ? str.replace(/[<">'%]/g, function (a) {
      return {
        '%': '%25',
        '<': '&lt;',
        '"': '&quot;',
        '>': '&gt;',
        "'": '&#39;'
      }[a];
    }) : '';
  },
  
  //根据是否等于某个值来得到单位
  unitHtml = (val, dftVal, unit) => {
    let str = "";
    if (val != dftVal) {
      str = unit;
    }
    return str;
  },
  
  //截取字符串返回数值型
  indexOfNumberValue = (strNumber, unit) => {
    strNumber = strNumber || 0;
    unit = unit || "%";
    if (strNumber) {
      if (strNumber.indexOf(unit)) {
        let index = strNumber.lastIndexOf(unit);
        strNumber = strNumber.substring(0, index);
        strNumber = parseFloat(strNumber);
        if (isNaN(strNumber)) {
          strNumber = 0;
        }
      }
    }
    return strNumber;
  },
  
  /**
   * 比较2个版本号的大小
   * addby chenyue 20180709
   */
  versionfunegt = (curV, reqV) => {
    let arr1 = curV.split('.');
    let arr2 = reqV.split('.');
    //将两个版本号拆成数字
    let minL = Math.min(arr1.length, arr2.length);
    let pos = 0;        //当前比较位
    let diff = 0;        //当前为位比较是否相等
    //逐个比较如果当前位相等则继续比较下一位
    while (pos < minL) {
      diff = parseInt(arr1[pos]) - parseInt(arr2[pos]);
      if (diff != 0) {
        break;
      }
      pos++;
    }
    if (diff > 0) {
      return true;
    }
    else {
      return false;
    }
  }, //字符串去掉去掉html标签
  formatHtmltoString = (str) => {
    let dd = str.replace(/<\/?.+?>/g, "");
    let dds = dd.replace(/ /g, "");//dds为得到后的内容
    return dds;
  }, //不规范的字符串转换JSON
  stringTojsonArray = (str) => {
    if (str) {
      str = str.replace(/=/g, ":'").replace(/}, /g, "'},").replace(/}]/g, "'}]").replace(/, /g, "',").replace(/\n/g, "")
        .replace(/\r/g, "");
      str = eval("(" + str + ")")
    }
    return str;
  }, //不规范的字符串转换JSON
  stringTojsonObject = (str) => {
    let jsonData = {}
    if (str) {
      str = str.replace("{", "").replace("}", "");
      str = str.split(',')
      for (let i = 0; i < str.length; i++) {
        jsonData[(str[i].split('=')[0]).replace(/\s+/g, "")] = (str[i].split('=')[1]).replace(/\s+/g, "")
      }
    }
    return jsonData;
  }, //不规范的字符串转换JSON数组
  stringToArray = (str) => {
    let strArray = [];
    if (str) {
      str = str.replace(/\[/g, "").replace(/]/g, "");
      strArray = str.split(",")
    }
    return strArray;
  }

const stringUtilEs = {
  moneyFormat: moneyFormat, // 金额格式化显示，并保留几位小数，如：6123432.24 -> 6,123,432.24
  restoreMoney: restoreMoney, // 还原金额格式，如：6,123,432.24 -> 6123432.24
  parseInt: cusParseInt, // 重写parseInt 方法
  parseFloat: cusParseFloat, // 重写parseFloat 方法
  parseFloatFormat: parseFloatFormat, // 重写parseFloat 方法（增加保留几位小数）
  trimAll: trimAll, // 去掉字符串所有空格
  dealBigNumber: dealBigNumber, // 数字大于一万时，以万为单位显示 如： 12345623 -> 1,234.562万
  chinaNum: chinaNum,// 数字转中文
  formatNumber: formatNumber,//保留几位小数
  parseQueryString: parseQueryString,//通过url字符串获取json参数
  parseQueryUrl: parseQueryUrl,//根据json拼接URL参数
  formatEmpty: formatEmpty,//对变量进行空值处理
  accDiv: accDiv,//除法函数
  accMul: accMul,//乘法函数
  unspcHtml: unspcHtml,//将text中的html字符转义
  unitHtml: unitHtml,//根据是否等于某个值来得到单位
  indexOfNumberValue: indexOfNumberValue,//截取字符串返回数值型
  versionfunegt: versionfunegt,//比较2个版本号的大小
  formatHtmltoString: formatHtmltoString,//字符串去掉去掉html标签
  stringTojsonArray: stringTojsonArray,//不规范的字符串转换JSON数组
  stringTojsonObject: stringTojsonObject,//不规范的字符串转换JSON对象
  stringToArray: stringToArray,//不规范的字符串转换JSON数组
}

export default stringUtilEs;
