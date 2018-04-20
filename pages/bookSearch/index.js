var app = getApp()
Page({
  data: {
    inputShowed: false,
    keyword: "",
    jsonStr: "",
    keywordStr: '',
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  searchIt: function (e) {
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
      wx.request({
        url: 'https://airmole.cn/wechat/wxapp/api/bookSearch_api.php?keyword=' + e.detail.value,
        success: function (res) {
          that.setData({
            keywordStr: res.data,
          })
          console.log(res.data);
          if (res.data == '空的，查无此书') {
            wx.showToast({
              title: '本馆暂无此书',
              image: '/images/info.png',
              icon: 'none',
              duration: 2000
            });
          } else {
            wx.navigateTo({
              url: '../bookSearch/bookInfo/bookList?keyword=' + e.detail.value,
            })
          }
        }
      })
    }
  },
  onLoad: function () {
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 5000
    })
    var that = this;
    wx.request({
      url: 'https://airmole.cn/wechat/wxapp/api/hotbook.php',
      success: function (res) {
        that.setData({
          jsonStr: res.data,
        })
        wx.hideToast()
        // console.log(res.data);
      }
    })
  }
});
