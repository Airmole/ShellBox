// pages/school/aboutus.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    width: '100%',
    height: '',
    version: '',
    QGroupModal: false,
    showFreedomFunc: false,
    weappCodeImage: 'https://upload-images.jianshu.io/upload_images/4697920-92c8f24e739051d3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
    coder: [{
      avatar: 'https://upload-images.jianshu.io/upload_images/4697920-4bbd851e6b007d72.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/128',
      nickName: 'Airmole',
      weibo: 'pages/profile/profile?objectUid=2423156830&nickname=Airmole'
    }, {
      avatar: 'https://upload-images.jianshu.io/upload_images/4697920-54c15375dfd9568e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/128',
      nickName: '很奔放',
      weibo: ''
    }, {
      avatar: 'https://upload-images.jianshu.io/upload_images/4697920-5b0f0ef862d2e5e8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/128',
      nickName: '秃头程序媛',
      weibo: ''
    }],
    otherApps: [{
      appid: 'wx183616af30e5723d',
      icon: 'https://upload-images.jianshu.io/upload_images/4697920-9f02095775140703.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/128',
      name: '贝壳班车订票'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const accountInfo = wx.getAccountInfoSync();

    that.setData({
      version: accountInfo.miniProgram.version,
      width: wx.getSystemInfoSync().windowWidth * 0.9 + 'px',
      height: wx.getSystemInfoSync().windowWidth * 0.9 * 0.5625 + 'px'
    })
    wx.pageScrollTo({
      scrollTop: 1600,
      duration: 4000,
    })

    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })

    setTimeout(function () {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      })
    }, 4000);
  },
  copyID: function () {
    wx.setClipboardData({
      data: 'wxf0ba93e3faff4eda'
    })
    wx.showToast({
      title: '已复制到粘贴版',
      icon: 'none',
      duration: 1000
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '关于 - 【贝壳小盒子】 ',
      path: 'pages/school/aboutus',
    }
  },
  showAppCode: function () {
    var weappCode = this.data.weappCodeImage;
    wx.previewImage({
      current: weappCode, // 当前显示图片的http链接
      urls: [weappCode] // 需要预览的图片http链接列表
    })
  },
  goOtherApps: function (e) {
    var appid = e.currentTarget.dataset.appid;
    wx.navigateToMiniProgram({ appId: appid })
  },
  checkUpdate: function () {
    app.appUpdate('userclick');
  },
  showQQGroupCode: function () {
    this.setData({ QGroupModal: true })
  },
  hideQQGroupCode: function () {
    this.setData({ QGroupModal: false })
  },
  goWeibo: function (e) {
    var weiboPath = e.currentTarget.dataset.weibo;

    if (weiboPath.length > 0) {
      wx.navigateToMiniProgram({
        appId: 'wx9074de28009e1111',
        path: weiboPath
      })
    }
  },
  canBeFree: function (e) {
    const hasEdusysStorage = app.globalData.hasEdusysStorage
    if (!hasEdusysStorage) {
      return
    }
    
    if (this.data.showFreedomFunc) {
      this.setData({ showFreedomFunc: false })
      return
    }
    
  }
})