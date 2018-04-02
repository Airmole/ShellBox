// pages/score/showScore/error.js
var app = getApp()
Page({
  goBack: function () {
    wx.navigateBack({
      delta: 2
    })
  },
  // goIndex: function () {
  //   wx.switchTab({
  //     url: '../bookSearch/index',
  //   })
  // },
  onLoad: function () {
    app.globalData.loginfailed = 'yes';
  }
})