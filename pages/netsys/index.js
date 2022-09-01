// pages/netsys/index.js
var app = getApp()
var util = require("../../utils/util")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    uid: '',
    netid: '',
    password: '',
    cookie: '',
    info: '',
    timeText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.inital();
  },
  inital: function () {
    var getDataBy = 'account'
    const netsysUserInfo = wx.getStorageSync('netsysUserInfo') || {}
    const edusysUserInfo = wx.getStorageSync('edusysUserInfo') || {}
    if (netsysUserInfo.netid.length > 0 && edusysUserInfo.uid.length > 0) {
      getDataBy = 'account';
      this.setData({
        uid: edusysUserInfo.uid,
        netid: netsysUserInfo.netid,
        password: netsysUserInfo.password
      })
      this.getData(netsysUserInfo.netid, netsysUserInfo.password, '', getDataBy)
    } else if (app.globalData.netsysUserInfo != '') {
      getDataBy = 'cookie';
      this.setData({ cookie: app.globalData.netsysUserInfo.cookie })
      this.getData('', '', app.globalData.netsysUserInfo.cookie, getDataBy)
    } else {
      wx.removeStorageSync('netsysUserInfo')
      wx.redirectTo({ url: './bind' })
      return
    }
    const date = new Date()
    const nowTimestamp = date.getTime()
    const timeText = util.formatDateTime(nowTimestamp, true)
    if (edusysUserInfo == '') {
      wx.redirectTo({ url: '../index/login' })
    }
    this.setData({ timeText: timeText, uid: edusysUserInfo.uid})
  },
  getData: function (netid = '', password = '', cookie = '', getDataBy = 'account') {
    var _this = this
    let postdata = {}
    
    if (getDataBy === 'account') {
      postdata = {
        uid: app.globalData.edusysUserInfo.uid,
        userid: netid,
        password: password,
      }
    } else {
      postdata = { cookie: cookie }
    }

    wx.request({
      url: `${app.globalData.domain}/netsys/profile`,
      data: postdata,
      timeout: app.globalData.requestTimeout,
      method: 'POST',
      success: function(res){
        try {
          if (res.data.welcome.length > 1) {
            _this.setData({ info: res.data, isLoading: '' })
            app.globalData.netsysUserInfo = res.data
            wx.vibrateShort({ type: 'medium' })
          }
        } catch (error) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 5000
          })
          wx.redirectTo({ url: './bind' })
        }
      }
    })
  },
  unbind: function () {
    wx.removeStorageSync('netsysUserInfo')
    wx.vibrateShort({ type: 'medium' })
    wx.redirectTo({ url: './bind' })
  }
})