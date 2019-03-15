// pages/calendar/calendar.js
var util = require('../../utils/time.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    jsonContent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    var that = this;
    wx.request({
      url: app.globalData.apiURL + '/calendar.php',
      success(res) {
        console.log(res.data)
        that.setData({
          jsonContent: res.data,
        })
        setTimeout(function() {
          that.setData({
            isLoading: false
          });
        }, 800);
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    return {
      title: '北京科技大学天津学院校历',
      path: 'pages/calendar/calendar',
    }
  },
  showPic: function() {
    wx.previewImage({
      current: 'https://z4a.net/images/2019/02/24/7290d9cc20d7f5f9f4cae1a9ec42c2d4.png', // 当前显示图片的http链接
      urls: ["https://z4a.net/images/2019/02/24/7290d9cc20d7f5f9f4cae1a9ec42c2d4.png"] // 需要预览的图片http链接列表
    })
  }
})