// pages/school/lost/detail.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    env: 'develop',
    defaultAvatar: app.globalData.defaultGrayAvatar,
    isLoading: true,
    isPublisher: false,
    isRecevicer: false,
    uid: '',
    id: '',
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
    data: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ env: app.globalData.env })
    // if (app.globalData.env != 'release') {
    //   wx.switchTab({ url: '../../index/index' })
    // }
    
    this.inital(options)
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onShow: function () {
    this.getDetailData(this.data.id)
  },
  inital: function (options) {
    const id = options.id
    const edusysInfo = wx.getStorageSync('edusysUserInfo') || {}
    const uid = edusysInfo != '' && edusysInfo.uid ? edusysInfo.uid : 0
    const backpage = options.backpage ? options.backpage : 1
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2]
    prevPage.setData({ backpage: backpage })
    this.setData({ id: id, uid: uid })
    this.getDetailData(id)
  },
  getDetailData: function (id) {
    const _this = this
    wx.request({
      url: `${app.globalData.domain}/lost/${id}`,
      timeout: app.globalData.requestTimeout,
      success: (res) => {
        if (res.statusCode == 200 && res.data.code == 200) {
          res.data.data = _this.encryptIdcardNumber(res.data.data)
          const isPublisher = res.data.data.uid == _this.data.uid ? true : false
          const isRecevicer = res.data.data.receiver_id == _this.data.uid ? true : false
          _this.setData({
            data: res.data.data,
            isLoading: false,
            isPublisher: isPublisher,
            isRecevicer: isRecevicer
          })
          wx.vibrateShort({ type: 'medium' })
        } else {
          wx.showToast({ title: res.data.desc, icon: 'none' })
          // 1秒后跳转上页
          setTimeout(function () { wx.navigateBack({ delta: 1 }) }, 1000)
        }
      },
      fail: (res) => {
        wx.showToast({ title: res.data.desc, icon: 'none' })
        // 1秒后跳转上页
        setTimeout(function () { wx.navigateBack({ delta: 1 }) }, 1000)
      }
    })
  },
  // 图片预览
  previewImage:function (e) {
    wx.previewImage({ urls: e.currentTarget.dataset.allurl, current: e.currentTarget.dataset.url })
  },
  // 身份证号码星号占位处理
  encryptIdcardNumber : function (e) {
    let idcard_number = e.lost_type == 3 ? e.card_number.substr(0, 4) + '**********' + e.card_number.substr(14, 4) : e.card_number
    e.idcard_number = idcard_number
    return e
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
    const desc = this.data.data.desc ? this.data.data.desc : ' - 贝壳小盒子'
    return {
      title: `【失物招领】${desc}`,
      path: `/pages/school/lost/detail?id=${id}`
    }
  }
})