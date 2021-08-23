// pages/school/board/index.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    isAdminer: false,
    uid: 0,
    qrcode: 'https://upload-images.jianshu.io/upload_images/4697920-289dc2673020bb99.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/512',
    datalist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const accountInfo = wx.getAccountInfoSync()
    const envVersion = accountInfo.miniProgram.envVersion
    if (envVersion != 'release') {
      wx.switchTab({ url: '../../index/index' })
    }
    this.inital()
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onShow: function () {
    this.inital()
  },
  inital: function () {
    this.getDatalist()
    const edusysInfo = wx.getStorageSync('edusysUserInfo')
    const uid = edusysInfo != '' && edusysInfo.uid ? edusysInfo.uid : 0
    this.setData({ uid: uid })
    this.isAdminer(uid)
  },
  getDatalist: function (page = 1) {
    const _this = this
    wx.request({
      url: `${app.globalData.domain}/complain`,
      data: { page: page },
      timeout: app.globalData.requestTimeout,
      success: (res) => {
        _this.setData({ datalist: res.data, isLoading: false })
        wx.vibrateShort({ type: 'medium' })
      }
    })
  },
  isAdminer: function(uid = 0) {
    const _this = this
    wx.request({
      url: `${app.globalData.domain}/complain/adminer/${uid}`,
      timeout: app.globalData.requestTimeout,
      success: (res) => {
        app.globalData.isBoardAdminer = false
        if (res.data.code == 200 && res.data.message == 'success') {
          _this.setData({ isAdminer: true })
          app.globalData.isBoardAdminer = true
        }
      }
    })
  },
  deleteConfirm: function(e) {
    const id = e.currentTarget.dataset.id
    const _this = this
    wx.showModal({
      title: '真的要删除？',
      content: '确认删除嘛？将会连同相关评论回复全部一起删除且无法恢复。',
      success (res) {
        if (res.confirm) {
          _this.deleteDataItem(id)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  deleteDataItem: function (id) {
    wx.showLoading({ title: '删除中...' })
    const _this = this
    wx.request({
      url: `${app.globalData.domain}/complain/${id}`,
      timeout: app.globalData.requestTimeout,
      method: 'DELETE',
      success: (res) => {
        try {
          if (res.statusCode == 200 && res.data.code == 200) {
            wx.hideLoading()
            wx.showToast({ title: res.data.message })
            _this.getDatalist()
          }
        } catch (error) {
          wx.hideLoading()
          wx.showToast({ title: res.data.message, icon: 'none' })
          wx.vibrateShort({ type: 'medium' })
        }
      }
    })
  },
  previewImage:function (e) {
    wx.previewImage({ urls: e.currentTarget.dataset.allurl, current: e.currentTarget.dataset.url })
  },
  // 上一页
  lastPage: function () {
    const current = this.data.datalist.pagination.current
    const targetPage = current > 1 ? Number(current) - 1 : 2
    this.getDatalist(targetPage)
  },
  // 下一页
  nextPage: function () {
    const current = this.data.datalist.pagination.current
    const last = this.data.datalist.pagination.last
    const targetPage = current < last ? Number(current) + 1 : last
    this.getDatalist(targetPage)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '“贝壳小盒子” - 投诉维权通道',
      path: 'pages/school/board/index'
    }
  }
})