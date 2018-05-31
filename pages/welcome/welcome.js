var app = getApp()
Page({
  data: {
    uid: "",
    pwd: "",
    jsonStr: "",
    hasUserInfo: 0
  },
  start: function () {
    wx.switchTab({
      url: '../bookSearch/index',
    })
  },
  onLoad: function (options) {
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
      url: 'https://airmole.cn/wechat/wxapp/api/Airmole_jiaowuInfoQuery.php?uid=' + options.uid + '&pwd=' + options.pwd,
      success: function (res) {
        that.setData({
          jsonStr: res.data,
        })
        wx.hideToast();
        // console.log(res.data);
        //账号密码错误以下功能实现跳转错误页面
        if (res.data[0][0].stuName == '') {
          // app.globalData.uid = '';
          // app.globalData.pwd = '';
          // app.globalData.loginfailed = 0;
          // console.log(app.globalData.loginsuccess);
          wx.redirectTo({
            url: '/pages/error/loginerror'
          })
        }
      }
    })
  }
})
