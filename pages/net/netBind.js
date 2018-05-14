// pages/net/netBind.js
//获取应用实例
var app = getApp();
Page({
  data: {
    stuId: " ",
    // password: " ",
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    angle: 0
  },
  onReady: function () {
    var that = this;
    that.setData({
      stuId: app.globalData.uid,
      // password: app.globalData.pwd,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  NetQuery: function (e) {
    console.log(e.detail.value.uid)
    console.log(e.detail.value.netpwd)
    let that = this;
    if (e.detail.value.netpwd == '') {
      wx.showToast({
        title: '请输入密码',
        image: '/images/info.png',
        icon: 'none',
        duration: 1000
      });
    } else {
      wx.navigateTo({
        url: '../net/netfare'
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
});