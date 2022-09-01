// pages/school/finance/bind.js
var app = getApp()
Page({
  data: {
    username: '',
    password: '',
    jsonContent: {},
    jsonStr: "",
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    vcode_focus: false,
    angle: 0,
    cookieInfo: {},
    isLoading: true,
    password:'',
  },
  onLoad: function(options) {
    const hasFinanceCookie = app.globalData.financeInfo ? true : false
    if (hasFinanceCookie) {
      wx.redirectTo({ url: './index' })
      return
    }
    var that = this
    var uid = app.globalData.edusysUserInfo.uid
    let username = uid
    const password = wx.getStorageSync('financePassword') || ''
    password = password ? password : app.globalData.edusysUserInfo.idcard.substr(12)
    that.setData({
      username: username,
      password: password
    })
    this.getVcode();
    if (this.checkHasLogin()) {} else {
      this.onReady();
    }
  },
  checkHasLogin: function() {
    var username = wx.getStorageSync('uid') || ''
    var password = wx.getStorageSync('financePassword') || ''
    if (username != '' && password != '') {
      return true;
    } else {
      return false;
    }
  },
  submitInfo: function(e) {
    wx.showToast({
      title: "登录中...",
      icon: "loading",
      duration: 10000
    })
    var that = this
    var username = e.detail.value.username
    var password = e.detail.value.password
    var vcode = e.detail.value.vcode
    if ((username.length == 0 || password.length == 0) || vcode.length != 5) {
      wx.showToast({
        title: '输入有误',
        image: '/images/info.png',
        icon: 'none',
        duration: 1000
      })
    } else {
      wx.request({
        url: `${app.globalData.domain}/finance/login`,
        method: "POST",
        data: {
          uid: app.globalData.edusysUserInfo.uid,
          username: username,
          password: password,
          cookie: that.data.cookieInfo.cookie,
          vcode: vcode,
        },
        success: function(res) {
          // console.log(res.data)
          wx.hideToast()
          // console.log(res.data);
          //账号密码错误以下功能实现密码错误Toast
          if (res.statusCode == 200) {
            that.setData({ jsonStr: res.data })
            app.globalData.financeInfo = {
              username: username,
              password: password,
              vcode: vcode,
              cookie: that.data.cookieInfo.cookie
            };
            //设置本地Storage,维持登录态用
            wx.setStorageSync('financePassword', password)
            wx.redirectTo({ url: './index' })
          } else {
            wx.showToast({
              title: res.data.detail ? res.data.detail.content : res.data.message,
              icon: 'none',
              duration: 3000
            })
            that.getVcode()
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
  usernameInput: function(e) {
    if (e.detail.value.length >= 9) {
      wx.hideKeyboard()
    }
  },
  vcodeInput: function(e) {
    if (e.detail.value.length >= 5) {
      wx.hideKeyboard()
    }
  },
  inputFocus: function(e) {
    if (e.target.id == 'username') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'password') {
      this.setData({
        'passwd_focus': true
      });
    } else if (e.target.id == 'vcode') {
      this.setData({
        'vcode_focus': true
      });
    }
  },
  inputBlur: function(e) {
    if (e.target.id == 'username') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'password') {
      this.setData({
        'passwd_focus': false
      });
    } else if (e.target.id == 'vcode') {
      this.setData({
        'vcode_focus': false
      });
    }
  },
  onReady: function() {
    var that = this
    setTimeout(function() {
      that.setData({
        isLoading: false
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  },
  getVcode: function() {
    var that = this;
    wx.request({
      url: `${app.globalData.domain}/finance/login`,
      success: function(res) {
        // console.log(res.data);
        that.setData({
          cookieInfo: res.data,
        })
        if (res.data.code != 200) {
          wx.showToast({
            title: '财务系统异常',
            icon: 'none',
            duration: 5000
          });
        }
      }
    })
  }
})