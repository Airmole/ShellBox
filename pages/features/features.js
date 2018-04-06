// pages/features/features.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    grids: [
      { name: '校历查询', navurl: '/pages/calendar/calendar', gridIcon: '/images/calendar_HL.png' },
      { name: '扫码找书', gridIcon: '/images/scanCode.png', event: "scan" },
      { name: '学籍信息', navurl: '/pages/stuInfo/stuInfo', gridIcon: '/images/studentInfo.png' },
      { name: '成绩查询', navurl: '/pages/score/showScore/showScore', gridIcon: '/images/score_HL.png' },
      // { name: '四六级成绩', navurl: '/pages/calendar/calendar', gridIcon: '/images/cet.png' },
      // { name: '校园出行', navurl: '/pages/calendar/calendar', gridIcon: '/images/transport.png' },
      { name: '通讯录', navurl: '/pages/tel/departmentTel/departmentTel', gridIcon: '/images/contacts.png' }, { name: '关于我们', navurl: '/pages/features/about', gridIcon: '/images/about_HL.png' },],
    swiperPic: [
      { url: 'https://airmole.cn/wechat/wxapp/images/swiper1.jpg' },
      { url: 'https://airmole.cn/wechat/wxapp/images/swiper2.jpg' },
      { url: 'https://airmole.cn/wechat/wxapp/images/swiper3.gif' },
      { url: 'https://airmole.cn/wechat/wxapp/images/swiper4.gif' },
      { url: 'https://airmole.cn/wechat/wxapp/images/swiper5.gif' }
    ]
  },
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
  /**
 * 扫码
 */
  scan: function () {
    wx.scanCode({
      success: (res) => {
        if (res.errMsg !== 'scanCode:ok') {
          wx.showToast({
            title: res.errMsg,
            icon: 'loading',
            duration: 8000
          })
          return false;
        }

        if (res.scanType !== 'EAN_13') {
          wx.showToast({
            title: '这不是ISBN码',
            icon: 'loading',
            duration: 8000
          })
          return false;
        }
        wx.navigateTo({
          url: '../../pages/bookSearch/bookInfo/bookInfo?ISBN=' + res.result
        })
      }
    })
  }
})