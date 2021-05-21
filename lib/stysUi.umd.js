(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["stysUi"] = factory();
	else
		root["stysUi"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "5b58":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (stringUtilEs);


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "cd22":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6ecd46e5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/counterUpper/counterUpper.vue?vue&type=template&id=5d260c67&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',[_vm._v(_vm._s(_vm.moneyAmount))])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/counterUpper/counterUpper.vue?vue&type=template&id=5d260c67&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/counterUpper/counterUpper.vue?vue&type=script&lang=js&
//
//
//
//


/* harmony default export */ var counterUppervue_type_script_lang_js_ = ({
  name:"counterUpper",
  data() {
    return {
      timer: null,
      moneyAmount: '0.00'
    }
  },
  props: {
    amount: {
      // default: '0'
    },
    time: { // 总时长
      type: Number,
      default: 500
    },
    delay: { // 刷新时间
      type: Number,
      default: 10
    }
  },
  created() {

  },
  mounted() {
    this.moneyAmount = this.amount;
  },
  watch: {
    amount(val) {
      if(this.timer) {
        clearInterval(this.timer);
      }
      if(val === '' || isNaN(val.replace(/[,]/g, ''))) {
        this.moneyAmount = val;
      } else {
        if(parseFloat(val.replace(/[,]/g, '')) != 0) {
          this.counterUpper();
        } else {
          this.moneyAmount = val;
        }
      }
    }
  },
  methods: {
     counterUpper() {
       let money = this.amount;
       let symbol = '';
       if(typeof(money) == 'number') {
         money = money.toString();
       }
       if(money.substr(0, 1) == '+') {
         money = money.substring(1);
         symbol = '+';
       } else if(money.substr(0, 1) == '-') {
         money = money.substring(1);
         symbol = '-';
       }
       let time = this.time;
       let delay = this.delay;
       let divisions = time / delay;
       let num = money || 0;
       let nums = [num];
       let isComma = /[0-9]+,[0-9]+/.test(num);
       num = num.replace(/,/g, '');
       if(isNaN(num) || !num.replace(/\s/g, '')) {
         this.moneyAmount = this.amount;
         return;
       }
       let isFloat = /^[0-9]+\.[0-9]+$/.test(num);
       let decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;
       for (let i = divisions; i >= 1; i--) {
           // 默认其为整数
           var newNum = parseInt(Math.round(num / divisions * i));
           // 判断是否为浮点数
           if (isFloat) {
               newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
           }
           // 判断其是否为带逗号的金额格式
           if (isComma) {
               while (/(\d+)(\d{3})/.test(newNum.toString())) {
                   newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
               }
           }
           nums.unshift(newNum);
       }
       this.timer = setInterval(() => {
         let newVal = nums.shift();
         if(isNaN(newVal.replace(/[,]/g, '')) || newVal === '') {
           this.moneyAmount = this.amount;
         } else {
           this.moneyAmount = symbol + newVal;
         }

         if(!nums.length) {
           clearInterval(this.timer);
         }
       }, delay)
       this.$once('hook:beforeDestroy', () => {        
        clearInterval(this.timer);                                    
      })
     },
  },
});

// CONCATENATED MODULE: ./src/components/counterUpper/counterUpper.vue?vue&type=script&lang=js&
 /* harmony default export */ var counterUpper_counterUppervue_type_script_lang_js_ = (counterUppervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/counterUpper/counterUpper.vue





/* normalize component */

var component = normalizeComponent(
  counterUpper_counterUppervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var counterUpper = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6ecd46e5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/keyboard/keyboardInput.vue?vue&type=template&id=f61a336e&
var keyboardInputvue_type_template_id_f61a336e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"keyboardInput"},[_c('div',{ref:"topInput",staticClass:"input-box",on:{"click":function($event){$event.stopPropagation();return _vm.focus($event)}}},[_c('div',{staticClass:"content"},[_c('p',{staticClass:"input"},[_vm._v(_vm._s(_vm.val))]),_c('p',{directives:[{name:"show",rawName:"v-show",value:(_vm.val.length === 0),expression:"val.length === 0"}],staticClass:"placeholder"},[_vm._v(" "+_vm._s(_vm.placeholder)+" ")]),_c('p',{staticClass:"cursor",style:({visibility: _vm.cursor ? 'visible' : 'hidden'})})])]),_c('keyboard',{attrs:{"show":_vm.keyboard,"animated":_vm.animated},on:{"typing":_vm.typing,"complete":_vm.blur}})],1)}
var keyboardInputvue_type_template_id_f61a336e_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/keyboard/keyboardInput.vue?vue&type=template&id=f61a336e&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6ecd46e5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/keyboard/keyboard.vue?vue&type=template&id=13d5ec7a&
var keyboardvue_type_template_id_13d5ec7a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"slide"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"keyboard",class:_vm.animated,on:{"click":function($event){$event.stopPropagation();return _vm.fn($event)}}},[_c('div',{staticClass:"done"},[_c('p',{staticClass:"text",on:{"click":function($event){$event.stopPropagation();return _vm.complete($event)}}},[_vm._v("完成")])]),_c('div',{staticClass:"list"},[_c('div',{staticClass:"key",on:{"click":function($event){$event.stopPropagation();return _vm.typing('1')}}},[_vm._v("1")]),_c('div',{staticClass:"key",on:{"click":function($event){$event.stopPropagation();return _vm.typing('2')}}},[_vm._v("2")]),_c('div',{staticClass:"key",on:{"click":function($event){$event.stopPropagation();return _vm.typing('3')}}},[_vm._v("3")]),_c('div',{staticClass:"key",on:{"click":function($event){$event.stopPropagation();return _vm.typing('4')}}},[_vm._v("4")]),_c('div',{staticClass:"key",on:{"click":function($event){$event.stopPropagation();return _vm.typing('5')}}},[_vm._v("5")]),_c('div',{staticClass:"key",on:{"click":function($event){$event.stopPropagation();return _vm.typing('6')}}},[_vm._v("6")]),_c('div',{staticClass:"key",on:{"click":function($event){$event.stopPropagation();return _vm.typing('7')}}},[_vm._v("7")]),_c('div',{staticClass:"key",on:{"click":function($event){$event.stopPropagation();return _vm.typing('8')}}},[_vm._v("8")]),_c('div',{staticClass:"key",on:{"click":function($event){$event.stopPropagation();return _vm.typing('9')}}},[_vm._v("9")]),_c('div',{staticClass:"key dot",on:{"click":function($event){$event.stopPropagation();return _vm.typing('.')}}},[_c('i',{staticClass:"iconfont icon-dot"})]),_c('div',{staticClass:"key",on:{"click":function($event){$event.stopPropagation();return _vm.typing('0')}}},[_vm._v("0 ")]),_c('div',{staticClass:"key",on:{"click":function($event){$event.stopPropagation();return _vm.typing('')}}},[_c('i',{staticClass:"iconfont icon-keyboard-delete del"})])])])])}
var keyboardvue_type_template_id_13d5ec7a_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/keyboard/keyboard.vue?vue&type=template&id=13d5ec7a&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/keyboard/keyboard.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var keyboardvue_type_script_lang_js_ = ({
  name: "keyboard",
  props: {
    show: {
      default: false
    },
    animated: {
      default: "animated"
    },
  },
  methods: {
    /*防止点击完成按钮左边的空白区域收起键盘*/
    fn() {
    }, /*输入*/
    typing(val) {
      this.$emit('typing', val);
    }, /*点击完成*/
    complete() {
      this.$emit('complete');
    }
  }
});

