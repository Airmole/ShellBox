var Util = require('../../../utils/util.js')
Page({
  data: {
    ISBN: '',
    book: {},
  },
  /**
   * 分享
   */
  onShareAppMessage: function () {
    return {
      title: '《' + this.book.bookTitle + '》',
      desc: this.book.bookSummary,
      path: '/pages/book/share/share?ISBN=' + this.data.ISBN
    }
  },
  /**
   * 共享给其他人查阅
   */
  share: function () {
    // need login
    if (!wx.getStorageSync('cookie')) {
      wx.showModal({
        title: '提示',
        content: '请先登录 😊',
        success: function (res) {
          if (!res.confirm) {
            return false;
          }
          wx.navigateTo({
            url: '../../login/login'
          })
        }
      })
      return false;
    }
  },
  /**
   * 页面渲染完成，隐藏导航 loading 效果
   */
  onReady: function () {
    wx.hideNavigationBarLoading();
  },
  /**
   * 获取书本信息
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    let that = this;
    that.setData({
      ISBN: options.ISBN,
      share: (options.share === 'no' ? false : true)
    });
    wx.request({
      url: 'https://airmole.cn/doubanapi/v2/book/isbn/',
      data: {
        ISBN: options.ISBN
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencode',
      },
      success: function (res) {
        if (res.errMsg !== 'request:ok') {
          wx.showToast({
            title: res.errMsg,
            icon: 'loading',
            duration: 8000
          })
          return false;
        }
        if (!res.data.sc) {
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            duration: 8000
          })
          return false;
        }
        res.data.book.bookCatalogList = res.data.book.bookCatalog.split('\n');
        that.setData({
          book: res.data.book
        })
        wx.setNavigationBarTitle({
          title: '《' + res.data.book.bookTitle + '》'
        })
      },
      fail: function (res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'loading',
          duration: 8000
        })
      }
    })
  }
})