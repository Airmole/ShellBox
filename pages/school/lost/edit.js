// pages/school/lost/create.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uid: 0,
    edusysInfo: '',
    defaultCardNo: '',
    pindex: null,
    imgList: [],
    type: 1,
    types: [{
      label: '遗失',
      value: 1,
      checked: true
    }, {
      label: '拾获',
      value: 2,
      checked: false
    }],
    lostTypeIndex: 0,
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
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.inital(options)
  },
  inital: function (options) {
    const edusysInfo = wx.getStorageSync('edusysUserInfo')
    const uid = edusysInfo.uid ? edusysInfo.uid : 0
    this.setData({
      uid: uid,
      edusysInfo: edusysInfo
    })
  },
  previewImage: function (e) {
    wx.previewImage({ urls: this.data.imgList, current: e.currentTarget.dataset.url })
  },
  DelImg: function (e) {
    var _this = this
    wx.showModal({
      title: '稍等',
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
  lostSubmit: function (e) {
    // console.log(e)
    let para = e.detail.value
    para.uid = this.data.uid
    para.images = this.data.imgList
    para.status = 0
    // 参数校验
    if (!this.vaildFormData(para)) {
      return
    }

    wx.request({
      url: `${app.globalData.domain}/lost`,
      data: para,
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
  lostTypePickerChange: function (e) {
    const lostTypeIndex = e.detail.value
    const type = this.data.type
    const defaultCardNo = this.setDefaultCardNo(lostTypeIndex, type)
    this.setData({
      lostTypeIndex: lostTypeIndex,
      defaultCardNo: defaultCardNo
    })
  },
  setDefaultCardNo : function (lostTypeIndex, type) {
    let defaultCardNo = this.data.defaultCardNo
    // 可能是丢失了自己的校园卡或学生证，自动获取卡号填入
    if ((lostTypeIndex == 1 || lostTypeIndex == 2) && type == 1) {
      defaultCardNo = this.data.edusysInfo.uid
    }
    // 可能是丢失了自己的身份证，自动获取身份证号输入
    if (lostTypeIndex == 3 && type == 1) {
      defaultCardNo = this.data.edusysInfo.idcard
    }
    // 其他物品，卡号置空
    if (lostTypeIndex == 4 || type == 2) {
      defaultCardNo = ''
    }
    return defaultCardNo
  },
  typeChanged : function (e)  {
    const lostTypeIndex = this.data.lostTypeIndex
    const type = e.detail.value
    const defaultCardNo = this.setDefaultCardNo(lostTypeIndex, type)
    this.setData({ type: type, defaultCardNo: defaultCardNo })
  },
  vaildFormData: function (para) {
    // 验证是否登录，有没有学号
    if (para.uid == 0) {
      wx.showToast({ title: '请先登录', icon: 'none' })
      setTimeout(function() { wx.redirectTo({ url: '../../index/login' }) }, 1000)
      return false
    }
    // 物品类型验证
    if (para.lostType == 0) {
      wx.showToast({ title: '请选择物品类型', icon: 'none' })
      return false
    }
    // 验证证件号码
    if (para.lostType < 4 && para.lostType > 0) {
      if (para.card_number.length < 4) {
        wx.showToast({ title: '证件卡号有误', icon: 'none' })
        return false
      }
    }
    // 验证联系方式
    if (para.concact.length < 6) {
      wx.showToast({ title: '请输入真实有效的联系方式', icon: 'none' })
      return false
    }
    return true
  },
  // 调用OCR插件识别证件号码
  ocrIdcard: function (e) {
    // 识别证件号码
    let idcardNo = e.detail.id.text
    this.setData({ defaultCardNo: idcardNo })
  }
})