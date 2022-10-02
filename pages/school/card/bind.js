// pages/school/card/bind.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    webImage: 'https://cdn.airmole.cn/static/ehall_tips.png',
    uid: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const ehallAccount = wx.getStorageSync('ehallAccount') || {}
    const idcard = app.globalData.edusysUserInfo.idcard || ''

    let uid = options.uid || ''
    let password = options.password || ''
    if (uid != '' && password == '') {
      const pointGrade = 20
      const grade = uid.substr(0, 2)
      // 20级之前默认密码身份证号码后六位
      if (grade < pointGrade &&  uid.indexOf(grade) === 0) password = idcard.substring(idcard.length - 6)
      // 20级之后默认密码身份证号码后八位
      if (grade >= pointGrade &&  uid.indexOf(grade) === 0) password = idcard.substring(idcard.length - 8)
    }
    if (uid != '' && password == '' && ehallAccount && ehallAccount.uid == uid) password = ehallAccount.password
    if (uid == '' && password=='' && ehallAccount && ehallAccount.uid) {
      uid = ehallAccount.uid
      password = ehallAccount.password
    }
    this.setData({ uid: uid, password: password })
    if (uid && password) this.getCardAmount(uid, password)
  },
  getCardAmount(uid = '', password = '') {
    var _this = this
    wx.request({
      url: `${app.globalData.domain}/ehall/card`,
      data: { uid: uid, password: password },
      success (res) {
        if (res.statusCode == 200) {
          wx.setStorageSync('ehallAccount', {
            uid: uid,
            password: password
          })
          wx.redirectTo({ url: `./index?uid=${uid}&password=${password}` })
        } else {
          _this.setData({ password: '' })
          wx.showToast({ title: res.data.message, icon: 'none' })
        }
      }
    })
  }
})