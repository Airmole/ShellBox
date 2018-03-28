Page({
  data: {
    stuId: '',
    password: '',
    
  },
  submitInfo: function (e) {
    if (e.detail.value.stuId.length == 0 || e.detail.value.password.length == 0) {
      wx.showToast({
        title: '输入有误',
        image: '/images/info.png',
        icon: 'none',
        duration: 1000
      });
    } else {
      //将学号和教务密码发送到showScore页面
      wx.navigateTo({
        url: '/pages/welcome/welcome'// + e.detail.value.stuId + '&password=' + e.detail.value.password
      })
    }
  },
  /**
   * 初始化加载
   */
  onLoad: function (options) {


  },
  /**
   * 跳转页面
   */
  goRegister: function () {
    wx.redirectTo({
      url: ''
    })
  }
})