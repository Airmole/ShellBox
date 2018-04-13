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
    wx.showToast({
      title: "加载中,请稍候...",
      icon: "loading",
      duration: 10000
    })
    var that = this;
    that.setData({
      stuId: app.globalData.uid,
      password: app.globalData.pwd,
    });
    wx.request({
      url: 'https://airmole.cn/wechat/wxapp/api/Airmole_jiaowuScoreQuery.php',
      method: "POST",
      data: {
        uid: app.globalData.uid,
        pwd: app.globalData.pwd
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // post提交表单
      },
      success: function (res) {
        that.setData({
          jsonContent: res.data,
        })
        // console.log(res.data);
        if (res.data[0].length <= 7) {
          wx.redirectTo({
            url: '/pages/error/queryerror'
          })
        }
        wx.hideToast()
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
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
    //这里不能一直只是假装干活啊，以后要真的干活啊
    //这下干活了，重复劳动而已
    wx.request({
      url: 'https://airmole.cn/test/record.php',
      method: "POST",
      data: {
        stuId: app.globalData.uid,
        password: app.globalData.pwd
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // post提交表单
      },
      success: function (res) {
        that.setData({
          jsonContent: res.data,
        })
        console.log("刷新完成");
        if (res.data[0].length == 0) {
          wx.redirectTo({
            url: '/pages/error/queryerror'
          })
        }
      }
    })
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