// pages/course/stulist/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    isLoading: true,
    courseIndex: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCourseIndex();
  },
  getCourseIndex: function () {
    // console.log(app.globalData.edusysUserInfo)
    var _this = this;
    var uid = app.globalData.edusysUserInfo.uid;
    var pwd = app.globalData.edusysUserInfo.password;

    wx.request({
      url: `${app.globalData.domain}/edu/profile`,
      data: { uid: uid, pwd: pwd },
      timeout: 6000,
      method: 'POST',
      success: function(res){
        try {
          if(res.data.name.length>1){
            res.data.password = pwd
            wx.setStorage({
              data: res.data,
              key: 'edusysUserInfo',
            })
            app.globalData.edusysUserInfo = res.data
           _this.setData({ courseIndex: res.data.allCourses, isLoading: false });
          }
        } catch (error) {
          console.log(error)
          if(app.globalData.hasEdusysStorage){
            _this.setData({ courseIndex: app.globalData.edusysUserInfo.allCourse })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 5000
            })
            wx.clearStorage({
              success: (res) => {
                app.globalData.edusysUserInfo = {};
                app.globalData.hasEdusysStorage = false;
                wx.navigateTo({ url: '../../index/login' });
              },
            })
          }
        }
      }
    })
  }
})