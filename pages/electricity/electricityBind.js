// pages/electricity/electricityBind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ["楼斋", "3斋", "5斋", "6斋", "7斋", "9斋", "10斋", "11斋", "12斋", "13斋", "14斋", "15斋", "18斋", "19斋", "20斋", "21斋", "22斋", "25斋", "26斋", "27斋", "28斋", "29斋", "30斋", "31斋", "32斋", "33斋", "34斋", "35斋", "36斋"],
    index: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  bindPickerChange: function (e) {

    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})