//获取应用实例
var app = getApp();
var base64 = require('../../utils/base64.min.js');
Page({
  data: {
    remind: '加载中',
    jsonStr: '',
    historyList: '',
    showReadingList: true,
    vcode: '',
    vcode_focus: false,
    renew_status: false,
    renewNeed: '',
    renewBoxTop: 100
  },
  onLoad: function(para) {
    console.log(para)

    this.getData(para);

  },
  jyHistory: function() {
    var that = this;
    that.setData({
      showReadingList: false
    })
    wx.pageScrollTo({
      selector: '#historyRecord',
      duration: 1000
    })
  },
  getJYHistory: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiURL + '/opac/getBorrowedHistory.php',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        username: that.data.jsonStr.input.username,
        password: that.data.jsonStr.input.password,
        cookie: that.data.jsonStr.input.cookie,
        vcode: that.data.vcode,
        token: that.data.jsonStr.input.token,
      },
      success: function(res) {
        that.setData({
          remind: false,
        })
        // console.log(res.data);
        //账号密码错误以下功能实现密码错误Toast
        if (res.data.code == 401) {
          wx.showToast({
            title: '账号密码有误',
            image: '/images/info.png',
            duration: 3000
          });
          wx.redirectTo({
            url: '/pages/opac/bind',
          })
        } else if (res.data.code == 402) {
          wx.showToast({
            title: '验证码错误',
            image: '/images/info.png',
            duration: 3000
          });
          wx.redirectTo({
            url: '/pages/opac/bind',
          })
        } else if (res.data.code == '200') {
          wx.hideToast()
          that.setData({
            historyList: res.data,
          })
        } else {
          wx.showToast({
            title: '暂时无法查询',
            icon: 'none',
            duration: 3000
          });
        }
      }
    })
  },
  getData: function(para) {
    var that = this;
    wx.request({
      url: app.globalData.apiURL + '/opac/readerUCenter.php',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        username: para.uid,
        password: base64.decode(para.pwd),
        cookie: para.cookie,
        vcode: para.vcode,
        token: base64.decode(para.token),
      },
      success: function(res) {
        that.setData({
          remind: false,
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
          wx.redirectTo({
            url: '/pages/opac/bind',
          })
        } else if (res.data.code == 402) {
          wx.showToast({
            title: '验证码错误',
            image: '/images/info.png',
            duration: 3000
          });
          wx.redirectTo({
            url: '/pages/opac/bind',
          })
        } else if (res.data.readerInfo.name != "" && res.data.code == '200') {
          wx.hideToast()
          that.setData({
            jsonStr: res.data,
            vcode: res.data.input.vcode,
          })
          wx.setStorageSync('readingBook', res.data.reading);
          that.getJYHistory();
        } else {
          wx.showToast({
            title: '暂时无法登录',
            icon: 'none',
            duration: 3000
          });
        }
      }
    })
  },
  goNowReadingRecord: function() {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    })
    this.setData({
      showReadingList: true
    })
    wx.hideToast()
    wx.pageScrollTo({
      selector: '#nowReadingRecord',
      duration: 1000
    })
  },
  renewBook: function(e) {
    console.log(e)
    var renewNeed = e.currentTarget.dataset;
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    })
    var that = this;
    wx.request({
      url: app.globalData.apiURL + '/opac/getOpacVcode.php',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        cookie: that.data.jsonStr.input.cookie,
      },
      success: function(res) {
        wx.hideToast();
        that.setData({
          vcodeURL: res.data.vcode,
          renew_status: true,
          renewNeed: renewNeed,
          renewBoxTop: e.detail.y
        })
      }
    })
  },
  tapRenew: function(e) {
    if (e.target.id == 'renew') {
      this.hideRenew();
    }
  },
  showRenew: function(e) {
    this.setData({
      'renew_status': true
    });
  },
  hideRenew: function(e) {
    this.setData({
      'renew_status': false
    });
  },
  inputFocus: function(e) {
    if (e.target.id == 'vcode') {
      this.setData({
        'vcode_focus': true
      });
    }
  },
  inputBlur: function(e) {
    if (e.target.id == 'vcode') {
      this.setData({
        'vcode_focus': false
      });
    }
  },
  renewBookAction: function(e) {
    var that = this;
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    })
    if (e.detail.value.vcode.length != 4) {
      wx.showToast({
        title: '输入有误',
        icon: 'none',
        image: '/images/info.png'
      })
    } else {
      wx.request({
        url: app.globalData.apiURL + '/opac/renewBook.php',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          vcode: e.detail.value.vcode,
          barcode: that.data.renewNeed.barcode,
          check: that.data.renewNeed.checkcode,
          cookie: that.data.jsonStr.input.cookie
        },
        success: function(res) {
          // console.log(res.data);
          if (res.data.code == '200') {
            wx.showToast({
              icon: 'none',
              title: '续借成功',
              duration: 5000,
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.data,
              duration: 5000
            })
          }
          that.setData({
            renew_status: false,
          })
        }
      })
    }
  }
});