Page({
  goBack: function () {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  goIndex: function () {
    wx.switchTab({
      url: '../../pages/bookSearch/index',
    })
  }
})