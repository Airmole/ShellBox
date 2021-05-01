// pages/books/shelf.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    title: '',
    id: '',
    shelf: [],
    clc: '',
    slc: '',
    shelfType: 'personal',
    year: 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let shelfType = options.shelfType ? options.shelfType : 'personal'; // personal或public
    if (shelfType == 'personal') {
      this.setData({
        title: options.title,
        shelfType: shelfType,
        id: options.id
      })
      this.getShelf(options.id)
    }
    if (shelfType == 'public') {
      this.setData({
        title: options.title,
        clc: options.clc,
        slc: options.slc,
        shelfType: shelfType
      })
      this.getShelfCatalogBooks(options.title, options.clc, options.slc)
    }

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  getShelf: function (id) {
    var _this = this;
    wx.request({
      url: `${app.globalData.domain}/book/shelf/${id}`,
      method: 'GET',
      success: function(res) {
        _this.setData({shelf: res.data, isLoading: ''})
        wx.vibrateShort({ type: 'medium' })
      }
    })
  },
  getShelfCatalogBooks: function (title, clc, slc) {
    var _this = this;
    wx.request({
      url: `${app.globalData.domain}/book/shelf/catalog/books?name=${title}&clc=${clc}&slc=${slc}`,
      method: 'GET',
      timeout: app.globalData.requestTimeout,
      success: function(res) {
        _this.setData({shelf: res.data, isLoading: ''})
        wx.vibrateShort({ type: 'medium' })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let para = `?shelfType=${this.data.shelfType}&title=${this.data.title}`
    if (this.data.shelfType == 'personal') {
      para = `${para}&id=${this.data.id}`
    }
    if (this.data.shelfType == 'public') {
      para = `${para}&clc=${this.data.clc}&slc=${this.data.slc}`
    }

    return {
      path: `pages/books/shelf?shelfType=${this.data.shelfType}&type=${this.data.searchType}`,
      title: `贝壳小盒子 - 书架【${this.data.title}】`,
    }
  }
})