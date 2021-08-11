// pages/school/lost/component/lostActionBar.js
var app = getApp()
Component({
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    uid: {
      type: String,
      value: ''
    },
    data: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ownitModal: false,
    concact: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 编辑
    edit: function () {
      const id = this.data.data.id
      wx.showModal({
        title: '编辑修改？',
        content: '确认要编辑修改内容嘛？',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({ url: `./edit?id=${id}` })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    // 删除前准备确认
    delete: function () {
      const id = this.data.data.id
      const _this = this
      wx.showModal({
        title: '真的要删除？',
        content: '确认删除嘛？将会删除本条失物招领所有信息且无法恢复！',
        success(res) {
          if (res.confirm) {
            _this.deleteDataItem(id)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    // 删除操作
    deleteDataItem: function (id) {
      wx.showLoading({ title: '删除中...' })
      const _this = this
      wx.request({
        url: `${app.globalData.domain}/lost/${id}`,
        timeout: app.globalData.requestTimeout,
        method: 'DELETE',
        success: (res) => {
          try {
            if (res.statusCode == 200 && res.data.code == 200) {
              wx.hideLoading()
              wx.showToast({ title: '删除成功', icon: 'success' })
              setTimeout(function () { wx.navigateBack({ delta: 1 }) }, 1000)
            }
          } catch (error) {
            wx.hideLoading()
            wx.showToast({ title: res.data.message, icon: 'none' })
            wx.vibrateShort({ type: 'medium' })
          }
        }
      })
    },
    // 确认认领
    confirm: function () {
      const id = this.data.data.id
      const para = { status: 2 }
      const _this = this
      wx.showModal({
        title: '确认认领成功',
        content: '确认认领成功吗？丢失的东西已经物归原主了吗?',
        success(res) {
          if (res.confirm) {
            _this.update(id, para)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    // 拒绝认领
    cancel: function () {
      const id = this.data.data.id
      const para = { status: 0, receiver_id: '', receiver_concact: '' }
      const _this = this
      wx.showModal({
        title: '拒绝认领',
        content: '要拒绝认领吗吗？这意味着这件物品不属于当前领取联系人，其他同学可以继续重新认领',
        success(res) {
          if (res.confirm) {
            _this.update(id, para)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    // ownit 是我的、我捡到了
    ownit: function () {
      const _this = this
      const word = this.data.data.type == 1 ? '捡到' : '遗失'
      const uid = this.data.uid

      if (uid.length == 0 || uid == 0) {
        wx.showToast({ title: '请先登录', icon: 'none' })
        setTimeout(function() { wx.redirectTo({ url: '../../index/login' }) }, 1000)
        return
      }

      wx.showModal({
        title: `确认${word}`,
        content: `请仔细核对失物描述，确认是你${word}了东西吗？`,
        success(res) {
          if (res.confirm) {
            _this.setData({ ownitModal: true })
          } else if (res.cancel) {
            _this.setData({ ownitModal: false })
          }
        }
      })
    },
    confirmOwnit: function () {
      // console.log(this.data.concact)
      const receiver_id = this.data.uid
      const receiver_concact = this.data.concact
      if (receiver_concact.length < 3) {
        wx.showToast({ title: '输入手机号码有误', icon: 'none' })
        return
      }
      const id = this.data.data.id
      const para = { status: 1, receiver_id: receiver_id, receiver_concact: receiver_concact }

      const template1 = para.type != 1 ? 'c3KmaXoAiLXOeostrE62FSt-IzTkHKcxMAuM65A2FUc' : '0Snue4qrfRnqT8BPIetcFqa8C7gFVFMQd7_gM3T0s3s'
      const template2 = 'GT53lnzlKjztb2oGIO2YPBLB5Lv-onppUdVSmsdiN9U'
      const templateIds = [template1, template2]
      var _this = this
      wx.requestSubscribeMessage({
        tmplIds: templateIds,
        complete (res) {
          _this.sendLostPostRequest(para)
        }
      })

      this.update(id, para)
    },
    // 拒认领
    cancel: function () {
      const id = this.data.data.id
      const para = { status: 0, receiver_id: '', receiver_concact: '' }
      const _this = this
      wx.showModal({
        title: '拒绝认领',
        content: '要拒绝认领吗吗？这意味着这件物品不属于当前领取联系人，其他同学可以继续重新认领',
        success(res) {
          if (res.confirm) {
            _this.update(id, para)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    // 更新数据属性
    update: function (id = '', para = {}) {
      let url = `${app.globalData.domain}/lost`
      url = id ? `${url}/${id}` : url
      const _this = this
      wx.request({
        url: url,
        data: para,
        timeout: app.globalData.requestTimeout,
        method: 'POST',
        success: function (res) {
          try {
            if (res.statusCode == 200 && res.data.code == 200) {
              _this.closeOwnitModal()
              _this.triggerEvent(`refresh`, {})
            } else {
              wx.showToast({ title: res.data.message, icon: 'none' })
            }
          } catch (error) {
            wx.showToast({ title: res.data.message, icon: 'none' })
          }
        }
      })
    },
    closeOwnitModal: function () {
      this.setData({ ownitModal: false })
    },
    concactInput: function (e) {
      this.setData({ concact: e.detail.value })
    },
    sendLostPostRequest: function (para = {}) {
      let url = `${app.globalData.domain}/lost`
      url = this.data.id ? `${url}/${this.data.id}` : url
    
      wx.request({
        url: url,
        data: para,
        timeout: app.globalData.requestTimeout,
        method: 'POST',
        success: function (res) {
          try {
            if (res.statusCode == 200 && res.data.code == 200) {
              wx.showToast({ title: '发布成功' })
              // 发布成功，1秒后跳转上页
              setTimeout(function () { wx.navigateBack({ delta: 1 }) }, 1000)
            } else {
              wx.showToast({ title: res.data.message, icon: 'none' })
              if (res.data.code == 403 && res.data.desc == '已存在有相同重复信息') {
                // 该遗失物品有未认领归还的记录
                wx.showToast({ title: '好像有找到了，是不是这个？', icon: 'none' })
                setTimeout(function() { wx.navigateTo({ url: `./detail?id=${res.data.data.id}` }) }, 1000)
              }
            }
          } catch (error) {
            wx.showToast({ title: res.data.message, icon: 'none' })
          }
        }
      })
    },
  }
})
