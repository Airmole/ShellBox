Page({
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  goIndex: function () {
    wx.switchTab({
      url: '../../pages/bookSearch/index',
    })
  }
})