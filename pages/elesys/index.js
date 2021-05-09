// pages/elesys/index.js
var app = getApp()
var util = require('../../utils/util')
var wxCharts = require('../../utils/wxcharts.js')
var lineChart = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    errorTips: false,
    building: "",
    room: "",
    eleData: '',
    isShowUnbind: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({ title: 'loading...' })

    this.inital(options)
  },
  inital: function (options) {
    const building = options.building ? options.building : ''
    const room = options.room ? options.room : ''
    if (building == '' || room == '') {
      wx.redirectTo({ url: './bind' })
      return
    }

    var time = util.formatTime(new Date())
    this.setData({ time: time, building: building, room: room })
    this.needShowUnbindBtn()
    this.getEleData(building, room)
  },
  needShowUnbindBtn: function () {
    const referer = wx.getLaunchOptionsSync()
    const sceneCode = referer.scene
    let isShowUnbind = true
    if (sceneCode == 1007 || sceneCode == 1008) {
      // 分享卡片进来的，不展示”修改寝室“按钮
      isShowUnbind = false
    }
    this.setData({ isShowUnbind: isShowUnbind })
  },
  // 获取电费数据
  getEleData: function(building, room) {
    var _this = this
    wx.request({
      url: `${app.globalData.domain}/elesys/`,
      data:{ building: building, room: room },
      timeout: app.globalData.requestTimeout,
      method: 'GET',
      success: function(res){
        wx.hideLoading()
        try {
          if (res.data.balance.length > 0) {
            _this.setData({ eleData: res.data, isLoading: false })
            _this.charts()
          }
        } catch (error) {
          wx.showToast({ title: res.data.message, icon: 'none' })
          _this.setData({ errorTips: res.data.message, isLoading: false })
        }
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    const building = this.data.building
    const room = this.data.room
    return {
      title: `${building}斋${room}寝室的用电信息`,
      path: `pages/elesys/index?building=${building}&room=${room}`
    }
  },
  // 修改解绑寝室信息
  changeRoom: function() {
    app.globalData.elesysUserInfo = ''
    wx.removeStorageSync('elesysUserInfo')
    wx.vibrateShort({ type: 'medium' })
    wx.redirectTo({ url: './bind' })
  },
  // 图表渲染相关
  touchHandler: function(e) {
    lineChart.showToolTip(e, {
      format: function(item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  charts: function(e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth * 0.80;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    var dfACdata = this.data.eleData.recently.eleSocket
    var dfKTdata = this.data.eleData.recently.airConditer
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: ["6天前", "5天前", "4天前", "3天前", "前天", "昨天", "当前"],
      animation: true,
      background: '#faf9f7',
      series: [
        { name: '插座用电', data: dfACdata, format: (val) => `${val}度` },
        { name: '空调用电', data: dfKTdata, format: (val) => `${val}度` }
      ],
      xAxis: { disableGrid: true },
      yAxis: { title: '最近用电曲线图', format: (val) => val.toFixed(2), min: 0 },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: { lineStyle: 'curve' }
    })
  }
})