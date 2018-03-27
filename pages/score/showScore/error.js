// pages/score/showScore/error.js
Page({
  goBack: function () {
    wx.navigateBack({
      delta: 2
    })
  },
  goIndex: function () {
    wx.switchTab({
      url: '../../../pages/bookSearch/index'
    })
  }
})