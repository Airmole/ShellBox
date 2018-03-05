Page({
  submitInfo: function (e) {
    if (e.detail.value.stuId.length == 0 || e.detail.value.password.length == 0) {
      wx.showToast({
        title: '输入学号密码',
        image: '/images/info.png',
        icon: 'none',
        duration: 2000
      });
    } else {
      // console.log(e.detail.value.stuId);
      // console.log(e.detail.value.password);
      wx.request({
        url: 'https://airmole.cn/test/record.php',
        method: "POST",
        data: {
          stuId: e.detail.value.stuId,
          password: e.detail.value.password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // post提交表单
        },
        success: function (res) {
          console.log("提交成功！");
          wx.navigateTo({
            url: '/pages/score/showScore/showScore?stuId=' + e.detail.value.stuId + '&password=' + e.detail.value.password
          })
        }
      })
    }
  },
})