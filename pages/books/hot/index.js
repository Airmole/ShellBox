// pages/books/hot/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '热门图书',
    isLoading: '加载中',
    screenHeight: '900',
    orderby: 'lend',
    type: 'ALL',
    orderbyList: [{
      title: '借阅',
      value: 'lend'
    }, {
      title: '评分',
      value: 'score'
    }, {
      title: '收藏',
      value: 'shelf'
    }, {
      title: '浏览',
      value: 'book'
    }],
    typeList: [{
      title: '总体排行',
      value: 'ALL'
    }, {
      title: '马列主义、毛泽东思想、邓小平理论',
      value: 'A'
    }, {
      title: '哲学、宗教',
      value: 'B'
    }, {
      title: '社会科学总论',
      value: 'C'
    }, {
      title: '政治、法律',
      value: 'D'
    }, {
      title: '军事',
      value: 'E'
    }, {
      title: '经济',
      value: 'F'
    }, {
      title: '文化、科学、教育、体育',
      value: 'G'
    }, {
      title: '语言、文字',
      value: 'H'
    }, {
      title: '文学',
      value: 'I'
    }, {
      title: '艺术',
      value: 'J'
    }, {
      title: '历史、地理',
      value: 'K'
    }, {
      title: '自然科学总论',
      value: 'N'
    }, {
      title: '自然科学总论',
      value: 'N'
    }, {
      title: '自然科学总论',
      value: 'O'
    }, {
      title: '天文学、地球科学',
      value: 'P'
    }, {
      title: '生物科学',
      value: 'Q'
    }, {
      title: '医药、卫生',
      value: 'R'
    }, {
      title: '农业科学',
      value: 'S'
    }, {
      title: '工业技术',
      value: 'T'
    }, {
      title: '交通运输',
      value: 'U'
    }, {
      title: '航空、航天',
      value: 'V'
    }, {
      title: '环境科学,安全科学',
      value: 'X'
    }, {
      title: '综合性图书',
      value: 'Z'
    }],
    type: 'ALL',
    booklist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type ? options.type : 'ALL';
    const orderby = options.orderby ? options.orderby : 'lend';
    this.inital(type, orderby);
    this.getHotBooksData(orderby, type);
  },
  inital: function (type, orderby) {
    const device = wx.getSystemInfoSync();
    this.setData({ screenHeight: device.screenHeight, type: type, orderby: orderby });
    wx.showShareMenu({ withShareTicket: true, menus: ['shareAppMessage', 'shareTimeline'] });
  },
  getHotBooksData: function (orderby = 'lend', type = 'ALL') {
    const _this = this;
    wx.request({
      url: `${app.globalData.domain}/book/hot/${orderby}/${type}`,
      timeout: app.globalData.requestTimeout,
      success: (res) => {
        _this.setData({booklist: res.data, isLoading: false})
        wx.vibrateShort({ type: 'medium' })
      }
    })
  },
  typeChanged: function (e) {
    const type = this.data.typeList[e.currentTarget.dataset.index].value;
    const orderby = this.data.orderby;
    // console.log(type, orderby);
    this.setData({ type: type});
    this.getHotBooksData(orderby, type);
  },
  orderbyChanged: function (e) {
    const orderby = this.data.orderbyList[e.currentTarget.dataset.index].value;
    const type = this.data.type;
    // console.log(type, orderby);
    this.setData({ orderby: orderby});
    this.getHotBooksData(orderby, type);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var _this = this;
    // setTimeout(function () { _this.setData({ isLoading: false }) }, 1000);
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
    return {
      path: `pages/books/hot/index?orderby=${this.data.orderby}&type=${this.data.type}`,
      title: `【贝壳小盒子】 - 北科天院图书馆热门图书排行榜单~`,
    }
  }
})