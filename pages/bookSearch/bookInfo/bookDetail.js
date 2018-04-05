// pages/bookSearch/bookInfo/bookDetail.js
//最最最复杂的js应该就是这个关键字查书详细页面的了吧。。。
Page({
  data: {
    marc_no: "",
    ISBN: "",
    jsonStr: "",
    doubanStr: '',
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://airmole.cn/wechat/wxapp/api/mn2ISBN.php?marc_no=' + options.marc_no,
      success: function (res) {
        that.setData({
          ISBN: res.data,
        })
        // console.log(res.data);
        if (res.data == "") {
          wx.redirectTo({
            url: '../../error/notfound',
          })
        }
        wx.request({
          url: 'https://airmole.cn/wechat/wxapp/api/isbn2info.php?ISBN=' + res.data,
          success: function (res) {
            that.setData({
              jsonStr: res.data,
            })
            // console.log(res.data);
            if (res.data == "无") {
              wx.redirectTo({
                url: '../../error/notfound',
              })
            }
            wx.request({
              url: 'https://airmole.cn/doubanapi/v2/book/isbn/' + res.data[0][5],
              method: 'GET',
              header: {
                'content-type': 'application/x-www-form-urlencoded',
              },
              success: function (res) {
                that.setData({
                  doubanStr: res.data,
                })
                // console.log(res.data);
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
        });
      }
    });
  },
});