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
    isbn: '',
    place: '',
    placeType: 0,
    showCollection: true,
    showDistribution: true,
    showBookInfo: true,
    showSameAuthor: true,
    socialDistribution: [
      { floor: '四层', content: ['A', 'B', 'C', 'D'], desc: '中文社科图书A，B，C，D类', infloor: false },
      { floor: '三层', content: ['D', 'E', 'F', 'G', 'H', 'I'], desc: '中文社科图书D、E、F、G、H、I类', infloor: false },
      { floor: '二层', content: ['I', 'J', 'K'], desc: '中文社科图书I、J、K类、社科馆外文书库', infloor: false },
      { floor: '一层', content: [], desc: '借还处、音像制品库、新书库、图书漂流区', infloor: false }
    ],
    industryDistribution: [
      { room: '101', content: ['TP'], desc: '理工馆中文书库101室 TP', infloor: false },
      { room: '102', content: ['TP'], desc: '理工馆中文书库102室 TP', infloor: false },
      { room: '103', content: ['TB', 'TD', 'TE', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TM', 'TN'], desc: '理工馆中文书库103室', infloor: false },
      { room: '104', content: ['TQ', 'TS', 'TU', 'TV'], desc: '理工馆中文书库104室', infloor: false },
      { room: '106', content: ['O', 'P', 'Q', 'R', 'U', 'V', 'X', 'Z'], desc: '理工馆中文书库106室', infloor: false },
      { room: '107', content: [], desc: '理工馆中文书库107室', infloor: false },
      { room: '108', content: [], desc: '理工馆中文书库108 过刊、最新书库', infloor: false },
      { room: '202', content: [], desc: '报刊阅览室', infloor: false },
    ]
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
          _this.bookPossibleInfloor(res.data)
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
          _this.bookPossibleInfloor(res.data)
          _this.setData({ jsonStr: res.data, title: res.data.bookInfo[0].value, isLoading: false, isbn: isbn });
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
  bookPossibleInfloor(book) {
    let callNo = '' // 索书号
    let callNoPrefix = '' // 索书号字母前缀
    let place = ''
    // 索书号
    book.bookInfo.forEach(element => {
      if (element.name.indexOf('中图法分类号') >= 0) {
        callNo = element.value
        return
      }
    })
    // 馆藏地
    for (let index = 0; index < book.collection.length; index++) {
      const bookItem = book.collection[index];
      bookItem.forEach(prop => {
        console.log('prop', prop.title.indexOf('馆藏地'))
        if (prop.title == '索书号' && prop.value.length > 0) callNo = prop.value
        if (prop.title.indexOf('馆藏地') >= 0) place = prop.value
      })
      break
    }
    const pattern = /^[a-zA-Z]+/
    const matchedCallNoPrefix = pattern.exec(callNo)
    callNoPrefix = matchedCallNoPrefix == null ? '' : matchedCallNoPrefix[0]
    // 社科馆图书
    if (place.indexOf('社科馆') >= 0) {
      let socialDistribution = this.data.socialDistribution
      if (place.indexOf('音像制品') === -1) {
        socialDistribution.forEach((floor, index) => {
          if (floor.content.includes(callNoPrefix)) socialDistribution[index].infloor = true
        })
      }
      if (place.indexOf('新书库') >= 0 || place.indexOf('音像制品') >= 0) socialDistribution[3].infloor = true
      this.setData({ socialDistribution: socialDistribution, place: place, placeType: 0 })
      return
    }
    // 理工馆图书
    let industryDistribution = this.data.industryDistribution
    if (place.indexOf('理工馆') >= 0) {
      industryDistribution.forEach((room, index) => {
        if (room.content.includes(callNoPrefix)) industryDistribution[index].infloor = true
      })
    }
    if (place.indexOf('新书库') >= 0) industryDistribution[6].infloor = true
    if (place.indexOf('期刊室') >= 0) industryDistribution[industryDistribution.length - 1].infloor = true
    this.setData({ industryDistribution: industryDistribution, place: place, placeType: 1 })
    console.log('馆藏地，索书号', callNo, place)
  },
  distributionChanged() {
    const currentValue = this.data.showDistribution
    this.setData({ showDistribution: !currentValue })
  },
  showCollectionChanged() {
    const currentValue = this.data.showCollection
    this.setData({ showCollection: !currentValue })
  },
  showBookInfoChanged() {
    const currentValue = this.data.showBookInfo
    this.setData({ showBookInfo: !currentValue })
  },
  showSameAuthorChanged() {
    const currentValue = this.data.showSameAuthor
    this.setData({ showSameAuthor: !currentValue })
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