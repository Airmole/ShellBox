// pages/webview/redpacket.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const url = options.url ? decodeURIComponent(options.url) : ''
    console.log('红包封面领取链接地址：', url)
    if (url === '') wx.reLaunch({ url: '/pages/index/index' })
    this.setData({ url: url })
    wx.showRedPackage({ url: url })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.showRedPackage({ url: this.data.url })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.showRedPackage({ url: this.data.url })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})