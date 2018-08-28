var app = getApp()
Page({
  data: {
    uid: '',
    pwd: '',
    classStr: '',
    marginleft: '52',
    help_status: false,
    ClassDetail: "",
  },
  onLoad: function(options) {
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 5000
    })
    var that = this;
    that.setData({
      uid: app.globalData.uid,
      pwd: app.globalData.pwd,
    });
    if (app.globalData.uid == '' || app.globalData.pwd == '') {
      wx.redirectTo({
        url: '/pages/index/index'
      })
    } else {
      wx.request({
        url: 'https://airmole.cn/wechat/wxapp/api/ClassTest.php?uid=' + app.globalData.uid + '&pwd=' + app.globalData.pwd,
        success: function(res) {
          that.setData({
            classStr: res.data,
            // remind:"完成",
          })
          wx.hideToast()
          console.log(res.data);
        }
      })
    }
  },
  onPullDownRefresh: function() {
    var that = this;
    that.onLoad();
    wx.stopPullDownRefresh();
    wx.showToast({
      title: "刷新完成",
      icon: "succeed",
      duration: 2000
    })
  },
  tapHelp: function(e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function(e) {
    this.setData({
      'help_status': true,
      'ClassDetail': e.currentTarget.dataset.set
    });
  },
  hideHelp: function(e) {
    this.setData({
      'help_status': false
    });
  }
})