// pages/bookSearch/bookInfo/bookList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: "",
    keywordStr: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 5000
    })
    var that = this;
    wx.request({
      url: 'https://airmole.cn/wechat/wxapp/api/' + options.SearchType + 'Search.php?keyword=' + options.keyword,
      success: function(res) {
        that.setData({
          keywordStr: res.data,
        })
        console.log(res.data);
        wx.hideToast()
        if (res.data == '空的，查无此书') {
          wx.redirectTo({
            url: '/pages/error/queryerror?ErrorTips=' + '您查找的图书暂无馆藏'
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    // var that = this;
    // console.log(this)
    return {
      title: '相见恨晚！原来图书馆有这么多关于"' + this.options.keyword + '"的书啊~',
      path: 'pages/bookSearch/bookInfo/bookList?keyword=' + this.options.keyword,
      imageUrl: "https://airmole.cn/wechat/wxapp/images/bookindexShare.jpg"
    }
  }
})