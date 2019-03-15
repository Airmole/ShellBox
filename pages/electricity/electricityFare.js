// pages/electricity/electricityFare.js
var wxCharts = require('../../utils/wxcharts.js');
var util = require('../../utils/time.js');
var app = getApp();
var lineChart = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    zhai: "",
    room: "",
    eleJson: '',
    last7AC: [],
    last7KT: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 5000
    })
    var building = wx.getStorageSync('building');
    var roomNo = wx.getStorageSync('roomNo');
    if (building == "" || roomNo == '') {
      wx.redirectTo({
        url: './electricityBind',
      })
    } else {
      // 调用函数时，传入new Date()参数，返回值是日期和时间  
      var time = util.formatTime(new Date());
      // 再通过setData更改Page()里面的data，动态更新页面的数据  
      this.setData({
        time: time
      });
      var that = this
      this.setData({
        zhai: building,
        room: roomNo,
      });
      wx.request({
        url: app.globalData.apiURL + '/electricityFare/eleQueryServicewith7day.php?zhai=' + building + '&room=' + roomNo,
        success: function(res) {
          console.log(res.data)
          //账号密码错误以下功能实现跳转错误页面
          if (that.isLogin(res) === false) {
            wx.redirectTo({
              url: '/pages/error/loginerror'
            })
          }
          that.setData({
            eleJson: res.data,
            last7AC: res.data.last7dayACused,
            last7KT: res.data.last7dayKTused
          })
          wx.hideToast();
          that.charts();
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    return {
      title: this.data.zhai + '斋' + this.data.room + '寝室' + '的用电信息',
      path: 'pages/electricity/electricityFare?zhai=' + this.data.zhai + "&room=" + this.data.room
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  //改房间
  changeRoom: function() {
    app.globalData.building = "";
    app.globalData.roomNo = "";
    wx.setStorageSync('building', '');
    wx.setStorageSync('roomNo', '');
    wx.redirectTo({
      url: './electricityBind'
    })
  },

  //图表相关
  touchHandler: function(e) {
    // console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
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
    var dfACdata = this.data.last7AC;
    var dfKTdata = this.data.last7KT;
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: ["6天前", "5天前", "4天前", "3天前", "前天", "昨天", "当前"],
      animation: true,
      background: '#faf9f7',
      series: [{
          name: '插座用电',
          data: dfACdata,
          format: (val) => val + "度"
        },
        {
          name: '空调用电',
          data: dfKTdata,
          format: (val) => val + "度"
        }
      ],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '最近用电曲线图',
        format: (val) => val.toFixed(2),
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },

  isLogin: function(res) {
    if (res.data.Balance === "0.00" &&
      res.data.LastRecharge === "0.00" &&
      res.data.yesterdayAircon === "0.00" &&
      res.data.yesterdaySocket === "0.00") {
      return false;
    }
    return true;
  }
})