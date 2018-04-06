var app = getApp()
Page({
  data: {
    uid: '',
    pwd: '',
    classStr: '',
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      uid: app.globalData.uid,
      pwd: app.globalData.pwd,
    });
    wx.request({
      url: 'https://airmole.cn/wechat/wxapp/api/Airmole_jiaowuClassTable.php?uid=' + app.globalData.uid + '&pwd=' + app.globalData.pwd,
      success: function (res) {
        that.setData({
          classStr: res.data,
        })
        // console.log(res.data);
      }
    })
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {

    return {
      title: '贝壳田园信息系课表',
      path: 'pages/index/index',
      imageUrl: "https://airmole.cn/wechat/wxapp/images/QueryClassTable.jpg"
    }
  },
  onPullDownRefresh: function () {

  },

}) 