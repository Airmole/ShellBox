// pages/school/lost/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    env: 'develop',
    title: '失物招领',
    isLoading: '加载中',
    screenHeight: '900',
    defaultAvatar: 'https://cdn.airmole.cn/static/default_gray_avatar.png',
    keyword: '',
    type: 1,
    uid: '',
    types: [{
      label: '物主遗失',
      value: 1
    }, {
      label: '他人拾获',
      value: 2
    }],
    lostTypes: [{
      label: '选择物品类型',
      value: 0
    }, {
      label: '校园卡',
      value: 1
    }, {
      label: '学生证',
      value: 2
    }, {
      label: '身份证',
      value: 3
    }, {
      label: '其他物品',
      value: 4
    }],
    lostStatus: ['无人拾获' ,'有人拾获', '已找回'],
    receiveStatus: ['无人认领' ,'有人认领', '已归还'],
    datalist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ env: app.globalData.env })
    if (app.globalData.env != 'release') {
      wx.switchTab({ url: '../../index/index' })
    }
    const type = options.type ? options.type : 1
    const keyword = options.keyword ? options.keyword : ''
    this.inital(type, keyword);
    this.getDatalist(type, 1, keyword)
  },
  inital: function (type, keyword) {
    const device = wx.getSystemInfoSync()
    const uid = app.globalData.edusysUserInfo.uid
    this.setData({ screenHeight: device.screenHeight, type: type, uid: uid, keyword: keyword })
    wx.showShareMenu({ withShareTicket: true, menus: ['shareAppMessage', 'shareTimeline'] })
  },
  typeChanged: function (e) {
    const type = this.data.types[e.currentTarget.dataset.index].value
    this.setData({ type: type})
    this.getDatalist(type)
  },
  getDatalist: function (type = 1, page = '1', keyword = '') {
    const _this = this;
    wx.request({
      url: `${app.globalData.domain}/lost`,
      data: { page: page, type: type, keyword: keyword },
      timeout: app.globalData.requestTimeout,
      success: (res) => {
        if (res.data.code == 200) {
          res.data = _this.encryptIdcardNumber(res.data)
          _this.setData({datalist: res.data, isLoading: false})
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
    this.getDatalist(this.data.type, targetPage)
  },
  // 下一页
  nextPage: function () {
    const current = this.data.datalist.pagination.current
    const last = this.data.datalist.pagination.last
    const targetPage = current < last ? Number(current) + 1 : last
    this.getDatalist(this.data.type, targetPage)
  },
  // 关键字输入
  searchInput: function (e) {
    const value = e.detail.value
    this.setData({ keyword: value })
  },
  // 关键字搜索
  search: function () {
    const type = this.data.type
    const keyword = this.data.keyword
    this.getDatalist(type, 1, keyword)
  },
  // 清空重置关键字搜索
  reset: function () {
    const type = this.data.type
    this.setData({ keyword: '' })
    this.getDatalist(type, 1)
  },
  // 身份证号码星号占位处理
  encryptIdcardNumber : function (e) {
    for (let index = 0; index < e.data.length; index++) {
      const element = e.data[index]
      if (element.lost_type == 3) {
        e.data[index].idcard_number = element.card_number.substr(0, 4) + '**********' + element.card_number.substr(14, 4)
      }
    }
    return e
  },
  create : function () {
    const uid = this.data.uid
    // 发布新内容前请先登录
    if (uid == 0 || uid.length < 1) {
      wx.showToast({ title: '请先登录', icon: 'none' })
      setTimeout(function() { wx.redirectTo({ url: '../../index/login' }) }, 1000)
      return
    }
    wx.navigateTo({ url: `./edit?type=${this.data.type}` })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this;
    setTimeout(function () { _this.setData({ isLoading: false }) }, 1000);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDatalist(this.data.type, 1, this.data.keyword)
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
    const type = this.data.type
    const keyword = this.data.keyword
    return {
      title: '贝壳小盒子 - 失物招领',
      path: `/pages/school/lost/index?type=${type}&keyword=${keyword}`
    }
  }
})