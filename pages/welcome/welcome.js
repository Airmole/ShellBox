var app = getApp()
Page({
  data: {
    uid: "",
    pwd: "",
    jsonStr: "",
    hasUserInfo: 0
  },
  start: function() {
    wx.reLaunch({
      url: '../bookSearch/index',
    })
  },
  onLoad: function(options) {
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 5000
    })
    var that = this
    this.setData({
      uid: options.uid,
      pwd: options.pwd,
    });
    wx.request({
      url: app.globalData.apiURL + '/v3/profile.php?username=' + options.uid + '&password=' + options.pwd + '&cookie=' + options.cookie + '&vcode=' + options.vcode,
      success: function(res) {
        that.setData({
          jsonStr: res.data,
        })
        wx.hideToast();
        console.log(res.data);
      }
    })
  }
})