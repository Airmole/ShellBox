var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["北京", "天津", "宝坻"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    isLoading: true,
  },
  onLoad: function(r) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    if (r.activeIndex) {
      that.setData({
        sliderOffset: r.activeIndex * that.data.sliderOffset,
        activeIndex: r.activeIndex,
      })

    }
  },
  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        isLoading: false
      });
    }, 400);
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  goJJXCStation: function() {
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        wx.openLocation({
          latitude: 39.548662,
          longitude: 117.363274,
          scale: 17,
          name: '京津新城公交站',
          address: '京津新城北京国贸商务班车'
        })
      }
    })
  },
  goBJGMStation: function() {
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        wx.openLocation({
          latitude: 39.905079,
          longitude: 116.477743,
          scale: 17,
          name: '光辉立交桥',
          address: '朝阳区八王坟长途客运站北光辉立交桥下'
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target.id)
    }
    return {
      title: '贝壳田园到' + that.data.tabs[that.data.activeIndex] + '出行方案',
      path: 'pages/Transport/Transport?activeIndex=' + that.data.activeIndex,
    }
  }
});