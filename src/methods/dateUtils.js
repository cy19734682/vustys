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
export default dateUtils;
