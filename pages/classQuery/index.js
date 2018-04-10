var app = getApp()
Page({
  data: {
    uid: '',
    pwd: '',
    // remind: '加载中',
    classStr: '',
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      uid: app.globalData.uid,
      pwd: app.globalData.pwd,
    });
    if (app.globalData.uid == '' || app.globalData.pwd == '') {
      wx.redirectTo({
        url: '/pages/index/index'
      })
    } else {
      wx.request({
        url: 'https://airmole.cn/wechat/wxapp/api/Airmole_jiaowuClassTable.php?uid=' + app.globalData.uid + '&pwd=' + app.globalData.pwd,
        success: function (res) {
          that.setData({
            classStr: res.data,
            // remind:"完成",
          })
          // console.log(res.data);
        }
      })
    }
  },
  /**
 * 用户点击右上角分享
 */
  // onShareAppMessage: function (res) {

  //   return {
  //     title: '贝壳盒子课表查询',
  //     path: 'pages/index/index',
  //     imageUrl: "https://airmole.cn/wechat/wxapp/images/QueryClassTable.jpg"
  //   }
  // },
  onPullDownRefresh: function () {

  },

}) 