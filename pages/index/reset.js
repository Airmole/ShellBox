// pages/index/reset.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jsonStr: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  isNumber: function(obj) {
    return typeof obj === 'number' && !isNaN(obj)
  },
  submitInfo: function(e) {
    wx.showToast({
      title: "重置...",
      icon: "loading",
      duration: 10000
    })
    var that = this;
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    var repassword = e.detail.value.repassword;
    var idcard = e.detail.value.idcard;
    var remindMsg = e.detail.value.remindMsg;


    if (password !== repassword) {
      wx.showToast({
        title: '密码不一致',
        image: '/images/info.png',
        icon: 'none',
        duration: 1000
      });
      return;
    } else if (remindMsg == '') {
      wx.showToast({
        title: '请输入提示信息',
        icon: 'none',
        duration: 1000
      });
      return;
    } else if (remindMsg.length <= 3) {
      wx.showToast({
        title: '请输入3位以上提示信息',
        icon: 'none',
        duration: 1000
      });
      return;
    }  else {
      wx.request({
        url: app.globalData.apiURL + '/v2/reset.php?username=' + username + '&idcard=' + idcard + '&newPassword=' + password + '&remindMsg=' + remindMsg,
        success: function(res) {
          that.setData({
            jsonStr: res.data,
          })
          wx.hideToast()
          console.log(res.data);
          //账号密码错误以下功能实现密码错误Toast
          if (res.data.code == '200') {
            wx.showToast({
              title: '密码修改成功',
              image: '/images/info.png',
              icon: 'success',
              duration: 1000
            });
            wx.navigateTo({
              url: './index'
            })
          } else {
            wx.showToast({
              title: '学号/身份证错误',
              icon: 'none',
              duration: 3000
            });
          }
        }
      })
    }
  },

})