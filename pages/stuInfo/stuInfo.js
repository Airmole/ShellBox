// pages/stuInfo/stuInfo.js
var app = getApp()

Page({
  onLoad: function() {
    this.setData({
      icon20: base64.icon20,
      icon60: base64.icon60
    });
  },
  onLoad: function() {
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 5000
    })
    var that = this

    this.setData({
      uid: app.globalData.uid,
      pwd: app.globalData.pwd,
    });
    //如果是打开的是分享过来的页面，全局变量uid&pwd是undefined状态，重定向到登录页面
    if (app.globalData.uid == '' || app.globalData.pwd == '') {
      wx.redirectTo({
        url: '/pages/index/index'
      })
    } else {
      wx.request({
        url: 'https://airmole.cn/wechat/wxapp/api/Airmole_jiaowuInfoQuery.php?uid=' + app.globalData.uid + '&pwd=' + app.globalData.pwd,
        success: function(res) {
          that.setData({
            jsonStr: res.data,
          })
          console.log(res.data);
          //账号密码错误以下功能实现跳转错误页面
          if (res.data[0][0].stuName == '') {
            app.globalData.uid = "";
            app.globalData.pwd = "";
            wx.redirectTo({
              url: '/pages/index/index'
            })
          }
          wx.hideToast()
        }
      })
    }
  }
});