// CONCATENATED MODULE: ./src/components/keyboard/keyboard.vue?vue&type=script&lang=js&
 /* harmony default export */ var keyboard_keyboardvue_type_script_lang_js_ = (keyboardvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/keyboard/keyboard.vue





/* normalize component */

var keyboard_component = normalizeComponent(
  keyboard_keyboardvue_type_script_lang_js_,
  keyboardvue_type_template_id_13d5ec7a_render,
  keyboardvue_type_template_id_13d5ec7a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var keyboard = (keyboard_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/keyboard/keyboardInput.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var keyboardInputvue_type_script_lang_js_ = ({
  name: 'KeyboardInput',
  components: {
    keyboard: keyboard
  },
  created() {
    this.val = this.value;//初始化输入框的值
  },
  props: {
    value: {
      default: ""
    },
    editValue: {
      default: ""
    },
    animated: {
      default: "animated"
    },
    isNeedMt: {
      default: true
    },
    inter: {
      default: 5
    },
    decimal: {
      default: 2
    },
    placeholder: {
      default: ''
    },
    isPwd: {
      default: false
    },
    isOnlyNum: {
      default: false
    }
  },
  data() {
    return {
      cursor: false,
      keyboard: false, /*value 在组件中的值*/
      val: '',
      pwdVal: '',
      aIllegal: [
        '00',
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '0..',
        '.'
      ],
      cursorDuration: 600,
      bodyHeight: '',
      bodyOverflow: ''
    }
  },
  watch: {
    editValue: function (value) {
      this.val = value;
      this.$emit('input', this.val);
    },
  },
  mounted() {
    document.addEventListener('click', this.blur, false);
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener("click", this.blur, false);
    })
  },
  methods: {
    /**
     * 初始化清空输入框
     */
    initInput() {
      let childLength = this.$parent.$children.length;
      for (let i = 0; i < childLength; i++) {
        if (this.$parent.$children[i].$el.className == 'keyboard') {
          this.$parent.$children[i].val = "";
          this.$parent.$children[i].pwdVal = "";
        }
      }
    }, /*focus*/
    focus() {
      if (this.isNeedMt) {
        this.keyBoardPageScroll();
      }
      this.initKeyBoard();
      /*显示键盘*/
      this.showKeyboard();
      /*显示光标*/
      this.showCursor();
      /*闪烁光标*/
      this.blinkCursor();
      this.openOrColseKey(true);
    }, //点击初始化（解决多个输入框时光标和键盘同时存在的问题）
    initKeyBoard() {
      let childLength = this.$parent.$children.length;
      for (let i = 0; i < childLength; i++) {
        if (this.$parent.$children[i].$el.className == 'keyboard') {
          this.$parent.$children[i].keyboard = false
          this.$parent.$children[i].cursor = false
          clearInterval(this.$parent.$children[i].intervalID);
        }
      }
    },
    blinkCursor() {
      clearInterval(this.intervalID);
      this.intervalID = setInterval(() => {
        this.cursor = !this.cursor;
      }, this.cursorDuration);
    },
    unblinkCursor() {
      clearInterval(this.intervalID);
    }, //处理一些输入框过低时键盘挡住输入框的情况。
    keyBoardPageScroll() {
      let topH = this.$refs.topInput.offsetHeight;//元素的高度
      let heightStyle = this.$refs.topInput.getBoundingClientRect().top; //距离顶部高度
      let h = document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度
      let d = h - topH - heightStyle;
      let $article = document.getElementById("app")
      if ($article) {
        let scrollTop = $article.scrollTop;//获取滚动条距离顶部的高度
        if (d < 250) {
          setTimeout(() => {
            $article.setAttribute("style", "margin-top:-" + (250 + scrollTop - d) + 'px');
          }, 200);
        }
      }

    }, /*blur*/
    blur() {
      if (this.isNeedMt) {
        let $article = document.getElementById("app")
        if ($article) {
          if ($article.offsetTop !== 0) {
            $article.setAttribute("style", "margin-top:0");
          }
        }
      }
      /*隐藏光标*/
      this.hideCursor();
      /*停止光标闪烁*/
      this.unblinkCursor();

      /*隐藏键盘*/
      this.hideKeyboard();
      /*
       附加 00, 如果用户输入了一个以 . 结尾的值就点完成了,
       那么这个时候就在后面加上00
       */
      this.toCompletion();
      /*通知父组件, 老子值出来了*/
      /*
       校验用户输入的金额是不是为 0, 如果是的话, 直接重置
       */
      this.checkValue();

      this.notify();
      this.openOrColseKey(false);
    },
    openOrColseKey(bool) {
      this.$emit('isOpenShow', bool);
    },
    showKeyboard() {
      this.keyboard = true;
    },
    hideKeyboard() {
      this.keyboard = false;
    },
    showCursor() {
      this.cursor = true;
    },
    hideCursor() {
      this.cursor = false;
    },
    checkValue() {
      if (!this.isPwd && parseFloat(this.val) === 0) {
        this.val = '';
      }
    }, /*判读是否需要加0*/
    toCompletion() {
      //需要输入密码就不需要加0
      if (this.isPwd || this.decimal <= 0) {
        return;
      }
      if (this.val && this.val.length > 0) {
        let list = this.val.split('.');
        if (typeof list[1] === 'undefined') {
          if (this.val !== '') {
            this.val = this.val + '.';
            this.completion(this.decimal);
          }
        }
        else {
          if (list[1].length < this.decimal) {
            this.completion(this.decimal - list[1].length);
          }
        }
      }
    },
    completion(len) {
      let v = '';
      for (let i = 0; i < len; i++) {
        v = v + '0';
      }
      this.val = this.val + v;
    },
    notify() {
      if (this.isPwd) {
        this.$emit('input', this.pwdVal);
      }
      else {
        this.$emit('input', this.val);
      }
    },
    del() {
      /*删除值并不会触发值的校验, 所以需要手动再触发一次*/
      this.val = this.val.slice(0, -1);
      if (this.isPwd) {
        this.pwdVal = this.pwdVal.slice(0, -1);
      }
      this.notify();
    }, /*输入*/
    typing(value) {
      /*如果是点击删除*/
      if (value === '') {
        this.del();
      }
      let oldValue = '';
      /*保存旧的值*/
      if (this.isPwd) {
        oldValue = this.pwdVal;
        /***判断密码长度***/
        if (this.accuracy(this.val)) {
          /*获取新的值*/
          if (value != '') {
            this.val = this.val + "*";
          }
          this.pwdVal = this.pwdVal + value;
        }
      }
      else {
        oldValue = this.val;
        /*获取新的值*/
        this.val = this.val + value;
        /*检验新值, 如果没有通过检测, 恢复值（不是密码输入框才需要检测）;如果是纯数字也不需要校验规则*/
        if (!this.passCheck(this.val) && !this.isOnlyNum) {
          this.val = oldValue;
          return;
        }
      }
      /*为了让外界同步输入, 需要发送事件*/
      this.notify();
    },
    passCheck(val) {
      /*验证规则*/
      let aRules = [
        this.illegalInput,
        this.illegalValue,
        this.accuracy
      ]
      return aRules.every((item) => {
        return item(val);
      });
    },
    illegalInput(val) {
      if (this.aIllegal.indexOf(val) > -1) {
        return false;
      }
      return true;
    }, /*非法值*/
    illegalValue(val) {
      if (parseFloat(val) != val) {
        return false;
      }
      return true;
    }, /*验证精度*/
    accuracy(val) {
      let v = val.split('.')
      if (v[0].length >= this.inter) {
        return false;
      }
      if (v[1] && (v[1].length) > this.decimal) {
        return false;
      }
      return true;
    }
  }
});


// CONCATENATED MODULE: ./src/components/keyboard/keyboardInput.vue?vue&type=script&lang=js&
 /* harmony default export */ var keyboard_keyboardInputvue_type_script_lang_js_ = (keyboardInputvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/keyboard/keyboardInput.vue





/* normalize component */

var keyboardInput_component = normalizeComponent(
  keyboard_keyboardInputvue_type_script_lang_js_,
  keyboardInputvue_type_template_id_f61a336e_render,
  keyboardInputvue_type_template_id_f61a336e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var keyboardInput = (keyboardInput_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6ecd46e5-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/pwdKeyboard/pwdKeyboard.vue?vue&type=template&id=c8bd72b4&
var pwdKeyboardvue_type_template_id_c8bd72b4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"h-password-keyboard-component"},[(_vm.isShow)?_c('div',{class:{'h-maskbg': _vm.mask},on:{"click":_vm._onCancel}}):_vm._e(),_c('transition',{attrs:{"name":"slide"}},[(_vm.isShow)?_c('div',{staticClass:"h-pkc-content animated",on:{"click":function($event){$event.stopPropagation();$event.preventDefault();}}},[_c('div',{staticClass:"h-pkc-header"},[_c('span',{staticClass:"cancel-btn",on:{"click":_vm._onCancel}},[_vm._v(_vm._s(_vm.cancelText))]),(_vm.pwdLength === 0)?_c('span',{staticClass:"ok-btn",on:{"click":_vm._onConfirm}},[_vm._v(_vm._s(_vm.okText))]):_vm._e(),_c('h4',{staticClass:"h-pkc-title"},[_vm._v(_vm._s(_vm.title))])]),_c('div',{staticClass:"password-show-box"},_vm._l((_vm.password),function(item,index){return _c('span',{key:'key1'+index,class:{on: _vm.password[index]}})}),0),(_vm.forgetShow)?_c('div',{staticClass:"forget-box"},[_c('span',{staticClass:"forget-btn",on:{"click":_vm._onForget}},[_vm._v("忘记密码？")])]):_vm._e(),_c('div',{staticClass:"h-keyboard"},[(_vm.keyType==='1')?_c('table',{staticClass:"h-keyboard-table",attrs:{"border":"0","cellspacing":"0","cellpadding":"0"}},_vm._l(([0,1,2,3]),function(row,num){return _c('tr',{key:'key2'+num},[(row !== 3)?_vm._l(([0,1,2]),function(item,index){return _c('td',{key:'key3'+index},[_c('span',{on:{"click":function($event){$event.stopPropagation();return _vm._keyEvent($event)}}},[_c('i',[_vm._v(_vm._s(_vm.keyCode[num*3+1+index]))])])])}):[_c('td',{on:{"click":function($event){return _vm._changeKeyType('2')}}},[_c('span',[_c('i',[_vm._v("abc")])])]),_c('td',[_c('span',{staticClass:"single",on:{"click":function($event){return _vm._keyEvent($event)}}},[_c('i',[_vm._v(_vm._s(_vm.keyCode[0]))])])]),_c('td',[_c('span',{staticClass:"delone keybg",on:{"click":function($event){return _vm._keyEvent($event,'del')}}},[_c('img',{staticClass:"del",attrs:{"src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAhCAMAAAChvXjxAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAEIUExURQAAAOXl5eXl5a+vr8nJyb29veXl5eXl5eXl5eHh4dPT09XV1eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5dvb2+Xl5eXl5eXl5dzc3OXl5eXl5eXl5eXl5dzc3OXl5WJiYuXl5cPDw8vLy+Xl5eXl5cvLy9vb2+Xl5eXl5Xt7e+Xl5eHh4eTk5JCQkOTk5EZGRvT09G1tbfb29vf393BwcG5ubnR0dFlZWU9PT0pKSldXV0dHR5+fn2FhYW9vb4yMjH19fVFRUWBgYGhoaP///2JiYsPDw3Z2dufn52NjY4KCgoqKiuzs7O3t7Xp6emVlZXt7e5CQkFRUVOPj43Nzc5iYmJKSklHv7cEAAAAwdFJOUwB6bP6B/gh/YICAf0Z1dHwUJH4VRYFUOGOBN3MmaoCA/mn9f1VxgH9XU/5Hf4D+f2uUVSgAAAEpSURBVDjLndVnUwIxEAbgtQJ2xN4VRLHgckqxYUWxYQH1//8T94YBkk0u3l6+3dw8N3t5NxsAdS0/3uG/q6IRWM3eIgpVfLSCoZZi5hYfUIpmElcoRfOxG5SiZOwapWhq8hKlaLhv4IK9eG956mPx7YWjiaEz/rX7k4KiiseFD4b6B0/NGsqKIlNi5cVHzm2V9xQzPsrtVO3/21HcEBo78IJ2qa0MQ+jwM3hvfWUaQl+uREiZhlDTmeNPrfZrCTfvMlSbllcHHe05TenbVAD7Cc9l9JS7Oe3OVl3GovyOWLB3RG+vuQruPTUfptpdPm7pci0fUs8hztNrQ8u0/FQ3Tm5qWn5yAVbW5TMCYCnCNKIjEmHuAWTWNuQo0iwH2EzLbw2A7a1Q99MfsT0bCCNxrYAAAAAASUVORK5CYII=","height":"16","width":"26"}})])])]],2)}),0):_vm._e(),(_vm.keyType==='2')?_c('table',{staticClass:"h-keyboard-table-abc",attrs:{"border":"0","cellspacing":"0","cellpadding":"0"}},_vm._l(([0,1,2,3]),function(row,num){return _c('tr',{key:'key4'+num},[(row !== 3)?_vm._l(([0,1,2,3,4,5,6,7]),function(item,index){return _c('td',{key:'key5'+index},[_c('span',{on:{"click":function($event){$event.stopPropagation();return _vm._keyEvent($event)}}},[_c('i',[_vm._v(_vm._s(_vm.abckeyCode[num*8+2+index]))])])])}):[_c('td',{attrs:{"colspan":"2"},on:{"click":function($event){return _vm._changeKeyType('1')}}},[_c('span',[_c('i',[_vm._v("123")])])]),_c('td',{attrs:{"colspan":"2"},on:{"click":function($event){return _vm._changeKeyType('3')}}},[_c('span',[_c('i',[_vm._v("ABC")])])]),_c('td',[_c('span',{staticClass:"single",on:{"click":function($event){return _vm._keyEvent($event)}}},[_c('i',[_vm._v(_vm._s(_vm.abckeyCode[0]))])])]),_c('td',[_c('span',{staticClass:"single",on:{"click":function($event){return _vm._keyEvent($event)}}},[_c('i',[_vm._v(_vm._s(_vm.abckeyCode[1]))])])]),_c('td',{attrs:{"colspan":"2"}},[_c('span',{staticClass:"delone keybg",on:{"click":function($event){return _vm._keyEvent($event,'del')}}},[_c('img',{staticClass:"del",attrs:{"src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAhCAMAAAChvXjxAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAEIUExURQAAAOXl5eXl5a+vr8nJyb29veXl5eXl5eXl5eHh4dPT09XV1eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5dvb2+Xl5eXl5eXl5dzc3OXl5eXl5eXl5eXl5dzc3OXl5WJiYuXl5cPDw8vLy+Xl5eXl5cvLy9vb2+Xl5eXl5Xt7e+Xl5eHh4eTk5JCQkOTk5EZGRvT09G1tbfb29vf393BwcG5ubnR0dFlZWU9PT0pKSldXV0dHR5+fn2FhYW9vb4yMjH19fVFRUWBgYGhoaP///2JiYsPDw3Z2dufn52NjY4KCgoqKiuzs7O3t7Xp6emVlZXt7e5CQkFRUVOPj43Nzc5iYmJKSklHv7cEAAAAwdFJOUwB6bP6B/gh/YICAf0Z1dHwUJH4VRYFUOGOBN3MmaoCA/mn9f1VxgH9XU/5Hf4D+f2uUVSgAAAEpSURBVDjLndVnUwIxEAbgtQJ2xN4VRLHgckqxYUWxYQH1//8T94YBkk0u3l6+3dw8N3t5NxsAdS0/3uG/q6IRWM3eIgpVfLSCoZZi5hYfUIpmElcoRfOxG5SiZOwapWhq8hKlaLhv4IK9eG956mPx7YWjiaEz/rX7k4KiiseFD4b6B0/NGsqKIlNi5cVHzm2V9xQzPsrtVO3/21HcEBo78IJ2qa0MQ+jwM3hvfWUaQl+uREiZhlDTmeNPrfZrCTfvMlSbllcHHe05TenbVAD7Cc9l9JS7Oe3OVl3GovyOWLB3RG+vuQruPTUfptpdPm7pci0fUs8hztNrQ8u0/FQ3Tm5qWn5yAVbW5TMCYCnCNKIjEmHuAWTWNuQo0iwH2EzLbw2A7a1Q99MfsT0bCCNxrYAAAAAASUVORK5CYII=","height":"16","width":"26"}})])])]],2)}),0):_vm._e(),(_vm.keyType==='3')?_c('table',{staticClass:"h-keyboard-table-abc",attrs:{"border":"0","cellspacing":"0","cellpadding":"0"}},_vm._l(([0,1,2,3]),function(row,num){return _c('tr',{key:'key6'+num},[(row !== 3)?_vm._l(([0,1,2,3,4,5,6,7]),function(item,index){return _c('td',{key:'key7'+index},[_c('span',{on:{"click":function($event){$event.stopPropagation();return _vm._keyEvent($event)}}},[_c('i',[_vm._v(_vm._s(_vm.ABCkeyCode[num*8+2+index]))])])])}):[_c('td',{attrs:{"colspan":"2"},on:{"click":function($event){return _vm._changeKeyType('1')}}},[_c('span',[_c('i',[_vm._v("123")])])]),_c('td',{attrs:{"colspan":"2"},on:{"click":function($event){return _vm._changeKeyType('2')}}},[_c('span',[_c('i',[_vm._v("abc")])])]),_c('td',[_c('span',{staticClass:"single",on:{"click":function($event){return _vm._keyEvent($event)}}},[_c('i',[_vm._v(_vm._s(_vm.ABCkeyCode[0]))])])]),_c('td',[_c('span',{staticClass:"single",on:{"click":function($event){return _vm._keyEvent($event)}}},[_c('i',[_vm._v(_vm._s(_vm.ABCkeyCode[1]))])])]),_c('td',{attrs:{"colspan":"2"}},[_c('span',{staticClass:"delone keybg",on:{"click":function($event){return _vm._keyEvent($event,'del')}}},[_c('img',{staticClass:"del",attrs:{"src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAhCAMAAAChvXjxAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAEIUExURQAAAOXl5eXl5a+vr8nJyb29veXl5eXl5eXl5eHh4dPT09XV1eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5eXl5dvb2+Xl5eXl5eXl5dzc3OXl5eXl5eXl5eXl5dzc3OXl5WJiYuXl5cPDw8vLy+Xl5eXl5cvLy9vb2+Xl5eXl5Xt7e+Xl5eHh4eTk5JCQkOTk5EZGRvT09G1tbfb29vf393BwcG5ubnR0dFlZWU9PT0pKSldXV0dHR5+fn2FhYW9vb4yMjH19fVFRUWBgYGhoaP///2JiYsPDw3Z2dufn52NjY4KCgoqKiuzs7O3t7Xp6emVlZXt7e5CQkFRUVOPj43Nzc5iYmJKSklHv7cEAAAAwdFJOUwB6bP6B/gh/YICAf0Z1dHwUJH4VRYFUOGOBN3MmaoCA/mn9f1VxgH9XU/5Hf4D+f2uUVSgAAAEpSURBVDjLndVnUwIxEAbgtQJ2xN4VRLHgckqxYUWxYQH1//8T94YBkk0u3l6+3dw8N3t5NxsAdS0/3uG/q6IRWM3eIgpVfLSCoZZi5hYfUIpmElcoRfOxG5SiZOwapWhq8hKlaLhv4IK9eG956mPx7YWjiaEz/rX7k4KiiseFD4b6B0/NGsqKIlNi5cVHzm2V9xQzPsrtVO3/21HcEBo78IJ2qa0MQ+jwM3hvfWUaQl+uREiZhlDTmeNPrfZrCTfvMlSbllcHHe05TenbVAD7Cc9l9JS7Oe3OVl3GovyOWLB3RG+vuQruPTUfptpdPm7pci0fUs8hztNrQ8u0/FQ3Tm5qWn5yAVbW5TMCYCnCNKIjEmHuAWTWNuQo0iwH2EzLbw2A7a1Q99MfsT0bCCNxrYAAAAAASUVORK5CYII=","height":"16","width":"26"}})])])]],2)}),0):_vm._e()])]):_vm._e()])],1)}
var pwdKeyboardvue_type_template_id_c8bd72b4_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/pwdKeyboard/pwdKeyboard.vue?vue&type=template&id=c8bd72b4&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/pwdKeyboard/pwdKeyboard.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var pwdKeyboardvue_type_script_lang_js_ = ({
  name: 'pwdKeyboard',
  data() {
    return {
      isShow: false,
      keyCode: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
      abckeyCode: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z'
      ],
      ABCkeyCode: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      password: [],
      keyType: '1' //1 数字 ，2 小写字母 ，3 大写字母
    }
  },
  props: {
    title: {
      type: String,
      default: '请输入密码'
    },
    forgetShow: {
      type: Boolean,
      default: false
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    okText: {
      type: String,
      default: '确认'
    },
    mask: {
      type: Boolean,
      default: true
    },
    disorder: {
      type: Boolean,
      default: false
    },
    pwdLength: {
      type: Number,
      default: 0
    }
  },
  watch: {
    password(val) {
      if (this.pwdLength > 0 && val.length >= this.pwdLength) {
        this.$emit('onComplete', this.password.join(''))
        this._onCancel()
      }
    },
  },
  created() {
    this._keyInit()
  },
  methods: {
    open() {
      this.isShow = true
      this._keyInit()
    },
    _keyInit() {
      this.password = []
      if (this.disorder) {
        this.keyCode.sort(function () {
          return 0.5 - Math.random()
        })
        this.abckeyCode.sort(function () {
          return 0.5 - Math.random()
        })
        this.ABCkeyCode.sort(function () {
          return 0.5 - Math.random()
        })
      }
    },
    _keyEvent(e, type) {
      let len = this.password.length
      if (type === 'del') {
        this.password.pop()
        return
      }
      if (this.pwdLength > 0 && len >= this.pwdLength) {
        return
      }
      this.password.push(e.currentTarget.innerText)
    },
    _onCancel() {
      this.password = []
      this.isShow = false
    },
    _onConfirm() {
      let len = this.password.length
      if (len < 1) {
        return
      }
      this.$emit('onComplete', this.password.join(''))
      this._onCancel()
    },
    _onForget() {
      this.$emit('onForget')
    },
    _onHide() {
      this.$emit('onHide')
    },
    _changeKeyType(type) {
      this.keyType = type;
    }
  }
});
document.addEventListener('click', function () {
}, false);

// CONCATENATED MODULE: ./src/components/pwdKeyboard/pwdKeyboard.vue?vue&type=script&lang=js&
 /* harmony default export */ var pwdKeyboard_pwdKeyboardvue_type_script_lang_js_ = (pwdKeyboardvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/pwdKeyboard/pwdKeyboard.vue





/* normalize component */

var pwdKeyboard_component = normalizeComponent(
  pwdKeyboard_pwdKeyboardvue_type_script_lang_js_,
  pwdKeyboardvue_type_template_id_c8bd72b4_render,
  pwdKeyboardvue_type_template_id_c8bd72b4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var pwdKeyboard = (pwdKeyboard_component.exports);
// CONCATENATED MODULE: ./src/methods/dateUtils.js
/*
 let myDate = new Date();
 myDate.getYear(); //获取当前年份(2位)
 myDate.getFullYear(); //获取完整的年份(4位,1970-????)
 myDate.getMonth(); //获取当前月份(0-11,0代表1月)
 myDate.getDate(); //获取当前日(1-31)
 myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
 myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
 myDate.getHours(); //获取当前小时数(0-23)
 myDate.getMinutes(); //获取当前分钟数(0-59)
 myDate.getSeconds(); //获取当前秒数(0-59)
 myDate.getMilliseconds(); //获取当前毫秒数(0-999)
 myDate.toLocaleDateString(); //获取当前日期
 let mytime=myDate.toLocaleTimeString(); //获取当前时间
 myDate.toLocaleString( ); //获取日期与时间
 
 日期时间脚本库方法列表
 
 Date.prototype.IsLeapYear 判断闰年
 Date.prototype.Format 日期格式化
 Date.prototype.DateAdd 日期计算
 Date.prototype.DateDiff 比较日期差
 Date.prototype.ToString 日期转字符串
 Date.prototype.ToArray 日期分割为数组
 Date.prototype.DatePart 取日期的部分信息
 Date.prototype.MonthAsDays 取日期所在月的最大天数
 Date.prototype.WeekNumOfYear 判断日期所在年的第几周
 Date.prototype.IsTradeTime 判断日期是否在9:00到15:00之间
 stringToDate 字符串转日期型
 isValidDate 验证日期有效性
 checkDateTime 完整日期时间检查
 daysBetween 日期天数差
 */
/**
 * 判断闰年
 * @return {number|boolean}
 */
Date.prototype.IsLeapYear = function () {
  return ((0 === this.getFullYear() % 4 & (this.getFullYear() % 100 !== 0)) || (this.getFullYear() % 400 === 0));
};


/**
 * 日期格式化
 * 格式 YYYY/yyyy/YY/yy 表示年份
 * MM/M 月份
 * W/w 星期
 * dd/DD/d/D 日
 * hh/HH/h/H 小时
 *  mm/m 分钟
 *  ss/SS/s/S 秒
 * @param formatStr  格式化字符串
 * @return {*}  格式化后的日期
 * @constructor
 */
Date.prototype.Format = function (formatStr) {
  let str = formatStr;
  let Week = [
    '日',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六'
  ];
  
  str = str.replace(/yyyy|YYYY/, this.getFullYear());
  str = str.replace(/yy|YY/,
    (this.getFullYear() % 100) > 9 ? (this.getFullYear() % 100).toString() : '0' + (this.getFullYear() % 100));
  
  str = str.replace(/MM/,
    Number(this.getMonth() + 1) > 9 ? Number(this.getMonth() + 1).toString() : '0' + Number(this.getMonth() + 1));
  str = str.replace(/M/g, Number(this.getMonth() + 1));
  
  str = str.replace(/w|W/g, Week[this.getDay()]);
  
  str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
  str = str.replace(/d|D/g, this.getDate());
  
  str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
  str = str.replace(/h|H/g, this.getHours());
  str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
  str = str.replace(/m/g, this.getMinutes());
  
  str = str.replace(/ss/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
  str = str.replace(/s/g, this.getSeconds());
  
  str = str.replace(/SSS/g, this.getMilliseconds());
  
  return str;
};


/**
 *  多久之后的时间    strInterval=d，number=1  一天之后
 * @param strInterval  日期标识 y 年 q季度 m月 d日 w星期 ww周 h时 n分 s秒
 * @param number 多久
 * @return {Date} 日期
 * @constructor
 */
Date.prototype.DateAdd = function (strInterval, number) {
  let dtTmp = this, targetDate = null;
  switch (strInterval) {
    case 's' :
      return new Date(Date.parse(dtTmp.toString()) + (1000 * number));
    case 'n' :
      return new Date(Date.parse(dtTmp.toString()) + (60000 * number));
    case 'h' :
      return new Date(Date.parse(dtTmp.toString()) + (3600000 * number));
    case 'd' :
      return new Date(Date.parse(dtTmp.toString()) + (86400000 * number));
    case 'w' :
      return new Date(Date.parse(dtTmp.toString()) + ((86400000 * 7) * number));
    
    case 'q' :
      
      return dtTmp.DateAdd('m', number * 3);
    
    case 'm' :
      
      targetDate = new Date(dtTmp.getFullYear(), dtTmp.getMonth() + number);
      
      if (targetDate.MonthAsDays() >= dtTmp.getDate()) {
        targetDate = new Date(dtTmp.getFullYear(), dtTmp.getMonth() + number, dtTmp.getDate(), dtTmp.getHours(),
          dtTmp.getMinutes(), dtTmp.getSeconds());
      }
      else {
        targetDate =
          new Date(dtTmp.getFullYear(), dtTmp.getMonth() + number, targetDate.MonthAsDays(), dtTmp.getHours(),
            dtTmp.getMinutes(), dtTmp.getSeconds());
      }
      
      return targetDate;
    
    case 'y' :
      
      return dtTmp.DateAdd('m', number * 12);
  }
};

/**
 *  比较日期差 dtEnd 格式为日期型或者有效日期格式字符串
 * @param strInterval 日期标识 y 年 m月 d日 w星期 ww周 h时 n分 s秒
 * @param dtEnd 目的时间
 * @return {*} 差值
 * @constructor
 */
Date.prototype.DateDiff = function (strInterval, dtEnd) {
  let dtStart = this;
  if (typeof dtEnd === 'string')//如果是字符串转换为日期型
  {
    dtEnd = getDateByStr(dtEnd);
  }
  switch (strInterval) {
    case 's' :
      return parseInt((dtEnd - dtStart) / 1000);
    case 'n' :
      return parseInt((dtEnd - dtStart) / 60000);
    case 'h' :
      return parseInt((dtEnd - dtStart) / 3600000);
    case 'd' :
      return parseInt((dtEnd - dtStart) / 86400000);
    case 'w' :
      return parseInt((dtEnd - dtStart) / (86400000 * 7));
    case 'm' :
      return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
    case 'y' :
      return dtEnd.getFullYear() - dtStart.getFullYear();
  }
};


/**
 * 日期输出字符串，重载了系统的toString方法
 * @param showWeek  是否显示周几
 * @return {string}  返回格式化后的日期
 */
Date.prototype.ToString = function (showWeek) {
  let myDate = this;
  let str = myDate.toLocaleDateString();
  if (showWeek) {
    let Week = [
      '日',
      '一',
      '二',
      '三',
      '四',
      '五',
      '六'
    ];
    str += ' 星期' + Week[myDate.getDay()];
  }
  return str;
};

/**
 * 把日期分割成数组
 * @return {*}
 */
Date.prototype.ToArray = function () {
  let myDate = this;
  let myArray = [];
  myArray[0] = myDate.getFullYear();
  myArray[1] = myDate.getMonth();
  myArray[2] = myDate.getDate();
  myArray[3] = myDate.getHours();
  myArray[4] = myDate.getMinutes();
  myArray[5] = myDate.getSeconds();
  return myArray;
};

/**
 * 取得日期数据信息
 * @param interval 表示数据类型  y 年 m月 d日 w星期 ww周 h时 n分 s秒
 * @return {string}
 * @constructor
 */
Date.prototype.DatePart = function (interval) {
  let myDate = this;
  let partStr = '';
  let Week = [
    '日',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六'
  ];
  switch (interval) {
    case 'y' :
      partStr = myDate.getFullYear();
      break;
    case 'm' :
      partStr = myDate.getMonth() + 1;
      break;
    case 'd' :
      partStr = myDate.getDate();
      break;
    case 'w' :
      partStr = Week[myDate.getDay()];
      break;
    case 'ww' :
      partStr = myDate.WeekNumOfYear();
      break;
    case 'h' :
      partStr = myDate.getHours();
      break;
    case 'n' :
      partStr = myDate.getMinutes();
      break;
    case 's' :
      partStr = myDate.getSeconds();
      break;
  }
  return partStr;
};

/**
 * 判断日期所在年的第几周
 */
Date.prototype.WeekNumOfYear = function () {
  let myDate = this, year = myDate.getFullYear(), month = myDate.getMonth(), days = myDate.getDate();
  //那一天是那一年中的第多少天
  for (let i = 0; i < month; i++) {
    days += myDate.MonthAsDays();
  }
  //那一年第一天是星期几
  let yearFirstDay = new Date(year, 0, 1).getDay() || 7;
  let week = null;
  if (yearFirstDay === 1) {
    week = Math.ceil(days / 7);
  }
  else {
    days -= (7 - yearFirstDay + 1);
    week = Math.ceil(days / 7) + 1;
  }
  return week;
};

/**
 * 当月有多少天
 * @return {number}
 * @constructor
 */
Date.prototype.MonthAsDays = function () {
  let myDate = this;
  let month = myDate.getMonth() + 1;
  let days = 30;
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      days = 31;
      break;
    case 2:
      days = this.IsLeapYear() ? 29 : 28;
      break;
    default:
      days = 30;
      break;
  }
  return days;
};

/**
 * 是否在9:30-15:00之间
 * @return {boolean} 结果
 */
Date.prototype.IsTradeTime = function () {
  let myDate = this;
  let nowDay = myDate.Format("yyyy/MM/dd");
  let nineMin = new Date(nowDay + " 09:30:00");
  return !(myDate < nineMin || myDate.getHours() >= 15);
};

const /**
   * 求两个时间的天数差 日期格式为 YYYY-MM-dd
   * @param DateOne 较大的日期
   * @param DateTwo 较小的日期
   * @return {number}  差值
   */
  daysBetween = (DateOne, DateTwo) => {
    let OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
    let OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
    let OneYear = DateOne.substring(0, DateOne.indexOf('-'));
    
    let TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
    let TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
    let TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));
    
    let cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) -
      Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
    return Math.abs(cha);
  },
  
  /**
   * 字符串和时间戳转换为Date类型
   * @param DateStr
   * @return {Date}
   * @constructor
   */
  stringToDate = (DateStr) => {
    return DateStr ? new Date(DateStr) : new Date()
  },
  
  /**
   * 日期合法性验证
   * 格式为：YYYY-MM-DD或YYYY/MM/DD
   * @param DateStr
   * @return {boolean}
   * @constructor
   */
  isValidDate = (DateStr) => {
    let sDate = DateStr.replace(/(^\s+|\s+$)/g, ''); //去两边空格;
    if (sDate === '') {
      return false;
    }
//如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''
//数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式
    let s = sDate.replace(/[\d]{ 4,4 }[/]{ 1 }[\d]{ 1,2 }[/]{ 1 }[\d]{ 1,2 }/g, '');
    if (s !== '') //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D
    {
      let t = new Date(sDate.replace(/-/g, '/'));
      let ar = sDate.split(/[-/: ]/);
      if (ar[0] != t.getFullYear() || ar[1] != t.getMonth() + 1 || ar[2] != t.getDate()) {
//alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
        return false;
      }
      else {
        return true;
      }
    }
    else {
//alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
      return false;
    }
  },
  
  /**
   * 日期时间检查
   * 格式为：YYYY-MM-DD HH:MM:SS
   * @param str
   * @return {boolean}
   * @constructor
   */
  checkDateTime = (str) => {
    let reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;
    let r = str.match(reg);
    if (r === null) {
      return false;
    }
    r[2] = r[2] - 1;
    let d = new Date(r[1], r[2], r[3], r[4], r[5], r[6]);
    if (d.getFullYear() != r[1]) {
      return false;
    }
    if (d.getMonth() != r[2]) {
      return false;
    }
    if (d.getDate() != r[3]) {
      return false;
    }
    if (d.getHours() != r[4]) {
      return false;
    }
    if (d.getMinutes() != r[5]) {
      return false;
    }
    if (d.getSeconds() != r[6]) {
      return false;
    }
    return true;
  },
  
  /**
   * 描述： 把日期格式字符串转换成js Date类型
   *
   * @author 汪卫中
   * @param dateStr: 日期字符串 格式必须为 yyyy-MM-dd hh:mm:ss 或 yyyy-MM-dd hh:mm:ss.S
   * @returns 返回JS日期对象
   */
  getDateByStr = (dateStr) => {
    if (!dateStr) {
      return;
    }
    //去掉后面毫秒数
    if (dateStr.indexOf(".") != -1) {
      dateStr = dateStr.substring(0, dateStr.indexOf("."));
    }
    
    // 形如20160101120101转换成2016-01-01 12:01:01
    if ((dateStr.replace(/^\s+|\s+$/gm, '')).length == 14 && dateStr.indexOf("-") == -1) {
      dateStr = dateStr.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:$6');
    }
    
    // 形如20160101转换成2016-01-01
    if ((dateStr.replace(/^\s+|\s+$/gm, '')).length == 8 && dateStr.indexOf("-") == -1) {
      dateStr = dateStr.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3 00:00:00');
    }
    dateStr = dateStr.replace(new RegExp("-", "gm"), "/");
    return new Date(dateStr);
  },
  
  /**
   * 描述：把yyyy-MM-dd hh:mm:ss (.S)日期字符串转化为指定格式的日期字符串
   *
   * @author 汪卫中
   * @param srcDate: 1、源日期为日期格式的字符串 如：2015-11-12 11:34:45
   *                   2、源日期为Date类型 如：new Date();
   * @param fmt: 格式，如：yyyy-MM-dd
   */
  dateFormat = (srcDate, fmt) => {
    if (!srcDate || !fmt) {
      return srcDate;
    }
    if (srcDate && srcDate.length === 10 && srcDate.indexOf('.') > -1) {//转换带.格式的
      srcDate = srcDate.replace(/\./g, "");
    }
    if (srcDate && srcDate.length === 8) {//支持yyyyMMdd格式的
      srcDate = srcDate.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
    }
    // 把字符串转换成日期对象
    let date = (typeof (srcDate) == "object") ? srcDate : getDateByStr(srcDate);
    
    // 非date类型时返回原字符串
    if (isNaN(date.getDay())) {
      return srcDate;
    }
    
    let o = {
      "M+": date.getMonth() + 1, // 月份
      "d+": date.getDate(), // 日
      "h+": date.getHours(), // 小时
      "m+": date.getMinutes(), // 分
      "s+": date.getSeconds(), // 秒
      "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
      "S": date.getMilliseconds() // 毫秒
    };
    
    // 年份比较特殊，单独处理
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  },

