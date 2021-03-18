// pages/books/detail.js
var app = getApp();
Page({
  data: {
    marc_no: "",
    ISBN: "",
    jsonStr: "",
    doubanStr: '',
    title: ''
  },
  onLoad: function(options) {
    console.log(options);
    wx.showLoading({ title: "loading" });
    var that = this;
    this.setData({
      marc_no: options.marc,
      title: options.title
    })
    wx.request({
      url: `${app.globalData.domain}/book/marc/${options.marc}`,
      success: function(res) {
        that.setData({
          jsonStr: res.data,
        })
        wx.hideLoading({});
      }
    });
  },
  goLibrary: function(ep) {
    console.log(ep.currentTarget.dataset.place);
    var placeArr = ["理工馆", "社科馆"];
    var markerIdArr = [5, 4];
    var result = placeArr.indexOf(ep.currentTarget.dataset.place.substr(0, 3));
    console.log(result);
    wx.navigateTo({
      url: '../traffic/navi?markerId=' + markerIdArr[result],
    })
  },
  onShareAppMessage: function(res) {
    console.log(this.options.marc_no)
    return {
      title: '《' + this.data.doubanStr.title + '》 - 贝壳小盒子',
      path: 'pages/books/detail?marc_no=' + this.options.marc_no,
      imageUrl: this.data.doubanStr.images.large
    }
  },
});