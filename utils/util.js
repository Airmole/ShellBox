const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//格式化时间
function wecquFormatTime(date, t) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  if(t === 'h:m') { return [hour, minute].map(formatNumber).join(':'); }
  else { return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':'); }
}

function CompareDate(t1, t2) {
  var date = new Date();
  var t1Arr = t1.split(':');
  var t2Arr = t2.split(':');
  if (t1Arr[0] - t2Arr[0] < 0) {
    return true;
  } else if (t1Arr[0] == t2Arr[0]) {
    if (t1Arr[1] - t2Arr[1] < 0)
    return true;
  } else {
    return false;
  }
}

function formatDateTime(inputTime, type) {
	var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    if(type) {
    	return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;//2017-12-12 12:23:34    
    } else {
    	return y + '-' + m + '-' + d; //2017-12-12
    }
}

//格局化日期：yyyy-MM-dd
function formatDate(date) {
	var myyear = date.getFullYear();
	var mymonth = date.getMonth()+1;
	var myweekday = date.getDate();
 
	if(mymonth < 10){
		mymonth = "0" + mymonth;
	}
	if(myweekday < 10){
		myweekday = "0" + myweekday;
	}
	return (myyear+"-"+mymonth + "-" + myweekday);
}

function getCourseNoticeTimestamp (whichDayOfWeek, clocktime) {
  clocktime = clocktime.length < 5 ? '0' + clocktime : clocktime;
  var now = new Date(); //当前日期
  var nowDayOfWeek = now.getDay(); //今天本周的第几天
  var nowDay = now.getDate(); //当前日
  var nowMonth = now.getMonth(); //当前月
  var nowYear = now.getYear(); //当前年
  nowYear += (nowYear < 2000) ? 1900 : 0;
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
  var en_dayWeek_array = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday','sunday'];
  var whichDayOfWeekIndex = en_dayWeek_array.indexOf(whichDayOfWeek) ? en_dayWeek_array.indexOf(whichDayOfWeek) : 0;
  var targetDayDate = formatDateTime(weekStartDate.getTime() + whichDayOfWeekIndex*3600000*24);
  var finalDatetime = targetDayDate + ' ' + clocktime + ':00.0';
  // console.log(finalDatetime)
  finalDatetime = finalDatetime.substring(0,19);
  finalDatetime = finalDatetime.replace(/-/g,'/'); 
  var result = new Date(finalDatetime).getTime().toString().slice(0, -3);
  // console.log(result)
  return result;
}

module.exports = {
  formatTime: formatTime,
  wecquFormatTime: wecquFormatTime,
  CompareDate: CompareDate,
  getCourseNoticeTimestamp: getCourseNoticeTimestamp,
  formatDate: formatDate,
  formatDateTime: formatDateTime
}
