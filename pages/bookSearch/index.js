var app = getApp()
Page({
  data: {
    inputShowed: false,
    isLoading: '加载中',
    isShowAllCourse: false,
    isLogined: false,
    keyword: "",
    jsonStr: "",
    keywordStr: '',
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
  onLoad: function() {
    this.checkEffectiveIdAndPasswoed();
  },
  onReady: function() {

  },
  checkEffectiveIdAndPasswoed: function() {
    var that = this;
    var uid = wx.getStorageSync('uid');
    var pwd = wx.getStorageSync('pwd');
    if (uid != '' && pwd != '') {
      this.getWelcomeJson(uid, pwd);
    } else {
      this.getWelcomeJson(uid, pwd);
      that.setData({
        isLogined: false
      })
    }
  },
  isShowAllCourse: function() {
    this.setData({
      isShowAllCourse: !this.data.isShowAllCourse
    })
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  onBindFocus: function(event) {

  },
  onBindBlur: function(event) {
    this.setData({
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
  getWelcomeJson: function(uid, pwd) {
    var that = this;
    wx.request({
      url: 'https://airmole.cn/test/welcome.php?uid=' + uid + '&pwd=' + pwd,
      success: function(res) {
        that.setData({
          jsonStr: res.data
        })
        console.log(res.data);
        if (res.data.todayCourse.getCourseStatus != 403) {
          that.setData({
            isLoading: "finished",
            isLogined: true
          })
        } else {
          that.setData({
            isLoading: "finished",
            isLogined: false
          })
        }
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
    //拉到底了，做点什么好呢
  },
});