function networkStatus() {
  wx.getNetworkType({
    success: function (res) {
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
  if (t === 'h:m') { return [hour, minute].map(formatNumber).join(':'); }
  else { return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':'); }
}
module.exports = {
  formatTimes: formatTimes,
  formatTime: formatTime
}
