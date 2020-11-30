// pages/classQuery/courseList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teachersCourses: [],
    isTeacher: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },
  init: function () {
    var that = this;
    var uid = wx.getStorageSync('uid');
    var pwd = wx.getStorageSync('newpwd')
    if (uid.length >= 2 && uid.length < 8) {
      // 是老师
      let profileCache = wx.getStorageSync('profileCache')
      let teachersCourses = profileCache.allCourses
      that.setData({
        teachersCourses: teachersCourses,
        isTeacher: true
      })
    }
  },
  goToQueryStudentList(e) {
    const index = e.currentTarget.dataset.index
    const queryCode = this.data.teachersCourses[index].queryCode
    // console.log(queryCode)
    wx.navigateTo({
      url: '/pages/classQuery/courseStulist?queryCode=' + queryCode,
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

  }
})