// pages/course/search.js
var app = getApp();

Page({
  data: {
    header: {
      defaultValue: '',
      inputValue: '',
      help_status: false,
      help_class_status: false
    },
    main: {
      mainDisplay: true, // main 显示的变化标识
      list: []
    },
    pageType: 'teacher'
  },
  bindClearSearchTap: function (e) {
    this.setData({ 'main.mainDisplay': true, 'main.total': 0, 'header.inputValue': '' });
  },
  bindSearchInput: function (e) {
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

  bindSearchInputClass: function (e) {
    if (this.data.main.mainDisplay != false) {
      this.setData({
        'main.mainDisplay': !this.data.main.mainDisplay
      });
    }
    this.setData({
      'header.inputValue': e.detail.value
    });
    this.searchClass();
    return e.detail.value;
  },

  // 点击搜索教师
  bindConfirmSearchTap: function () {
    this.search();
  },
  // 点击搜索班级
  bindConfirmSearchTapClass: function () {
    this.searchClass();
  },
  // 搜索教师
  search: function (key) {
    if (this.data.header.inputValue.length < 1) {
      wx.showToast({ title: '请输入教师名', image: '/images/info.png' });
      return;
    }
    var that = this;
    var uid = app.globalData.edusysUserInfo.uid
    wx.request({
      url: app.globalData.domain + '/edu/teacher/courseSchedule/index',
      data: { uid: uid, keyword: that.data.header.inputValue },
      success: function (res) {
        if (res.data.code == '500') {
          wx.showToast({ title: '系统异常', image: '/images/info.png' })
          return
        }
        that.setData({ 'main.list': res.data })
      }
    })

  },
  // 搜索班级
  searchClass: function (key) {
    if (this.data.header.inputValue.length < 1) {
      wx.showToast({ title: '请输入班级名', image: '/images/info.png' });
      return;
    }
    var that = this;
    var uid = app.globalData.edusysUserInfo.uid;
    wx.request({
      url: app.globalData.domain + '/edu/class/courseSchedule/index',
      data: { uid: uid, keyword: that.data.header.inputValue },
      success: function (res) {
        if (res.data.code == '500') {
          wx.showToast({ title: '教务异常不可查', image: '/images/info.png' });
          return;
        }
        that.setData({ 'main.list': res.data })
      }
    })

  },
  onLoad: function (options) {
    var that = this;
    if (options.type == 'class') {
      wx.setNavigationBarTitle({ title: '班级课表查询' });
      that.setData({ pageType: 'class' });
    } else {
      that.setData({ pageType: 'teacher' });
    }
  },

  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    // console.log(e)
    var that = this;
    that.setData({ 'header.help_status': true });
  },
  showHelpClass: function (e) {
    // console.log(e)
    var that = this;
    that.setData({ 'header.help_class_status': true });
  },
  hideHelp: function (e) {
    this.setData({ 'header.help_status': false, 'header.help_class_status': false });
  }
});
