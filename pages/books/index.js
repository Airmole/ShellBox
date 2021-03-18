// pages/books/index.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    keyword: "",
    searchType: '',
    searchResult: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const searchType = options.type;
    const keyword = options.keyword;
    // console.log(options)
    this.setData({
      searchType: searchType,
      keyword: keyword
    })
    wx.showLoading({ title: '在找了在找了...' });
    var _this = this;
    wx.request({
      url: `${app.globalData.domain}/book/search`,
      data: {type: searchType, keyword: keyword},
      method: 'GET',
      success: function(res) {
        wx.hideLoading({});
        if (res.data.total > 0) {
          _this.setData({
            searchResult: res.data
          })
        }
      }
    })
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      path: `pages/books/index?keyword=${this.data.keyword}&type=${this.data.searchType}`,
      title: `图书馆有这么多关于【${this.data.keyword}】的书啊~`,
    }
  }
})