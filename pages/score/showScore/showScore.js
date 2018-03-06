// pages/score/showScore/showScore.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stuId: " ",
    password: " ",
    jsonContent: {},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      stuId: options.stuId,
      password: options.password,
    });

    wx.request({
      url: 'https://airmole.cn/test/record.php',
      method: "POST",
      data: {
        stuId: options.stuId,
        password: options.password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // post提交表单
      },
      success: function (res) {
        that.setData({
          jsonContent: res.data
        })
        //看了半天php数组的文档，改了一晚上API接口没一点进展，睡觉。明天再说
        //2018年3月6日 23点48分
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})