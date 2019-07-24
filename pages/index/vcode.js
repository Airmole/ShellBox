// pages/index/reset.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    jsonStr: '',
    PreInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.getVcode();
  },
  getVcode: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiURL + '/v2/getCookie.php',
      success: function(res) {
        console.log(res.data);
        that.setData({
          PreInfo: res.data,
        })
        if (res.data.code == 500) {
          wx.showToast({
            title: '教务异常，无法查询',
            icon: 'none',
            duration: 5000
          });
        }
      }
    });
  },
  submitInfo: function(e) {
    wx.showToast({
      title: "loading...",
      icon: "loading",
      duration: 10000
    })
    var that = this;
    var username = wx.getStorageSync('uid');
    var password = wx.getStorageSync('newpwd');
    var vcode = e.detail.value.vcode;
    if (vcode == '' || vcode.length != 4) {
      wx.showToast({
        title: '验证码有误',
        image: '/images/info.png',
        icon: 'none',
        duration: 1000
      });
      return;
    } else {
      wx.request({
        url: app.globalData.apiURL + '/v2/profile.php',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          username: username,
          password: password,
          cookie: that.data.PreInfo.cookie,
          vcode: vcode
        },
        success: function(res) {
          that.setData({
            jsonStr: res.data,
          })
          wx.hideToast()
          console.log(res.data);
          //账号密码错误以下功能实现密码错误Toast
          if (res.data.code == 401) {
            wx.showToast({
              title: '账号密码有误',
              image: '/images/info.png',
              duration: 3000
            });
            that.reLogin();
          } else if (res.data.code == 402) {
            wx.showToast({
              title: '验证码错误',
              image: '/images/info.png',
              duration: 3000
            });
            that.getVcode();
          } else if (res.data.name != "" || res.data.number != "") {
            wx.redirectTo({
              url: '/pages/score/score?cookie=' + that.data.PreInfo.cookie + '&vcode=' + vcode,
            })
          } else {
            wx.redirectTo({
              url: '/pages/error/queryerror?ErrorTips=暂时无法查询,咨询客服学长了解详情'
            })
          }
        }
      })
    }
  },
  //注销重登录
  reLogin: function() {
    app.globalData.uid = "";
    app.globalData.pwd = "";
    app.globalData.newpwd = "";
    wx.setStorageSync('uid', '');
    wx.setStorageSync('pwd', '');
    wx.setStorageSync('newpwd', '');
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
})