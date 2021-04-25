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
  onLoad: function (options) {
    wx.showLoading({ title: "等我加载一下~" });
    let codeType = options.codeType ? options.codeType : 'marc';
    this.setData({ code: options.code, codeType: codeType });
    if (codeType == 'marc') {
      this.getBookDetailByMarc(options.code);
    }
    if (codeType == 'isbn') {
      this.getBookDetailByIsbn(options.code);
    }

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  getBookDetailByMarc: function (marc) {
    var _this = this;
    wx.request({
      url: `${app.globalData.domain}/book/marc/${marc}`,
      success: function (res) {
        try {
          _this.setData({
            jsonStr: res.data,
            title: _this.getTitleFromBookInfo(res.data.bookInfo),
            isbn: _this.getIsbnFromBookInfo(res.data.bookInfo),
            isLoading: false
          });
          wx.hideLoading();
        } catch (error) {
          wx.showModal({
            title: '嘿嘿嘿',
            content: res.data.message,
            showCancel: false,
            success() { wx.navigateBack({ delta: 1 }) }
          });
        }
      }
    });
  },
  getBookDetailByIsbn: function (isbn) {
    var _this = this;
    wx.request({
      url: `${app.globalData.domain}/book/isbn/${isbn}`,
      success: function (res) {
        if (res.data.length != 0) {
          _this.setData({ jsonStr: res.data, title: res.data.bookInfo[0].value, isLoading: false });
          wx.hideLoading();
        } else {
          wx.hideLoading();
          wx.showModal({
            title: '温馨提醒',
            content: '图书馆貌似没有这本书',
            showCancel: false,
            success() { wx.navigateBack({ delta: 1 }) }
          });
        }
      }
    });
  },
  goLibrary: function (e) {
    console.log(e.currentTarget.dataset.place);
    var placeArr = ["理工馆", "社科馆"];
    var markerIdArr = [5, 4];
    var result = placeArr.indexOf(e.currentTarget.dataset.place.substr(0, 3));
    console.log(result);
    wx.navigateTo({
      url: '../traffic/navi?markerId=' + markerIdArr[result],
    })
  },
  getIsbnFromBookInfo: function (bookInfo) {
    let isbn = '';
    let pattern = /((978[\--– ])?[0-9][0-9\--– ]{10}[\--– ][0-9xX])|((978)?[0-9]{9}[0-9Xx])/;
    for (let index = 0; index < bookInfo.length; index++) {
      const element = bookInfo[index];
      if (element.name.indexOf('ISBN') >= 0) {
        let isbnMatched = pattern.exec(element.value);
        isbn = isbnMatched == null ? element.value : isbnMatched[1];
        break;
      }
    }
    return isbn;
  },
  getTitleFromBookInfo: function (bookInfo) {
    let title = '';
    let pattern = /(.*?)\//;
    for (let index = 0; index < bookInfo.length; index++) {
      const element = bookInfo[index];
      if (element.name.indexOf('题名') >= 0) {
        let titleMatched = pattern.exec(element.value);
        title = titleMatched == null ? element.value : titleMatched[1];
        break;
      }
    }
    return title;
  },
  go2Douban: function () {
    var _this = this;
    const isbn = _this.data.isbn;
    wx.request({
      url: `${app.globalData.domain}/book/isbn/douban/${isbn}`,
      success: function (res) {
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
  go2Dangdang: function () {
    const title = this.data.title;
    wx.navigateToMiniProgram({
      appId: 'wx7bb576902363f4ff',
      path: `pages/search/index?keyword=${title}&cid=0`
    })
  },
  onShareAppMessage: function (res) {
    let code = this.data.code;
    let codeType = this.data.codeType;
    if (this.data.isbn.length >= 13) {
      code = this.data.isbn;
      codeType = 'isbn';
    }
    return {
      title: '《' + this.data.title + '》 - 贝壳小盒子',
      path: `pages/books/detail?code=${code}&codeType=${codeType}`
    }
  },
});