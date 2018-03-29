var app = getApp()
Page({
  data: {
    uid: '',
    pwd: '',
    jsonContent: {},
  },
  submitInfo: function (e) {
    let that = this;
    that.setData({
      uid: e.detail.value.uid,
      pwd: e.detail.value.pwd,
    });
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
      wx.navigateTo({
        url: '/pages/welcome/welcome?uid=' + e.detail.value.uid + '&pwd=' + e.detail.value.pwd
      })
    }
  }
})