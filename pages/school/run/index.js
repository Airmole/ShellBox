// pages/school/run/index.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    env: 'develop',
    type: '0',
    defaultAvatar: 'https://cdn.airmole.cn/static/default_gray_avatar.png',
    avatar: 'https://cdn.airmole.cn/static/default_gray_avatar.png',
    nickname: '',
    fillImage: 'https://cdn.airmole.cn/static/werun_fill_image.jpeg',
    top3icon: [
      'https://cdn.airmole.cn/static/werun_top1.png',
      'https://cdn.airmole.cn/static/werun_top2.png',
      'https://cdn.airmole.cn/static/werun_top3.png'
    ],
    types: [{
      name: '今日排行',
      value: 'day'
    }, {
      name: '本周排行',
      value: 'week'
    }, {
      name: '本月排行',
      value: 'month'
    }],
    ranklist: [],
    personalRank: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ env: app.globalData.env })
    if (app.globalData.env != 'release') {
      wx.switchTab({ url: '../../index/index' })
    }
    wx.showLoading()
    let type = options.type ? options.type : '0'
    let day = this.data.types[type].value
    this.setData({ type: type })
    this.inital(day)
  },
  inital: function  (day) {
    const userInfo = wx.getStorageSync('edusysUserInfo') || {}
    const avatar = userInfo.avatar ? userInfo.avatar : this.data.avatar
    const nickname = userInfo.nickname ? userInfo.nickname : userInfo.uid
    this.setData({ avatar: avatar, nickname: nickname })
    var _this = this
    wx.checkSession({
      success () {
        wx.getWeRunData({
          success (res) {
            console.log(res)
            _this.sendStepsData(res.encryptedData, res.iv)
          }
        })
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        app.wxLoginAndRequest()
      }
    })
    this.getRanklist(day)
  },
  getRanklist: function (day) {
    const _this = this;
    wx.request({
      url: `${app.globalData.domain}/steps`,
      data: { day: day },
      timeout: app.globalData.requestTimeout,
      success: (res) => {
        if (res.data.code == 200) {
          _this.setData({ranklist: res.data.data})
        }
      },
      complete: () => {
        _this.getPersonalRank(day)
        wx.hideLoading()
      }
    })
  },
  getPersonalRank: function (day = 'day') {
    const userInfo = wx.getStorageSync('edusysUserInfo') || {}
    let uid = userInfo ? userInfo.uid : ''
    if (!uid) {
      wx.showToast({ title: '未登录只能浏览无法参与排行', icon: 'none' })
    }
    const _this = this;
    wx.request({
      url: `${app.globalData.domain}/steps/rank/${uid}`,
      data: { day: day },
      timeout: app.globalData.requestTimeout,
      success: (res) => {
        if (res.data.code == 200) {
          _this.setData({personalRank: res.data.data})
        }
      },
      complete: () => {
      }
    })
  },
  sendStepsData: function (data, iv) {
    const _this = this
    let domain = app.globalData.domain
    let url = `${domain}/steps`

    const userInfo = wx.getStorageSync('edusysUserInfo') || {}
    let uid = userInfo ? userInfo.uid : ''
    let para = {
      uid: uid,
      platform: 'weapp',
      data: data,
      iv: iv
    }
    wx.request({
      url: url,
      data: para,
      timeout: app.globalData.requestTimeout,
      method: 'POST',
      success: function (res) {
        try {
          console.log(res.data)
          _this.getRanklist(_this.data.types[_this.data.type].value)
        } catch (error) {
          wx.showToast({ title: res.data.message, icon: 'none' })
        }
      }
    })
  },
  typeSelect: function (e) {
    let index = e.currentTarget.dataset.id
    let day = this.data.types[index].value
    // console.log('切换到', this.data.types[index].name)
    this.setData({ type: e.currentTarget.dataset.id })
    this.getRanklist(day)
  },
  updateAvatar () {
    wx.navigateTo({ url: '../../index/setting' })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const type = this.data.type
    const text = this.data.types[this.data.type].name
    return {
      title: `贝壳小盒子 - 运动计步${text}排行榜`,
      path: `/pages/school/run/index?type=${type}`
    }
  }
})