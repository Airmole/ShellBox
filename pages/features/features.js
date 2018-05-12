// pages/features/features.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    grids: [
      { name: '校历查询', navurl: '/pages/calendar/calendar', gridIcon: '/images/calendar_HL.png' },
      { name: '扫码找书', navurl: '/pages/bookSearch/bookInfo/isbn/iputIsbn', gridIcon: '/images/scanCode.png' },
      { name: '我的信息', navurl: '/pages/stuInfo/stuInfo', gridIcon: '/images/studentInfo.png' },
      { name: '成绩查询', navurl: '/pages/score/showScore/showScore', gridIcon: '/images/score_HL.png' },
      { name: '通讯录', navurl: '/pages/tel/departmentTel/departmentTel', gridIcon: '/images/contacts.png' },
      { name: '校园出行', navurl: '/pages/Transport/Transport', gridIcon: '/images/transport.png' },
      // { name: '网费查询', navurl: '/pages/net/netBind', gridIcon: '/images/netfare.png' },
      { name: '关于我们', navurl: '/pages/features/about', gridIcon: '/images/about_HL.png' },],
    swiperPic: [
      { url: 'https://airmole.cn/wechat/wxapp/images/swiper1.jpg' },
      { url: 'https://airmole.cn/wechat/wxapp/images/swiper2.jpg' },
      { url: 'https://airmole.cn/wechat/wxapp/images/swiper3.gif' },
      { url: 'https://airmole.cn/wechat/wxapp/images/swiper4.gif' },
      { url: 'https://airmole.cn/wechat/wxapp/images/swiper5.gif' }
    ]
  },
  building: function () {
    wx.showToast({
      title: '努力开发中...',
      image: '/images/info.png',
      icon: 'none',
      duration: 1500
    });
  },
  //账户注销登录
  logout: function () {
    app.globalData.uid = "";
    app.globalData.pwd = "";
    wx.setStorageSync('uid', '');
    wx.setStorageSync('pwd', '');
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

})