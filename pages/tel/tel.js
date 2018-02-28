var base64 = require("../../images/base64");
Page({
  data: {
    //存储老师们的联系电话的数组
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
    //存储老师们的QQ号码的数组
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
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    return {
      title: '贝壳田园信息系老师联系方式',
      path: 'pages/tel/tel',
      imageUrl: "/images/QueryTel.jpg"
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
})