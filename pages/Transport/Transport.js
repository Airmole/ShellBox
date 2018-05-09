var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["北京", "市区", "宝坻"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    tianjin: [
      { mornig: '6:00', afternoon: '13:00' },
      { mornig: '7:00', afternoon: '14:00' },
      { mornig: '8:00', afternoon: '15:00' },
      { mornig: '9:00', afternoon: '16:00' },
      { mornig: '10:00', afternoon: '17:00' },
      { mornig: '11:00', afternoon: '18:00' },
      { mornig: '12:00', afternoon: ' ' }],
    baodi: [
      { mornig: '6:00', afternoon: '13:00' },
      { mornig: '7:00', afternoon: '14:00' },
      { mornig: '8:00', afternoon: '15:00' },
      { mornig: '9:00', afternoon: '16:00' },
      { mornig: '10:00', afternoon: '17:00' },
      { mornig: '11:00', afternoon: '' },
      { mornig: '12:00', afternoon: ' ' }],
    bktel: '13132172275',
    bdtel: '13000000000',
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  /**
    * 点击电话号码拨出电话事件的处理函数
    */
  callPhone: function (event) {
    wx.makePhoneCall({
      phoneNumber: event.target.id
    })
  },
  /**
   * 长按号码复制到粘贴板的处理函数
   */
  copyIt: function (event) {
    wx.setClipboardData({
      data: event.target.id
    })
    wx.showToast({
      title: '已复制到粘贴版',
      icon: 'none',
      duration: 1000
    });
  },
  preview: function () {
    wx.previewImage({
      current: 'https://airmole.cn/wechat/wxapp/images/Bus413.jpg', // 当前显示图片的http链接
      urls: ['https://airmole.cn/wechat/wxapp/images/Bus413.jpg'] // 需要预览的图片http链接列表
    })
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: '贝壳田园校园出行方案',
      path: 'pages/Transport/Transport',
      imageUrl: "https://airmole.cn/wechat/wxapp/images/map.png"
    }
  }
});