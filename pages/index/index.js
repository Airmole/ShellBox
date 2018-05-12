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
    angle: 0
  },
  onLoad: function () {
    var uid = wx.getStorageSync('uid')
    var pwd = wx.getStorageSync('pwd')
    if (pwd != "") {
      app.globalData.uid = uid;
      app.globalData.pwd = pwd;
      wx.switchTab({
        url: '../bookSearch/index',
      })
    }
  },
  submitInfo: function (e) {
    let that = this;
    app.globalData.uid = e.detail.value.uid;
    app.globalData.pwd = e.detail.value.pwd;
    if (e.detail.value.uid.length == 0 || e.detail.value.pwd.length == 0) {
      wx.showToast({
        title: '输入有误',
        image: '/images/info.png',
        icon: 'none',
        duration: 1000
      });
    } else {
      wx.request({
        url: 'https://airmole.cn/wechat/wxapp/api/Airmole_jiaowuInfoQuery.php?uid=' + e.detail.value.uid + '&pwd=' + e.detail.value.pwd,
        success: function (res) {
          that.setData({
            jsonStr: res.data,
          })
          // console.log(res.data);
          //账号密码错误以下功能实现密码错误Toast
          if (res.data[0][0].stuName == '') {
            wx.showToast({
              title: '账号密码有误',
              image: '/images/info.png',
              icon: 'none',
              duration: 1000
            });
          } else {
            //设置本地Storage,维持登录态用
            wx.setStorageSync('uid', e.detail.value.uid);
            wx.setStorageSync('pwd', e.detail.value.pwd);
            wx.navigateTo({
              url: '/pages/welcome/welcome?uid=' + e.detail.value.uid + '&pwd=' + e.detail.value.pwd
            })
          }
        }
      })
    }
  },
  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  }
})