//获取一个月最后一天
  getLastDay = (year, month) => {
    let new_year = year;    //取当前的年份
    let new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
    if (month > 12)            //如果当前大于12月，则年份转到下一年
    {
      new_month -= 12;        //月份减
      new_year++;            //年份增
    }
    let new_date = new Date(new_year, new_month, 1);                //取当年当月中的第一天
    return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();//获取当月最后一天日期
  },
  
  /**
   * 获取从开始日期到结束日期的月份集合
   * start_date 开始日期
   * end_date  结束日期
   * fmt 格式化 yyyy-MM  yyyy年MM月
   */
  getMonthList = (start_date, end_date, fmt) => {
    let resultMonth = [];
    fmt = fmt || "yyyy-MM";
    if (start_date && end_date) {
      // 把字符串转换成日期对象
      let startDate = (typeof (start_date) == "object") ? start_date : getDateByStr(start_date);
      // 非date类型时返回原字符串
      if (isNaN(startDate.getDay())) {
        return resultMonth;
      }
      // 把字符串转换成日期对象
      let endDate = (typeof (end_date) == "object") ? end_date : getDateByStr(end_date);
      // 非date类型时返回原字符串
      if (isNaN(endDate.getDay())) {
        return resultMonth;
      }
      if (startDate.DateDiff("m", endDate) < 0) {//结束日期月份小于开始日期月份
        return resultMonth;
      }
      
      let startYear = startDate.getFullYear();//开始日期年份
      let startMonth = startDate.getMonth() + 1;//开始日期月份
      if (startMonth == 1) {
        startYear--;
        startMonth = 12;
      }
      let endYear = endDate.getFullYear();//结束日期年份
      let endMonth = endDate.getMonth() + 1;//结束日期月份
      if (endMonth == 1) {
        endYear--;
        endMonth = 12;
      }
      for (let i = startYear; i <= endYear; i++) {
        for (let j = 1; j <= 12; j++) {
          if (!((i == startYear && j < startMonth) || (i == endYear && j > endMonth))) {
            let monthStr = "";
            if (j < 10) {
              monthStr = "0" + j;
            }
            else {
              monthStr = j;
            }
            let yearMonth = i + "-" + monthStr + "-01";//IOS中 new Date(yyyy/MM)不能格式化，需拼接完整日期
            yearMonth = dateFormat(yearMonth, fmt);
            resultMonth.push(yearMonth);
          }
        }
      }
    }
    return resultMonth;
  },

