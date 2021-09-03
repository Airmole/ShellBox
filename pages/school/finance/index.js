// pages/school/finance/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: '缴费记录',
    tabbars: [{
      name: '缴费记录',
      icon: 'cuIcon-redpacket'
    }, {
      name: '缴费业务',
      icon: 'cuIcon-moneybag'
    }, {
      name: '订单记录',
      icon: 'cuIcon-list'
    },  {
      name: '补助信息',
      icon: 'cuIcon-refund'
    }, {
      name: '缓交申请',
      icon: 'cuIcon-comment'
    }, {
      name: '开票申请',
      icon: 'cuIcon-ticket'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let financeInfo = app.globalData.financeInfo
    if (!financeInfo) {
      wx.redirectTo({ url: './bind' })
      return
    }
    console.log('finance收费平台账号登录信息', financeInfo)
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
  tabbarChange: function (e) {
    const name = e.currentTarget.dataset.name
    this.setData({ tabbar: name })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})