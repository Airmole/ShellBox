var app = getApp()
Page({
  data: {
    hasUserInfo: false
  },
  start: function() {
    wx.switchTab({
      url: '../bookSearch/index',
    })
  },
  onLoad: function () {
    var that = this

    if (app.globalData.hasLogin === false) {
      wx.login({
        success: _getUserInfo
      })
    } else {
      _getUserInfo()
    }

    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            hasUserInfo: true,
            userInfo: res.userInfo
          })
          // that.update()
        }
      })
    }
  }
  
})
