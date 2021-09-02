// pages/school/finance/component/feeRecord.js
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

  /**
   * 组件的初始数据
   */
  data: {
    datalist: []
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
   * 组件的方法列表
   */
  methods: {
    inital: function () {
      this.getDatalist()
    },
    formatDatalist: function (array = []) {
      let result = []
      // 一级目录
      array.forEach(element => {
        if (element.ParentTaskUID == -1) {
          element.unfold = true
          result.push(element)
        }
      })
      // 二级目录
      array.forEach(element => {
        result.forEach(function(subele, subidx) {
          if (!subele.children) {
            result[subidx].children = []
          }
          if (element.ParentTaskUID == subele.UID) {
            result[subidx].children.push(element)
          }
        })
      })
      // 三级目录
      array.forEach(element => {
        result.forEach(function(subele, subidx) {
          subele.children.forEach(function(ssubele, ssubidx) {
            if (!ssubele.children) {
              result[subidx].children[ssubidx].children = []
            }
            if (element.ParentTaskUID == ssubele.UID) {
              result[subidx].children[ssubidx].children.push(element)
            }
          })
        })
      })
      // console.log(result)
      return result
    },
    fold: function (e) {
      const index = e.currentTarget.dataset.index
      let datalist = this.data.datalist
      datalist[index].unfold = !datalist[index].unfold
      this.setData({ datalist: datalist })
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
        url: `${app.globalData.domain}/finance/paid`,
        data: {
          cookie: cookie,
          page: page,
          pagesize: pagesize
        },
        timeout: app.globalData.requestTimeout,
        success: (res) => {
          if (res.data.code == 200) {
            const datalist = _this.formatDatalist(res.data.data)
            _this.setData({ datalist: datalist })
          } else {
            wx.showToast({ title: res.data.message })
          }
        },
        complete: (res)=> {
          wx.hideLoading()
        }
      })
    }
  }
})
