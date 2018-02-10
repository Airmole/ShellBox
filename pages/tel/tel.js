var base64 = require("../../images/base64");
Page({
  data: {
    telNumber: [{
      name: '吴思',
      tel: 15922164710
    }, {
      name: '杨灿',
      tel: 18630801799
    }, {
      name: '刘卫洁',
      tel: 18722136008
    }],
    QQNumber: [{
      name: '吴思',
      qq: 925396533
    }, {
      name: '鲍勇',
      qq: 778547694
    }, {
      name: '张艳君',
      qq: 911615726
    }, {
      name: '刘卫洁',
      qq: 315226353
    }]
  },
  onLoad: function () {
    this.setData({
      icon: base64.icon20
    });
  },
  callPhone: function (event) {
    wx.makePhoneCall({
      phoneNumber: event.target.id
    })
  },
  copyIt: function (event) {
    wx.setClipboardData({
      data: event.target.id
    })
    wx.showToast({
      title: '已复制到粘贴版',
      icon: 'none',
      duration: 1000
    });
    // wx.getClipboardData({
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
  }
}
)