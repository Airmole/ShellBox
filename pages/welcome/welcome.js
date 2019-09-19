var app = getApp()
Page({
  data: {
    uid: "",
    name: "",
    classroom:"",
    jsonStr: "",
    hasUserInfo: 0
  },
  start: function() {
    wx.reLaunch({
      url: '../bookSearch/index',
    })
  },
  onLoad: function(options) {
    var that = this
    this.setData({
      uid: options.uid,
      name: options.name,
      classroom: options.classroom,
    });
  },
  bindGetUserInfo: function(e) {
    console.log(e);
    app.globalData.nickName = e.detail.userInfo.nickName;
    this.start();
  }
})