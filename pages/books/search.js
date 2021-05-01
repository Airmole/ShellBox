// pages/books/search.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchType: '02',
    radioItems: [
      { name: '书名', value: '02', checked: true },
      { name: '作者', value: '03' },
      { name: '主题', value: '04' },
      { name: '出版社', value: '09' }
    ],
    keyword: '',
    hotwords: [],
    shelfCatalog: []
  },
  onLoad: function() {
    this.inital()
  },
  inital: function () {
    this.getHotKeyword()
    this.getShelfCatalog()

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  getHotKeyword: function () {
    var _this = this
    wx.request({
      url: `${app.globalData.domain}/book/hot/keyword/top10`,
      timeout: app.globalData.requestTimeout,
      success: function (res) {
        _this.setData({ hotwords: res.data })
      }
    })
  },
  getShelfCatalog: function () {
    var _this = this
    wx.request({
      url: `${app.globalData.domain}/book/shelf/catalog`,
      timeout: app.globalData.requestTimeout,
      success: function (res) {
        _this.setData({ shelfCatalog: res.data })
      }
    })
  },
  radioChange: function (e) {
    this.setData({ searchType: e.detail.value })
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems,
    });
  },
  keywordInput: function (e) {
    this.setData({
      keyword: e.detail.value
    });
  },
  searchBook: function () {
    const searchType = this.data.searchType;
    const keyword = this.data.keyword;
    // console.log(searchType, keyword);
    if(keyword.length == 0){
      wx.showToast({ title: '请输入检索关键字', icon: 'none' });
      return
    }
    wx.showLoading({ title: '在找了在找了...' })
    if (keyword.indexOf('978') >= 0) {
      wx.navigateTo({ url: `../books/detail?code=${keyword}&codeType=isbn` })
      return
    }
    wx.request({
      url: `${app.globalData.domain}/book/search`,
      data: {type: searchType, keyword: keyword},
      method: 'GET',
      success: function (res) {
        wx.hideLoading({});
        if (res.data.total == '图书馆系统无响应') {
          wx.showToast({ title: '图书馆OPAC系统无响应', icon: 'none' });
        } else if (res.data.total == 0) {
          wx.showToast({ title: '本馆暂无此书', icon: 'none' });
        } else {
          wx.navigateTo({
            url: `../books/index?type=${searchType}&keyword=${keyword}`,
          })
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: `pages/books/search`,
      title: `图书查找检索 - 贝壳小盒子`,
    }
  }
})