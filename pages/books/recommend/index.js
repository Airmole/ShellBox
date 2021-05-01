// pages/books/recommend/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '图书荐购',
    isLoading: '加载中',
    screenHeight: '900',
    datalist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.inital();
  },
  inital: function () {
    this.getRecommendBooks();
  },
  getRecommendBooks:function () {
    var _this = this
    wx.request({
      url: `${app.globalData.domain}/book/recommend/history`,
      timeout: app.globalData.requestTimeout,
      success: function(res) {
        _this.setData({
          datalist: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    setTimeout(function () { _this.setData({ isLoading: false }) }, 1000);
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

  }
})