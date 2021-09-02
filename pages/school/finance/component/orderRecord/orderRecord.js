// pages/school/finance/component/orderRecord/orderRecord.js
var app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.inital()
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    data: '',
    datalist: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inital: function () {
      this.getDatalist()
    },
    getDatalist: function (page = 0, pagesize = 10) {
      wx.showLoading({ title: '等等，我加载下' })
      const _this = this
      const cookie = app.globalData.financeInfo ? app.globalData.financeInfo.cookie : ''
      if (!cookie) {
        wx.showToast({ title: '请先登录', icon: 'none' })
        wx.redirectTo({ url: '/pages/school/finance/bind' })
        return
      }

      wx.request({
        url: `${app.globalData.domain}/finance/order`,
        data: {
          cookie: cookie,
          page: page,
          pagesize: pagesize
        },
        timeout: app.globalData.requestTimeout,
        success: (res) => {
          if (res.data.code == 200) {
            _this.setData({ datalist: res.data.data, data: res.data })
          } else {
            wx.showToast({ title: res.data.message, icon: 'none' })
          }
        },
        complete: (res)=> {
          wx.hideLoading()
        }
      })
    }
  }
})
