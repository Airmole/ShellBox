// pages/net/netBind.js
//获取应用实例
var app = getApp();
Page({
  data: {
    uid: "",
    netPassword: "",
    help_status: false,
    netPassword_focus: false,
    angle: 0,
    isBind: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 5000
    })
    var uid = wx.getStorageSync('uid');
    var netPassword = wx.getStorageSync('netPassword');
    var that = this;
    if (uid != "" && netPassword != '') {
      app.globalData.netPassword = netPassword;
      wx.redirectTo({
        url: './netfare?uid=' + uid + '&netPassword=' + netPassword,
      })
      wx.hideToast();
    } else {
      that.setData({
        uid: uid,
        isBind: false
      });
      wx.hideToast();
    }
  },
  NetQuery: function(e) {
    var that = this;
    console.log(that.data.uid);
    console.log(e.detail.value.netPassword)
    if (e.detail.value.netPassword.length <= 5) {
      wx.showToast({
        title: '密码有误',
        image: '/images/info.png',
        icon: 'none',
        duration: 1000
      });
    } else {
      wx.request({
        url: app.globalData.apiURL + '/netFareExternal.php',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          username: that.data.uid,
          netPassword: e.detail.value.netPassword
        },
        success: function(res) {
          that.setData({
            netJson: res.data,
          })
          console.log(res.data);
          //查询出错
          if (res.data.code != "200") {
            wx.showToast({
              title: res.data.desc,
              icon: 'none',
              duration: 5000
            });
          } else if (res.data.code == "200") {
            //设置本地Storage,维持登录态用
            wx.setStorageSync('netPassword', e.detail.value.netPassword);
            wx.redirectTo({
              url: './netfare?uid=' + that.data.uid + '&netPassword=' + e.detail.value.netPassword
            })
          } else {
            wx.showToast({
              title: "无法查询，请联系客服",
              icon: 'none',
              duration: 5000
            });
          }
        }
      })
    }
  },
  tapHelp: function(e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function(e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function(e) {
    this.setData({
      'help_status': false
    });
  },
  inputFocus: function(e) {
    if (e.target.id == 'netPassword') {
      this.setData({
        'netPassword_focus': true
      });
    }
  },
  inputBlur: function(e) {
    if (e.target.id == 'netPassword') {
      this.setData({
        'netPassword_focus': false
      });
    }
  },
});