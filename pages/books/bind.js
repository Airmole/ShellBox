// pages/books/bind.js
var app = getApp()
Page({
  data: {
    uid: '',
    pwd: '',
    jsonContent: {},
    jsonStr: "",
    help_status: false,
    reset_status: false,
    userid_focus: false,
    passwd_focus: false,
    vcode_focus: false,
    resetUid_focus: false,
    idCardNO_focus: false,
    angle: 0,
    PreInfo: {},
    isLoading: true,
    defaultUid: '',
    storageOpacPassword:''
  },
  onLoad: function() {
    var that = this;
    var uid = app.globalData.edusysUserInfo.uid;
    var pwd = wx.getStorageSync('opacPassword');
    that.setData({
      defaultUid: uid,
      storageOpacPassword:pwd
    })
    this.getVcode();
    if (this.checkHasLogin()) {} else {
      this.onReady();
    }
  },
  checkHasLogin: function() {
    var uid = wx.getStorageSync('uid');
    var pwd = wx.getStorageSync('opacPassword');
    if (uid != '' && pwd != '') {
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
    var that = this;
    var uid = e.detail.value.username;
    var pwd = e.detail.value.password;
    var vcode = e.detail.value.vcode;
    if ((uid.length == 0 || pwd.length == 0) || vcode.length != 4) {
      wx.showToast({
        title: '输入有误',
        image: '/images/info.png',
        icon: 'none',
        duration: 1000
      });
    } else {
      wx.request({
        url: `${app.globalData.domain}/book/login/index`,
        method: "POST",
        data: {
          uid: app.globalData.edusysUserInfo.uid,
          username: uid,
          password: pwd,
          cookie: that.data.PreInfo.cookie,
          vcode: vcode,
          token: that.data.PreInfo.token,
        },
        success: function(res) {
          that.setData({
            jsonStr: res.data,
          })
          // console.log(res.data)
          wx.hideToast()
          // console.log(res.data);
          //账号密码错误以下功能实现密码错误Toast
          if (res.data.code == 401) {
            wx.showToast({
              title: '账号密码有误',
              image: '/images/info.png',
              duration: 3000
            });
            that.getVcode();
          } else if (res.data.code == 402) {
            wx.showToast({
              title: '验证码错误',
              image: '/images/info.png',
              duration: 3000
            });
            that.getVcode();
          } else if (res.data.code == '200') {
            if (res.data.readerInfo.name != "") {

              app.globalData.uid = uid;
              app.globalData.opacLogin = {
                uid: uid,
                pwd: pwd,
                vcode: vcode,
                cookie: that.data.PreInfo.cookie,
                token: that.data.PreInfo.token
              };
              //设置本地Storage,维持登录态用
              wx.setStorageSync('opacPassword', pwd);
              wx.redirectTo({
                url: '../books/my'
              })
            }
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 3000
            });
          }
        },
        complete: function() {
          that.getVcode();
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
  UidInput: function(e) {
    if (e.detail.value.length >= 18) {
      wx.hideKeyboard();
    }
  },
  inputFocus: function(e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    } else if (e.target.id == 'vcode') {
      this.setData({
        'vcode_focus': true
      });
    } else if (e.target.id == 'resetUid') {
      this.setData({
        'resetUid_focus': true
      });
    } else if (e.target.id == 'idCardNO') {
      this.setData({
        'idCardNO_focus': true
      });
    }
  },
  inputBlur: function(e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    } else if (e.target.id == 'vcode') {
      this.setData({
        'vcode_focus': false
      });
    } else if (e.target.id == 'resetUid') {
      this.setData({
        'resetUid_focus': false
      });
    } else if (e.target.id == 'idCardNO') {
      this.setData({
        'idCardNO_focus': false
      });
    }
  },
  onReady: function() {
    var that = this;
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
      url: `${app.globalData.domain}/book/login/cookie`,
      success: function(res) {
        // console.log(res.data);
        that.setData({
          PreInfo: res.data,
        })
        if (res.data.code == 500) {
          wx.showToast({
            title: '图书馆系统异常',
            icon: 'none',
            duration: 5000
          });
        }
      }
    });
  },
  resetPassword: function() {
    this.setData({
      help_status: false,
      reset_status: true,
    })
  },
  hideReset: function() {
    this.setData({
      help_status: false,
      reset_status: false,
    })
  },
})