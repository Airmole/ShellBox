// pages/books/detail.js
var app = getApp();
Page({
  data: {
    isLoading: '加载中',
    code: "",
    codeType: '',
    jsonStr: "",
    doubanStr: '',
    title: ''
  },
  onLoad: function(options) {
    wx.showLoading({ title: "鸽鸽，等等我" });
    let codeType = options.codeType ? options.codeType : 'marc';
    this.setData({ code: options.code, codeType: codeType});
    if(codeType == 'marc') {
      this.getBookDetailByMarc(options.code);
    }
    if(codeType == 'isbn') {
      this.getBookDetailByIsbn(options.code);
    }

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  getBookDetailByMarc: function(marc) {
    var _this = this;
    wx.request({
      url: `${app.globalData.domain}/book/marc/${marc}`,
      success: function(res) {
        _this.setData({jsonStr: res.data, title: res.data.bookInfo[0].value, isLoading: false});
        wx.hideLoading({});
      }
    });
  },
  getBookDetailByIsbn: function(isbn) {
    var _this = this;
    wx.request({
      url: `${app.globalData.domain}/book/isbn/${isbn}`,
      success: function(res) {
        _this.setData({jsonStr: res.data, title: res.data.bookInfo[0].value, isLoading: false});
        wx.hideLoading({});
      }
    });
  },
  goLibrary: function(e) {
    console.log(e.currentTarget.dataset.place);
    var placeArr = ["理工馆", "社科馆"];
    var markerIdArr = [5, 4];
    var result = placeArr.indexOf(e.currentTarget.dataset.place.substr(0, 3));
    console.log(result);
    wx.navigateTo({
      url: '../traffic/navi?markerId=' + markerIdArr[result],
    })
  },
  onShareAppMessage: function(res) {
    return {
      title: '《' + this.data.jsonStr.bookInfo[0].value + '》 - 贝壳小盒子',
      path: `pages/books/detail?code=${this.data.code}&codeType=${this.data.codeType}`
    }
  },
});