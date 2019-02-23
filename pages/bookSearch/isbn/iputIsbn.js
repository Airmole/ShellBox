// pages/bookSearch/bookInfo/isbn/iputIsbn.js
Page({
  data: {
    isLoading: true,
  },
  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        isLoading: false
      });
    }, 800);
  },
  ISBNInput: function(e) {
    //console.log(e.detail.value['isbn']);
    if (e.detail.value['isbn'] == '' || e.detail.value['isbn'].length < 10) {
      wx.showToast({
        title: '请输入ISBN码',
        image: '/images/info.png',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.navigateTo({
        url: '/pages/bookSearch/bookInfo/bookInfo?ISBN=' + e.detail.value['isbn']
      })
    }
  },
  /**
   * 扫码
   */
  scan: function() {
    wx.scanCode({
      success: (res) => {
        if (res.errMsg !== 'scanCode:ok') {
          wx.showToast({
            title: res.errMsg,
            icon: 'loading',
            duration: 8000
          })
          return false;
        }
        if (res.scanType !== 'EAN_13') {
          wx.showToast({
            title: '这不是ISBN码',
            icon: 'loading',
            duration: 8000
          })
          return false;
        }
        wx.navigateTo({
          url: '/pages/bookSearch/bookInfo/bookInfo?ISBN=' + res.result
        })
      }
    })
  }
});