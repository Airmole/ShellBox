// pages/webview/webview.js
const defaultUrl = 'https://mp.weixin.qq.com/s/51iFkQBg89lZKz_1a7bLgw'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: defaultUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let url = ''
    if (typeof options.url == 'undefined') {
      url = defaultUrl
    } else {
      url = decodeURIComponent(options.url)
    }
    this.setData({ url: url })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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