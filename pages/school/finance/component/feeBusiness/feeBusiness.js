// pages/school/finance/component/feeBusiness/feeBusiness.js
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
    tab: 'pending',
    tabs: [{
      title: '待缴费',
      value: 'pending'
    }, {
      title: '已缴费',
      value: 'finished'
    }],
    data: {},
    datalist: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inital: function () {
      this.getDatalist('false')
    },
    tabChanged: function (e) {
      const tab = this.data.tabs[e.currentTarget.dataset.index].value
      this.setData({ tab: tab})
      const paid = tab == 'pending' ? 'false' : 'true'
      this.getDatalist(paid)
    },
    getDatalist: function (paid = 'true', page = 0, pagesize = 30) {
      wx.showLoading({ title: '等等，我加载下' })
      const _this = this
      const cookie = app.globalData.financeInfo ? app.globalData.financeInfo.cookie : ''
      if (!cookie) {
        wx.showToast({ title: '请先登录', icon: 'none' })
        wx.redirectTo({ url: '/pages/school/finance/bind' })
        return
      }
      wx.request({
        url: `${app.globalData.domain}/finance/fee`,
        data: {
          cookie: cookie,
          paid: paid,
          page: page,
          pagesize: pagesize
        },
        timeout: app.globalData.requestTimeout,
        success: (res) => {
          _this.setData({ datalist: res.data.data, data: res.data })
        },
        complete: (res)=> {
          wx.hideLoading()
        }
      })
    }
  }
})
