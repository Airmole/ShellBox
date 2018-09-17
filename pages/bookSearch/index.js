var app = getApp()
Page({
  data: {
    inputShowed: false,
    keyword: "",
    jsonStr: "",
    keywordStr: '',
    showTips: false,
    notices: " ",
    searchPanelShow: false,
    SearchType: 'BookName',
    radioItems: [{
        name: '书名',
        value: 'BookName',
        checked: true
      },
      {
        name: '作者',
        value: 'Author'
      }, {
        name: '主题',
        value: 'Topic'
      },
      {
        name: '出版社',
        value: 'Publisher'
      }
    ]
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  onBindFocus: function(event) {
    this.setData({
      searchPanelShow: true
    })
  },
  onBindBlur: function(event) {
    this.setData({
      searchPanelShow: false
    })
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  radioChange: function(e) {
    console.log(e.detail.value);
    this.setData({
      SearchType: e.detail.value
    })
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems,
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  onShareAppMessage: function(res) {
    return {
      title: '相见恨晚！没想到图书馆还有这样的好书啊~',
      path: 'pages/bookSearch/index',
      imageUrl: "https://airmole.cn/wechat/wxapp/images/bookindexShare.jpg"
    }
  },
  searchIt: function(e) {
    this.setData({
      keyword: e.detail.value
    });
    let that = this;
    if (e.detail.value.length == 0) {
      wx.showToast({
        title: '输入有误',
        image: '/images/info.png',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.showToast({
        title: "正在搜索..",
        icon: "loading",
        duration: 8000
      })
      wx.request({
        url: 'https://airmole.cn/wechat/wxapp/api/' + this.data.SearchType + 'Search.php?keyword=' + e.detail.value,
        success: function(res) {
          that.setData({
            keywordStr: res.data,
          })
          console.log(res.data);
          wx.hideToast()
          if (res.data[0].title == "图书馆系统无响应") {
            wx.navigateTo({
              url: '/pages/error/queryerror?ErrorTips=' + 图书馆OPAC系统无响应
            })
          }
          if (res.data == '空的，查无此书') {
            wx.showToast({
              title: '本馆暂无此书',
              image: '/images/info.png',
              icon: 'none',
              duration: 2000
            });
          } else {
            wx.navigateTo({
              url: '../bookSearch/bookInfo/bookList?keyword=' + e.detail.value + '&SearchType=' + that.data.SearchType,
            })
          }
        }
      })
    }
  },
  onLoad: function() {
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 5000
    })
    var that = this;
    wx.request({
      url: 'https://airmole.cn/wechat/wxapp/api/hotbook.php',
      success: function(res) {
        that.setData({
          jsonStr: res.data,
        })
        // console.log(res.data);
      }
    })
    wx.request({
      url: 'https://airmole.cn/wechat/wxapp/api/notices.php',
      success: function(res) {
        that.setData({
          notices: res.data.notices,
        })
        wx.hideToast()
        // console.log(res.data);
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this;
    that.onLoad();
    wx.stopPullDownRefresh();
    wx.showToast({
      title: "刷新完成",
      icon: "succeed",
      duration: 3000
    })
  },
  onReachBottom: function() {
    var that = this;
    that.setData({
      showTips: true,
    })
  },


});