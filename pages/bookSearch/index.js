var app = getApp()
Page({
  data: {
    inputShowed: false,
    isLoading: '加载中',
    keyword: "",
    jsonStr: "",
    keywordStr: '',
    showTips: false,
    searchPanelShow: false,
    SearchType: '02',
    radioItems: [{
        name: '书名',
        value: '02',
        checked: true
      },
      {
        name: '作者',
        value: '03'
      }, {
        name: '主题',
        value: '04'
      },
      {
        name: '出版社',
        value: '09'
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
      searchPanelShow: false,
      inputVal: "",
      inputShowed: false
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
  inputTyping: function(e) {
    this.setData({
      keyword: e.detail.value
    });
    // console.log("输入了" + this.data.keyword);
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  searchIt: function(e) {
    var that = this;
    if (that.data.keyword == 0) {
      wx.showToast({
        title: '请输入检索关键字',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.showToast({
        title: "正在搜索..",
        icon: "loading",
        duration: 10000
      })
      wx.request({
        url: 'https://airmole.cn/api/book/booksearch_adv.php?type=' + that.data.SearchType + '&keyword=' + that.data.keyword,
        success: function(res) {
          that.setData({
            keywordStr: res.data,
          })
          console.log(res.data);
          wx.hideToast()
          if (res.data.total == '图书馆系统无响应') {
            wx.navigateTo({
              url: '/pages/error/queryerror?ErrorTips=' + "图书馆OPAC系统无响应"
            })
          } else if (res.data.total == 0) {
            wx.showToast({
              title: '本馆暂无此书',
              image: '/images/info.png',
              icon: 'none',
              duration: 2000
            });
          } else {
            wx.navigateTo({
              url: '../bookSearch/bookInfo/bookList?keyword=' + that.data.keyword + '&SearchType=' + that.data.SearchType,
            })
          }
        }
      })
    }
  },
  onLoad: function() {
    var that = this;
    var uid = wx.getStorageSync('uid');
    var pwd = wx.getStorageSync('pwd');

    wx.request({
      url: 'https://airmole.cn/test/welcome.php?uid=' + uid + '&pwd=' + pwd,
      success: function(res) {
        that.setData({
          isLoading: "finished",
          jsonStr: res.data
        })
        wx.hideToast()
        console.log(res.data);
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