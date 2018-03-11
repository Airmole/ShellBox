// pages/score/showScore/showScore.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stuId: " ",
    password: " ",
    jsonContent: {},
    hasUserInfo: false
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
          jsonContent: res.data,
        })
        if (res.data[0].length == 0) {
          wx.redirectTo({
            url: './error'
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
    var that = this

    if (app.globalData.hasLogin === false) {
      wx.login({
        success: _getUserInfo
      })
    } else {
      _getUserInfo()
    }

    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            hasUserInfo: true,
            userInfo: res.userInfo
          })
          that.update()
        }
      })
    }
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
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
    var uInfo = this.data.userInfo;
    // console.log();
    return {
      title: uInfo.nickName + '成绩查询结果',
      imageUrl: "https://airmole.cn/wechat/wxapp/images/QueryScore.jpg"
    }
  }
})