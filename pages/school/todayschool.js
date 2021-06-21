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
    area: '校内',
    text: '进校验证通过',
    color: '#75F454',
    pageType: 'inschool',
    confirmed: false,
    inConfirmBtn: 'https://upload-images.jianshu.io/upload_images/4697920-0a8ab41c005732e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
    outConfirmBtn: 'https://upload-images.jianshu.io/upload_images/4697920-17ce17936d68879c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.inital(options)
  },
  inital: function (options) {
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
    let color = '#75F454'
    let text = '进校验证通过'
    if (options.type == 'inschool') {
      color = '#75F454'
      text = '进校验证通过'
    }
    if (options.type == 'outschool') {
      color = '#5697D6'
      text = '出校验证通过'
    }
    this.setData({ timeText: timeText, userinfo: userinfo, pageType: options.type, color: color, text: text })
  },
  confirm: function () {
    this.setData({
      confirmed: true
    })
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

  }
})