//股票分时时间段
  timeJson = () => {
    let timeStr = [];
    let m, s;
    m = 9;
    s = 0;
    for (let j = 0; j < 6; j++) {
      s = 0;
      if (m == 9) {
        s = 30;
        for (let i = 0; i < 30; i++) {
          timeStr.push(m + ":" + s);
          s++;
        }
      }
      else if (m == 11) {
        s = 0;
        for (let i = 0; i <= 30; i++) {
          if (s < 10) {
            timeStr.push(m + ":0" + s);
          }
          else {
            timeStr.push(m + ":" + s);
          }
          s++;
        }
      }
      else if (m == 10 || m >= 13) {
        for (let i = 0; i < 60; i++) {
          if (s < 10) {
            timeStr.push(m + ":0" + s);
          }
          else {
            timeStr.push(m + ":" + s);
          }
          s++;
        }
      }
      m++;
    }
    timeStr.push("15:00");
    return timeStr;
  },
  
  /**
   * [两个日期相差间隔]
   * @param start_date 开始日期 YYYY-MM-DD
   * @param end_date 结束日期，不传默认当前日期
   */
  datesBetween = (start_date, end_date) => {
    if (typeof (start_date) == 'undefined') {
      return ''
    }
    if (typeof (end_date) == 'undefined') {
      end_date = new Date();
    }
    if (typeof (start_date) == 'string') {
      start_date = dateFormat(start_date, 'yyyy/MM/dd');
    }
    start_date = new Date(start_date);
    let year = end_date.getFullYear() - start_date.getFullYear();
    let month = end_date.getMonth() - start_date.getMonth();
    let day = end_date.getDate() - start_date.getDate();
    let hours = end_date.getHours() - start_date.getHours();
    if (year > 0) {
      return `${year}年之前`;
    }
    else if (month > 0) {
      return `${month}个月之前`;
    }
    else if (day > 0) {
      return `${day}天之前`;
    }
    else if (hours > 0) {
      return `${hours}小时之前`;
    }
  }


