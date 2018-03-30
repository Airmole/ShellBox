// pages/stuInfo/stuInfo.js
var app = getApp()

Page({
  onLoad: function () {
    this.setData({
      icon20: base64.icon20,
      icon60: base64.icon60
    });
  },
  onLoad: function () {
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

    this.setData({
      uid: app.globalData.uid,
      pwd: app.globalData.pwd,
    });
    wx.request({
      url: 'https://airmole.cn/wechat/wxapp/api/Airmole_jiaowuInfoQuery.php?uid=' + app.globalData.uid + '&pwd=' + app.globalData.pwd,
      success: function (res) {
        that.setData({
          jsonStr: res.data,
        })
        // console.log(res.data);
        //账号密码错误以下功能实现跳转错误页面
        if (res.data[0][0].stuName == '') {
          wx.redirectTo({
            url: '/pages/error/queryerror'
          })
        }
      }
    })
  }
});
