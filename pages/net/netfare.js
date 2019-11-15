// pages/net/netfare.js
var app = getApp();
var base64 = require('../../utils/base64.min.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    netJson: "",
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
    console.log(options);
    var that = this;
    that.getJson(options.uid, base64.decode(options.netPassword));
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
  getJson: function(uid, netPassword) {
    var that = this;
    wx.request({
      url: app.globalData.apiURL + '/netFareExternal.php',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        username: uid,
        netPassword: netPassword
      },
      success: function(res) {
        that.setData({
          netJson: res.data,
        })
        wx.hideToast();
        console.log(res.data);
        //查询出错
        if (res.data.code == "401") {
          wx.setStorageSync('netPassword', '');
          wx.showToast({
            title: res.data.desc,
            icon: 'none',
            duration: 5000
          });
          wx.redirectTo({
            url: './netBind'
          })
        } else if (res.data.code == "200") {
          //设置本地Storage,维持登录态用
          wx.setStorageSync('netPassword', base64.encode(netPassword));
        } else {
          wx.redirectTo({
            url: '/pages/error/queryerror?ErrorTips=无法查询，请联系客服'
          })
        }
      }
    })
  }
})