const dateUtils = {
  "stringToDate": stringToDate,//字符串转日期型
  "isValidDate": isValidDate,//验证日期有效性
  "checkDateTime": checkDateTime,//完整日期时间检查
  "daysBetween": daysBetween,//日期天数差
  "getDateByStr": getDateByStr, // 把日期格式化成Date类型
  "dateFormat": dateFormat, // 根据格式显示日期
  "getLastDay": getLastDay,//获取一个月最后一天
  "getMonthList": getMonthList,//获取从开始日期到结束日期的月份集合
  "timeJson": timeJson,//股票分时时间段
  "datesBetween": datesBetween, // 两个日期相差间隔
};
/* harmony default export */ var methods_dateUtils = (dateUtils);

// EXTERNAL MODULE: ./src/methods/stringUtils.js
var stringUtils = __webpack_require__("5b58");

// EXTERNAL MODULE: ./src/style/index.less
var style = __webpack_require__("cd22");

// CONCATENATED MODULE: ./src/index.js






const components = [
  counterUpper,
  keyboardInput,
  pwdKeyboard
]
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))
  
  const methodsR = Object.assign(methods_dateUtils,stringUtils["a" /* default */])
  Object.keys(methodsR).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype,key)) {
        Object.defineProperty(Vue.prototype, key, {
          get() {
            return methodsR[key]
          }
        })
      }
    }
  )
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const API = {
  install,
  ...components
}

/* harmony default export */ var src_0 = (API);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src_0);



/***/ })

/******/ });
});
//# sourceMappingURL=stysUi.umd.js.map