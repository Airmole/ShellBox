// pages/school/todayschool.js
var util = require("../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeText: '',
    userinfo: '',
    area: '校内'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.inital()
  },
  inital: function () {
    const userinfo = app.globalData.edusysUserInfo
    if (userinfo == '') {
      wx.redirectTo({
        url: '../index/index'
      })
    }
    const date = new Date()
    const nowTimestamp = date.getTime()
    const timeText = util.formatDateTime(nowTimestamp, true)
    console.log(userinfo)
    this.setData({ timeText: timeText, userinfo: userinfo })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  changeArea: function (){
    if (this.data.area == '校内') {
      this.setData({ area: '校外' })
      return
    }

    if (this.data.area == '校外') {
      this.setData({ area: '校内' })
      
      return
    }
  }
})