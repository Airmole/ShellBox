// pages/index/reset.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    jsonStr: '',
    PreInfo: {},
    isTeacher: false,
    needJudge: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var username = wx.getStorageSync('uid');
    if(username.length >=2 && username.length <8){
      this.setData({
        isTeacher: true,
        needJudge: false
      })
    }
    var that = this;
    if (Object.keys(options.to) == 0) {
      wx.redirectTo({
        url: '/pages/bookSearch/index'
      })
      return;
    }
    var courseCache = wx.getStorageSync('personal19Class');
    var scoreCache = wx.getStorageSync('p19Score');
    if (options.to == 'grkb') {
      that.setData({
        toPage: '/pages/classQuery/index'
      })
      if (courseCache != '' && options.update == '1') {

      } else if (courseCache != '' && options.update == '0') {
        wx.redirectTo({
          url: '/pages/classQuery/index',
        })
      }
    } else if (options.to == 'score') {
      that.setData({
        toPage: '/pages/score/score'
      })
      if (scoreCache != '' && options.update == '1') {

      } else if (scoreCache != '' && options.update == '0') {
        wx.redirectTo({
          url: '/pages/score/score',
        })
      }
    } else if (options.to == 'teacherKb') {
      that.setData({
        toPage: '/pages/classQuery/teacher'
      })
      if (courseCache != '' && options.update == '1') {

      } else if (courseCache != '' && options.update == '0') {
        wx.redirectTo({
          url: '/pages/classQuery/teacher',
        })
      }
    } else if (options.to == 'stuList') {
      that.setData({
        queryCode: options.queryCode,
        toPage: '/pages/classQuery/courseStulist'
      })
      if (options.update == '1') {

      } else if (options.update == '0') {
        wx.redirectTo({
          url: '/pages/classQuery/courseStulist?queryCode='+options.queryCode
        })
      }
    } else {
      wx.redirectTo({
        url: '/pages/bookSearch/index'
      })
    }

    that.getVcode();
  },
  getVcode: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiURL + '/v5/getCookie.php',
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
    var needJudge = this.data.needJudge
    if (vcode == '' || vcode.length != 4) {
      wx.showToast({
        title: '验证码有误',
        image: '/images/info.png',
        icon: 'none',
        duration: 1000
      });
      return;
    } else {
      let url = app.globalData.apiURL + '/v5/profile1.php'
      if(username.length >=2 && username.length <8){
        url = app.globalData.apiURL + '/teacher/profile.php'
      }
      wx.request({
        url: url,
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          username: username,
          password: password,
          cookie: that.data.PreInfo.cookie,
          vcode: vcode,
          judge: needJudge
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
              url: that.data.toPage + '?cookie=' + that.data.PreInfo.cookie + '&vcode=' + vcode + '&update=1'+'&queryCode='+that.data.queryCode,
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
  checkNeedJudge(e){
    // console.log(e)
    this.setData({
      needJudge: e.detail.value.indexOf("needJudge") ? false :true
    })
  },
  //注销重登录
  reLogin: function() {
    app.globalData.uid = "";
    app.globalData.pwd = "";
    app.globalData.newpwd = "";
    wx.setStorageSync('uid', '');
    wx.setStorageSync('newpwd', '');
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
})