var app = getApp()
Page({
  data: {
    uid: "",
    pwd: "",
    jsonStr: "",
    hasUserInfo: false
  },
  start: function (options) {
    wx.switchTab({
      url: '../bookSearch/index',
    })
  },
  onLoad: function (options) {
    var that = this

    if (app.globalData.hasLogin === false) {
      wx.login({
        success: _getUserInfo
      })
    } else {
      _getUserInfo()
    }

    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            hasUserInfo: true,
            userInfo: res.userInfo
          })
          // that.update()
        }
      })
    }
    //上面的是获取微信用户头像和nickName,微信官方代码
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
          wx.redirectTo({
            url: '/pages/index/index'
            //明天单独做个账号密码错误的页面吧，不用新增。用之前成绩查询失败的页面就好。改一改。现在真的睡觉
          })
        }
      }
    })
  }
})
