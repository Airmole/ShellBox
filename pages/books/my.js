// pages/books/my.js
var app = getApp()
var util = require("../../utils/util")
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
    renewBoxTop: 100,
    showPasswordModal: false
  },
  onLoad: function(para) {
    const opacLogin = app.globalData.opacLogin;
    this.getData(opacLogin);
  },
  hidePasswordModal: function () {
    this.setData({ showPasswordModal: false });
  },
  changePasswordAction: function (e) {
    var that = this;
    const newPassword = e.detail.value.newPassword;
    const recheckPassword = e.detail.value.recheckPassword;
    if (newPassword.length < 8 || recheckPassword.length < 8) {
      wx.showToast({ title: '新密码不得少于八位', icon: 'none' });
      return;
    }

    if (newPassword.length > 20 || recheckPassword.length > 20) {
      wx.showToast({ title: '新密码不得多于20位', icon: 'none' });
      return;
    }

    if (newPassword != recheckPassword){
      wx.showToast({ title: '两次密码不一样啊，再试试？', icon: 'none' });
      return;
    }

    const name = this.data.jsonStr.readerInfo.name;
    const cookie = this.data.jsonStr.input.cookie;

    wx.request({
      url:  `${app.globalData.domain}/book/login/password`,
      method: "POST",
      data: { name: name, password: newPassword, cookie: cookie },
      success: function(res) {
        if (res.data.code == 200 && res.data.desc == 'success') {
          wx.showToast({ title: res.data.data, icon: 'none' });
          wx.removeStorageSync('opacPassword');
          that.setData({ showPasswordModal: false});
          // 1秒后跳转重新登录
          setTimeout(function () { wx.redirectTo({ url: './bind' }) }, 1000);
        } else {
          wx.showToast({ title: res.data.data, icon: 'none' });
          return;
        }
      }
    })
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
  getJYHistory: function(page = 1) {
    var that = this;
    wx.request({
      url: `${app.globalData.domain}/book/history`,
      method: "POST",
      data: {
        username: that.data.jsonStr.input.username,
        password: that.data.jsonStr.input.password,
        cookie: that.data.jsonStr.input.cookie,
        vcode: that.data.vcode,
        token: that.data.jsonStr.input.token,
        sca: that.data.jsonStr.input.sca,
        page: page
      },
      success: function(res) {
        that.setData({ remind: false });
        // console.log(res.data);
        if (res.data.code == '200') {
          wx.hideToast()
          if (res.data.input.page == 1) {
            that.setData({ historyList: res.data })
          } else {
            let historyList = that.data.historyList
            historyList.input = res.data.input
            historyList.execTime = res.data.execTime
            historyList.data = that.data.historyList.data.concat(res.data.data)
            that.setData({ historyList: historyList })
          }
        } else {
          wx.showToast({
            title: res.data.desc,
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
      url: `${app.globalData.domain}/book/login/index`,
      method: "POST",
      data: {
        uid:  app.globalData.edusysUserInfo.uid ? app.globalData.edusysUserInfo.uid : para.uid,
        username: para.uid,
        password: para.pwd,
        cookie: para.cookie,
        vcode: para.vcode,
        token: para.token,
        sca: para.sca
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
      url: `${app.globalData.domain}/book/renew/vcode`,
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
        url:  `${app.globalData.domain}/book/renew`,
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
  },
  export: function () {
    const cookie = this.data.jsonStr.input.cookie
    const uid = this.data.jsonStr.input.username
    const manage = wx.getFileSystemManager()
    const fileName = util.formatDate(new Date()) + '_' + uid
    wx.downloadFile({
      url: `${app.globalData.domain}/book/history/export?uid=${uid}&cookie=${cookie}`,
      success (res) {
        var savePath = wx.env.USER_DATA_PATH + "/" + fileName
        if (res.statusCode == 200) {
          manage.saveFile({
            tempFilePath: res.tempFilePath,
            filePath: savePath+'.xlsx',
            success:function(res){
              wx.openDocument({
                filePath: res.savedFilePath,
                fileType: 'xlsx',
                showMenu: true
              })
            }
          })
        }
      }
    })
  },
  onReachBottom	() {
    const currentPage = this.data.historyList.input.page
    const total = this.data.jsonStr.readerInfo.borrowedBooksSum
    if (currentPage * 20 >= total) return
    const page = currentPage + 1
    this.getJYHistory(page)
  }
});