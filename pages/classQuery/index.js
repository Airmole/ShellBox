var app = getApp()
Page({
  data: {
    uid: '',
    pwd: '',
    classStr: '',
    marginleft: '52',
    help_status: false,
    ClassDetail: "",
    tableHeight: '800px',
  },
  onLoad: function(options) {
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 15000
    })
    var uid = wx.getStorageSync('uid');
    var pwd = wx.getStorageSync('pwd');
    var that = this;
    //获取屏幕高度，合理设置地图组件高度
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          tableHeight: res.windowHeight,
        });
      }
    });
    if (uid == '' || pwd == '') {
      wx.redirectTo({
        url: '/pages/index/index'
      })
    } else {
      wx.request({
        url: 'https://airmole.cn/wechat/wxapp/api/ClassTest1.php?uid=' + uid + '&pwd=' + pwd,
        success: function(res) {
          that.setData({
            classStr: res.data,
            // remind:"完成",
          })
          wx.hideToast()
          console.log(res.data);
          if (res.data.status == '500') {
            wx.navigateTo({
              url: '/pages/error/queryerror?ErrorTips=' + "教务异常，暂时无法查询",
            })
          }
          if (res.data == '密码有误') {
            wx.setStorageSync('uid', '');
            wx.setStorageSync('pwd', '');
            wx.redirectTo({
              url: '/pages/index/index'
            })
          }
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
  },
  /**
   * 长按复制到粘贴板的处理函数
   */
  copyIt: function(event) {
    wx.setClipboardData({
      data: event.target.id
    })
    wx.showToast({
      title: '已复制到粘贴版',
      icon: 'none',
      duration: 1000
    });
  },
})