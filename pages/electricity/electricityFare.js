// pages/electricity/electricityFare.js
var app = getApp()
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
  onLoad: function (options) {
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
      url: 'https://airmole.cn/wechat/wxapp/api/eleQueryService.php?zhai=' + options.zhai + '&room=' + options.room,
      success: function (res) {
        that.setData({
          eleJson: res.data,
        })
        wx.hideToast();
        console.log(res.data);
        //账号密码错误以下功能实现跳转错误页面
        if (res.data.electricity[0].Balance == '0.00' && res.data.electricity[0].LastRecharge == '0.00' && res.data.electricity[0].yesterdayAircon == '0.00' && res.data.electricity[0].yesterdaySocket == '0.00') {
          wx.redirectTo({
            url: '/pages/error/loginerror'
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  //改房间
  changeRoom: function () {
    app.globalData.building = "";
    app.globalData.roomNo = "";
    wx.setStorageSync('building', '');
    wx.setStorageSync('roomNo', '');
    wx.redirectTo({
      url: './electricityBind'
    })
  },
})