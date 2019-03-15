var app = getApp()
Page({
  data: {
    uid: '',
    pwd: '',
    jsonContent: {},
    jsonStr: "",
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    angle: 0,
    isLoading: true,
  },
  login: function(uid, pwd) {
    var that = this;
    wx.request({
      url: app.globalData.apiURL + '/welcome.php?uid=' + uid + '&pwd=' + pwd,
      success: function(res) {
        that.setData({
          jsonStr: res.data,
        })
        console.log(res.data);
        //账号密码错误以下功能实现跳转错误页面
        if (res.data.todayCourse.getCourseStatus != 403) {
          app.globalData.uid = uid;
          app.globalData.pwd = pwd;
          //设置本地Storage,维持登录态用
          wx.setStorageSync('uid', uid);
          wx.setStorageSync('pwd', pwd);
          wx.switchTab({
            url: '../bookSearch/index',
          })
        } else {
          app.globalData.uid = "";
          app.globalData.pwd = "";
          wx.setStorageSync('uid', '');
          wx.setStorageSync('pwd', '');
          console.log(that.data.isLoading, uid, pwd)
          that.setData({
            isLoading: false
          })
        }
      }
    })

  },
  onLoad: function() {
    var that = this;
    var uid = app.globalData.uid;
    var pwd = app.globalData.pwd;
    if (this.checkHasLogin()) {
      //值是true,有登录缓存，登陆一下试试
      this.login(uid, pwd);
    } else {
      this.onReady();
    }
  },
  checkHasLogin: function() {
    var uid = wx.getStorageSync('uid');
    var pwd = wx.getStorageSync('pwd');
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
    var uid = e.detail.value.uid;
    var pwd = e.detail.value.pwd;
    if (uid.length == 0 || pwd.length == 0) {
      wx.showToast({
        title: '输入有误',
        image: '/images/info.png',
        icon: 'none',
        duration: 1000
      });
    } else {
      wx.request({
        url: app.globalData.apiURL + '/welcome.php?uid=' + uid + '&pwd=' + pwd,
        success: function(res) {
          that.setData({
            jsonStr: res.data,
          })
          wx.hideToast()
          // console.log(res.data);
          //账号密码错误以下功能实现密码错误Toast
          if (res.data.todayCourse.getCourseStatus == 403) {
            wx.showToast({
              title: '账号密码有误',
              image: '/images/info.png',
              icon: 'none',
              duration: 1000
            });
          } else {
            app.globalData.uid = uid;
            app.globalData.pwd = pwd;
            //设置本地Storage,维持登录态用
            wx.setStorageSync('uid', uid);
            wx.setStorageSync('pwd', pwd);
            wx.navigateTo({
              url: '/pages/welcome/welcome?uid=' + uid + '&pwd=' + pwd
            })
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
  UidInput: function(e) {
    if (e.detail.value.length >= 9) {
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
  }
})