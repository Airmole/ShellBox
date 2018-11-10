// pages/bookSearch/bookInfo/bookDetail.js
Page({
  data: {
    marc_no: "",
    ISBN: "",
    jsonStr: "",
    doubanStr: '',
  },
  onLoad: function(options) {
    console.log(options);
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 20000
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    var that = this;
    wx.request({
      url: 'https://zhxy.airmole.cn/book/marcno2info.php?marc_no=' + options.marc_no,
      success: function(res) {
        that.setData({
          jsonStr: res.data,
        })
        console.log(res.data);
        if (res.data[0][5]) {
          wx.request({
            url: 'https://airmole.cn/doubanapi/v2/book/isbn/' + res.data[0][5],
            method: 'GET',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            success: function(res) {
              that.setData({
                doubanStr: res.data,
              })
              // console.log(res.statusCode)
              if (res.statusCode == 404) {
                that.setData({
                  doubanStr: 'null',
                })
              }
            }
          })
        }
        wx.hideToast();
      }
    });
  },
  onShareAppMessage: function(res) {
    console.log(this.options.marc_no)
    return {
      title: '我在北科天院图书馆找到本《' + this.data.doubanStr.title + '》,你也来看看吧~',
      path: 'pages/bookSearch/bookInfo/bookDetail?marc_no=' + this.options.marc_no,
      imageUrl: this.data.doubanStr.images.large
    }
  },
});