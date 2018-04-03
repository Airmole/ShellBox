var app = getApp()
Page({
  data: {
    uid: '',
    pwd: '',
    jsonContent: {},
    jsonStr: ""
  },
  onLoad: function () {
    app.globalData.uid = '';
    app.globalData.pwd = '';
  },
  submitInfo: function (e) {
    let that = this;
    // that.setData({
    //   uid: e.detail.value.uid,
    //   pwd: e.detail.value.pwd,
    // });
    app.globalData.uid = e.detail.value.uid;
    app.globalData.pwd = e.detail.value.pwd;
    if (e.detail.value.uid.length == 0 || e.detail.value.pwd.length == 0) {
      wx.showToast({
        title: '输入有误',
        image: '/images/info.png',
        icon: 'none',
        duration: 1000
      });
    } else {

      wx.request({
        url: 'https://airmole.cn/wechat/wxapp/api/Airmole_jiaowuInfoQuery.php?uid=' + e.detail.value.uid + '&pwd=' + e.detail.value.pwd,
        success: function (res) {
          that.setData({
            jsonStr: res.data,
          })
          // console.log(res.data);
          //账号密码错误以下功能实现密码错误Toast
          if (res.data[0][0].stuName == '') {
            // app.globalData.uid = '';
            // app.globalData.pwd = '';
            // app.globalData.loginfailed = 0;
            // console.log(app.globalData.loginsuccess);
            wx.showToast({
              title: '账号密码有误',
              image: '/images/info.png',
              icon: 'none',
              duration: 1000
            });
          } else {
            wx.navigateTo({
              url: '/pages/welcome/welcome?uid=' + e.detail.value.uid + '&pwd=' + e.detail.value.pwd
            })
          }
        }
      })
    }
  }
})