// pages/school/board/detail.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    env: 'develop',
    isLoading: true,
    isAdminer: false,
    canReplay: false,
    uid: '',
    id: '',
    backpage: '',
    tags: ['其他', '食堂', '宿舍', '教学楼', '老师'],
    data: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ env: app.globalData.env })
    this.inital(options)
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onShow: function () {
    this.getDetailData(this.data.id, 1)
  },
  inital: function (options) {
    const accountInfo = wx.getAccountInfoSync()
    const envVersion = accountInfo.miniProgram.envVersion
    if (envVersion != 'release') {
      wx.switchTab({ url: '../../index/index' })
    }
    const id = options.id
    const edusysInfo = wx.getStorageSync('edusysUserInfo') || {}
    const uid = edusysInfo != '' && edusysInfo.uid ? edusysInfo.uid : 0
    const backpage = options.backpage ? options.backpage : 1
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    prevPage.setData({ backpage: backpage })
    this.setData({ id: id })
    this.getDetailData(id, 1)
    console.log(typeof app.globalData.isBoardAdminer, app.globalData.isBoardAdminer)
    if (app.globalData.isBoardAdminer == undefined) {
      this.isAdminer(uid)
    } else {
      this.setData({ uid: uid, isAdminer: app.globalData.isBoardAdminer ? true : false })
    }
  },
  getDetailData: function (id, page = 1) {
    const _this = this
    wx.request({
      url: `${app.globalData.domain}/complain/${id}`,
      data: { page: page },
      timeout: app.globalData.requestTimeout,
      success: (res) => {
        const canReplay = _this.data.isAdminer ? true : false
        _this.setData({ data: res.data, canReplay: canReplay, isLoading: false })
        wx.vibrateShort({ type: 'medium' })
      }
    })
  },
  reditConfirm: function (e) {
    const id = e.currentTarget.dataset.id
    const _this = this
    wx.showModal({
      title: '注意',
      content: '真的要重新编辑此回复？',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({ url: `./edit?reditid=${id}` })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  deleteConfirm: function (e) {
    const id = e.currentTarget.dataset.id
    const _this = this
    wx.showModal({
      title: '真的要删除？',
      content: '确认删除嘛？将会删除本条回复评论且无法恢复！',
      success(res) {
        if (res.confirm) {
          _this.deleteDataItem(id)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  reply() {
    const id = this.data.id
    wx.navigateTo({ url: `./edit?id=${id}` })
  },
  update(e) {
    const id = this.data.id
    const hot = e.currentTarget.dataset.hot ? e.currentTarget.dataset.hot : this.data.data.content.hot
    const resolve_status = e.currentTarget.dataset.resolve ? e.currentTarget.dataset.resolve : this.data.data.content.resolve_status
    const data = { hot: hot, resolve_status: resolve_status }
    const _this = this
    wx.showModal({
      title: '注意',
      content: resolve_status == 1 ? '设置为已解决后将无法重新修改解决状态，确认【已解决】？' : '确定设为【常见问题】嘛？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: `${app.globalData.domain}/complain/${id}`,
            data: data,
            timeout: app.globalData.requestTimeout,
            method: 'POST',
            success: function (res) {
              try {
                if (res.statusCode == 200 && res.data.code == 200) {
                  wx.showToast({ title: '操作成功' })
                  _this.getDetailData(_this.data.id, 1)
                } else {
                  wx.showToast({ title: res.data.message, icon: 'none' })
                }
              } catch (error) {
                wx.showToast({ title: res.data.message, icon: 'none' })
              }
            }
          })
        } else if (res.cancel) {
          console.log('取消操作')
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
            _this.getDetailData(_this.data.id, 1)
          }
        } catch (error) {
          wx.hideLoading()
          wx.showToast({ title: res.data.message, icon: 'none' })
          wx.vibrateShort({ type: 'medium' })
        }
      }
    })
  },
  isAdminer: function (uid = 0) {
    const _this = this
    wx.request({
      url: `${app.globalData.domain}/complain/adminer/${uid}`,
      timeout: app.globalData.requestTimeout,
      success: (res) => {
        app.globalData.isBoardAdminer = false
        if (res.data.code == 200 && res.data.message == 'success') {
          _this.setData({ uid: uid, isAdminer: true })
          app.globalData.isBoardAdminer = true
        }
      }
    })
  },
  // 上一页
  lastPage: function () {
    const current = this.data.data.pagination.current
    const targetPage = current > 1 ? Number(current) - 1 : 2
    this.getDetailData(this.data.id, targetPage)
  },
  // 下一页
  nextPage: function () {
    const current = this.data.datalist.pagination.current
    const last = this.data.datalist.pagination.last
    const targetPage = current < last ? Number(current) + 1 : last
    this.getDetailData(this.data.id, targetPage)
  },
  previewImage: function (e) {
    wx.previewImage({ urls: e.currentTarget.dataset.allurl, current: e.currentTarget.dataset.url })
  },
  callPhone: function (e) {
    var tel = e.currentTarget.dataset.tel;
    wx.makePhoneCall({ phoneNumber: tel });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const id = this.data.id
    return {
      title: '投诉维权',
      path: `pages/school/board/detail?id=${id}`
    }
  }
})