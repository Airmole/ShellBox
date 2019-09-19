function networkStatus() {
  wx.getNetworkType({
    success: function(res) {
      if (res.errMsg !== 'getNetworkType:ok') {
        wx.showModal({
          content: '获取网络状态失败'
        })
        return false;
      }
      if (res.networkType === 'none') {
        wx.showModal({
          content: '当前网络不可用，请检查网络设置'
        })
        return false;
      }
    }
  })
}
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
function formatTimes(date, t) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  if (t === 'h:m') {
    return [hour, minute].map(formatNumber).join(':');
  } else {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
  }
}

function needThisWeekGo(thisweek, weekStr) {
  const pattern1 = /\d{1,2}\-\d{1,2},\d{1,2}\-\d{1,2}\(周\)/;
  const pattern2 = /\d{1,2}\-\d{1,2}\(周\)/;
  const pattern3 = /\d{1,2}\(周\)/;
  if (weekStr.search(pattern1)>-1){
    let p1Arr = weekStr.match(/\d{1,2}-\d{1,2}/g);
    // console.log('weekStr.search(pattern1)======' + weekStr.search(pattern1));
    let p1Arr1 = p1Arr[0].split('-');
    let p1Arr2 = p1Arr[1].split('-');
    if (thisweek >= p1Arr1[0] && thisweek <= p1Arr1[1]){
      return true;
    } else {
      return false;
    }
    if (thisweek >= p1Arr2[0] && thisweek <= p1Arr2[1]) {
      return true;
    } else {
      return false;
    }
  } else if (weekStr.search(pattern2) > -1){
    // console.log('weekStr.search(pattern2)======' + weekStr.search(pattern2))
    let p2Arr1 = p1Arr[1].split('-');
    if (thisweek >= p2Arr1[0] && thisweek <= p2Arr1[1]) {
      return true;
    } else {
      return false;
    }
  } else if (weekStr.search(3) > -1){
    console.log('weekStr.search(3)=====' + weekStr.search(3))
    let p3Arr1 = p3Arr[1].split('(');
    if (thisweek == p3Arr1[0]) {
      return true;
    } else {
      return false;
    }
  } else {
    console.log('util.js无法处理传入的参数');
    console.log(weekStr.search(pattern1));
  }
}
module.exports = {
  formatTimes: formatTimes,
  formatTime: formatTime,
  needThisWeekGo: needThisWeekGo,
}