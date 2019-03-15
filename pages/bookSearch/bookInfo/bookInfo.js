var app = getApp();
Page({
  data: {
    ISBN: "",
    jsonStr: "",
    doubanStr: '',
  },
  onLoad: function(options) {
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 10000
    })
    var that = this;
    wx.request({
      url: app.globalData.apiURL + '/book/isbn2info2.php?ISBN=' + options.ISBN,
      success: function(res) {
        that.setData({
          jsonStr: res.data,
        })
        console.log(res.data)
      }
    });
    wx.request({
      url: app.globalData.doubanApi + '/book/isbn/' + options.ISBN,
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function(res) {
        that.setData({
          doubanStr: res.data,
        })
        // console.log(res.data);
        wx.hideToast()
      }
    })
  },
  onReady: function() {

  },
  goLibrary: function(ep) {
    console.log(ep.currentTarget.dataset.place);
    var placeArr = ["理工馆", "社科馆"];
    var markerIdArr = [5, 4];
    var result = placeArr.indexOf(ep.currentTarget.dataset.place.substr(0, 3));
    console.log(result);
    wx.navigateTo({
      url: '/pages/schoolNav/schoolNav?markerId=' + markerIdArr[result],
    })
  },
  onShareAppMessage: function(res) {
    console.log(this)
    return {
      title: '我在北科天院图书馆找到本《' + this.data.doubanStr.title + '》,你也来看看吧~',
      path: 'pages/bookSearch/bookInfo/bookInfo?ISBN=' + this.options.ISBN,
      imageUrl: this.data.doubanStr.images.large
    }
  },
});