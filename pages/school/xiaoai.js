// pages/school/xiaoai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading:true,
    cover: 'https://cdn.airmole.cn/static/xiaoai/cover.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
    guideImages:[
      'https://cdn.airmole.cn/static/xiaoai/step1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
      'https://cdn.airmole.cn/static/xiaoai/step2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
      'https://cdn.airmole.cn/static/xiaoai/step3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
      'https://cdn.airmole.cn/static/xiaoai/step4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
      'https://cdn.airmole.cn/static/xiaoai/step5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
      'https://cdn.airmole.cn/static/xiaoai/step6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
      'https://cdn.airmole.cn/static/xiaoai/step7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
      'https://cdn.airmole.cn/static/xiaoai/step8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
      'https://cdn.airmole.cn/static/xiaoai/step9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
      'https://cdn.airmole.cn/static/xiaoai/step10.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  fullScreenPreview(){
    const allImages = this.data.guideImages
    wx.showToast({
      title: '左右滑动切换上/下一步',
      icon:'none'
    })
    wx.previewImage({
      urls: allImages,
    })
  },
  go2Bilibili: function () {
    wx.navigateToMiniProgram({
      appId: 'wx7564fd5313d24844',
      path: 'pages/video/video?bvid=BV1CL4y1Y7C5'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    setTimeout(function() {
      that.setData({
        isLoading: false
      });
    }, 800);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let cover = this.data.cover
    return {
      title: '“贝壳小盒子” - 小爱课程表使用指南',
      path: 'pages/school/xiaoai',
      imageUrl: cover
    }
  }
})