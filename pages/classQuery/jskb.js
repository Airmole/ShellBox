// pages/classQuery/jskb.js
//获取应用实例
var app = getApp();

Page({
  data: {
    header: {
      defaultValue: '',
      inputValue: '',
      help_status: false
    },
    main: {
      mainDisplay: true, // main 显示的变化标识
      list: []
    }
  },

  bindClearSearchTap: function(e) {
    this.setData({
      'main.mainDisplay': true,
      'main.total': 0,
      'header.inputValue': ''
    });
  },

  bindSearchInput: function(e) {
    if (this.data.main.mainDisplay != false) {
      this.setData({
        'main.mainDisplay': !this.data.main.mainDisplay
      });
    }
    this.setData({
      'header.inputValue': e.detail.value
    });
    this.search();
    return e.detail.value;
  },

  // 点击搜索
  bindConfirmSearchTap: function() {
    this.search();
  },
  // 搜索
  search: function(key) {
    if (this.data.header.inputValue.length < 1) {
      wx.showToast({
        title: '请输入教师名',
        image: '/images/info.png'
      })
      return;
    }
    var that = this;
    var uid = wx.getStorageSync('uid');
    var pwd = wx.getStorageSync('newpwd');
    wx.request({
      url: app.globalData.apiURL + '/v4/teacherTable/teacherTableList.php',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        username: uid,
        password: pwd,
        keyword: that.data.header.inputValue
      },
      success: function(res) {
        if(res.data.code == '500'){
          wx.showToast({
            title: '教务异常不可查',
            image: '/images/info.png'
          })
        }
        that.setData({
          'main.list':res.data
        })
      }
    })

  },


  onLoad: function(options) {
    var _this = this;
  },

  tapHelp: function(e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function(e) {
    console.log(e)
    var that = this;
    that.setData({
      'header.help_status': true
    });
  },
  hideHelp: function(e) {
    this.setData({
      'header.help_status': false
    });
  }
});