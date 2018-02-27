Page({
  data: {
    //班级选择器列表内容
    array: ['通信1601', '通信1602', '自动化1601', '自动化1602', '计算机1601', '计算机1602', '计算机1603', '计算机1604', '计算机1605', "点我选班级"],
    //选择器对应选项带属性值
    objectArray: [
      {
        id: 0,
        name: '通信1601'
      },
      {
        id: 1,
        name: '通信1602'
      },
      {
        id: 2,
        name: '自动化1601'
      }, {
        id: 3,
        name: "自动化1602"
      }, {
        id: 4,
        name: "计算机1601"
      }, {
        id: 5,
        name: "计算机1602"
      }, {
        id: 6,
        name: "计算机1603"
      }, {
        id: 7,
        name: "计算机1604"
      }, {
        id: 8,
        name: "计算机1605"
      }, {
        id: 9,
        name: "点我选班级"
      }
    ],
    //默认没有选择班级的选择器初始值
    index: 9,
    imgSrc: [
      "https://airmole.cn/wechat/wxapp/images/t1601.jpg",
      "https://airmole.cn/wechat/wxapp/images/t1602.jpg",
      "https://airmole.cn/wechat/wxapp/images/z1601.jpg",
      "https://airmole.cn/wechat/wxapp/images/z1602.jpg",
      "https://airmole.cn/wechat/wxapp/images/j1601.jpg",
      "https://airmole.cn/wechat/wxapp/images/j1602.jpg",
      "https://airmole.cn/wechat/wxapp/images/j1603.jpg",
      "https://airmole.cn/wechat/wxapp/images/j1604.jpg",
      "https://airmole.cn/wechat/wxapp/images/j1605.jpg"
    ]
  },
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    // var classId = this.data.index;
    // console.log(classId);
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   // console.log(res.target)
    // }
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '北京科技大学天津学院信息系课表',
      path: 'pages/index/index',
      imageUrl: "/images/QueryClassTable.jpg"
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
  previewImg: function () {
    var picId = this.data.index;
    switch (picId) {
      case "0":
        var picId = this.data.imgSrc[0];
        break;
      case "1":
        var picId = this.data.imgSrc[1];
        break;
      case "2":
        var picId = this.data.imgSrc[2];
        break;
      case "3":
        var picId = this.data.imgSrc[3];
        break;
      case "4":
        var picId = this.data.imgSrc[4];
        break;
      case "5":
        var picId = this.data.imgSrc[5];
        break;
      case "6":
        var picId = this.data.imgSrc[6];
        break;
      case "7":
        var picId = this.data.imgSrc[7];
        break;
      case "8":
        var picId = this.data.imgSrc[8];
        break;
      default:
        console.log("default");
    }
    wx.previewImage({
      current: "picId",
      urls: [picId],
    })
  },
}) 