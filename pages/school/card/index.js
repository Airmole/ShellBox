// pages/school/card/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind: '',
    user: {},
    ehall: {},
    uid: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let uid = options ? options.uid : ''
    let password = options ? options.password : ''
    if (uid == '' || password == '') {
      const ehallAccount = wx.getStorageSync('ehallAccount') || {}
      uid = ehallAccount ? ehallAccount.uid : ''
      password = ehallAccount ? ehallAccount.password : ''
    }
    if (uid == '' || password == '') {
      const idcard = app.globalData.edusysUserInfo.idcard || ''
      uid = app.globalData.edusysUserInfo.uid
      password = idcard.substring(idcard.length - 6)
    }
    if (uid == '' || password == '') {
      wx.redirectTo({ url: './bind?uid=&password=' })
      return
    }

    this.getCardAmount(uid, password)
    this.setData({ user: app.globalData.edusysUserInfo, uid: uid, password: password })
  },
  getCardAmount(uid = '', password = '') {
    var _this = this
    wx.request({
      url: `${app.globalData.domain}/ehall/card`,
      data: { uid: uid, password: password },
      success(res) {
        if (res.statusCode == 200) {
          wx.setStorageSync('ehallAccount', {
            uid: uid,
            password: password
          })
          _this.setData({ ehall: res.data })
        } else {
          wx.showToast({ title: res.data.message, icon: 'none' })
          setTimeout(function () { wx.redirectTo({ url: './bind?uid=&password=' }) }, 1500)
        }
      }
    })
  },
  rebind() {
    wx.showModal({
      title: '提示',
      content: '您确认要切换查询其他一卡通余额？',
      success(res) {
        if (res.confirm) {
          wx.setStorageSync('ehallAccount', '')
          wx.redirectTo({ url: './bind?password=&uid=' })
        } else if (res.cancel) {
        }
      }
    })

  }
})