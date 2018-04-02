var app = getApp()
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    jsonStr: ""
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
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://airmole.cn/wechat/wxapp/api/hotbook.php',
      success: function (res) {
        that.setData({
          jsonStr: res.data,
        })
        // console.log(res.data);
      }
    })
  }
});
