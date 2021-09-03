// pages/school/finance/component/invoiceApply/invoiceApply.js
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
      title: '待开票',
      value: 'pending'
    }, {
      title: '已开票',
      value: 'finished'
    }],
    target: 0,
    showTarget: false,
    targetData: [],
    year: '',
    data: '',
    datalist: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inital: function (params) {
      const date = new Date()
      const thisYear = date.getFullYear()
      this.setData({ year: thisYear })
      this.getDatalist('false', thisYear)
    },
    tabChanged: function (e) {
      const tab = this.data.tabs[e.currentTarget.dataset.index].value
      this.setData({ tab: tab})
      const record = tab == 'pending' ? 'false' : 'true'
      this.getDatalist(record)
    },
    yearChange: function (e) {
      this.setData({ year: e.detail.value })
    },
    getDatalist: function (record = 'false', year, page = 0, pagesize = 30) {
      wx.showLoading({ title: '等等，我加载下' })
      const _this = this
      const cookie = app.globalData.financeInfo ? app.globalData.financeInfo.cookie : ''
      if (!cookie) {
        wx.showToast({ title: '请先登录', icon: 'none' })
        wx.redirectTo({ url: '/pages/school/finance/bind' })
        return
      }

      wx.request({
        url: `${app.globalData.domain}/finance/invocie`,
        data: {
          cookie: cookie,
          year: year ? year : _this.data.year,
          record: record,
          page: page,
          pagesize: pagesize
        },
        timeout: app.globalData.requestTimeout,
        success: (res) => {
          if (res.data.code == 200) {
            const datalist = record == 'false' ? res.data.data : _this.formatAllDate(res.data.data)
            _this.setData({ datalist: datalist, data: res.data })
          } else {
            wx.showToast({ title: res.data.message, icon: 'none' })
          }
        },
        complete: (res)=> {
          wx.hideLoading()
        }
      })
    },
    getTargetDetail: function (cfid = '') {
      wx.showLoading({ title: '等等，我加载下' })
      const _this = this
      const cookie = app.globalData.financeInfo ? app.globalData.financeInfo.cookie : ''
      wx.request({
        url: `${app.globalData.domain}/finance/invocie/detail`,
        data: {
          cookie: cookie,
          cfid: cfid
        },
        timeout: app.globalData.requestTimeout,
        success: (res) => {
          if (res.data.code == 200) {
            _this.setData({
              targetData: res.data.data,
              showTarget: true
            })
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
        const showDate = new Date(parseInt(element.cfkpdate.substr(6, 13))).toLocaleDateString()
        element.showDate = showDate
        result.push(element)
      })
      return result
    },
    showTargetModal: function (e) {
      const index = e.currentTarget.dataset.index
      const cfid = this.data.datalist[index].cfid
      this.setData({ target: index })
      this.getTargetDetail(cfid)
    },
    closeTargetModal: function () {
      this.setData({ showTarget: false })
    },
    download: function (e) {
      wx.showLoading({ title: '下载中...' })
      const index = e.currentTarget.dataset.index
      const invoce = this.data.datalist[index]
      const manage = wx.getFileSystemManager()
      const fileName = invoce.cfinvoicecode + '_' + invoce.cfinvoicenum
      wx.downloadFile({
        url: invoce.cfinvoicefile,
        success (res) {
          var savePath = wx.env.USER_DATA_PATH + "/" + fileName
          if (res.statusCode == 200) {
            manage.saveFile({
              tempFilePath: res.tempFilePath,
              filePath: savePath+'.pdf',
              success:function(res){
                wx.openDocument({
                  filePath: res.savedFilePath,
                  fileType: 'pdf',
                  showMenu: true
                })
                wx.hideLoading()
              }
            })
          }
        }
      })
    }
  }
})
