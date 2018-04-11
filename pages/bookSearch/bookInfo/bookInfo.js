Page({
  data: {
    ISBN: "",
    jsonStr: "",
    doubanStr: '',
  },
  onLoad: function (options) {
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 5000
    })
    var that = this;
    wx.request({
      url: 'https://airmole.cn/wechat/wxapp/api/isbn2info.php?ISBN=' + options.ISBN,
      success: function (res) {
        that.setData({
          jsonStr: res.data,
        })
      }
    });
    wx.request({
      url: 'https://airmole.cn/doubanapi/v2/book/isbn/' + options.ISBN,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        that.setData({
          doubanStr: res.data,
        })
        // console.log(res.data);
      },
      fail: function (res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'loading',
          duration: 8000
        })
      }
    })
    wx.hideToast()

  },
  onReady: function () {

  }
});