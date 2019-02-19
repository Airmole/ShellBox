Page({
  data: {
    ErrorTips: "好像出了点小问题"
  },
  onLoad: function(eri) {
    console.log(eri)
    var that = this;
    that.setData({
      ErrorTips: eri.ErrorTips,
    })
  },
  goBack: function() {
    wx.navigateBack({
      delta: 2
    })
  },
})