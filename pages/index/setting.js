// pages/index/setting.js
const app = getApp()
const defaultAvatar = 'https://cdn.airmole.cn/static/default_gray_avatar.png'
Page({
  data: {
    avatarUrl: 'https://cdn.airmole.cn/static/default_gray_avatar.png',
    nickname: ''
  },
  onLoad () {
    const uid = app.globalData.edusysUserInfo ? app.globalData.edusysUserInfo.uid : ''
    console.log('uid', uid)
    if (!uid) {
      wx.redirectTo({ url: '../index/login' })
      return
    }
    this.fetch()
  },
  fetch () {
    const _this = this
    const domain = app.globalData.domain
    var uid = app.globalData.edusysUserInfo ? app.globalData.edusysUserInfo.uid : ''
    wx.request({
      url: `${domain}/wechat/userinfo`,
      data: { uid: uid },
      timeout: app.globalData.requestTimeout,
      success: function(res){
        if (res.statusCode == 200 && res.data.code == 200) {
          const avatarUrl = res.data.data.avatar ? res.data.data.avatar : defaultAvatar
          const nickName = res.data.data.nickname ? res.data.data.nickname : uid
          _this.setData({ avatarUrl: avatarUrl, nickname: nickName })
          let userInfo = { avatarUrl: avatarUrl, nickName: nickName }
          userInfo = Object.assign(userInfo, res.data.data)
          wx.setStorageSync('userInfo', userInfo)
        }
      }
    })
  },
  save () {
    var _this = this
    _this.setData({remind: '加载中'})
    var uid = app.globalData.edusysUserInfo ? app.globalData.edusysUserInfo.uid : ''
    var openid = app.globalData.openid ? app.globalData.openid : ''
    var avatarUrl = this.data.avatarUrl
    var nickName = _this.data.nickname
    const domain = app.globalData.domain
    wx.request({
      url: `${domain}/wechat/userinfo`,
      data:{
        uid: uid,
        openid: openid,
        nickname: nickName,
        avatar: avatarUrl
      },
      timeout: app.globalData.requestTimeout,
      method: 'POST',
      success: function(res){
        if (res.statusCode == 200 && res.data.code == 200) {
          let userInfo = wx.getStorageSync('userInfo') || {}
          Object.assign(userInfo, {
            avatarUrl: avatarUrl,
            avatar: avatarUrl,
            nickname: nickName,
            nickName: nickName
          })
          wx.setStorageSync('userInfo', userInfo)
          wx.navigateBack({ delta: 1 })
        }
      }
    })
  },
  onChooseAvatar(e) {
    wx.showLoading({ title: '获取中' })
    const avatarUrl = e.detail.avatarUrl
    this.uploadAvatar(avatarUrl)
  },
  nicknameChange(e) {
    const nickname = e.detail.value
    this.setData({ nickname: nickname })
    console.log(nickname)
  },
  uploadAvatar: function (filepath) {
    var _this = this
    const domain = app.globalData.domain
    wx.uploadFile({
      url: `${domain}/upload`,
      formData: { category: 'avatar' },
      filePath: filepath,
      name: 'image',
      success(res) {
        wx.hideLoading()
        const data = JSON.parse(res.data)
        if (res.statusCode == 200 || data.code == 200) {
          _this.setData({ avatarUrl: data.url })
        } else {
          wx.showToast({ title: res.data.message, icon: 'none' })
        }
      }
    })
  },
})