// pages/course/stulist/content.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    isLoading: true,
    title: '',
    code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let courseName = options.course;
    let code = options.code;
    this.setData({ title: courseName, code: code });
    this.getStulist(code);
  },
  getStulist: function(code) {
    var _this = this;
    wx.request({
      url: `${app.globalData.domain}/edu/stulist/${code}`,
      method: "GET",
      timeout: 6000,
      success: function(res){
        _this.setData({ students: res.data, isLoading: false });
      }
    })
  }
})