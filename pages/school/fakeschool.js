// pages/school/fakeschool.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {
      env: 'develop',
      swiper: [
        'https://upload-images.jianshu.io/upload_images/4697920-023fbbb006067b52.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
        'https://upload-images.jianshu.io/upload_images/4697920-099d1e496f07c406.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
      ],
      features: 'https://upload-images.jianshu.io/upload_images/4697920-e21c7b2f2d7c9aaa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
      image1: 'https://upload-images.jianshu.io/upload_images/4697920-97e78a52413af860.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
      image2: 'https://upload-images.jianshu.io/upload_images/4697920-cd3a603c0460b6b4.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
      tabbar: 'https://upload-images.jianshu.io/upload_images/4697920-09cf748decbc1e96.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ env: app.globalData.env })
    if (app.globalData.env != 'release') {
      wx.switchTab({ url: '../index/index' })
    }
    this.inital()
  },
  inital: function () {
    this.getData()
  },
  getData: function () {
    var _this = this
    wx.request({
      url: `${app.globalData.domain}/freedomer`,
      timeout: app.globalData.requestTimeout,
      method: 'GET',
      success: function(res){
        _this.setData({
          data: res.data
        })
      }
    })
  },
  scanIn: function () {
    this.fakeInOut('inschool')
  },
  scanOut: function () {
    this.fakeInOut('outschool')
  },

  fakeInOut:function(e) {
    const id = e
    if(id == 'inschool' || id == 'outschool'){
      this.scanTodaySchool(id);
      return
    }
  },
  scanTodaySchool: function(type){
    wx.scanCode({
      success: (res) => {
        if (res.errMsg !== 'scanCode:ok') {
          wx.showToast({ title: res.errMsg, icon: 'none'})
          return;
        }
        this.setData({ showFreedomFunc: false })

        wx.navigateTo({ url: `./todayschool?type=${type}` })
      }
    })
  },
  fakeToast: function (){
    wx.showLoading({
      title: '加载中...',
    })
    setTimeout(function() {
      wx.hideLoading()
      wx.showToast({
        title: '网络状态不佳',
        icon: 'error'
      })
    }, 3000)
  }
})