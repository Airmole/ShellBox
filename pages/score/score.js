Page({
  submitInfo: function (e) {
    if (e.detail.value.numberId.length == 0 || e.detail.value.Pwd.length == 0) {
      wx.showToast({
        title: '输入学号密码',
        image: '/images/info.png',
        icon: 'none',
        duration: 2000
      });
    } else {
      console.log(e.detail.value.numberId);
      console.log(e.detail.value.Pwd);
    }
  }
})