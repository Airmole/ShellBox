//获取应用实例
var app = getApp();
var base64 = require('../../utils/base64.min.js');
Page({
  data: {
    remind: '加载中',
    jsonStr: ''
  },
  onLoad: function(para) {
    console.log(para)

    this.getData(para);

  },
  jyHistory: function() {
    var _this = this;
    if (!_this.data.jyHistoryTap) {
      _this.setData({
        jyHistoryTap: true
      });
      setTimeout(function() {
        _this.setData({
          jyHistoryTap: false
        });
      }, 2000);
    }
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
          that.setData({
            jsonStr: res.data,
          })
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
  boNowReadingRecord: function(){
    wx.pageScrollTo({
      selector: '#nowReadingRecord',
      duration: 1000,
      complete:function(){
        console.log(11111111111)
      }
    })
  }
});