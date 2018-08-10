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
    PicURL: "",
    PicArr: [""],
    hasUserInfo: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    })
    var that = this;
    that.setData({
      stuId: app.globalData.uid,
      password: app.globalData.pwd,
    });
    if (app.globalData.uid == '' || app.globalData.pwd == '') {
      //调试完记得取消注释
      wx.redirectTo({
        url: '/pages/index/index'
      })
    } else {
      wx.request({
        url: 'https://api.giiig.cn/tj/?username=' + app.globalData.uid + '&password=' + app.globalData.pwd,
        success: function(res) {
          that.setData({
            jsonContent: res.data,
          })
          // console.log(res.data);
          if (res.data.data.msg == '密码错误') {
            wx.redirectTo({
              url: '/pages/error/queryerror'
            })
          }
          wx.hideToast()
        }
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  GetScoreList: function(s) {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    })
    var that = this;
    // console.log(app.globalData.uid);
    wx.request({
      url: 'https://api.giiig.cn/tj/score?uid=' + app.globalData.uid,
      success: function(res) {
        that.setData({
          PicUrl: res.data.data,
        })
        // console.log(res.data.data);
        that.data.PicArr[0] = res.data.data,
          wx.hideToast()
        wx.previewImage({
          current: res.data.data, // 当前显示图片的http链接
          urls: that.data.PicArr // 需要预览的图片http链接列表
        })
        wx.downloadFile({
          url: res.data.data,
          success: function(res) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function(dres) {
                console.log(dres);
                wx.showToast({
                  title: '已保存到相册，记得分享',
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          }
        })
      }
    })
  },
})