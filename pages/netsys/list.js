// pages/netsys/list.js
var app = getApp()
var util = require("../../utils/util")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    radioItems: [
      { name: '月份', value: '3', checked: true },
      { name: '日期', value: '4' }
    ],
    today: '',
    title: '',
    type: 'feebill',
    cookie: '',
    info: '',
    year: '',
    month: '',
    startDate: '',
    endDate: '',
    getDataBy: 3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.inital(options)
  },
  inital:function (options) {
    const pageType = options.type
    let getDataBy = this.data.getDataBy
    
    const date = new Date()
    const thisYear = date.getFullYear()
    const thisMonth = date.getFullYear() + '-' + (date.getMonth() + 1)
    const today = util.formatDate(date)

    this.setData({
      type: pageType,
      title: options.title,
      cookie: options.cookie,
      year: thisYear,
      month: thisMonth,
      today: today,
      startDate: today,
      endDate: today
    })
    if (pageType == 'feebill') {
      this.getFeebill('', app.globalData.netsysUserInfo.cookie)
    }
    if (pageType == 'bizlog' || pageType == 'uselog' || pageType == 'payment') {
      if (pageType == 'uselog') {
        getDataBy = 4
        this.setData({ getDataBy: getDataBy })
      }
      this.getLogdata(getDataBy, thisMonth, today, today, app.globalData.netsysUserInfo.cookie)
    }
  },
  // 获取扣费账单记录 
  getFeebill: function (year = '', cookie) {
    var _this = this
    wx.request({
      url: `${app.globalData.domain}/netsys/feebill`,
      data: { year: year, cookie: cookie },
      timeout: app.globalData.requestTimeout,
      method: 'POST',
      success: function(res){
        try {
          console.log(res.data)
          _this.setData({
            info: res.data,
            isLoading: ''
          })
          wx.vibrateShort({ type: 'medium' })
        } catch (error) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 5000
          })
        }
      }
    })
  },
  // 获取业务办理操作记录、上网详单、缴费充值记录
  getLogdata: function (type = 4, month = '', startDate = '', endDate = '', cookie = '') {
    var _this = this
    wx.request({
      url: `${app.globalData.domain}/netsys/${this.data.type}`,
      data: {
        type: type,
        month: month,
        startDate: startDate,
        endDate: endDate,
        cookie: cookie
      },
      timeout: app.globalData.requestTimeout,
      method: 'POST',
      success: function(res){
        try {
          console.log(res.data)
          _this.setData({ info: res.data, isLoading: '' })
          wx.vibrateShort({ type: 'medium' })
        } catch (error) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 5000
          })
        }
      }
    })
  },
  radioChange: function (e) {
    this.setData({ getDataBy: e.detail.value })
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value
    }
    this.setData({ radioItems: radioItems })
  },
  yearChange: function (e) {
    this.setData({ year: e.detail.value })
    this.getFeebill(e.detail.value, app.globalData.netsysUserInfo.cookie)
  },
  startDateChange: function (e) {
    this.setData({ startDate: e.detail.value })
  },
  endDateChange: function (e) {
    this.setData({ endDate: e.detail.value })
  },
  monthChange: function (e) {
    const pageType = this.data.type
    const type = this.data.getDataBy
    const month = e.detail.value
    const startDate = this.data.startDate
    const endDate = this.data.endDate
    const cookie = app.globalData.netsysUserInfo.cookie
    this.setData({ month:  month})
    if (pageType == 'bizlog') {
      this.getLogdata(type, month, startDate, endDate, cookie )
    }
    if (pageType == 'payment') {
      this.getLogdata(type, month, startDate, endDate, cookie )
    }
  },
  searchFeebill: function () {
    this.getFeebill(this.data.year, app.globalData.netsysUserInfo.cookie)
  },
  searchLog: function () {
    this.getLogdata(this.data.getDataBy, this.data.month, this.data.startDate, this.data.endDate, app.globalData.netsysUserInfo.cookie)
  }
})