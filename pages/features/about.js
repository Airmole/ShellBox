// pages/features/about.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: '100%',
    height: '',
    coder: [{
      avatar: 'https://z4a.net/images/2019/06/22/_20180513195821.th.jpg',
      nickName: 'Airmole'
    }, {
      avatar: 'https://z4a.net/images/2019/07/24/_20190724200849.th.jpg',
      nickName: '很奔放'
    }, {
      avatar: 'https://z4a.net/images/2019/06/22/hzj.th.jpg',
      nickName: 'hzj'
    }],
    servicer: [{
      avatar: 'https://z4a.net/images/2019/06/22/_20180513195821.th.jpg',
      nickName: 'Airmole'
    }, {
      avatar: 'https://z4a.net/images/2019/07/24/_20190724200849.th.jpg',
      nickName: '很奔放'
    }, {
      avatar: 'https://z4a.net/images/2019/06/22/hzj.th.jpg',
      nickName: 'hzj'
    }, {
      avatar: 'https://z4a.net/images/2019/06/22/zhx.th.jpg',
      nickName: '淡然微笑'
    }, {
      avatar: 'https://z4a.net/images/2019/06/22/fwj.th.jpg',
      nickName: '非晚'
    }, {
      avatar: 'https://z4a.net/images/2019/08/26/TIM20190826143957.th.jpg',
      nickName: 'PastWind'
    }],
    otherApps: [{
      appid: 'wx183616af30e5723d',
      icon: 'https://z4a.net/images/2019/10/17/basicprofile.th.png',
      name: '贝壳班车订票'
    }, {
      appid: 'wx9551f8196258f706',
      icon: 'https://z4a.net/images/2019/10/17/1f4934ff45c2510c249666a909acf02c.png',
      name: '珠江小盒子'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      width: wx.getSystemInfoSync().windowWidth * 0.9 + 'px',
      height: wx.getSystemInfoSync().windowWidth * 0.9 * 0.5625 + 'px'
    })
    wx.pageScrollTo({
      scrollTop: 1600,
      duration: 4000,
    })
    setTimeout(function() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      })
    }, 4000);
  },
  copyID: function() {
    wx.setClipboardData({
      data: 'wxf0ba93e3faff4eda'
    })
    wx.showToast({
      title: '已复制到粘贴版',
      duration: 1000
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  showAppCode: function() {
    wx.previewImage({
      current: 'https://z4a.net/images/2019/10/16/777b9dd8ed1f6f82e24795fbab8ddb1c.png', // 当前显示图片的http链接
      urls: ['https://z4a.net/images/2019/10/16/777b9dd8ed1f6f82e24795fbab8ddb1c.png'] // 需要预览的图片http链接列表
    })
  },
  goOtherApps: function(e) {
    var appid = e.currentTarget.dataset.appid;
    wx.navigateToMiniProgram({
      appId: appid,
      success(res) {
        // 打开成功
      }
    })
  },
  checkUpdate:function(){
    app.appUpdate('userclick');
  }
})