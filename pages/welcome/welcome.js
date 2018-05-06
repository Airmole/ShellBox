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
    var that = this

    // if (app.globalData.hasLogin === false) {
    //   wx.login({
    //     success: _getUserInfo
    //   })
    // } else {
    //   // _getUserInfo()
    // }

    // function _getUserInfo() {
    //   wx.getUserInfo({
    //     success: function (res) {
    //       that.setData({
    //         hasUserInfo: true,
    //         userInfo: res.userInfo
    //       })
    //       // that.update()
    //     }
    //   })
    // }
    //上面的是获取微信用户头像和nickName,微信官方代码
    //微信小程序获取用户信息接口变更
    //下面开始是自己的代码
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
