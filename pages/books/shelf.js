// pages/books/shelf.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    shelf: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      title: options.title
    })
    this.getShelf(options.id);
  },
  getShelf: function (id) {
    var _this = this;
    wx.request({
      url: `${app.globalData.domain}/book/shelf/${id}`,
      method: 'GET',
      success: function(res) {
        _this.setData({shelf: res.data});
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})