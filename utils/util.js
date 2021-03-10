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

module.exports = {
  formatTime: formatTime,
  wecquFormatTime: wecquFormatTime,
  CompareDate: CompareDate
}
