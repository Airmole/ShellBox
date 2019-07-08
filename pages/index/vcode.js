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
    wx.request({
      url: app.globalData.apiURL + '/v3/getCookie.php',
      success: function(res) {
        console.log(res.data);
        that.setData({
          PreInfo: res.data,
        })
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
        url: app.globalData.apiURL + '/v3/profile.php?username=' + username + '&password=' + password + '&cookie=' + that.data.PreInfo.cookie + '&vcode=' + vcode,
        success: function(res) {
          that.setData({
            jsonStr: res.data,
          })
          wx.hideToast()
          console.log(res.data);
          //账号密码错误以下功能实现密码错误Toast
          if (res.data.name == '') {
            wx.showToast({
              title: '输入有误',
              image: '/images/info.png',
              icon: 'success',
              duration: 1000
            });
            that.onLoad();
          } else {
            wx.redirectTo({
              url: '/pages/score/score?cookie=' + that.data.PreInfo.cookie + '&vcode=' + vcode,
            })
          }
        }
      })
    }
  },

})