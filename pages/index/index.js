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
    //设置等待页面课表完全渲染完成后再显示分享按钮，以确保用户体验
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
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '北京科技大学天津学院信息系课表',
      path: '/page/index/index',
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