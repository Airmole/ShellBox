// pages/books/portrait.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indexBgImage: 'https://upload-images.jianshu.io/upload_images/4697920-301233d262e65a5b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
    coverBgImage: 'https://upload-images.jianshu.io/upload_images/4697920-307aefd5b3e7123b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
    luquBgImage: 'https://upload-images.jianshu.io/upload_images/4697920-be89063e63b1ea8e.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
    fromBgImage: 'https://upload-images.jianshu.io/upload_images/4697920-8c5d01e62b1d292b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
    book1BgImage: 'https://upload-images.jianshu.io/upload_images/4697920-d44973c44d836879.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
    book2BgImage: 'https://upload-images.jianshu.io/upload_images/4697920-51c60faee840dae2.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
    score1BgImage: 'https://upload-images.jianshu.io/upload_images/4697920-143f85716dd45780.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
    score2BgImage: 'https://upload-images.jianshu.io/upload_images/4697920-bf24e264658654d4.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
    endBgImage: 'https://upload-images.jianshu.io/upload_images/4697920-5f61dc28dc9f5496.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
    deviceInfo: '',
    fullscreen: '',
    contentStyle: 'width:320px;height:500px;',
    showTips: true,
    hasLogin: false,
    hasNeedData: false,
    sharerid: false,
    data: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.inital(options)
  },
  inital: function (options) {
    const sysinfo = wx.getSystemInfoSync()
    const educookie = app.globalData.edusysUserInfo ? app.globalData.edusysUserInfo.cookie : ''
    const opaccookie = app.globalData.opacLogin ? app.globalData.opacLogin.cookie : ''
    let hasNeedData = false
    if (educookie != '' && opaccookie != '') {
      hasNeedData = true
    }
    this.setData({ 
      deviceInfo: sysinfo, 
      fullscreen: `width:${sysinfo.screenWidth}px;height:${sysinfo.screenHeight-30}px;`,
      hasNeedData: hasNeedData
    })

    const sharerid = options.sharerid ? options.sharerid : false
    if (sharerid) {
      this.setData({ sharerid: sharerid })
      this.getData(sharerid, '1', '1', sharerid, '1', '1')
    }
    
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  getData: function (eduid, edupass, educookie, opacid, opacpass, opaccookie) {
    const _this = this
    wx.request({
      url: `${app.globalData.domain}/book/portrait`,
      method: "POST",
      data: {
        eduid: eduid,
        edupass: edupass,
        educookie: educookie,
        opacid: opacid,
        opacpass: opacpass,
        opaccookie: opaccookie,
        vcode: app.globalData.opacLogin ? app.globalData.opacLogin.vcode : '1',
        token: app.globalData.opacLogin ? app.globalData.opacLogin.token : '1'
      },
      success: function(res) {
        // console.log(res.data)
        if (res.statusCode === 200) {
          _this.setData({ data: res.data, hasLogin: true })
          wx.hideLoading()
        } else {
          wx.showToast({ title: res.data.message, icon: 'none' })
        }
      }
    })

  },
  startAction: function () {
    wx.showLoading({
      title: '正在生成中...',
    })
    if(!this.checkNeedData()) {
      return
    }
    const eduid = app.globalData.edusysUserInfo.uid
    const edupass = app.globalData.edusysUserInfo.password
    const educookie = app.globalData.edusysUserInfo ? app.globalData.edusysUserInfo.cookie : ''
    const opacid = app.globalData.opacLogin ? app.globalData.opacLogin.uid : ''
    const opacpass = app.globalData.opacLogin ? app.globalData.opacLogin.pwd : ''
    const opaccookie = app.globalData.opacLogin ? app.globalData.opacLogin.cookie : ''
    this.getData(eduid, edupass, educookie, opacid, opacpass, opaccookie)
  },
  checkNeedData: function () {
    const eduid = app.globalData.edusysUserInfo.uid
    const edupass = app.globalData.edusysUserInfo.password
    const educookie = app.globalData.edusysUserInfo ? app.globalData.edusysUserInfo.cookie : ''
    const opacid = app.globalData.opacLogin ? app.globalData.opacLogin.uid : ''
    const opacpass = app.globalData.opacLogin ? app.globalData.opacLogin.pwd : ''
    const opaccookie = app.globalData.opacLogin ? app.globalData.opacLogin.cookie : ''
    
    if (educookie == '') {
      wx.showToast({ title: '请先登录', icon: 'none' })
      setTimeout(function() { wx.redirectTo({ url: '../index/login' }) }, 1000)
      return false
    }

    if (opaccookie == '') {
      wx.showToast({ title: '请先绑定借阅信息', icon: 'none' })
      setTimeout(function() { wx.redirectTo({ url: '../books/bind?from=portrait' }) }, 1000)
      return false
    }

    return true
  },
  swiperChange: function(e) {
    const currentIndex = e.detail.current
    if (currentIndex == 7) {
      this.setData({ showTips: false })
    } else {
      this.setData({ showTips: true })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const nickname = app.globalData.userInfo.nickName
    const uid = this.data.data ? this.data.data.edu.profile.uid : ''
    const shareTitle = this.data.data ? `贝壳小盒子 - ${nickname}的毕业画像` : '贝壳小盒子 - 毕业生画像生成'
    return {
      title: shareTitle,
      path: `pages/books/portrait?sharerid=${uid}`
    }
  }
})