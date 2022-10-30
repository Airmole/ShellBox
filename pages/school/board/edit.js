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
    reditid: '',
    tag: null,
    tags: ['其他', '食堂', '宿舍', '教学楼', '老师', '图书馆'],
    canteen: null,
    canteens: ['一食堂', '二食堂', '三食堂'],
    library: null,
    libraries: ['理工图书馆', '社科图书馆'],
    teachBuilding: null,
    teachBuildings: [],
    dormitory: null,
    dormitories: [],
    placeRoom: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ env: app.globalData.env })
    if (app.globalData.env != 'release') {
      wx.switchTab({ url: '../../index/index' })
    }
    this.inital(options)
  },
  inital: function (options) {
    let weuser = wx.getStorageSync('edusysUserInfo') || {}
    let openid = wx.getStorageSync('openid') || {}
    openid = openid.openid ? openid.openid : ''
    const nickname = weuser.nickname ? weuser.nickname : openid
    const avatar = weuser.avatar
    const edusysInfo = wx.getStorageSync('edusysUserInfo') || {}
    const uid = edusysInfo.uid ? edusysInfo.uid : 0
    const realted = options.id ? options.id : ''
    const reditid = options.reditid ? options.reditid : ''
    if (reditid != '') this.getDetailData(reditid, 1)
    // 生成教学楼选择列表
    const teachBuildings = []
    for (let index = 1; index < 13; index++) {
      teachBuildings.push(`${index}号教学楼`)
    }
    // 生成宿舍楼选择列表
    const dormitories = []
    for (let index = 1; index < 43; index++) {
      dormitories.push(`${index}斋`)
    }
    this.setData({
      uid: uid,
      nickname: nickname,
      avatar: avatar,
      realted: realted,
      reditid: reditid,
      teachBuildings: teachBuildings,
      dormitories: dormitories
    })
  },
  contentInput: function (e) {
    this.setData({ content: e.detail.value })
  },
  mobileInput: function (e) {
    this.setData({ mobile: e.detail.value })
  },
  roomInput: function (e) {
    this.setData({ placeRoom: e.detail.value })
  },
  tagChange(e) {
    this.setData({
      tag: e.detail.value
    })
  },
  canteenChange(e) {
    this.setData({
      canteen: e.detail.value
    })
  },
  libraryChange(e) {
    this.setData({
      library: e.detail.value
    })
  },
  dormitoryChange(e) {
    this.setData({
      dormitory: e.detail.value
    })
  },
  teachBuildingChange(e) {
    this.setData({
      teachBuilding: e.detail.value
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
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
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
        _this.uploadImage(res.tempFiles[0].tempFilePath)
      }
    })
  },
  uploadImage: function (filepath) {
    var _this = this
    const domain = app.globalData.domain
    wx.uploadFile({
      url: `${domain}/upload`,
      formData: { category: 'complain' },
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
    // 编辑修改
    if (this.data.reditid) {
      const content = this.data.content
      const images = this.data.imgList
      if (content == '' && images.length == 0) {
        wx.showToast({ title: '图片，文字内容，你总得填一个吧', icon: 'none' })
        return
      }
      this.update(this.data.reditid, { content: content, images: images })
      return
    }
    // 发布新帖、评论
    const uid = this.data.uid
    const nickname = this.data.nickname ? this.data.nickname : uid
    const avatar = this.data.avatar ? this.data.avatar : ''
    const content = this.data.content
    const images = this.data.imgList
    const realted = this.data.realted
    const mobile = this.data.mobile
    const tag = this.data.tag === null ? '0' : this.data.tag
    let place_building = ''
    let place_room = this.data.placeRoom
    if (tag == 1) place_building = this.data.canteen === null ? '' : this.data.canteens[this.data.canteen]
    if (tag == 2) place_building = this.data.dormitory === null ? '' : this.data.dormitories[this.data.dormitory]
    if (tag == 3) place_building = this.data.teachBuilding === null ? '' : this.data.teachBuildings[this.data.teachBuilding]
    if (tag == 5) place_building = this.data.library === null ? '' : this.data.libraries[this.data.library]
    const data = {
      uid: uid,
      nickname: nickname,
      avatar: avatar,
      tag: tag,
      content: content,
      images: images,
      mobile: mobile,
      place_building: place_building,
      place_room: place_room
    }
    if ((tag == '' || tag == null) && realted == '') {
      wx.showToast({ title: '请先选择投诉问题类型', icon: 'none' })
      return
    }
    // 食堂、教学楼、宿舍问题选择位置验证
    if ((tag <= 3 && tag >= 1) && (place_building == '' || place_room == '')) {
      wx.showToast({ title: '请填写位置', icon: 'none' })
      return
    }
    if (mobile.length < 5 && realted == '') {
      wx.showToast({ title: '请您务必输入正确联系方式,以便工作人员联系你', icon: 'none' })
      return
    }
    if (realted != '') data.realted = realted
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
  },
  getDetailData: function (id, page = 1) {
    const _this = this
    wx.request({
      url: `${app.globalData.domain}/complain/${id}`,
      data: { page: page },
      timeout: app.globalData.requestTimeout,
      success: (res) => {
        _this.setData({ content: res.data.content.content, imgList: res.data.content.images })
      }
    })
  },
  update(id, data) {
    const _this = this
    wx.request({
      url: `${app.globalData.domain}/complain/${id}`,
      data: data,
      timeout: app.globalData.requestTimeout,
      method: 'POST',
      success: function (res) {
        try {
          if (res.statusCode == 200 && res.data.code == 200) {
            wx.showToast({ title: '修改成功' })
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