// pages/calendar/calendar.js
var util = require('../../utils/time.js');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    BottomTip: " ",
    hideOrNot: 0,
    tabs: ["校历", "地图"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time: time
    });

    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      hideOrNot: 1
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    //删除无用的下拉刷新特效，这个页面里面要这个没啥用
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      'BottomTip': '到底啦！下学期校历还没出呢，尽请期待！'
    })
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
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
})