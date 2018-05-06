// pages/bookSearch/bookInfo/isbn/iputIsbn.js
Page({

  ISBNInput: function (e) {
    //console.log(e.detail.value['isbn']);
    wx.navigateTo({
      url: '/pages/bookSearch/bookInfo/bookInfo?ISBN=' + e.detail.value['isbn']
    })
  },
  /**
* 扫码
*/
  scan: function () {
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