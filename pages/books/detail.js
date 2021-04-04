// pages/books/detail.js
var app = getApp();
Page({
  data: {
    isLoading: '加载中',
    code: "",
    codeType: '',
    jsonStr: "",
    doubanStr: '',
    title: '',
    isbn: ''
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
        _this.setData({
          jsonStr: res.data,
          title: _this.getTitleFromBookInfo(res.data.bookInfo),
          isbn: _this.getIsbnFromBookInfo(res.data.bookInfo),
          isLoading: false
        });
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
  getIsbnFromBookInfo: function(bookInfo) {
    let isbn = '';
    let pattern = /((978[\--– ])?[0-9][0-9\--– ]{10}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/;
    bookInfo.forEach(element => {
      if (element.name.indexOf('ISBN') >= 0) {
        let isbnMatched = pattern.exec(element.value);
        isbn = isbnMatched[1] ? isbnMatched[1] : isbnMatched[0];
      }
    });
    return isbn;
  },
  getTitleFromBookInfo: function(bookInfo) {
    let title = '';
    let pattern = /(.*?)\//;
    bookInfo.forEach(element => {
      if (element.name.indexOf('题名') >= 0) {
        let isbnMatched = pattern.exec(element.value);
        title = isbnMatched[1] ? isbnMatched[1] : isbnMatched[0];
      }
    });
    return title;
  },
  go2Douban: function() {
    var _this = this;
    const isbn = _this.data.isbn;
    wx.request({
      url: `${app.globalData.domain}/book/isbn/douban/${isbn}`,
      success: function(res) {
        if (res.data.code == 301) {
          wx.navigateToMiniProgram({
            appId: 'wx2f9b06c1de1ccfca',
            path: `pages/subject/subject?id=${res.data.id}&type=book`
          })
        } else {
          wx.showToast({ title: '豆瓣未收录', icon: 'none' });
        }
      }
    });
  },
  go2Dangdang: function() {
    const title = this.data.title;
    wx.navigateToMiniProgram({
      appId: 'wx7bb576902363f4ff',
      path: `pages/search/index?keyword=${title}&cid=0`
    })
  },
  onShareAppMessage: function(res) {
    return {
      title: '《' + this.data.title + '》 - 贝壳小盒子',
      path: `pages/books/detail?code=${this.data.code}&codeType=${this.data.codeType}`
    }
  },
});