// pages/school/calendar.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    calendarImage: 'https://upload-images.jianshu.io/upload_images/4697920-0fd6db06d734ada3.png',
    isLoading: true,
    screenHeight: '900',
    colorArr: ['red','orange','yellow','olive','green','cyan','blue','purple','mauve','pink','brown','grey','gray'],
    jsonContent: '',
    gradeArray: [{
      title: '大一',
      value: 'freshmanWork'
    },{
      title: '大二',
      value: 'sophomoreWork'
    },{
      title: '大三',
      value: 'juniorWork'
    },{
      title: '大四',
      value: 'seniorWork'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.inital();
  },
  inital: function () {
    const device = wx.getSystemInfoSync();
    // console.log(device.screenHeight);
    this.setData({screenHeight: device.screenHeight});
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    var _this = this;
    wx.request({
      url: app.globalData.domain + '/edu/calendar',
      success(res) {
        // console.log(res.data)
        _this.setData({ jsonContent: res.data })
        setTimeout(function () {
          _this.setData({ isLoading: false })
          wx.vibrateShort({ type: 'medium' })
        }, 800)
      }
    })

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (res) {
    return {
      title: '北京科技大学天津学院校历',
      path: 'pages/school/calendar',
    }
  },
  showPic: function () {
    var image = this.data.calendarImage;
    wx.previewImage({ current: image, urls: [image] })
  }
})