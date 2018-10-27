// pages/electricity/electricityFare.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
var util = require('../../utils/time.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhai: "",
    room: "",
    eleJson: ''
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


    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time: time
    });

    var that = this
    this.setData({
      zhai: options.zhai,
      room: options.room,
    });
    wx.request({
      url: 'https://airmole.cn/wechat/wxapp/api/eleQueryServicewith7day.php?zhai=' + options.zhai + '&room=' + options.room,
      success: function(res) {
        that.setData({
          eleJson: res.data,
        })
        wx.hideToast();
        // console.log(res.data);
        //账号密码错误以下功能实现跳转错误页面
        if (res.data.Balance == '0.00' && res.data.LastRecharge == '0.00' && res.data.yesterdayAircon == '0.00' && res.data.yesterdaySocket == '0.00') {
          wx.redirectTo({
            url: '/pages/error/loginerror'
          })
        }
      }
    })


    //图表相关

    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var df = this.data.eleJson;
    // console.log(df)
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: [1, 2, 3, 4, 5, 6, 7],
      animation: true,
      // background: '#f5f5f5',
      series: [{
        name: '插座用电',
        data: [2, 3, 4, 5, 6, 7, 8],
        format: function(val, name) {
          return val.toFixed(2) + '度';
        }
      }, {
        name: '空调用电',
        data: [0, 0, 0, 0, 0, 0, 0],
        format: function(val, name) {
          return val.toFixed(2) + '度';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '最近七天用电',
        format: function(val) {
          return val.toFixed(2);
        },
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
    console.log(df)

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
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function(item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  createSimulationData: function() {
    var rt = this.data.eleJson;
    var categories = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
      categories.push('2016-' + (i + 1));
      data.push(Math.random() * (20 - 10) + 10);
    }
    // data[4] = null;
    return {
      categories: categories,
      data: rt,
    }
  },
})