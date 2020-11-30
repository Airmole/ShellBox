var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stuId: "",
    password: "",
    jsonContent: '',
    hasUserInfo: false,
    isLoading: true,
    queryCode: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var that = this;
    console.log(options);

    
    var queryCode = options.queryCode;
    this.setData({
      queryCode: queryCode
    })
    this.GetData(queryCode,options);
 

  },
  /**
   * 查询学生名单
   */
  GetData: function(queryCode, options) {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 60000
    })
    var that = this;
    wx.request({
      url: 'https://api.airmole.cn/ShellBox/teacher/courseStuList.php?queryCode=' + queryCode,
      method: "GET",
      success: function(res) {
        console.log(res.data)
        if (res.data.code == 200) {
          that.setData({
            isLoading:false,
            jsonContent: res.data.data
          })
          wx.hideToast();
          if(options.update==1){
            wx.showToast({
              title: "更新完成",
              icon: "succeed",
              duration: 2000
            })
          }
        } else if(res.data.code==403){
          let uid = wx.getStorageSync('uid')
          if(uid.length>1){
            wx.redirectTo({
              url: '/pages/index/vcode?to=stuList&update=1&queryCode='+queryCode,
            })
          } else {
            that.reLogin()
          }
        } else {
          wx.redirectTo({
            url: '/pages/error/queryerror?ErrorTips=未知错误'
          })
        }
      }
    })
  },

  //注销重登录
  reLogin: function() {
    app.globalData.uid = "";
    app.globalData.pwd = "";
    app.globalData.newpwd = "";
    wx.setStorageSync('uid', '');
    wx.setStorageSync('newpwd', '');
    wx.redirectTo({
      url: '/pages/index/index'
    })
  },
  refreshData: function() {
    wx.redirectTo({
      url: '/pages/index/vcode?to=stuList&update=1&queryCode='+this.data.queryCode,
    })
  }
})