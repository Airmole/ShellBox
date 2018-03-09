Page({
  data: {
    stuId: '',
    password: '',
  },
  submitInfo: function (e) {
    if (e.detail.value.stuId.length == 0 || e.detail.value.password.length == 0) {
      wx.showToast({
        title: '学号密码为空',
        image: '/images/info.png',
        icon: 'none',
        duration: 2000
      });
    } else {
      //将学号和教务密码发送到showScore页面
      wx.navigateTo({
        url: '/pages/score/showScore/showScore?stuId=' + e.detail.value.stuId + '&password=' + e.detail.value.password
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '贝壳田园成绩查询',
      path: 'pages/score/score',
      imageUrl: "https://airmole.cn/wechat/wxapp/images/QueryScore.jpg"
    }
  }
})