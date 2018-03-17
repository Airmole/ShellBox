var base64 = require("../../images/base64");
Page({
  data: {
   
  },
  onLoad: function () {
    this.setData({
      icon: base64.icon20
    });
  },
  
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    return {
      title: '贝壳田园通讯录',
      path: 'pages/tel/tel',
      imageUrl: "https://airmole.cn/wechat/wxapp/images/QueryTel.jpg"
    }
  }
})