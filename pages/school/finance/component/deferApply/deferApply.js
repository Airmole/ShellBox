// pages/school/finance/component/deferApply/deferApply.js
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
      title: '可缓交',
      value: 'pending'
    }, {
      title: '已缓交',
      value: 'finished'
    }],
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
    tabChanged: function (e) {
      const tab = this.data.tabs[e.currentTarget.dataset.index].value
      this.setData({ tab: tab})
      const record = tab == 'pending' ? 'false' : 'true'
      this.getDatalist(record)
    },
    getDatalist: function (record = 'false', page = 0, pagesize = 30) {
      wx.showLoading({ title: '等等，我加载下' })
      const _this = this
      const cookie = app.globalData.financeInfo ? app.globalData.financeInfo.cookie : ''
      if (!cookie) {
        wx.showToast({ title: '请先登录', icon: 'none' })
        wx.redirectTo({ url: '/pages/school/finance/bind' })
        return
      }
      wx.request({
        url: `${app.globalData.domain}/finance/defer`,
        data: {
          cookie: cookie,
          record: record,
          page: page,
          pagesize: pagesize
        },
        timeout: app.globalData.requestTimeout,
        success: (res) => {
          if (res.data.code == 200) {
            const datalist = _this.formatAllDate(res.data.data)
            _this.setData({ datalist: datalist, data: res.data})
          } else {
            wx.showToast({ title: res.data.message, icon: 'none' })
          }
        },
        complete: (res)=> {
          wx.hideLoading()
        }
      })
    },
    formatAllDate: function (array) {
      let result = []
      array.forEach(element => {
        const showDate = new Date(parseInt(element.DelayEndTime.substr(6, 13))).toLocaleDateString()
        element.showDate = showDate
        result.push(element)
      })
      return result
    }
  }
})
