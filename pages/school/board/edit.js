// pages/school/board/edit.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    env: 'develop',
    uid: 0,
    nickname: '',
    avatar: '',
    pindex: null,
    imgList: [],
    content: '',
    mobile: '',
    realted: '',
    tag: null,
    tags: ['其他', '食堂', '宿舍', '教学楼', '老师']
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
  },
  inital: function (options) {
    const weuser = wx.getStorageSync('userInfo')
    let openid = wx.getStorageSync('openid')
    openid = openid.openid ? openid.openid : ''
    const nickname = weuser.nickName ? weuser.nickName : openid
    const avatar = weuser.avatarUrl
    const edusysInfo = wx.getStorageSync('edusysUserInfo')
    const uid = edusysInfo.uid ? edusysInfo.uid : 0
    const realted = options.id ? options.id : ''
    this.setData({
      uid: uid,
      nickname: nickname,
      avatar: avatar,
      realted: realted
    })
  },
  contentInput: function (e) {
    this.setData({ content: e.detail.value })
  },
  mobileInput: function (e) {
    this.setData({ mobile: e.detail.value })
  },
  tagChange(e) {
    this.setData({
      tag: e.detail.value
    })
  },
  previewImage: function (e) {
    wx.previewImage({ urls: this.data.imgList, current: e.currentTarget.dataset.url })
  },
  DelImg: function (e) {
    var _this = this
    wx.showModal({
      title: '桥豆麻袋',
      content: '确定要删除这张图片？',
      cancelText: '点错了',
      confirmText: '删掉！',
      success: res => {
        if (res.confirm) {
          _this.data.imgList.splice(e.currentTarget.dataset.index, 1)
          _this.setData({ imgList: _this.data.imgList })
        }
      }
    })
  },
  chooseImage: function () {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        wx.showLoading({ title: '上传中...' })
        var tempFilesSize = res.tempFiles[0].size
        console.log('上传图片文件大小', tempFilesSize)
        if (tempFilesSize > 2000000) { // 2M图片大小限制
          wx.hideLoading()
          wx.showToast({ title: '上传图片不能大于2M!', icon: 'none' })
          return
        }
        _this.uploadImage(res.tempFilePaths[0])
      }
    })
  },
  uploadImage: function (filepath) {
    var _this = this
    wx.uploadFile({
      url: 'https://dev.shellbox.airmole.cn/api/complain/upload',
      filePath: filepath,
      name: 'image',
      success(res) {
        wx.hideLoading()
        const data = JSON.parse(res.data)
        if (res.statusCode == 200 || data.code == 200) {
          console.log(data)
          if (_this.data.imgList.length != 0) {
            _this.setData({ imgList: _this.data.imgList.concat(data.url) })
          } else {
            _this.setData({ imgList: [data.url] })
          }
        } else {
          wx.showToast({ title: res.data.message, icon: 'none' })
        }
      }
    })
  },
  postContent: function () {
    const uid = this.data.uid
    const nickname = this.data.nickname ? this.data.nickname : uid
    const avatar = this.data.avatar ? this.data.avatar : ''
    const content = this.data.content
    const images = this.data.imgList
    const realted = this.data.realted
    const mobile = this.data.mobile
    const tag = this.data.tag === null ? '0' : this.data.tag
    const data = {
      uid: uid,
      nickname: nickname,
      avatar: avatar,
      tag: tag,
      content: content,
      images: images,
      mobile: mobile
    }
    if ((tag == '' || tag == null) && realted == '') {
      wx.showToast({ title: '请先选择投诉问题类型', icon: 'none' })
      return
    }
    if (mobile.length < 5 && realted == '') {
      wx.showToast({ title: '请您务必输入正确联系方式,以便工作人员联系你', icon: 'none' })
      return
    }
    if (realted != '') {
      data.realted = realted
    }
    if (content.length < 1) {
      wx.showToast({ title: '你啥都没输入鸭！！！', icon: 'none' })
      return
    }
    const templateIds = ['el20tge29Hz5-ZLDcKZABYj6BPiPK8eAUb4gumP01PQ']
    const _this = this
    if (realted){
      _this.sendPostRequest(data)
      return
    }
    wx.requestSubscribeMessage({
      tmplIds: templateIds,
      success (res) {
        _this.sendPostRequest(data)
      },
      fail (res) {
        _this.sendPostRequest(data)
      }
    })
  },
  sendPostRequest: function (data) {
    wx.request({
      url: `${app.globalData.domain}/complain`,
      data: data,
      timeout: app.globalData.requestTimeout,
      method: 'POST',
      success: function (res) {
        try {
          if (res.statusCode == 200 && res.data.code == 200) {
            wx.showToast({ title: '发布成功' })
            // 1秒后跳转上页
            setTimeout(function () { wx.navigateBack({ delta: 1 }) }, 1000)
          } else {
            wx.showToast({ title: res.data.message, icon: 'none' })
          }
        } catch (error) {
          wx.showToast({ title: res.data.message, icon: 'none' })
        }
      }
    })
  }
})